// assets-js/main.js

import { findTools } from "./lib/finder.js";
import { renderFinderResults } from "./components/finder.js";

async function initFinder() {
  const form = document.querySelector("[data-luvent-finder]");
  const resultsEl = document.querySelector("[data-luvent-finder-results]");
  if (!form || !resultsEl) return;

  let tools = null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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

initFinder();
