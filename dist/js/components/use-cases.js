// components/use-cases.js
import { escapeHtml } from "../lib/seo.js";

export function renderUseCases(tool) {
  const cases = tool.useCases || [];
  if (cases.length === 0) return "";
  return `
    <section class="use-cases">
      <h2>Real use cases</h2>
      <div class="use-cases__list">
        ${cases.map((c) => `
          <div class="use-cases__row">
            <span class="use-cases__title">${escapeHtml(c.title)}</span>
            <span class="use-cases__desc">${escapeHtml(c.description)}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}
