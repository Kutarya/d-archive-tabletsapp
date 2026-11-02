"""Import the supplied HTML without changing the source; retain exact original data."""
from pathlib import Path
import base64
import hashlib
import json
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\yunus\OneDrive\Desktop\BT SV\YunusEmre.html")
if not SOURCE.exists():
    SOURCE = ROOT / "original/YunusEmre.html"
ASSETS = ROOT / "app/src/main/assets"
ASSETS.mkdir(parents=True, exist_ok=True)
(ROOT / "original").mkdir(exist_ok=True)
if SOURCE.resolve() != (ROOT / "original/YunusEmre.html").resolve():
    shutil.copy2(SOURCE, ROOT / "original/YunusEmre.html")
html = SOURCE.read_text(encoding="utf-8")
css = re.search(r"<style>([\s\S]*?)</style>", html).group(1)
js = re.search(r"<script>([\s\S]*?)</script>", html).group(1)
logo = re.search(r'id="sidebar-brand-logo"[^>]*src="data:image/jpeg;base64,([^\"]+)"', html).group(1)
(ASSETS / "bt-souvenirs-logo.jpg").write_bytes(base64.b64decode(logo))
js = re.sub(r'const BRAND_LOGO = "data:image/jpeg;base64,[^"]+";', 'const BRAND_LOGO = "bt-souvenirs-logo.jpg";', js)
html = re.sub(r'<link rel="icon"[^>]*>', '<link rel="icon" href="bt-souvenirs-logo.jpg">', html, count=1)
html = re.sub(r'(id="sidebar-brand-logo"[^>]*src=")[^"]+', r'\1bt-souvenirs-logo.jpg', html, count=1)
html = re.sub(r"<style>[\s\S]*?</style>", '<link rel="stylesheet" href="styles.css">\n<link rel="stylesheet" href="tablet.css">', html)
html = re.sub(r"<script>[\s\S]*?</script>", '<script src="platform.js"></script>\n<script src="data-safety.js"></script>\n<script src="customer-book.js"></script>\n<script src="app.js"></script>', html)
html = html.replace('<script src="platform.js">', '<input type="file" id="customer-upload" class="file-input" accept="application/json,application/xml,text/xml,.json,.xml">\n<script src="platform.js">')
csp = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"
html = html.replace('<meta charset="utf-8" />', '<meta charset="utf-8" />\n<meta http-equiv="Content-Security-Policy" content="' + csp + '">')
(ASSETS / "styles.css").write_text(css, encoding="utf-8")
(ASSETS / "app.js").write_text(js, encoding="utf-8")
(ASSETS / "index.html").write_text(html, encoding="utf-8")
(ROOT / "original/source-integrity.json").write_text(json.dumps({
    "source": str(SOURCE), "sha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    "logoSha256": hashlib.sha256(base64.b64decode(logo)).hexdigest(),
    "note": "Original HTML preserved byte-for-byte. Customer and catalog declarations retained in assets/app.js."
}, indent=2), encoding="utf-8")
print("Original preserved; HTML, CSS, JS and original logo extracted.")
subprocess.run(['node', str(ROOT / 'scripts/patch_app.cjs')], cwd=ROOT, check=True)
