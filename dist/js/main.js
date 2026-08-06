// assets-js/main.js

import { findTools } from "./lib/finder.js";
import { renderFinderResults, renderFinderLoading } from "./components/finder.js";

async function initFinder() {
  const form = document.querySelector("[data-luvent-finder]");
  const resultsEl = document.querySelector("[data-luvent-finder-results]");
  if (!form || !resultsEl) return;

  let tools = null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Animated Luvent mark instead of a generic spinner while we fetch
    // and score matches.
    resultsEl.innerHTML = renderFinderLoading();

    if (!tools) {
      // Fungerar både lokalt och på GitHub Pages
      const base = window.location.pathname.includes("/luvent")
        ? "/luvent/"
        : "/";

      const res = await fetch(base + "data.json");
      tools = await res.json();
    }

    const answers = Object.fromEntries(new FormData(form).entries());
    const matches = findTools(tools, answers);
    resultsEl.innerHTML = renderFinderResults(matches);
  });
}

// Toggles body.is-scrolled once the user scrolls past the hero, so the
// header logo settles down (smaller glow, no idle float) and the hero
// logo shrinks/fades slightly. CSS (components/logo.css) does the
// actual animating — this just flips one class, cheaply, on scroll.
function initScrollBrandState() {
  const THRESHOLD = 120;
  let ticking = false;

  function apply() {
    document.body.classList.toggle("is-scrolled", window.scrollY > THRESHOLD);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    },
    { passive: true }
  );

  apply();
}

// Smooth, native scroll back to top when the header logo is clicked
// while already on the homepage — otherwise it's a normal link.
function initLogoHomeTransition() {
  const homeLogo = document.querySelector(".site-header .luvent-logo");
  if (!homeLogo) return;

  homeLogo.addEventListener("click", (e) => {
    const isHome =
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/luvent/") ||
      window.location.pathname.endsWith("/luvent");
    if (isHome) {
      e.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
}

initFinder();
initScrollBrandState();
initLogoHomeTransition();
