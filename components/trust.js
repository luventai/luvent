// components/trust.js
// Homepage trust teaser. The full methodology lives on the existing
// /how-we-test.html static page (built in build.js) — this just
// summarizes it and links out, so the content is never duplicated.
import { BASE_PATH } from "../lib/seo.js";
import { renderLogo } from "./logo.js";

const CRITERIA = [
  { n: "01", name: "Ease of use", desc: "Can you get value in the first 10 minutes, without a tutorial?" },
  { n: "02", name: "Features", desc: "Does it cover the full job, or just the demo-friendly part of it?" },
  { n: "03", name: "Value for money", desc: "What you get at the price you'd actually pay, not the cheapest tier." },
  { n: "04", name: "Support", desc: "Docs, response times, and what happens when something breaks." },
];

export function renderTrust() {
  return `
    <section class="trust section container">
      <span class="trust__eyebrow">How we score</span>
      <span class="luvent-badge">${renderLogo({ size: "small", variant: "icon", animated: false })} Recommended by Luvent</span>
      <h2>Our review process</h2>
      <p class="trust__lede">Every tool is tested against the same criteria, by someone who actually used it — not copied from a press kit.</p>
      <div class="trust__grid">
        ${CRITERIA.map((c) => `
          <div class="trust__cell">
            <span class="trust__num">${c.n}</span>
            <span class="trust__name">${c.name}</span>
            <span class="trust__desc">${c.desc}</span>
          </div>
        `).join("")}
      </div>
      <a class="trust__link" href="${BASE_PATH}/how-we-test.html">Read our full methodology →</a>
    </section>
  `;
}
