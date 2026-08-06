// components/tool-card.js
// The single tool-teaser card, reused everywhere a list of tools is
// shown: homepage, category pages, guides, /best/, and Finder results
// (server-rendered AND client-rendered — see assets-js/main.js).
// Blueprint rule: one card implementation, no per-page duplicates.
import { escapeHtml, BASE_PATH } from "../lib/seo.js";
import { renderLogo } from "./logo.js";

function initials(name) {
  const words = name.replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function renderStars(rating) {
  const filled = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="tool-card__star${i <= filled ? " is-filled" : ""}">★</span>`;
  }
  return stars;
}

function renderTags(tool) {
  const tags = [];
  if (tool.isEditorsPick) tags.push(`<span class="tool-card__tag tool-card__tag--pick">Editor's Pick</span>`);
  if (tool.isTrending) tags.push(`<span class="tool-card__tag tool-card__tag--trend">Trending</span>`);
  if (tool.isFeatured) tags.push(`<span class="tool-card__tag tool-card__tag--feat">Featured</span>`);
  if (tool.isNew) tags.push(`<span class="tool-card__tag tool-card__tag--new">New</span>`);
  if (tags.length === 0) return "";
  return `<div class="tool-card__tags">${tags.join("")}</div>`;
}

export function renderToolCard(tool) {
  const detailHref = `${BASE_PATH}/tool/${tool.slug}.html`;
  return `
    <article class="tool-card">
      ${renderTags(tool)}
      <div class="tool-card__header">
        <div class="tool-card__avatar" aria-hidden="true">${escapeHtml(initials(tool.name))}</div>
        <div class="tool-card__heading">
          <h3>
            <a href="${detailHref}">${escapeHtml(tool.name)}</a>
            ${tool.verified ? `<span class="tool-card__verified luvent-badge" title="Verified by Luvent">${renderLogo({ size: "small", variant: "icon", animated: false })} Verified</span>` : ""}
          </h3>
          <p class="tool-card__category">${escapeHtml(tool.category)}</p>
        </div>
      </div>

      <div class="tool-card__rating">
        <span class="tool-card__stars">${renderStars(tool.rating)}</span>
        <span class="tool-card__rating-value">${tool.rating}/5</span>
      </div>

      ${tool.bestFor ? `<p class="tool-card__best-for"><span>Best for</span> ${escapeHtml(tool.bestFor)}</p>` : ""}

      <div class="tool-card__meta">
        <span class="tool-card__price">${escapeHtml(tool.price)}</span>
        ${tool.freePlan ? `<span class="tool-card__badge tool-card__badge--free">Free plan</span>` : ""}
      </div>

      <div class="tool-card__actions">
        <a class="btn btn-secondary tool-card__details" href="${detailHref}">View details</a>
        <a class="btn btn-primary tool-card__try" href="${tool.affiliateLink}" rel="sponsored nofollow" target="_blank">
          Try ${escapeHtml(tool.name)} →
        </a>
      </div>
    </article>
  `;
}
