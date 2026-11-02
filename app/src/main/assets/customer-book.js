/* A portable customer book: documents and supplier settings never enter this file. */
(() => {
  "use strict";
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = value => String(value || "").trim().toLocaleLowerCase();
  function validate(customers) {
    BTData.validateDatabase({ version: 4, settings: {}, customers, products: [], categories: [], docs: [] });
    for (const customer of customers) {
      if (!customer.name.trim()) throw Error("Every customer needs a name.");
      for (const field of ["name", "externalId", "street", "postal", "city", "country", "vatId", "registration", "email", "phone", "contact", "currency", "payment"]) {
        if (customer[field] != null && typeof customer[field] !== "string") throw Error(`Invalid customer field: ${field}.`);
      }
      const ids = new Set();
      for (const address of customer.shipToAddresses || []) {
        if (!address.id || ids.has(address.id)) throw Error("Invalid or duplicate delivery address ID.");
        ids.add(address.id);
        for (const value of Object.values(address)) if (value != null && typeof value !== "string") throw Error("Invalid delivery address field.");
      }
    }
    return customers;
  }
  function encode(customers) {
    validate(customers);
    return JSON.stringify({ format: "bt-souvenirs-customers", version: 1, exportedAt: new Date().toISOString(), customers }, null, 2);
  }
  function decode(raw) {
    const data = JSON.parse(raw.replace(/^\uFEFF/, ""));
    if (!data || !((data.format === "bt-souvenirs-customers" && data.version === 1) || data.version === 4)) throw Error("Choose an exported BT Souvenirs customer book or version 4 backup.");
    return clone(validate(data.customers));
  }
  function nonemptyMerge(previous, incoming) {
    const result = { ...previous };
    for (const [key, value] of Object.entries(incoming)) if (value != null && (typeof value !== "string" || value.trim() !== "")) result[key] = value;
    return result;
  }
  function addressKey(address) { return [address.name, address.street, address.postal, address.city, address.country].map(text).join("|"); }
  function merge(existing, incoming) {
    validate(existing); validate(incoming);
    const customers = clone(existing);
    let added = 0, updated = 0;
    for (const entry of incoming) {
      const index = customers.findIndex(old => old.id === entry.id || (entry.externalId && old.externalId === entry.externalId) || (entry.vatId && text(old.vatId) === text(entry.vatId) && text(old.name) === text(entry.name)));
      if (index < 0) { customers.push(clone(entry)); added++; continue; }
      const previous = customers[index];
      const merged = nonemptyMerge(previous, entry);
      merged.id = previous.id;
      const addresses = clone(previous.shipToAddresses || []);
      for (const address of entry.shipToAddresses || []) {
        const match = addresses.findIndex(old => old.id === address.id || addressKey(old) === addressKey(address));
        if (match < 0) addresses.push(clone(address));
        else addresses[match] = { ...nonemptyMerge(addresses[match], address), id: addresses[match].id };
      }
      merged.shipToAddresses = addresses;
      customers[index] = merged; updated++;
    }
    return { customers, added, updated };
  }
  window.BTCustomers = { validate, encode, decode, merge };
})();
