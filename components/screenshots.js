// components/screenshots.js
// Placeholder frames, not real product screenshots — Luvent doesn't
// have rights to embed each company's UI. Drop real captures into
// /assets/screenshots/<slug>-N.png (the path tool.screenshots already
// points to) and this component will use them automatically once an
// <img> swap is made — see the inline comment below.
import { escapeHtml } from "../lib/seo.js";

export function renderScreenshots(tool) {
  const shots = tool.screenshots || [];
  if (shots.length === 0) return "";
  return `
    <section class="screenshots">
      <h2>See ${escapeHtml(tool.name)} in action</h2>
      <div class="screenshots__grid">
        ${shots.map((src) => `
          <div class="screenshots__frame">
            <div class="screenshots__chrome"><span></span><span></span><span></span></div>
            <!-- Swap this placeholder div for <img src="${escapeHtml(src)}" alt="${escapeHtml(tool.name)} screenshot"> once a real capture exists at that path -->
            <div class="screenshots__placeholder">Screenshot placeholder</div>
          </div>
        `).join("")}
      </div>
      <p class="screenshots__note">Placeholder frames — swap in real captures (or the vendor's press assets, with permission) before publishing.</p>
    </section>
  `;
}
