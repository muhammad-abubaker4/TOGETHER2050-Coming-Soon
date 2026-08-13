(() => {
  const page = document.querySelector("[data-reveal]");
  if (!page) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveal = () => {
    page.classList.add("is-ready");
  };

  if (reduced || document.fonts === undefined) {
    reveal();
    return;
  }

  document.fonts.ready.then(() => {
    requestAnimationFrame(reveal);
  });
})();
