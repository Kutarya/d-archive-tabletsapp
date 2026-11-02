const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const ROOT = path.join(__dirname, '..');
const ASSETS = path.join(ROOT, 'app/src/main/assets');
const OUT = path.join(ROOT, 'artifacts/browser');
const ORIGIN = 'https://appassets.androidplatform.net';
const results = [];
const record = (name, details = {}) => { results.push({ name, passed: true, ...details }); console.log('PASS', name); };
let printHtml = '';

(async () => {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.BT_CHROME || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true });
  const errors = [];
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== ORIGIN) return route.abort();
    const name = decodeURIComponent(url.pathname).replace(/^\/assets\//, '');
    if (name === 'print.html') return route.fulfill({ contentType: 'text/html', body: printHtml });
    if (name.includes('..') || name.includes('\\')) return route.abort();
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg' };
    try { await route.fulfill({ contentType: types[path.extname(name)] || 'application/octet-stream', body: await fs.readFile(path.join(ASSETS, name)) }); }
    catch { await route.fulfill({ status: 404, body: 'Missing asset' }); }
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem('olga_issue_slip_v4')));
  const act = name => page.locator(`[data-action="${name}"]:visible`).first().click();
  const nav = name => page.locator(`.aside [data-page="${name}"]`).click();
  const item = (index, prop) => page.locator(`#item-rows input[data-prop="${prop}"]`).nth(index);
  const saveForm = async values => {
    for (const [name, value] of Object.entries(values)) await page.locator(`#modal-form [name="${name}"]`).fill(value);
    await page.locator('#modal-form button[type="submit"]').click();
  };
  try {
    await page.goto(`${ORIGIN}/assets/index.html`);
    await page.waitForFunction(() => !!window.BTApp);
    assert.equal(await page.locator('.customer-picker-modal').count(), 0);
    await page.evaluate(() => BTApp.checkpoint());
    const initial = await state();
    assert.ok(initial.customers.length > 0);
    assert.equal(initial.products.length, 9);
    assert.ok(initial.products.every(p => !('price' in p)));
    record('First launch: original data, no automatic customer dialog', { customers: initial.customers.length, products: initial.products.length });

    await act('open-customer-picker');
    await page.locator('.picker-customer-row').first().click();
    assert.ok(await page.locator('.picker-detail-content').isVisible());
    await act('confirm-picked-customer');
    assert.ok((await state()).workingDraft.customerId);
    record('Search, verify and confirm an original customer');

    await nav('customers');
    await act('new-customer');
    await saveForm({ name: 'QA Offline s.r.o.', city: 'Praha', street: 'Testovací 12', postal: '110 00', country: 'CZ', vatId: 'CZ12345678', email: 'qa@example.invalid' });
    assert.equal((await state()).customers.length, initial.customers.length + 1);
    await nav('editor');
    await act('open-customer-picker');
    await page.locator('#picker-search').fill('QA Offline');
    assert.equal(await page.locator('.picker-customer-row').count(), 1);
    await page.locator('.picker-customer-row').click();
    await act('confirm-picked-customer');
    await act('new-address');
    await saveForm({ name: 'QA Warehouse', street: 'Sklad 20', city: 'Brno', postal: '602 00', country: 'CZ' });
    assert.ok((await state()).workingDraft.shipId);
    record('New customer and separate delivery address');

    await act('next');
    await act('add-product');
    assert.equal(await item(0, 'price').inputValue(), '');
    await item(0, 'qty').fill('3');
    await item(0, 'price').fill('19.99');
    await item(0, 'vat').fill('21');
    assert.match(await page.locator('#live-total').innerText(), /72\.56/);
    await act('custom-line');
    await item(1, 'name').fill('Rounding boundary');
    await item(1, 'qty').fill('2.5');
    await item(1, 'price').fill('0.01');
    await item(1, 'vat').fill('21');
    assert.match(await page.locator('[data-item-total]').nth(1).innerText(), /0\.04/);
    assert.match(await page.locator('#live-total').innerText(), /72\.60/);
    record('Manual prices and consistent cent rounding: net 60.00, VAT 12.60, total 72.60 EUR');

    await item(0, 'qty').fill('-1');
    await act('show-preview');
    assert.ok(await page.locator('[data-action="print"]').isDisabled());
    await act('close-preview');
    await item(0, 'qty').fill('');
    await page.reload();
    await page.waitForFunction(() => !!window.BTApp);
    assert.equal(await page.locator('#storage-warning').count(), 0);
    assert.equal(await item(0, 'qty').inputValue(), '');
    await item(0, 'qty').fill('3');
    for (const [prop, value] of [['price', ''], ['price', '-1'], ['vat', '101']]) {
      await item(0, prop).fill(value);
      await act('show-preview');
      assert.ok(await page.locator('[data-action="save-pdf"]').isDisabled());
      await act('close-preview');
      await item(0, 'price').fill('19.99');
      await item(0, 'vat').fill('21');
    }
    record('Negative/blank quantity, missing/negative price and invalid VAT block output; incomplete draft survives reload');

    await act('next');
    await page.locator('[data-field="currency"]').selectOption('CZK');
    let draft = (await state()).workingDraft;
    assert.equal(draft.currency, 'CZK');
    assert.equal(draft.items[0].price, 486.76);
    await page.locator('[data-field="currency"]').selectOption('EUR');
    await page.locator('[data-field="notes"]').fill('Offline acceptance · Çekçe / Türkçe: Č Ž Ş ğ');
    await act('save-draft');
    assert.equal((await state()).docs.length, 1);
    assert.equal((await state()).docs[0].status, 'draft');
    await act('edit-doc');
    await page.locator('[data-action="step"][data-index="3"]').click();
    await act('issue-doc');
    assert.equal((await state()).docs[0].status, 'open');
    assert.equal((await state()).docs[0].customerSnapshot.name, 'QA Offline s.r.o.');
    record('Currency conversion, draft save, reopen and final issue with immutable customer/supplier snapshots');

    await act('print-doc');
    await page.locator('.invoice-logo').evaluate(image => image.decode());
    assert.ok(await page.locator('.invoice-logo').evaluate(image => image.naturalWidth > 0));
    assert.match(await page.locator('.paper').innerText(), /72,60/);
    assert.match(await page.locator('.paper').innerText(), /QA Warehouse/);
    const article = await page.locator('.paper').evaluate(element => element.outerHTML);
    await page.screenshot({ path: path.join(OUT, 'a4-preview.png') });
    record('A4 preview includes original logo, customer, delivery, tax, total and Unicode notes');
    await act('close-preview');

    for (const viewport of [{ width: 1280, height: 800 }, { width: 800, height: 1280 }, { width: 412, height: 915 }]) {
      await page.setViewportSize(viewport);
      await page.evaluate(() => document.querySelector('[data-page="editor"]').click());
      await page.waitForTimeout(100);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `No page overflow at ${viewport.width}`);
      await act('open-customer-picker');
      const bounds = await page.locator('.customer-picker-modal').boundingBox();
      assert.ok(bounds.x >= 0 && bounds.y >= 0 && bounds.x + bounds.width <= viewport.width + 1 && bounds.y + bounds.height <= viewport.height + 1);
      await page.screenshot({ path: path.join(OUT, `customer-${viewport.width}x${viewport.height}.png`) });
      await page.evaluate(() => BTApp.handleBack());
      assert.equal(await page.locator('.customer-picker-modal').count(), 0);
    }
    record('Landscape tablet, portrait tablet and phone layouts; Back closes picker');
    await page.setViewportSize({ width: 1280, height: 800 });

    await nav('settings');
    const downloadPromise = page.waitForEvent('download');
    await act('export-backup');
    const download = await downloadPromise;
    const backupPath = path.join(OUT, 'round-trip-backup.json');
    await download.saveAs(backupPath);
    const exported = JSON.parse(await fs.readFile(backupPath, 'utf8'));
    assert.equal(exported.docs.length, 1);
    await nav('customers');
    await act('new-customer');
    await saveForm({ name: 'Temporary after backup' });
    assert.equal((await state()).customers.length, initial.customers.length + 2);
    await page.locator('#backup-upload').setInputFiles(backupPath);
    await page.locator('#confirm-action').click();
    assert.equal((await state()).customers.length, initial.customers.length + 1);
    assert.ok(await page.evaluate(() => !!localStorage.getItem('olga_issue_slip_v4.before-replace')));
    record('JSON export/restore round trip with confirmation and pre-restore recovery copy');

    const beforeInvalid = JSON.stringify(await state());
    await page.locator('#backup-upload').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"version":4,"settings":{},"docs":[null],"products":[],"categories":[],"customers":[]}') });
    assert.equal(JSON.stringify(await state()), beforeInvalid);
    const xml = '<dat:dataPack xmlns:dat="http://www.stormware.cz/schema/version_2/data.xsd" xmlns:adb="http://www.stormware.cz/schema/version_2/addressbook.xsd" xmlns:typ="http://www.stormware.cz/schema/version_2/type.xsd"><dat:dataPackItem><adb:addressbook><adb:addressbookHeader><adb:identity><typ:extId><typ:ids>QA-XML</typ:ids></typ:extId><typ:address><typ:company>XML Offline Customer</typ:company><typ:city>Brno</typ:city><typ:street>XML 15</typ:street><typ:dic>CZ999999</typ:dic></typ:address><typ:shipToAddress><typ:name>XML Delivery</typ:name><typ:street>Ship 1</typ:street><typ:city>Praha</typ:city></typ:shipToAddress></adb:identity></adb:addressbookHeader></adb:addressbook></dat:dataPackItem></dat:dataPack>';
    await page.locator('#xml-upload').setInputFiles({ name: 'customers.xml', mimeType: 'application/xml', buffer: Buffer.from(xml) });
    assert.equal((await state()).customers.find(c => c.externalId === 'QA-XML').shipToAddresses.length, 1);
    record('Malformed JSON leaves records intact; namespaced customer XML and delivery addresses import');

    await page.reload();
    await page.waitForFunction(() => !!window.BTApp);
    assert.equal((await state()).docs[0].status, 'open');
    assert.equal(await page.locator('.customer-picker-modal').count(), 0);
    record('Reload retains documents, customers, products and working draft');

    await nav('editor');
    const durableBeforeFailure = await page.evaluate(() => localStorage.getItem('olga_issue_slip_v4'));
    await page.evaluate(() => {
      window.qaSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function() { throw new DOMException('QA quota failure', 'QuotaExceededError'); };
    });
    await act('save-draft');
    assert.ok(await page.locator('#save-failure-warning').isVisible());
    assert.ok(await page.locator('[data-action="save-draft"]').first().isVisible());
    assert.equal(await page.evaluate(() => localStorage.getItem('olga_issue_slip_v4')), durableBeforeFailure);
    await page.evaluate(() => { Storage.prototype.setItem = window.qaSetItem; delete window.qaSetItem; });
    await act('save-draft');
    assert.equal(await page.locator('#save-failure-warning').count(), 0);
    record('Storage failure keeps the editor open, preserves durable records and allows a successful retry');

    const printPage = await context.newPage();
    const makePrint = content => `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="print.css"></head><body><main id="document">${content}</main><script src="paginate.js"></script></body></html>`;
    printHtml = makePrint(article);
    await printPage.goto(`${ORIGIN}/assets/print.html`);
    await printPage.waitForFunction(() => window.BTPrintStatus);
    assert.equal((await printPage.evaluate(() => BTPrintStatus)).pages, 1);
    await printPage.pdf({ path: path.join(OUT, 'issue-slip-a4.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    await printPage.screenshot({ path: path.join(OUT, 'print-page.png'), fullPage: true });
    const manyRows = await printPage.locator('.paper').first().evaluate(paper => {
      const copy = paper.cloneNode(true);
      const tbody = copy.querySelector('.lines tbody');
      const row = tbody.querySelector('tr:not(.p-source)').cloneNode(true);
      tbody.replaceChildren();
      for (let index = 1; index <= 150; index++) { const item = row.cloneNode(true); item.cells[0].textContent = `Line ${index}: long item description / Č Ž Ş ğ`; tbody.append(item); }
      return copy.outerHTML;
    });
    printHtml = makePrint(manyRows);
    await printPage.reload();
    await printPage.waitForFunction(() => window.BTPrintStatus);
    const pagination = await printPage.evaluate(() => BTPrintStatus);
    assert.ok(pagination.pages > 1, JSON.stringify(pagination));
    assert.equal(await printPage.locator('.paper .lines tbody tr:not(.p-source)').count(), 150);
    assert.equal(await printPage.locator('.paper .big-total').count(), 1);
    await printPage.pdf({ path: path.join(OUT, 'issue-slip-150-lines.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
    record('Document-only PDF generation and lossless multipage pagination', { pagesFor150Lines: pagination.pages });

    await page.addInitScript(() => localStorage.setItem('olga_issue_slip_v4', '{corrupt-test'));
    await page.reload();
    await page.waitForFunction(() => window.BTApp);
    assert.ok(await page.locator('#storage-warning').isVisible());
    await page.evaluate(() => BTApp.checkpoint());
    assert.equal(await page.evaluate(() => localStorage.getItem('olga_issue_slip_v4')), '{corrupt-test');
    record('Corrupt storage is protected and cannot be silently reset or overwritten');
    assert.deepEqual(errors, []);
    record('No unhandled JavaScript errors');
    await fs.writeFile(path.join(OUT, 'results.json'), JSON.stringify({ passed: true, results }, null, 2));
  } catch (error) {
    await page.screenshot({ path: path.join(OUT, 'failure.png'), fullPage: true }).catch(() => {});
    await fs.writeFile(path.join(OUT, 'results.json'), JSON.stringify({ passed: false, results, error: error.stack, errors }, null, 2));
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
