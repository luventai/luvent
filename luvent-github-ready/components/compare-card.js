// components/compare-card.js
import { escapeHtml } from "../lib/seo.js";

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
