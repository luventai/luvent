// components/finder.js
// Renders Finder's output. Blueprint Ch.6: never just three tools —
// always the "we recommend these because..." reasoning too.
import { escapeHtml } from "../lib/seo.js";
import { renderToolCard } from "./tool-card.js";
import { renderLogoLoader } from "./logo.js";

// Used by assets-js/main.js while Finder is fetching data.json /
// scoring matches, instead of a generic spinner.
export function renderFinderLoading() {
  return renderLogoLoader({ label: "Finding your matches" });
}

/**
 * @param {Array<{tool, score, reasons}>} matches - output of lib/finder.js findTools()
 */
export function renderFinderResults(matches) {
  return `
    <section class="finder-results">
      <div class="container">
        <h2>We recommend these because…</h2>
        <div class="finder-results__list">
          ${matches.map(renderFinderMatch).join("\n")}
        </div>
      </div>
    </section>
  `;
}

function renderFinderMatch({ tool, reasons }) {
  return `
    <div class="finder-match">
      ${renderToolCard(tool)}
      <ul class="finder-match__reasons">
        ${reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("\n")}
      </ul>
    </div>
  `;
}

// Static shell for the Finder question form itself (progressively
// enhanced client-side by assets/js/finder.js).
export function renderFinderForm() {
  return `
    <section class="finder-form section">
      <div class="container">
        <h2>Find your AI tool</h2>
        <form data-luvent-finder>
          <label>
            What do you need it for?
            <select name="category">
              <option value="writing">Writing</option>
              <option value="image">Image generation</option>
              <option value="coding">Coding</option>
              <option value="video">Video</option>
            </select>
          </label>
          <label>
            Budget
            <select name="budget">
              <option value="free">Free only</option>
              <option value="paid-ok">Paid is fine</option>
            </select>
          </label>
          <label>
            Top priority
            <select name="priority">
              <option value="ease-of-use">Ease of use</option>
              <option value="value-for-money">Value for money</option>
              <option value="features">Features</option>
              <option value="support">Support</option>
            </select>
          </label>
          <button class="btn btn-primary" type="submit">Show my matches</button>
        </form>
        <div data-luvent-finder-results></div>
      </div>
    </section>
  `;
}
