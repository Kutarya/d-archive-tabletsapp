const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('playwright-core');
const execute = promisify(execFile);
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'artifacts/android');
const SDK = process.env.ANDROID_HOME || path.join(process.env.LOCALAPPDATA, 'Android/Sdk');
const ADB = path.join(SDK, 'platform-tools/adb.exe');
const SERIAL = process.env.BT_ANDROID_SERIAL || 'emulator-5554';
async function adb(...args) {
  const { stdout } = await execute(ADB, ['-s', SERIAL, ...args], { timeout: 45000, maxBuffer: 8 * 1024 * 1024, encoding: 'utf8' });
  return stdout.trim();
}
async function connect() {
  await fs.mkdir(OUT, { recursive: true });
  await adb('shell', 'am', 'start', '-W', '-n', 'com.btsouvenirs.tablet/.MainActivity');
  const pid = await adb('shell', 'pidof', 'com.btsouvenirs.tablet');
  await adb('forward', 'tcp:9222', `localabstract:webview_devtools_remote_${pid}`);
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages().find(page => page.url().endsWith('/assets/index.html'));
  if (!page) throw Error('The packaged Android workspace is not available.');
  page.setDefaultTimeout(12000);
  await page.waitForFunction(() => !!window.BTApp);
  return { browser, page };
}
const decode = text => text.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
async function dump(name = 'window') {
  await adb('shell', 'uiautomator', 'dump', '/sdcard/bt-qa-window.xml');
  const xml = await adb('shell', 'cat', '/sdcard/bt-qa-window.xml');
  await fs.writeFile(path.join(OUT, `${name}.xml`), xml);
  return [...xml.matchAll(/<node\s+([^>]+)>?/g)].map(match => Object.fromEntries(
    [...match[1].matchAll(/([\w-]+)="([^"]*)"/g)].map(entry => [entry[1], decode(entry[2])])
  ));
}
async function tapNode(predicate, name) {
  const nodes = await dump(name || 'before-tap');
  const node = nodes.find(predicate);
  if (!node) throw Error(`Native control not found. ${JSON.stringify(nodes.filter(node => node.text || node['content-desc']).map(node => ({ text: node.text, id: node['resource-id'], description: node['content-desc'] })))}`);
  const bounds = node.bounds.match(/\d+/g).map(Number);
  await adb('shell', 'input', 'tap', String(Math.round((bounds[0] + bounds[2]) / 2)), String(Math.round((bounds[1] + bounds[3]) / 2)));
  return node;
}
async function screenshot(name) {
  const { stdout } = await execute(ADB, ['-s', SERIAL, 'exec-out', 'screencap', '-p'], { timeout: 20000, encoding: 'buffer', maxBuffer: 8 * 1024 * 1024 });
  await fs.writeFile(path.join(OUT, `${name}.png`), stdout);
}
module.exports = { adb, connect, dump, tapNode, screenshot, OUT, ROOT };
