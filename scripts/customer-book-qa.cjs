const { chromium } = require('playwright-core');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const ROOT = path.join(__dirname,'..');
const ASSETS = path.join(ROOT,'app/src/main/assets');
const OUT = path.join(ROOT,'artifacts/customer-book');
const ORIGIN = 'https://appassets.androidplatform.net';
const results = [];
let browser;
const pass = name => { results.push({ name, passed:true }); console.log('PASS',name); };
async function act(page,name) {
  for (const prefix of ['#modal-root ', '#print-layer:not(.hide) ', '']) {
    const controls = page.locator(`${prefix}[data-action="${name}"]:visible`);
    if (await controls.count()) return controls.first().click();
  }
  throw Error('Action not found: '+name);
}
const nav = (page,name) => page.locator(`[data-page="${name}"]:visible`).first().click();
(async () => {
  await fs.mkdir(OUT,{recursive:true});
  browser = await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
  const context = await browser.newContext({viewport:{width:1280,height:800},acceptDownloads:true});
  await context.route('**/*',async route => {
    const url=new URL(route.request().url());
    if (url.origin!==ORIGIN) return route.abort();
    const name=url.pathname.replace(/^\/assets\//,'');
    if (name.includes('..')) return route.abort();
    try { await route.fulfill({body:await fs.readFile(path.join(ASSETS,name)),contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg'})[path.extname(name)]||'application/octet-stream'}); }
    catch { await route.fulfill({status:404,body:'Missing asset'}); }
  });
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>{ errors.push(e.message); console.error('Runtime:',e.message); }); page.on('dialog',d=>d.accept());
  page.setDefaultTimeout(12000);
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('olga_issue_slip_v4')));
  await page.goto(ORIGIN+'/assets/index.html'); await page.waitForFunction(()=>window.BTApp);
  await act(page,'open-customer-picker'); await page.locator('.picker-customer-row').first().click(); await act(page,'confirm-picked-customer');
  await act(page,'next'); await act(page,'add-product'); await page.locator('[data-prop="price"]').first().fill('9.5');
  await page.locator('.step[data-index="3"]').click(); await act(page,'issue-doc');
  const documentsBefore=(await state()).docs;
  await nav(page,'customers'); await act(page,'new-customer');
  for (const [field,value] of Object.entries({name:'QA Portable & Customer',contact:'Yunus Emre',email:'portable@example.invalid',phone:'+420 123 456',city:'Praha'})) await page.locator(`#modal-form [name="${field}"]`).fill(value);
  await page.locator('#modal-form [type="submit"]').click();
  const wait=page.waitForEvent('download'); await act(page,'export-customers'); const file=await wait;
  const exportedPath=path.join(OUT,'customer-book.json'); await file.saveAs(exportedPath);
  const exported=JSON.parse(await fs.readFile(exportedPath,'utf8'));
  assert.equal(exported.format,'bt-souvenirs-customers'); assert.equal(exported.customers.length,61);
  assert.equal('docs' in exported,false); assert.equal('settings' in exported,false);
  const portable=exported.customers.find(c=>c.name==='QA Portable & Customer');
  assert.equal(portable.phone,'+420 123 456'); pass('Dedicated customer export includes newly saved contacts and excludes issue slips');
  await act(page,'new-customer'); await page.locator('#modal-form [name="name"]').fill('QA Local Customer After Export'); await page.locator('#modal-form [type="submit"]').click();
  const transfer={...exported,customers:[{...portable,phone:'',shipToAddresses:[{id:'portable-warehouse',name:'Portable delivery',street:'Street 2',city:'Brno'}]},{id:'portable-new-customer',name:'QA Customer From Another Tablet',shipToAddresses:[]}]};
  const input=()=>page.locator('#customer-upload').setInputFiles({name:'customer-book.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(transfer))});
  await input(); assert.match(await page.locator('#modal-root').innerText(),/1 new customers/); await page.locator('#confirm-action').click();
  let current=await state(); assert.equal(current.customers.length,63); assert.deepEqual(current.docs,documentsBefore);
  const merged=current.customers.find(c=>c.id===portable.id); assert.equal(merged.phone,portable.phone); assert.equal(merged.shipToAddresses.length,1);
  assert.ok(current.customers.find(c=>c.name==='QA Local Customer After Export'));
  assert.ok(await page.evaluate(()=>localStorage.getItem('olga_issue_slip_v4.customers-before-import')));
  pass('Customer import accumulates records and delivery addresses while retaining invoice links and existing contacts');
  await input(); await page.locator('#confirm-action').click(); current=await state();
  assert.equal(current.customers.length,63); assert.equal(current.customers.find(c=>c.id===portable.id).shipToAddresses.length,1);
  pass('Repeated customer imports do not duplicate customers or destinations');
  const durableBefore=JSON.stringify(current);
  await page.locator('#customer-upload').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"format":"bt-souvenirs-customers","version":1,"customers":[null]}')});
  assert.equal(JSON.stringify(await state()),durableBefore); assert.match(await page.locator('#toast-root').innerText(),/Could not import customers/);
  pass('Malformed customer files leave the existing customer book and documents intact');
  await nav(page,'editor'); await act(page,'open-customer-picker'); await page.locator('#picker-search').fill('Portable'); await page.locator('.picker-customer-row').first().click(); await act(page,'confirm-picked-customer');
  await act(page,'next'); await act(page,'add-product'); await page.locator('[data-prop="price"]').first().fill('12.5');
  for (const [width,height] of [[1280,800],[800,1280],[600,960],[412,915],[360,800],[640,388]]) {
    await page.setViewportSize({width,height});
    for (const name of ['editor','customers','products','slips','settings']) {
      await nav(page,name);
      const metrics=await page.evaluate(()=>({page:document.documentElement.scrollWidth-innerWidth,tables:[...document.querySelectorAll('.table-scroll')].filter(el=>el.offsetWidth>0).map(el=>el.scrollWidth-el.clientWidth)}));
      assert.ok(metrics.page<=1,`${name} page overflow at ${width}: ${JSON.stringify(metrics)}`);
      assert.ok(metrics.tables.every(n=>n<=1),`${name} table overflow at ${width}: ${JSON.stringify(metrics)}`);
    }
    await nav(page,'editor');
    await page.screenshot({path:path.join(OUT,`items-${width}.png`),fullPage:true});
    if (width<=1100) assert.equal(await page.locator('.item-grid td').first().getAttribute('data-label'),'Description');
  }
  assert.deepEqual(errors,[]); pass('Tablet/phone layouts contain no horizontal page or table scroll and retain visible field labels');
  await fs.writeFile(path.join(OUT,'results.json'),JSON.stringify({passed:true,results,errors},null,2));
})().catch(async error=>{ console.error(error); await fs.mkdir(OUT,{recursive:true}); await fs.writeFile(path.join(OUT,'results.json'),JSON.stringify({passed:false,results,error:error.stack},null,2)); process.exitCode=1; }).finally(async()=>{if(browser)await browser.close();});
