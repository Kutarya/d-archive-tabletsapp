function persist() {
          if (storageLocked) {
            toast("Storage is protected. Export the recovery file or restore a valid backup first.");
            return false;
          }
          stripCatalogPrices(db);
          const previousSavedAt = db.savedAt;
          db.savedAt = new Date().toISOString();
          try {
            const serialized = JSON.stringify(db);
            localStorage.setItem(STORE, serialized);
            BTPlatform.saveState(serialized);
            storageOk = true;
            document.getElementById("storage-indicator").textContent = "● Saved on device";
            if (!storageLocked) document.getElementById("save-failure-warning")?.remove();
            return true;
          } catch (error) {
            db.savedAt = previousSavedAt;
            storageOk = false;
            document.getElementById("storage-indicator").textContent = "● Save failed · export backup";
            let warning = document.getElementById("save-failure-warning");
            if (!warning) {
              warning = document.createElement("div");
              warning.id = "save-failure-warning";
              warning.className = "storage-warning";
              warning.innerHTML = '<p>Changes could not be saved. Keep this app open and export a JSON backup.</p><button class="btn" data-action="export-backup">Export JSON backup</button>';
              document.querySelector(".main").prepend(warning);
            }
            toast("Storage failed. Your work is still open. Export a JSON backup before closing the app.");
            return false;
          }
        }

function rememberWork() {
          db.workingDraft = clone(current());
          db.workspaceState = { page: ui.page, step: ui.step, editId: ui.editId };
          return persist();
        }

function checkpoint() {
          if (storageLocked) return false;
          if (ui.draft) db.workingDraft = clone(ui.draft);
          db.workspaceState = { page: ui.page, step: ui.step, editId: ui.editId };
          return persist();
        }

function canReplaceDraft() {
          const d = ui.draft;
          if (!d || (!d.customerId && !d.items.length && !d.notes)) return true;
          const saved = db.docs.find(doc => doc.id === d.id);
          if (saved && JSON.stringify(saved) === JSON.stringify(d)) return true;
          return window.confirm("Replace the current working draft? Save it first if you want to keep it as a separate document.");
        }

function validateDoc(d, mode = "draft") {
          if (typeof d.number !== "string" || !d.number.trim()) return "Document number is required.";
          if (!d.issueDate || !/^\d{4}-\d{2}-\d{2}$/.test(d.issueDate)) return "Issue date is required.";
          if (mode === "open") {
            if (!d.customerId && !d.customerSnapshot) return "Select a customer first.";
            if (!d.items.length) return "Add at least one product.";
            if (!["EUR", "CZK", "USD", "GBP"].includes(d.currency)) return "Select a supported currency.";
            if (!BTData.numeric(d.exchange) || num(d.exchange) <= 0) return "Enter an exchange rate greater than zero.";
            for (const item of d.items) { const error = BTData.lineError(item); if (error) return error; }
            if (!Number.isSafeInteger(Math.round(totals(d).gross * 100))) return "The total is too large. Check item amounts.";
          }
          if (db.docs.some(x => x.number === d.number && x.id !== d.id)) return "This document number is already used.";
          return null;
        }

function fitPreview() {
          const frame = document.querySelector("#print-layer .preview-frame");
          const paper = frame?.querySelector(".paper");
          if (!frame || !paper) return;
          frame.style.setProperty("--preview-scale", Math.min(1, Math.max(.2, (frame.clientWidth - 28) / 793.7)));
        }

async function outputDocument(mode) {
          const d = previewingDoc;
          if (!d) return;
          const error = validateDoc(d, "open");
          if (error) { toast(error); return; }
          if (!BTPlatform.native) { window.print(); return; }
const buttons = [...document.querySelectorAll('#print-layer [data-action="print"], #print-layer [data-action="save-pdf"], #print-layer [data-action="share-pdf"]')];
          buttons.forEach(button => button.disabled = true);
          try {
            await BTPlatform.flush();
            const result = await BTPlatform.document(mode, paperHtml(d), `issue-slip-${d.number}.pdf`);
            if (result.shareOpened) toast("Choose WhatsApp or another app to share the PDF.");
            else if (result.dialogOpened) toast("Android print dialog opened. Select your printer or Save as PDF.");
            else if (result.cancelled) toast("Save cancelled. Your document is still available.");
            else if (result.saved) toast("PDF saved to your selected location.");
          } catch (error) { toast(error.message); }
          finally { buttons.forEach(button => button.disabled = false); }
        }

function summaryLabel(d) {
          if (d.items.some(item => item.price == null || item.price === "")) return "Price pending";
          if (d.items.some(item => BTData.lineError(item))) return "Check amounts";
          return d.items.length ? money(totals(d).gross, d.currency) : "—";
        }
