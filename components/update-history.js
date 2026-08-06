// components/update-history.js
import { escapeHtml } from "../lib/seo.js";

export function renderUpdateHistory(tool) {
  const history = tool.updateHistory || [];
  if (history.length === 0) return "";
  return `
    <section class="update-history">
      <h2>Update history</h2>
      <ul class="update-history__list">
        ${history.map((h) => `
          <li>
            <span class="update-history__date">${escapeHtml(h.date)}</span>
            <span class="update-history__note">${escapeHtml(h.note)}</span>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}
