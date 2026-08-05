// lib/seo.js
// Blueprint Chapter 7 — every page ships with title, meta description,
// and a canonical URL from day one. This is the only place that
// generates <head> metadata, so the rules never drift page to page.

const SITE_NAME = "Luvent";
export const SITE_URL = "https://luvent.ai"; // update once the real domain is live

export function buildMeta({ title, description, path: pagePath, image }) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${pagePath}`;
  return {
    title: fullTitle,
    description,
    canonical,
    image: image || `${SITE_URL}/assets/logos/luvent-social.png`,
  };
}

export function renderMetaTags(meta) {
  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}">
    <link rel="canonical" href="${meta.canonical}">
    <meta property="og:title" content="${escapeHtml(meta.title)}">
    <meta property="og:description" content="${escapeHtml(meta.description)}">
    <meta property="og:image" content="${meta.image}">
    <meta property="og:url" content="${meta.canonical}">
    <meta name="twitter:card" content="summary_large_image">
  `.trim();
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
