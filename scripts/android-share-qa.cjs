/* Run after core Android QA on the dedicated emulator; no message is sent to any recipient. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const assert = require('node:assert/strict');
const u = require('./android-util.cjs');
const run = promisify(execFile);
const SDK = process.env.ANDROID_HOME || path.join(process.env.LOCALAPPDATA,'Android/Sdk');
const ADB = path.join(SDK,'platform-tools/adb.exe');
const SERIAL = process.env.BT_ANDROID_SERIAL || 'emulator-5554';
let browser, page;
const results = [];
async function paths() {
  return (await u.adb('shell','run-as','com.btsouvenirs.tablet','find','cache/shared','-type','f').catch(()=>'' )).split(/\r?\n/).map(p=>p.trim()).filter(p=>p.endsWith('.pdf'));
}
async function receive(before,name) {
  let added;
  for (let i=0;i<30;i++) { added=(await paths()).find(p=>!before.includes(p)); if(added)break; await new Promise(r=>setTimeout(r,200)); }
  assert.ok(added,'A new shared PDF must be created');
  let nodes=await u.dump(name+'-chooser');
  if (!nodes.some(n=>/content_preview_filename|headline/.test(n['resource-id']))) {
    await page.waitForTimeout(350);
    nodes=await u.dump(name+'-chooser-stable');
  }
  if (!nodes.some(n=>/content_preview_filename|headline/.test(n['resource-id']))) {
    assert.match(await u.adb('shell','dumpsys','activity','activities'),/topResumedActivity=.*intentresolver/);
  }
  const {stdout}=await run(ADB,['-s',SERIAL,'exec-out','run-as','com.btsouvenirs.tablet','cat',added],{encoding:'buffer',maxBuffer:32*1024*1024});
  const dest=path.join(u.OUT,name+'.pdf'); await fs.writeFile(dest,stdout);
  await u.screenshot(name+'-chooser');
  await u.adb('shell','input','keyevent','4');
  results.push({name,passed:true,file:dest,bytes:stdout.length}); console.log('PASS',name);
}
(async()=>{
  const activity=await u.adb('shell','dumpsys','activity','activities');
  if(/topResumedActivity=.*intentresolver/.test(activity)) await u.adb('shell','input','keyevent','4');
  ({browser,page}=await u.connect());
  if(await page.locator('#print-layer:not(.hide)').count()) await page.locator('[data-action="close-preview"]').first().click();
  await page.locator('[data-page="slips"]:visible').first().click();
  let before=await paths();
  await page.locator('[data-action="share-doc"]').first().click();
  await receive(before,'share-single-final');
  const article=await page.locator('#print-layer .paper').evaluate(paper=>{
    const clone=paper.cloneNode(true), body=clone.querySelector('.lines tbody'), row=body.querySelector('tr:not(.p-source)').cloneNode(true);
    body.querySelectorAll('tr:not(.p-source)').forEach(r=>r.remove());
    for(let i=1;i<=60;i++){ const item=row.cloneNode(true); item.cells[0].textContent='SHARE-ROW-'+String(i).padStart(3,'0')+' · Tablet PDF'; body.append(item); }
    return clone.outerHTML;
  });
  before=await paths();
  await page.evaluate(html=>BTPlatform.document('share',html,'qa-share-multiple.pdf'),article);
  await receive(before,'share-multiple-final');
  await u.adb('shell','wm','density','320');
  await page.waitForTimeout(800);
  before=await paths();
  await page.evaluate(html=>BTPlatform.document('share',html,'qa-share-density.pdf'),article);
  await receive(before,'share-density-final');
  await fs.writeFile(path.join(u.OUT,'share-results.json'),JSON.stringify({passed:true,results},null,2));
})().catch(async error=>{ console.error(error); await fs.writeFile(path.join(u.OUT,'share-results.json'),JSON.stringify({passed:false,results,error:error.stack},null,2)); process.exitCode=1; }).finally(async()=>{
  await u.adb('shell','wm','density','160').catch(()=>{});
  if(browser)await browser.close();
});
