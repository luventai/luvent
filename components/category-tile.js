// components/category-tile.js
// Small teaser tile for a category, used on the homepage. Links out to
// the existing /category/<slug>.html page built by build.js — no new
// page type, just a new entry point into pages that already exist.
import { escapeHtml, BASE_PATH } from "../lib/seo.js";

export function renderCategoryTile(category, count) {
  const label = category.replace(/-/g, " ");
  return `
    <a class="category-tile" href="${BASE_PATH}/category/${category}.html">
      <span class="category-tile__icon" aria-hidden="true">${escapeHtml(category[0].toUpperCase())}</span>
      <span class="category-tile__name">${escapeHtml(label)}</span>
      <span class="category-tile__count">${count} tool${count === 1 ? "" : "s"}</span>
    </a>
  `;
}
