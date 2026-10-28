(function () {
  function wireModal() {
    const dialog = document.getElementById("dvk-debate");
    const openBtn = document.querySelector("[data-open-debate]");
    const closeBtn = dialog ? dialog.querySelector("[data-close-debate]") : null;

    if (!dialog || !openBtn || !closeBtn) return;

    openBtn.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "open");
    });

    closeBtn.addEventListener("click", () => {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    });

    dialog.addEventListener("click", (e) => {
      // click outside to close
      const rect = dialog.getBoundingClientRect();
      const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
      if (!inDialog) {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", wireModal);
})();
