(() => {
  "use strict";
  const object = value => value && typeof value === "object" && !Array.isArray(value);
  const numeric = value => value !== null && value !== undefined && String(value).trim() !== "" &&
    Number.isFinite(Number(String(value).replace(",", ".")));
  const numericValue = value => Number(String(value).replace(",", "."));
  function lineError(item) {
    if (!object(item) || typeof item.name !== "string" || !item.name.trim()) return "Every line needs a description.";
    if (!numeric(item.qty) || numericValue(item.qty) <= 0) return "Enter a quantity greater than zero for every item.";
    if (!numeric(item.price) || numericValue(item.price) < 0) return "Enter a unit price for every item (0 is allowed).";
    if (!numeric(item.vat) || numericValue(item.vat) < 0 || numericValue(item.vat) > 100) return "VAT must be between 0 and 100%.";
    if (!Number.isSafeInteger(Math.round(numericValue(item.qty) * numericValue(item.price) * (1 + numericValue(item.vat) / 100) * 100)))
      return "An amount is too large. Check the quantity and price.";
    return null;
  }
  function validateDatabase(data) {
    if (!object(data) || data.version !== 4 || !object(data.settings)) throw Error("Unsupported backup format (version 4 required).");
    const settings = data.settings;
    for (const key of ["company", "prefix", "street", "postal", "city", "country", "issuer", "notes", "footer"]) {
      if (settings[key] !== undefined && typeof settings[key] !== "string") throw Error(`Invalid setting: ${key}.`);
    }
    if (settings.defaultCurrency !== undefined && !["EUR", "CZK", "USD", "GBP"].includes(settings.defaultCurrency))
      throw Error("Unsupported default currency.");
    if (settings.nextNumber !== undefined && (!Number.isSafeInteger(Number(settings.nextNumber)) || Number(settings.nextNumber) < 1))
      throw Error("Invalid next document number.");
    if (settings.rates !== undefined && (!object(settings.rates) || Object.values(settings.rates).some(rate => !numeric(rate) || numericValue(rate) <= 0)))
      throw Error("Exchange rates must be positive numbers.");
    for (const key of ["customers", "products", "categories", "docs"]) {
      if (!Array.isArray(data[key])) throw Error(`Invalid ${key} list.`);
      const ids = new Set();
      for (const entry of data[key]) {
        if (!object(entry) || typeof entry.id !== "string" || !entry.id || ids.has(entry.id)) throw Error(`Invalid or duplicate ID in ${key}.`);
        ids.add(entry.id);
        if (key !== "docs" && typeof entry.name !== "string") throw Error(`Invalid name in ${key}.`);
        if (key === "products" && entry.vat !== undefined && (!numeric(entry.vat) || numericValue(entry.vat) < 0 || numericValue(entry.vat) > 100))
          throw Error("Invalid catalog VAT.");
        if (key === "customers" && entry.shipToAddresses !== undefined &&
          (!Array.isArray(entry.shipToAddresses) || entry.shipToAddresses.some(a => !object(a) || typeof a.id !== "string")))
          throw Error("Invalid delivery addresses.");
      }
    }
    function document(doc, complete = true) {
      if (!object(doc) || typeof doc.id !== "string" || typeof doc.number !== "string" || !Array.isArray(doc.items))
        throw Error("Invalid issue slip or working draft.");
      if (!["EUR", "CZK", "USD", "GBP"].includes(doc.currency)) throw Error("Unsupported document currency.");
      for (const key of ["issueDate", "orderDate"]) {
        if (doc[key] != null && typeof doc[key] !== "string") throw Error("Invalid document date.");
      }
      const lineIds = new Set();
      for (const item of doc.items) {
        if (!object(item) || typeof item.id !== "string" || typeof item.name !== "string") throw Error("Invalid document line.");
        if (!item.id || lineIds.has(item.id)) throw Error("Invalid or duplicate document line ID.");
        lineIds.add(item.id);
        for (const key of ["qty", "price", "vat"]) {
          if (item[key] != null && item[key] !== "" && !numeric(item[key])) throw Error(`Invalid ${key} in a document line.`);
        }
        if (complete && doc.status === "open") { const error = lineError(item); if (error) throw Error(error); }
      }
    }
    data.docs.forEach(doc => document(doc));
    if (data.workingDraft != null) document(data.workingDraft, false);
    return data;
  }
  window.BTData = { numeric, lineError, validateDatabase };
})();
