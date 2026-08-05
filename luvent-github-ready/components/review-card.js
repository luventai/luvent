// components/review-card.js
// Blueprint Ch.14 content standard: verdict -> who it's for -> pros -> cons.
import { escapeHtml } from "../lib/seo.js";

export function renderReviewCard(tool) {
  return `
    <article class="review-card">
      <h2>${escapeHtml(tool.name)} review</h2>
      <p class="review-card__verdict">${escapeHtml(tool.verdict || "")}</p>
      <div class="review-card__columns">
        <div>
          <h4>Pros</h4>
          <ul class="review-card__pros">
            ${tool.pros.map((p) => `<li>${escapeHtml(p)}</li>`).join("\n")}
          </ul>
        </div>
        <div>
          <h4>Cons</h4>
          <ul class="review-card__cons">
            ${tool.cons.map((c) => `<li>${escapeHtml(c)}</li>`).join("\n")}
          </ul>
        </div>
      </div>
    </article>
  `;
}
