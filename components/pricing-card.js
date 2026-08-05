// components/pricing-card.js
import { escapeHtml } from "../lib/seo.js";

export function renderPricingCard(tool) {
  return `
    <aside class="pricing-card">
      <h4>Pricing</h4>
      <p class="pricing-card__price">${escapeHtml(tool.price)}</p>
      ${tool.freePlan ? `<p class="pricing-card__free">✓ Free plan available</p>` : ""}
      <a class="btn btn-primary" href="${tool.affiliateLink}" rel="sponsored nofollow" target="_blank">
        Try ${escapeHtml(tool.name)}
      </a>
    </aside>
  `;
}
