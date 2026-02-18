(function () {
  function isSpanishPath(pathname) {
    return pathname === "/es" || pathname.startsWith("/es/");
  }

  function counterpartPath(pathname, targetLang) {
    if (targetLang === "es") {
      return isSpanishPath(pathname) ? pathname : ("/es" + pathname);
    }
    // target en
    return isSpanishPath(pathname) ? pathname.replace(/^\/es(\/|$)/, "/") : pathname;
  }

  function getLangFromDoc() {
    const htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang && htmlLang.toLowerCase().startsWith("es")) return "es";
    return "en";
  }

  function setPref(lang) {
    try { localStorage.setItem("prefLang", lang); } catch (_) {}
  }
  function getPref() {
    try { return localStorage.getItem("prefLang"); } catch (_) { return null; }
  }

  function attemptAutoRedirect() {
    const pref = getPref();
    if (!pref) return;
    const current = getLangFromDoc();
    if (pref === current) return;

    const target = counterpartPath(location.pathname, pref);
    // Avoid infinite loops on 404: only redirect if it's a different path.
    if (target && target !== location.pathname) {
      // Preserve hash/query.
      location.replace(target + location.search + location.hash);
    }
  }

  function wireToggle() {
    const btn = document.querySelector("[data-lang-toggle]");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = getLangFromDoc();
      const targetLang = current === "en" ? "es" : "en";
      setPref(targetLang);
      const target = counterpartPath(location.pathname, targetLang);
      location.href = target + location.search + location.hash;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    attemptAutoRedirect();
    wireToggle();
  });
})();
