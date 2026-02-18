(function () {
  function slugify(str) {
    return (str || "")
      .toLowerCase()
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function buildTOC() {
    const article = document.getElementById("paper-article");
    const toc = document.getElementById("paper-toc");
    if (!article || !toc) return;

    const headings = Array.from(article.querySelectorAll("h2, h3"))
      .filter(h => h.textContent && h.textContent.trim().length);

    if (!headings.length) {
      toc.innerHTML = "<span style='color:var(--muted);font-size:0.92rem;'>No sections</span>";
      return;
    }

    const frag = document.createDocumentFragment();

    headings.forEach(h => {
      if (!h.id) h.id = slugify(h.textContent);
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      a.className = h.tagName.toLowerCase() === "h3" ? "lvl-3" : "lvl-2";
      frag.appendChild(a);
    });

    toc.innerHTML = "";
    toc.appendChild(frag);
  }

  function wireScrollToLab() {
    const btn = document.querySelector("[data-scroll-lab]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const el = document.getElementById("dvk-lab-anchor") || document.getElementById("dvk-lab");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildTOC();
    wireScrollToLab();
  });

  // expose a tiny bridge for "try in lab" buttons in the essay
  window.dvkLoadPreset = function (presetId) {
    const frame = document.getElementById("dvk-lab");
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage({ type: "loadPreset", presetId }, "*");
  };
})();
