// components/hero.js
// Renders the top-of-page hero. Pure function: data in, HTML string out.
import { escapeHtml } from "../lib/seo.js";

export function renderHero({ title, subtitle, ctaLabel, ctaHref }) {
  return `
    <section class="hero section">
      <div class="container hero__inner">
        <h1>${escapeHtml(title)}</h1>
        <p class="hero__subtitle">${escapeHtml(subtitle)}</p>
        ${ctaLabel ? `<a class="btn btn-primary" href="${ctaHref}">${escapeHtml(ctaLabel)}</a>` : ""}
      </div>
    </section>
  `;
}
