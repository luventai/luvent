// components/verdict.js
// A short, highlighted final-word block used at the end of reviews,
// comparisons, and guides. One consistent "bottom line" pattern site-wide.
import { escapeHtml } from "../lib/seo.js";

export function renderVerdict({ heading = "Bottom line", text }) {
  return `
    <div class="verdict">
      <h4>${escapeHtml(heading)}</h4>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}
