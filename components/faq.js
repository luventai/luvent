// components/faq.js
// Blueprint Ch.7 - every page ships an FAQ block from the start.
import { escapeHtml } from "../lib/seo.js";

export function renderFaq(items) {
  return `
    <section class="faq section">
      <div class="container">
        <h2>Frequently asked questions</h2>
        ${items.map((item) => `
          <details class="faq__item">
            <summary>${escapeHtml(item.question)}</summary>
            <p>${escapeHtml(item.answer)}</p>
          </details>
        `).join("\n")}
      </div>
    </section>
  `;
}
