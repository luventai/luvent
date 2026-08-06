// components/company-profile.js
// The "about the company" block. Reads tool.companyProfile and
// tool.alternatives — both optional, both no-ops if missing so this
// never breaks a tool that hasn't been filled in to the full schema yet.
import { escapeHtml, BASE_PATH } from "../lib/seo.js";

export function renderCompanyProfile(tool, allTools) {
  const profile = tool.companyProfile;
  if (!profile) return "";
  const alts = (tool.alternatives || [])
    .map((slug) => allTools.find((t) => t.slug === slug))
    .filter(Boolean);

  return `
    <section class="company-profile">
      <h2>About ${escapeHtml(tool.name)}</h2>
      <dl class="company-profile__grid">
        <div><dt>Founded</dt><dd>${escapeHtml(profile.founded || "—")}</dd></div>
        <div><dt>Headquarters</dt><dd>${escapeHtml(profile.headquarters || "—")}</dd></div>
        <div><dt>Website</dt><dd><a href="${escapeHtml(profile.website)}" rel="nofollow" target="_blank">${escapeHtml(profile.website.replace(/^https?:\/\//, ""))}</a></dd></div>
      </dl>
      ${alts.length > 0 ? `
        <h3 class="company-profile__alt-heading">Alternatives to ${escapeHtml(tool.name)}</h3>
        <ul class="company-profile__alts">
          ${alts.map((alt) => `<li><a href="${BASE_PATH}/tool/${alt.slug}.html">${escapeHtml(alt.name)}</a></li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}
