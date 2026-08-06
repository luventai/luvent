import { renderMetaTags, BASE_PATH } from "./seo.js";
import { renderFooter } from "../components/footer.js";
import { renderLogo } from "../components/logo.js";

const BASE = BASE_PATH;

const NAV_LINKS = [
  { label: "Home", href: `${BASE}/` },
  { label: "Best Tools", href: `${BASE}/best/` },
  { label: "Guides", href: `${BASE}/guides/` },
  { label: "How We Test", href: `${BASE}/how-we-test.html` },
  { label: "About", href: `${BASE}/about.html` },
];

function renderNav() {
  return `
    <header class="site-header">
      <nav class="container site-header__inner">
        ${renderLogo({ size: "medium", variant: "horizontal", link: true, animated: true })}

        <button
          class="site-nav__toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded="false"
          aria-controls="site-nav">
          Menu
        </button>

        <div class="site-nav" id="site-nav">
          ${NAV_LINKS.map(link => `<a href="${link.href}">${link.label}</a>`).join("")}
          <a class="btn btn-primary site-nav__cta" href="${BASE}/best/">
            Explore Tools
          </a>
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

function renderBrandHeadLinks() {
  return `
<link rel="icon" type="image/svg+xml" href="${BASE}/assets/logos/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="${BASE}/assets/logos/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="${BASE}/assets/logos/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="${BASE}/assets/logos/apple-touch-icon.png">
<link rel="manifest" href="${BASE}/assets/manifest.webmanifest">
<meta name="theme-color" content="#0E0C14">
<meta name="twitter:image" content="https://luventai.github.io${BASE}/assets/logos/social-card.png">
`;
}

export function renderPage({ meta, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

${renderMetaTags(meta)}
${renderBrandHeadLinks()}
${renderFontLinks()}

<link rel="stylesheet" href="${BASE}/styles.css">

</head>

<body>

${renderNav()}

<main>
${body}
</main>

${renderFooter()}

<script type="module" src="${BASE}/js/main.js"></script>

</body>
</html>`;
}
