(async () => {
  "use strict";
  function signal(value) {
    if (window.BTPrintReady) BTPrintReady.postMessage(JSON.stringify(value));
    window.BTPrintStatus = value;
  }
  try {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
    const container = document.getElementById("document");
    const original = container.querySelector(".paper");
    const sourceRows = [...original.querySelector(".lines tbody").children].filter(row => !row.classList.contains("p-source"));
    const template = original.cloneNode(true);
    const pages = [];
    let cursor = 0;
    container.replaceChildren();
    do {
      if (pages.length >= 200) throw Error("The document exceeds 200 A4 pages. Split it into smaller slips.");
      const page = template.cloneNode(true);
      const body = page.querySelector(".lines tbody");
      [...body.children].forEach(row => { if (!row.classList.contains("p-source")) row.remove(); });
      container.append(page);
      if (page.scrollHeight > page.clientHeight + 1) throw Error("The document header or notes are too large for A4. Shorten them before printing.");
      let added = 0;
      while (cursor < sourceRows.length) {
        const row = sourceRows[cursor].cloneNode(true);
        body.append(row);
        if (page.scrollHeight > page.clientHeight + 1) {
          row.remove();
          if (!added) throw Error("One item is too large for an A4 page. Shorten its description.");
          break;
        }
        cursor++;
        added++;
      }
      pages.push(page);
    } while (cursor < sourceRows.length);
    pages.forEach((page, index) => {
      if (index < pages.length - 1) {
        page.querySelectorAll(".lines tfoot, .big-total, .p-issuer, .recap, .p-signatures").forEach(element => element.remove());
      }
      const footer = page.querySelector(".p-last span:last-child");
      footer.textContent += ` · ${index + 1} / ${pages.length}`;
    });
    window.BTSharePage = index => {
      pages.forEach((page, i) => { page.style.display = i === index ? "flex" : "none"; });
      window.scrollTo(0, 0);
      return document.body.offsetHeight;
    };
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    signal({ pages: pages.length, pageWidth: pages[0].getBoundingClientRect().width,
      pageHeight: pages[0].getBoundingClientRect().height, offsets: pages.map(page => page.offsetTop) });
  } catch (error) { signal({ error: error.message }); }
})();
