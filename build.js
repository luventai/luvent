// build.js
// THE Luvent Engine. Blueprint Chapter 11/15 — this is the only place
// that turns data + components into static HTML files. No page is ever
// hand-written; every page is a template in this file that reads from
// /data and /content and renders through /components + lib/layout.js.
//
// Run with: node build.js
// Output goes to /dist — that folder is disposable and gets
// regenerated on every run (see .github/workflows/deploy.yml).

import { mkdirSync, writeFileSync, readdirSync, readFileSync, cpSync, existsSync, rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { loadTools, loadCompareList, getToolBySlug, getToolsByCategory, getAllCategories } from "./lib/data.js";
import { buildMeta, SITE_URL } from "./lib/seo.js";
import { renderPage } from "./lib/layout.js";
import { findTools } from "./lib/finder.js";
import { buildComparison } from "./lib/compare.js";

import { renderHero } from "./components/hero.js";
import { renderSearch } from "./components/search.js";
import { renderFinderForm, renderFinderResults } from "./components/finder.js";
import { renderToolCard } from "./components/tool-card.js";
import { renderReviewCard } from "./components/review-card.js";
import { renderCompareCard, renderCompareTeaser } from "./components/compare-card.js";
import { renderPricingCard } from "./components/pricing-card.js";
import { renderFaq } from "./components/faq.js";
import { renderVerdict } from "./components/verdict.js";
import { renderCategoryTile } from "./components/category-tile.js";
import { renderTrust } from "./components/trust.js";
import { renderNewsletter } from "./components/newsletter.js";
import { renderScreenshots } from "./components/screenshots.js";
import { renderCompanyProfile } from "./components/company-profile.js";
import { renderUseCases } from "./components/use-cases.js";
import { renderUpdateHistory } from "./components/update-history.js";
import { renderLogo } from "./components/logo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const generalFaq = JSON.parse(readFileSync(path.join(__dirname, "content/faq/general.json"), "utf-8"));

// Every .html page written gets recorded here automatically, so the
// sitemap can never drift out of sync with what actually got built.
const sitemapUrls = [];

function write(relPath, html) {
  const fullPath = path.join(DIST, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html, "utf-8");
  if (relPath.endsWith(".html")) {
    const urlPath = relPath === "index.html" ? "/" : `/${relPath}`;
    sitemapUrls.push(urlPath);
  }
}

// ---------- Page templates ----------
// Each function below is a PAGE TYPE (Blueprint Ch.5). A page type is
// only ever built here, and only ever assembles existing components —
// this is the "no isolated pages" / "no duplicated HTML" rule in code.

function buildHomePage(tools, compareList) {
  const meta = buildMeta({
    title: "Luvent — Find the right AI tool, faster",
    description: "Luvent tests and compares AI tools so you don't have to. Get a personal recommendation in under a minute.",
    path: "/",
  });

  const trending = tools.filter((t) => t.isTrending);
  const editorsPicks = tools.filter((t) => t.isEditorsPick);
  const featured = tools.filter((t) => t.isFeatured);
  const newTools = tools.filter((t) => t.isNew);
  const categories = getAllCategories(tools);

  const toolSection = (heading, list) => list.length === 0 ? "" : `
    <section class="section container">
      <h2>${heading}</h2>
      <div class="grid">
        ${list.map(renderToolCard).join("\n")}
      </div>
    </section>
  `;

  const body = `
    ${renderHero({
      title: "Find the right AI tool, faster",
      subtitle: "We test AI tools ourselves and tell you exactly which one fits you — not just a list.",
      ctaLabel: "Try Finder",
      ctaHref: "#finder",
    })}
    ${renderSearch()}

    ${toolSection("Trending AI", trending)}
    ${toolSection("Editor's Picks", editorsPicks)}
    ${toolSection("Featured Tools", featured)}
    ${toolSection("New AI Tools", newTools)}

    <section class="section container">
      <h2>Categories</h2>
      <div class="grid">
        ${categories.map((cat) => renderCategoryTile(cat, getToolsByCategory(tools, cat).length)).join("\n")}
      </div>
    </section>

    <section class="section container">
      <h2>Compare AI Tools</h2>
      ${renderCompareTeaser(compareList, tools)}
    </section>

    <section class="section container">
      <h2>Latest Reviews</h2>
      <div class="grid">
        ${tools.map(renderToolCard).join("\n")}
      </div>
    </section>

    ${renderTrust()}

    <div id="finder">${renderFinderForm()}</div>

    ${renderNewsletter()}

    ${renderFaq(generalFaq)}
  `;
  write("index.html", renderPage({ meta, body }));
}

function buildToolPage(tool, allTools) {
  const meta = buildMeta({
    title: `${tool.name} review — pricing, pros & cons`,
    description: `An independent review of ${tool.name}: pricing, pros, cons, and who it's actually best for. Last tested ${tool.lastTested}.`,
    path: `/tool/${tool.slug}.html`,
  });
  const body = `
    <div class="container section tool-page">
      ${renderReviewCard(tool)}
      ${renderScreenshots(tool)}
      ${renderCompanyProfile(tool, allTools)}
      ${renderPricingCard(tool)}
      ${renderUseCases(tool)}
      ${renderVerdict({ text: tool.editorReview || tool.verdict })}
      ${renderUpdateHistory(tool)}
      ${renderFaq(
        tool.faq && tool.faq.length > 0
          ? tool.faq.map((f) => ({ question: f.question, answer: f.answer }))
          : [
              { question: `Does ${tool.name} have a free plan?`, answer: tool.freePlan ? "Yes, it does." : "No, it does not currently offer a free plan." },
              { question: `When was ${tool.name} last tested?`, answer: `We last tested it on ${tool.lastTested}.` },
            ]
      )}
    </div>
  `;
  write(`tool/${tool.slug}.html`, renderPage({ meta, body }));
}

function buildCategoryPage(category, tools) {
  const meta = buildMeta({
    title: `Best AI tools for ${category}`,
    description: `Every AI tool we've tested in the ${category} category, ranked by rating.`,
    path: `/category/${category}.html`,
  });
  const ranked = [...tools].sort((a, b) => b.rating - a.rating);
  const body = `
    <div class="container section">
      <h1>Best AI tools for ${category}</h1>
      <div class="grid">${ranked.map(renderToolCard).join("\n")}</div>
    </div>
  `;
  write(`category/${category}.html`, renderPage({ meta, body }));
}

function buildComparePage(compareEntry, allTools) {
  const comparison = buildComparison(compareEntry.tools, allTools, compareEntry.useCase);
  const meta = buildMeta({
    title: comparison.question,
    description: comparison.verdict,
    path: `/compare/${compareEntry.slug}.html`,
  });
  const body = `
    <div class="container section">
      ${renderCompareCard(comparison)}
      ${renderVerdict({ text: comparison.verdict })}
    </div>
  `;
  write(`compare/${compareEntry.slug}.html`, renderPage({ meta, body }));
}

function buildGuidePages(allTools) {
  const guidesDir = path.join(__dirname, "content/guides");
  if (!existsSync(guidesDir)) return [];
  const guides = [];
  for (const file of readdirSync(guidesDir)) {
    const guide = JSON.parse(readFileSync(path.join(guidesDir, file), "utf-8"));
    const recommended = guide.recommendedSlugs.map((slug) => getToolBySlug(allTools, slug));
    const meta = buildMeta({
      title: guide.title,
      description: guide.problem,
      path: `/guides/${guide.slug}.html`,
    });
    const body = `
      <div class="container section">
        <h1>${guide.title}</h1>
        <p>${guide.problem}</p>
        <h2>What to look for</h2>
        <ul>${guide.whatToLookFor.map((i) => `<li>${i}</li>`).join("")}</ul>
        <h2>Our recommendations</h2>
        <div class="grid">${recommended.map(renderToolCard).join("\n")}</div>
      </div>
    `;
    write(`guides/${guide.slug}.html`, renderPage({ meta, body }));
    guides.push(guide);
  }
  return guides;
}

function buildGuidesIndexPage(guides) {
  const meta = buildMeta({
    title: "Guides",
    description: "In-depth guides to choosing the right AI tool for your use case.",
    path: "/guides/",
  });
  const body = `
    <div class="container section">
      <h1>Guides</h1>
      ${guides.length === 0 ? `<p>No guides published yet.</p>` : `
        <ul>
          ${guides.map((g) => `<li><a href="/guides/${g.slug}.html">${g.title}</a></li>`).join("\n")}
        </ul>
      `}
    </div>
  `;
  write("guides/index.html", renderPage({ meta, body }));
}

function buildTopListPage(tools) {
  const meta = buildMeta({
    title: "Best AI tools, ranked",
    description: "Every AI tool on Luvent, ranked by our overall testing score.",
    path: "/best/",
  });
  const ranked = [...tools].sort((a, b) => b.rating - a.rating);
  const body = `
    <div class="container section">
      <h1>Best AI tools, ranked</h1>
      <div class="grid">${ranked.map(renderToolCard).join("\n")}</div>
    </div>
  `;
  write("best/index.html", renderPage({ meta, body }));
}

function buildStaticPage({ slug, title, description, bodyHtml }) {
  const meta = buildMeta({ title, description, path: `/${slug}.html` });
  write(`${slug}.html`, renderPage({ meta, body: `<div class="container section">${bodyHtml}</div>` }));
}

function buildFinderDemoResultsPage(tools) {
  // A static example of Finder's output, so the page still works and is
  // indexable with zero JS. Live filtering is layered on top client-side.
  const matches = findTools(tools, { category: "writing", budget: "free", priority: "ease-of-use" });
  const meta = buildMeta({
    title: "Finder results",
    description: "Your personalized AI tool recommendations from Luvent Finder.",
    path: "/search.html",
  });
  const body = `<div class="container section">${renderFinderResults(matches)}</div>`;
  write("search.html", renderPage({ meta, body }));
}

// ---------- CSS + assets bundling ----------
// Blueprint requirement 11 (no duplicated CSS): every component's CSS
// file gets concatenated into exactly ONE stylesheet, loaded by every
// page. No page ever links its own separate CSS file.

function bundleCss() {
  const files = [
    "styles/tokens.css",
    "styles/global.css",
    ...readdirSync(path.join(__dirname, "components"))
      .filter((f) => f.endsWith(".css"))
      .map((f) => `components/${f}`),
  ];
  const bundled = files
    .map((relPath) => readFileSync(path.join(__dirname, relPath), "utf-8"))
    .join("\n\n");
  write("styles.css", bundled);
}

function copyAssets() {
  const src = path.join(__dirname, "assets");
  if (existsSync(src)) cpSync(src, path.join(DIST, "assets"), { recursive: true });

  // Client-side JS: the entry script, PLUS the exact same lib/ and
  // components/ files used to build the pages server-side (requirement
  // 12: no duplicated JavaScript — one Finder implementation, used both
  // at build time and, verbatim, in the browser).
  const jsSrc = path.join(__dirname, "assets-js");
  if (existsSync(jsSrc)) cpSync(jsSrc, path.join(DIST, "js"), { recursive: true });
  cpSync(path.join(__dirname, "lib"), path.join(DIST, "js", "lib"), { recursive: true });
  cpSync(path.join(__dirname, "components"), path.join(DIST, "js", "components"), { recursive: true });
}

function writePublicData(tools) {
  // The one public copy of tool data the browser is allowed to fetch.
  // Client-side Finder reads this — never a second, hand-maintained copy.
  write("data.json", JSON.stringify(tools, null, 2));
}

// ---------- Production-hosting extras ----------
// Nothing here needs Node/npm at request time — these are plain static
// files a shared host (cPanel, Namecheap, etc.) serves as-is.

function writeSitemap() {
  const urlEntries = sitemapUrls
    .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf-8");
}

function writeRobotsTxt() {
  const txt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  writeFileSync(path.join(DIST, "robots.txt"), txt, "utf-8");
}

function write404Page() {
  const meta = buildMeta({
    title: "Page not found",
    description: "The page you're looking for doesn't exist.",
    path: "/404.html",
  });
  const body = `
    <div class="container section" style="text-align:center">
      <div class="hero__logo" style="margin-bottom: var(--space-24)">
        ${renderLogo({ size: "large", variant: "icon", animated: true })}
      </div>
      <h1>Page not found</h1>
      <p>That page doesn't exist or may have moved.</p>
      <a class="btn btn-primary" href="/">Back to Luvent</a>
    </div>
  `;
  // Written directly (not via write()) so it's excluded from the sitemap.
  writeFileSync(path.join(DIST, "404.html"), renderPage({ meta, body }), "utf-8");
}

function writeHtaccess() {
  // cPanel/Apache config: force HTTPS, use 404.html as the error
  // document, and stop directory listing. No .htaccess = still works,
  // this just tightens things up for a real production host.
  const htaccess = `# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Custom 404 page
ErrorDocument 404 /404.html

# Disable directory listing
Options -Indexes
`;
  writeFileSync(path.join(DIST, ".htaccess"), htaccess, "utf-8");
}

// ---------- Run ----------

function build() {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true });
  mkdirSync(DIST, { recursive: true });

  const tools = loadTools();
  const compareList = loadCompareList();

  buildHomePage(tools, compareList);
  tools.forEach((tool) => buildToolPage(tool, tools));
  getAllCategories(tools).forEach((cat) => buildCategoryPage(cat, getToolsByCategory(tools, cat)));
  compareList.forEach((entry) => buildComparePage(entry, tools));
  const guides = buildGuidePages(tools);
  buildGuidesIndexPage(guides);
  buildTopListPage(tools);
  buildFinderDemoResultsPage(tools);

  buildStaticPage({
    slug: "about",
    title: "About Luvent",
    description: "Why Luvent exists and how we decide what to recommend.",
    bodyHtml: `<h1>About Luvent</h1><p>Luvent helps people find the right AI tool faster than any other site — by testing tools ourselves and explaining exactly why we recommend what we recommend.</p>`,
  });
  buildStaticPage({
    slug: "how-we-test",
    title: "How we test AI tools",
    description: "Our testing process and rating criteria, explained.",
    bodyHtml: `<h1>How we test</h1><p>Every tool is scored on ease of use, value for money, features, and support, then re-tested periodically. A tool is only published once every field in our data model is complete.</p>`,
  });

  bundleCss();
  copyAssets();
  writePublicData(tools);
  writeSitemap();
  writeRobotsTxt();
  write404Page();
  writeHtaccess();

  console.log(`✅ Build complete — ${countFiles(DIST)} files written to /dist`);
}

function countFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) count += countFiles(path.join(dir, entry.name));
    else count++;
  }
  return count;
}

build();
