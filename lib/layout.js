// lib/layout.js
// The ONE place the page shell (<html>, <head>, nav, footer) is
// defined. Every page in build.js is passed through renderPage() —
// this is what guarantees "no page ever looks structurally
// different" (Blueprint Ch.2) and "no duplicated HTML" (requirement 10).

import { renderMetaTags } from "./seo.js";
import { renderFooter } from "../components/footer.js";

const NAV_LINKS = [
  { label: "Home", href: "./index.html" },
  { label: "Best Tools", href: "./best/" },
  { label: "Guides", href: "./guides/" },
  { label: "How We Test", href: "./how-we-test.html" },
  { label: "About", href: "./about.html" },
];

function renderNav() {
  return `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="site-logo" href="./index.html">Luvent</a>
        <nav class="site-nav">
          ${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("\n")}
        </nav>
      </div>
    </header>
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
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  ${renderNav()}
  <main>
    ${body}
  </main>
  ${renderFooter()}
  <script type="module" src="./js/main.js"></script>
</body>
</html>`;
}
