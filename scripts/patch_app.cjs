/* Integrate the current supplied app by syntax ranges, preserving its business data. */
const fs = require('node:fs');
const path = require('node:path');
const acorn = require('acorn');
const target = path.join(__dirname, '../app/src/main/assets/app.js');
let source = fs.readFileSync(target, 'utf8');
function body() { return acorn.parse(source, { ecmaVersion: 'latest' }).body[0].expression.callee.body.body; }
function fn(name) { const n = body().find(n => n.type === 'FunctionDeclaration' && n.id.name === name); if (!n) throw Error('Missing function: ' + name); return n; }
function get(name) { const n = fn(name); return source.slice(n.start, n.end); }
function set(name, text) { const n = fn(name); source = source.slice(0, n.start) + text + source.slice(n.end); }
function replace(old, next, count = 1) { const actual = source.split(old).length - 1; if (actual !== count) throw Error(`Expected ${count}, found ${actual}: ${old.slice(0,100)}`); source = source.replaceAll(old, next); }
source = source.replaceAll('unreadableData', 'recoveryRaw');
const start = body().find(n => n.type === 'VariableDeclaration' && n.declarations.some(d => d.id.name === 'storageOk')).start;
const end = fn('stripCatalogPrices').start;
source = source.slice(0, start) + fs.readFileSync(path.join(__dirname, 'tablet-startup.txt'), 'utf8') + source.slice(end);
const adapters = fs.readFileSync(path.join(__dirname, 'tablet-adapters.js'), 'utf8');
for (const n of acorn.parse(adapters, { ecmaVersion: 'latest' }).body) {
  if (n.type !== 'FunctionDeclaration') continue;
  const text = adapters.slice(n.start,n.end);
  if (body().some(node => node.type === 'FunctionDeclaration' && node.id.name === n.id.name)) set(n.id.name,text);
  else source = source.replace('  function render() {', text + '\n  function render() {');
}
set('download', `function download(filename, text, type = "application/json") {
  if (BTPlatform.native) { BTPlatform.saveText(filename, text).catch(error => toast(error.message)); return; }
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}`);
set('preview', `function preview(doc = current()) {
  previewingDoc = doc;
  document.body.classList.add("preview-open");
  const problem = validateDoc(doc, "open");
  const layer = document.getElementById("print-layer"); layer.classList.remove("hide");
  layer.innerHTML = \`<div class="modal wide" role="dialog" aria-modal="true" aria-label="A4 issue slip preview">
    <div class="modal-head"><h2>A4 preview · ISSUE SLIP \${safe(doc.number)}</h2><button class="btn icon" data-action="close-preview" aria-label="Close preview">×</button></div>
    \${problem ? \`<div class="note preview-warning" style="margin:10px 20px">\${safe(problem)}</div>\` : ""}
    <div class="preview-frame"><div class="paper-wrapper">\${paperHtml(doc)}</div></div>
    <div class="modal-foot"><button class="btn" data-action="close-preview">Close</button><button class="btn" data-action="save-pdf" \${problem ? "disabled" : ""}>Save PDF</button><button class="btn" data-action="share-pdf" \${problem ? "disabled" : ""}>Share PDF</button><button class="btn primary" data-action="print" \${problem ? "disabled" : ""}>Print</button></div></div>\`;
  requestAnimationFrame(fitPreview);
}`);
set('closePreview', get('closePreview').replace('previewingDoc = null;', 'previewingDoc = null; document.body.classList.remove("preview-open");'));
set('togglePage', get('togglePage').replace('    render();','    checkpoint();\n    render();'));
for (const name of ['startNew','duplicateDoc']) set(name, get(name).replace(/\{/, '{\n    if (!canReplaceDraft()) return;'));
set('openDoc', get('openDoc').replace(/\{/, '{\n    if (ui.draft?.id !== id && !canReplaceDraft()) return;'));
set('saveDoc', get('saveDoc').replace('db.workingDraft = null;\n    if (!persist()) {', 'const previousWorkspace = db.workspaceState;\n    db.workingDraft = null;\n    db.workspaceState = { page: "slips", step: 0, editId: null };\n    if (!persist()) {\n      db.workspaceState = previousWorkspace;'));
replace('d.items.some((it) => it.price == null || it.price === "") ? "Price pending" : d.items.length ? money(t.gross, d.currency) : "—"', 'summaryLabel(d)');
set('syncSummary', get('syncSummary').replace(/summaryTotal\.textContent = d\.items\.some\([\s\S]*?: "—";/, 'summaryTotal.textContent = summaryLabel(d);'));
set('itemRows', get('itemRows').replace(/const value =[\s\S]*?;\n/, 'const value = BTData.lineError(it) ? null : lineTotals(it).gross;\n'));
replace('type="number" min="0" step="0.01" data-item=', 'type="number" inputmode="decimal" min="0" step="0.01" data-item=', 2);
replace('type="number" min="0" max="100" step="0.01" data-item=', 'type="number" inputmode="decimal" min="0" max="100" step="0.01" data-item=');
let action = get('act');
const ps = action.indexOf('case "print":'), pe = action.indexOf('case "save-draft":', ps);
if (ps < 0 || pe < 0) throw Error('Output actions unavailable');
action = action.slice(0,ps) + 'case "print": outputDocument("print"); break;\ncase "save-pdf": outputDocument("pdf"); break;\ncase "share-pdf": outputDocument("share"); break;\ncase "share-doc": { const doc = db.docs.find(d=>d.id===id); if(doc) { preview(doc); outputDocument("share"); } break; }\n' + action.slice(pe);
action = action.replace('document.getElementById("backup-upload").click();', 'if (BTPlatform.native) openNativeImport("json"); else document.getElementById("backup-upload").click();');
action = action.replace('document.getElementById("xml-upload").click();', 'if (BTPlatform.native) openNativeImport("xml"); else document.getElementById("xml-upload").click();');
const rs = action.indexOf('const previous = db,'), re = action.indexOf('toast("Local database reset.");', rs);
if (rs < 0 || re < 0) throw Error('Reset action unavailable');
action = action.slice(0,rs) + 'if (replaceDatabase(initial())) { ui.page = "editor"; checkpoint(); render(); }\n' + action.slice(re);
action = action.replace('case "import-backup":', 'case "export-customers": download(`bt-customers-${today()}.json`, BTCustomers.encode(db.customers)); break;\ncase "import-customers": if (BTPlatform.native) openNativeImport("customers"); else document.getElementById("customer-upload").click(); break;\ncase "import-backup":');
set('act', action);
set('docRows', get('docRows').replace('>Copy</button>', '>Copy</button><button class="btn small" data-action="share-doc" data-id="${safe(d.id)}">Share</button>'));
set('customersPage', get('customersPage').replace('data-action="import-xml">Import XML</button>', 'data-action="import-customers">↑ Import customer book</button><button class="btn" data-action="export-customers">↓ Export customer book</button>').replace('customers · addresses imported from mPOHODA XML.', 'customers · Import XML / customer-book JSON, or export all customers and delivery addresses.'));
const tailAt = source.search(/\n  document\s*\.getElementById\("backup-upload"\)/);
if (tailAt < 0) throw Error('Upload/startup range unavailable');
source = source.slice(0,tailAt) + '\n' + fs.readFileSync(path.join(__dirname,'tablet-tail.txt'),'utf8');
let render = get('render'); render = render.slice(0,render.lastIndexOf('}')) + 'decorateTables();\n}'; set('render',render);
source = source.replace('  function render() {', `function decorateTables() {
  document.querySelectorAll(".data-table, .item-grid").forEach(table => {
    const labels = [...table.querySelectorAll("thead th")].map(cell => cell.textContent.trim());
    table.querySelectorAll("tbody tr").forEach(row => [...row.children].forEach((cell,i) => { if (cell.colSpan === 1) cell.dataset.label = labels[i] || ""; }));
  });
}
  function render() {`);
source = source.replace('      return;\n    }\n    if (x.id === "product-search")', '      decorateTables();\n      return;\n    }\n    if (x.id === "product-search")');
source = source.replace('window.BTApp = {', 'const previewResizeObserver = new ResizeObserver(fitPreview);\npreviewResizeObserver.observe(document.getElementById("print-layer"));\nwindow.addEventListener("resize", fitPreview);\nwindow.BTApp = {');
source = source.replace('(() => {', 'BTPlatform.ready.then(() => {').replace(/\}\)\(\);\s*$/, '});\n');
acorn.parse(source, { ecmaVersion: 'latest' });
fs.writeFileSync(target,source);
console.log('Native adapters applied to the current repaired HTML.');
