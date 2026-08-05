// lib/layout.js
// The ONE place the page shell (<html>, <head>, nav, footer) is
// defined. Every page in build.js is passed through renderPage() —
// this is what guarantees "no page ever looks structurally
// different" (Blueprint Ch.2) and "no duplicated HTML" (requirement 10).
//
// Updated: header/nav markup and font loading migrated from
// Design/index 2.html (Space Grotesk / Inter / JetBrains Mono, sticky
// blurred header, logo mark, nav CTA). Reuses the existing
// site-header / site-nav classes so components/footer.css keeps
// styling this without any CSS being duplicated here, and the CTA
// reuses the .btn / .btn-primary rules already defined in
// styles/global.css. renderFooter() from components/footer.js is
// still the single source for the footer — untouched.

import { renderMetaTags } from "./seo.js";
import { renderFooter } from "../components/footer.js";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Best Tools", href: "/best/" },
  { label: "Guides", href: "/guides/" },
  { label: "How We Test", href: "/how-we-test.html" },
  { label: "About", href: "/about.html" },
];

function renderNav() {
  return `
    <header class="site-header">
      <nav class="container site-header__inner">
        <a class="site-logo" href="/">
          <span class="site-logo__mark" aria-hidden="true"></span>
          Luvent AI
        </a>
        <button class="site-nav__toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav">
          Menu
        </button>
        <div class="site-nav" id="site-nav">
          ${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("\n          ")}
          <a class="btn btn-primary site-nav__cta" href="/best/">Explore Tools</a>
        </div>
      </nav>
    </header>
  `;
}

function renderFontLinks() {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  `;
}

/**
 * Wraps page-specific HTML in the full document shell.
 * @param {Object} opts
 * @param {Object} opts.meta - output of lib/seo.js buildMeta()
 * @param {string} opts.body - the page's own HTML (already rendered by components)
 */
export function renderPage({ meta, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${renderMetaTags(meta)}
  ${renderFontLinks()}
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  ${renderNav()}
  <main>
    ${body}
  </main>
  ${renderFooter()}
  <script type="module" src="/js/main.js"></script>
</body>
</html>`;
}
