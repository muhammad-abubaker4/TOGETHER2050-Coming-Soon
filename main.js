(() => {
  const page = document.querySelector("[data-reveal]");
  const display = document.querySelector(".display");
  const heroCopy = document.querySelector(".hero-copy");

  if (!page) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fitDisplay = () => {
    if (!display || !heroCopy) return;

    display.style.fontSize = "";

    const available = heroCopy.clientWidth;
    if (available <= 0) return;

    const lines = display.querySelectorAll(".display-line");
    let widest = 0;

    lines.forEach((line) => {
      widest = Math.max(widest, line.scrollWidth);
    });

    if (widest <= available) return;

    const computed = parseFloat(window.getComputedStyle(display).fontSize);
    if (!computed) return;

    const next = Math.floor(computed * (available / widest) * 100) / 100;
    display.style.fontSize = `${Math.max(next, 24)}px`;
  };

  const reveal = () => {
    fitDisplay();
    page.classList.add("is-ready");
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fitDisplay, 100);
  });

  if (reduced || document.fonts === undefined) {
    reveal();
    return;
  }

  document.fonts.ready.then(() => {
    requestAnimationFrame(reveal);
  });
})();
