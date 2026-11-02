const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const u = require('./android-util.cjs');
const results = [];
const pass = (name, details = {}) => { results.push({ name, passed: true, ...details }); console.log('PASS', name); };

(async () => {
  let { browser, page } = await u.connect();
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem('olga_issue_slip_v4')));
  const act = name => page.locator(`[data-action="${name}"]:visible`).first().click();
  try {
    assert.equal(await page.evaluate(() => BTPlatform.native), true);
    assert.equal(await page.locator('.customer-picker-modal').count(), 0);
    await page.evaluate(() => BTApp.checkpoint());
    await page.evaluate(() => BTPlatform.flush());
    pass('Packaged APK starts offline with an active origin-scoped native bridge', { viewport: await page.evaluate(() => [innerWidth, innerHeight]) });

    await act('open-customer-picker');
    await page.locator('#picker-search').click();
    await u.screenshot('customer-keyboard');
    const keyboard = await u.adb('shell', 'dumpsys', 'input_method');
    await fs.writeFile(path.join(u.OUT, 'keyboard.txt'), keyboard);
    await u.adb('shell', 'input', 'keyevent', '4');
    if (await page.locator('.customer-picker-modal').count()) await u.adb('shell', 'input', 'keyevent', '4');
    await page.waitForFunction(() => !document.querySelector('.customer-picker-modal'));
    pass('Android Back dismisses the keyboard and customer modal without exiting');

    await act('open-customer-picker');
    await page.locator('.picker-customer-row').first().click();
    await act('confirm-picked-customer');
    await act('next');
    await act('add-product');
    const input = prop => page.locator(`#item-rows input[data-prop="${prop}"]`).first();
    assert.equal(await input('price').inputValue(), '');
    await input('qty').fill('3');
    await input('price').fill('19.99');
    await input('vat').fill('21');
    assert.match(await page.locator('#live-total').innerText(), /72\.56/);
    await page.evaluate(() => BTPlatform.flush());
    const draftId = (await state()).workingDraft.id;
    await u.adb('shell', 'settings', 'put', 'system', 'accelerometer_rotation', '0');
    await u.adb('shell', 'settings', 'put', 'system', 'user_rotation', '1');
    await page.waitForFunction(() => innerHeight > innerWidth);
    assert.equal((await state()).workingDraft.id, draftId);
    assert.equal(await input('price').inputValue(), '19.99');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await u.screenshot('tablet-portrait');
    await u.adb('shell', 'settings', 'put', 'system', 'user_rotation', '0');
    await page.waitForFunction(() => innerWidth > innerHeight);
    await u.screenshot('tablet-landscape');
    pass('Manual quantity/price/VAT calculation and portrait/landscape rotation preserve the draft');

    await act('next');
    await page.locator('[data-field="notes"]').fill('Android offline QA / Č Ž Ş ğ');
    await act('next');
    await act('issue-doc');
    assert.equal((await state()).docs.length, 1);
    assert.equal((await state()).docs[0].status, 'open');
    await page.evaluate(() => BTPlatform.flush());
    const mirror = JSON.parse(await u.adb('shell', 'run-as', 'com.btsouvenirs.tablet', 'cat', 'files/records-current.json'));
    assert.equal(JSON.parse(mirror.payload).docs[0].items[0].price, 19.99);
    pass('Issued document reaches localStorage and the real atomic Android private mirror');

    await act('print-doc');
    await page.locator('.invoice-logo').evaluate(image => image.decode());
    await u.screenshot('a4-preview');
    await act('save-pdf');
    await page.waitForTimeout(1500);
    const nodes = await u.dump('pdf-dialog');
    await u.screenshot('pdf-dialog');
    console.log(JSON.stringify(nodes.filter(node => node.text || node['content-desc']).map(node => ({ text: node.text, id: node['resource-id'], description: node['content-desc'], bounds: node.bounds })), null, 2));
    await fs.writeFile(path.join(u.OUT, 'results-progress.json'), JSON.stringify({ results }, null, 2));
  } catch (error) {
    await u.screenshot('failure').catch(() => {});
    await fs.writeFile(path.join(u.OUT, 'results.json'), JSON.stringify({ passed: false, results, error: error.stack }, null, 2));
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
