// components/tool-card.js
import { escapeHtml } from "../lib/seo.js";

export function renderToolCard(tool) {
  return `
    <article class="tool-card">
      <div class="tool-card__header">
        <h3><a href="/tool/${tool.slug}.html">${escapeHtml(tool.name)}</a></h3>
        <span class="tool-card__rating">${tool.rating}/5</span>
      </div>
      <p class="tool-card__category">${escapeHtml(tool.category)}</p>
      <p class="tool-card__price">${tool.freePlan ? "Free plan available" : escapeHtml(tool.price)}</p>
      <a class="btn btn-secondary" href="/tool/${tool.slug}.html">View details</a>
    </article>
  `;
}
