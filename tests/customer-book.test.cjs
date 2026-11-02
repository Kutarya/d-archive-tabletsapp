const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const sandbox = { window: {} };
for (const name of ['data-safety.js', 'customer-book.js']) {
  if (name === 'customer-book.js') sandbox.BTData = sandbox.window.BTData;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../app/src/main/assets', name), 'utf8'), sandbox);
}
const book = sandbox.window.BTCustomers;
const customer = () => ({ id: 'c1', externalId: 'external-1', name: 'Yunus & Emre', vatId: 'CZ-1', phone: '+420 123', shipToAddresses: [{ id: 'a1', name: 'Warehouse', street: 'Street 1', city: 'Praha' }] });
test('customer book round trip retains all contacts and delivery addresses, and excludes invoices', () => {
  const raw = book.encode([customer()]);
  assert.deepEqual(JSON.parse(JSON.stringify(book.decode(raw))), [customer()]);
  assert.equal('docs' in JSON.parse(raw), false);
  assert.equal('settings' in JSON.parse(raw), false);
});
test('merging is cumulative, keeps local customer/address IDs and does not erase known contact data', () => {
  const before = [customer(), { id: 'c2', name: 'Retained customer', shipToAddresses: [] }];
  const incoming = [{ ...customer(), id: 'remote-id', phone: '', city: 'Brno', shipToAddresses: [{ id: 'a2', name: 'Second warehouse', city: 'Brno' }] }];
  const result = book.merge(before,incoming);
  assert.equal(result.customers.length, 2); assert.equal(result.added, 0); assert.equal(result.updated, 1);
  assert.equal(result.customers[0].id, 'c1'); assert.equal(result.customers[0].phone, '+420 123');
  assert.equal(result.customers[0].shipToAddresses.length, 2);
  assert.equal(before[0].shipToAddresses.length, 1);
  assert.equal(book.merge(result.customers,incoming).customers[0].shipToAddresses.length, 2);
});
test('new customers accumulate while malformed/duplicate input is rejected before merge', () => {
  assert.equal(book.merge([customer()],[{ id: 'new', name: 'New customer' }]).customers.length, 2);
  for (const value of [null, {}, { format: 'bt-souvenirs-customers', version: 1, customers: [null] }, { format: 'bt-souvenirs-customers', version: 1, customers: [customer(), customer()] }]) assert.throws(() => book.decode(JSON.stringify(value)));
});
