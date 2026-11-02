/* Small, origin-scoped Android adapter. The application remains usable in a desktop browser. */
(() => {
  "use strict";
  const native = !!window.BTNative?.postMessage;
  const waiting = new Map();
  let serial = 0;
  const instance = Math.random().toString(36).slice(2);
  function request(action, payload = {}) {
    if (!native) return Promise.reject(new Error("Android integration is unavailable."));
    return new Promise((resolve, reject) => {
      const id = `${instance}-${++serial}`;
      const timer = ["loadState", "saveState"].includes(action) ? setTimeout(() => {
        waiting.delete(id);
        reject(new Error("The private record copy did not respond. Local records are retained."));
      }, action === "loadState" ? 8000 : 30000) : null;
      waiting.set(id, { resolve, reject, timer });
      try { BTNative.postMessage(JSON.stringify({ id, action, payload })); }
      catch (error) { waiting.delete(id); reject(error); }
    });
  }
  let queuedState = null;
  let writing = null;
  async function flush() {
    if (writing) { await writing; if (queuedState) return flush(); return; }
    if (!native || queuedState === null) return;
    const text = queuedState;
    queuedState = null;
    writing = request("saveState", { text });
    try { await writing; }
    catch (error) {
      window.dispatchEvent(new CustomEvent("bt-storage-error", { detail: error.message }));
      throw error;
    } finally { writing = null; }
    if (queuedState !== null) return flush();
  }
  window.BTPlatform = {
    native,
    snapshot: null,
    startupError: null,
    receive(message) {
      const pending = waiting.get(message.id);
      if (!pending) return;
      waiting.delete(message.id);
      clearTimeout(pending.timer);
      if (message.error) pending.reject(new Error(message.error));
      else pending.resolve(message.value);
    },
    saveState(text) {
      if (!native) return;
      queuedState = text;
      flush().catch(() => {});
    },
    flush,
    saveText(name, text) { return request("saveText", { name, text }); },
    openText(kind) { return request("openText", { kind }); },
    document(mode, html, name) { return request(mode, { html: html.trim(), name }); },
  };
  BTPlatform.ready = native
    ? request("loadState").then(result => { BTPlatform.snapshot = result.snapshot; })
        .catch(error => { BTPlatform.startupError = error.message; })
    : Promise.resolve();
})();
