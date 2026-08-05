// assets-js/main.js
// Progressive enhancement only. The site fully works with zero JS
// (the Finder form submits to /search.html, a real static page with
// pre-computed default results). This script upgrades that into an
// instant, no-reload experience.
//
// Requirement 12 ("no duplicated JavaScript"): this file does NOT
// re-implement the Finder scoring logic. It imports the exact same
// lib/finder.js and components/finder.js used server-side at build
// time (copied verbatim into /js by build.js's copyAssets()). One
// implementation, used in two places.
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
      const res = await fetch("/data.json");
      tools = await res.json();
    }
    const answers = Object.fromEntries(new FormData(form).entries());
    const matches = findTools(tools, answers);
    resultsEl.innerHTML = renderFinderResults(matches);
  });
}

initFinder();
