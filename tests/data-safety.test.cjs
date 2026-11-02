const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'app/src/main/assets/data-safety.js'), 'utf8'), sandbox);
const safety = sandbox.window.BTData;
const valid = () => ({ version: 4, settings: {}, customers: [{ id: 'c1', name: 'Český zákazník', shipToAddresses: [] }], products: [], categories: [], docs: [] });
const line = () => ({ id: 'i1', name: 'Manual price', qty: 3, price: 19.99, vat: 21 });

test('blank prices, invalid quantities and VAT cannot be issued', () => {
  for (const value of [null, undefined, '', 'invalid', -1, Infinity]) assert.ok(safety.lineError({ ...line(), price: value }));
  for (const value of [null, '', 0, -1, 'invalid', Infinity]) assert.ok(safety.lineError({ ...line(), qty: value }));
  for (const value of [null, '', -1, 101, 'invalid', Infinity]) assert.ok(safety.lineError({ ...line(), vat: value }));
  assert.equal(safety.lineError({ ...line(), price: 0, vat: 0 }), null);
});
test('unsafe amounts cannot silently overflow cents', () => {
  assert.ok(safety.lineError({ ...line(), qty: 1e20 }));
});
test('malformed backup data is rejected before replacement', () => {
  for (const data of [null, {}, { ...valid(), version: 3 }, { ...valid(), docs: [null] }, { ...valid(), customers: [null] },
    { ...valid(), customers: [{ id: 'same', name: 'A' }, { id: 'same', name: 'B' }] },
    { ...valid(), customers: [{ id: 'c1', name: 'A', shipToAddresses: [null] }] }]) assert.throws(() => safety.validateDatabase(data));
});
test('working drafts allow temporarily blank inputs while edited issued documents remain recoverable', () => {
  const data = valid();
  data.workingDraft = { id: 'd1', number: '20260001', currency: 'EUR', status: 'open', items: [{ ...line(), qty: null, price: null }] };
  assert.equal(safety.validateDatabase(data), data);
  data.docs = [data.workingDraft];
  assert.throws(() => safety.validateDatabase(data));
});
test('malformed dates, settings and duplicate line IDs cannot poison a restored database', () => {
  const doc = { id: 'd1', number: '20260001', currency: 'EUR', status: 'draft', items: [line()], issueDate: '2026-10-26' };
  for (const data of [
    { ...valid(), docs: [{ ...doc, issueDate: 42 }] },
    { ...valid(), docs: [{ ...doc, items: [line(), line()] }] },
    { ...valid(), settings: { nextNumber: -1 } },
    { ...valid(), settings: { defaultCurrency: 'unknown' } },
    { ...valid(), settings: { rates: { EUR: 0 } } },
  ]) assert.throws(() => safety.validateDatabase(data));
});
test('the supplied original HTML and logo are retained byte-for-byte', () => {
  const crypto = require('node:crypto');
  const info = JSON.parse(fs.readFileSync(path.join(root, 'original/source-integrity.json'), 'utf8'));
  const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  assert.equal(hash('original/YunusEmre.html'), info.sha256);
  assert.equal(hash('app/src/main/assets/bt-souvenirs-logo.jpg'), info.logoSha256);
  const original = fs.readFileSync(path.join(root, 'original/YunusEmre.html'), 'utf8');
  const current = fs.readFileSync(path.join(root, 'app/src/main/assets/app.js'), 'utf8');
  for (const marker of ['CUSTOMERS', 'categories0', 'seedProducts', 'baseSettings']) {
    const expression = new RegExp(`const ${marker} = [\\s\\S]*?;`);
    const normalize = text => text?.replace(/\r\n/g, '\n');
    assert.equal(normalize(current.match(expression)?.[0]), normalize(original.match(expression)?.[0]), `${marker} preserved`);
  }
});
