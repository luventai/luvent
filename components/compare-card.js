// components/compare-card.js
import { escapeHtml, BASE_PATH } from "../lib/seo.js";

/**
 * @param {Object} comparison - output of lib/compare.js buildComparison()
 */
export function renderCompareCard(comparison) {
  const { question, tools, winner, verdict, featureRows } = comparison;
  return `
    <section class="compare-card">
      <h2>${escapeHtml(question)}</h2>
      <p class="compare-card__verdict"><strong>Verdict:</strong> ${escapeHtml(verdict)}</p>
      <table class="compare-card__table">
        <thead>
          <tr>
            <th>Feature</th>
            ${tools.map((t) => `<th>${escapeHtml(t.name)}${t.slug === winner.slug ? " 🏆" : ""}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${featureRows.map((row) => `
            <tr>
              <td>${escapeHtml(row.feature)}</td>
              ${tools.map((t) => `<td>${escapeHtml(String(row[t.slug]))}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

/**
 * Homepage teaser: short list of "X vs Y" links into the full
 * /compare/<slug>.html pages built by buildComparePage(). Takes the
 * same compares.json entries and tool list build.js already has —
 * no separate data source.
 * @param {Array} compareList - data/compares.json, as loaded by lib/data.js loadCompareList()
 * @param {Array} tools - full tool list from lib/data.js loadTools()
 */
export function renderCompareTeaser(compareList, tools) {
  const rows = compareList.map((entry) => {
    const names = entry.tools.map((slug) => tools.find((t) => t.slug === slug)?.name || slug);
    return `
      <a class="compare-teaser__row" href="${BASE_PATH}/compare/${entry.slug}.html">
        <span class="compare-teaser__names">${names.map(escapeHtml).join(" <span>vs</span> ")}</span>
        <span class="compare-teaser__case">${escapeHtml(entry.useCase)}</span>
        <span class="compare-teaser__arrow" aria-hidden="true">→</span>
      </a>
    `;
  }).join("");
  return `
    <div class="compare-teaser">
      ${rows}
    </div>
  `;
}
