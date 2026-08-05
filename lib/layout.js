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

export function renderPage({ meta, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${renderMetaTags(meta)}
  ${renderFontLinks()}
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