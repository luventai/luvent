# Luvent Engine v1

Static site engine for Luvent, built exactly to Blueprint v2.0. No framework,
no build tool beyond plain Node.js, fully manageable from a phone once the
one-time GitHub setup below is done.

## How a change reaches the live site (phone-only)

1. Open the repo in the **GitHub mobile app** (or github.com in a browser).
2. Edit a file directly on GitHub — most often `data/tools.json` to add or
   change a tool, or a file in `content/guides/`.
3. Commit the change.
4. GitHub Actions (`.github/workflows/deploy.yml`) automatically runs
   `node build.js` on GitHub's servers and publishes the result. No
   computer, no npm install, no terminal — ever.

One-time setup (5 minutes, from any browser): push this repo to GitHub, then
in **Settings → Pages → Source**, choose "GitHub Actions". After that,
every commit auto-deploys.

## Folder-by-folder

| Folder | What it is | When you'd touch it from your phone |
|---|---|---|
| `data/tools.json` | **The single source of truth for every tool.** One JSON object per tool, following the Blueprint Ch.4 data model. | Every time you add a tool, change a price, or update a rating. |
| `data/compares.json` | List of which tool pairs get a comparison page, and the use case each comparison is framed around. | When you want a new "X vs Y" page. |
| `content/guides/*.json` | One file per guide (e.g. "How to choose an AI writing tool"). | When you write a new guide. |
| `content/faq/general.json` | The shared FAQ block used on the homepage. | When your standard FAQ answers change. |
| `components/*.js` + `.css` | The 10 reusable building blocks (Hero, Search, Finder, Tool Card, Review Card, Compare Card, Pricing Card, FAQ, Verdict, Footer). Every page is assembled from these — nothing is hand-built per page. | Rarely — only when a component's design or behavior needs to change everywhere at once. |
| `lib/data.js` | Loads and validates `tools.json`/`compares.json`. Refuses to build a tool page if a required field is missing. | Never by hand — this is what keeps bad data from ever reaching the live site. |
| `lib/finder.js` | Finder's recommendation logic: scores tools against your answers and explains *why* each one was picked. | Only if you want to change how Finder ranks tools. |
| `lib/compare.js` | Builds the feature-by-feature comparison table and picks a winner for compare pages. | Only if you want to change how comparisons are scored. |
| `lib/seo.js` | Generates the title/description/canonical tags every page gets automatically. | Rarely. |
| `lib/layout.js` | The one shared page shell — header, nav, footer, `<head>` — every single page is wrapped in this. This is what guarantees no two pages structurally differ. | Rarely — this is the single place to change site-wide chrome. |
| `styles/tokens.css` | Every color, font size, spacing value, and animation timing used anywhere on the site — defined once. | When you want to change the look and feel site-wide (colors, spacing, etc). |
| `styles/global.css` | Base resets, typography defaults, and the fixed set of button styles. | Rarely. |
| `assets/` | Logos, icons, screenshots. | When you have a new image to add. |
| `assets-js/main.js` | The one small client-side script. It re-uses (not duplicates) `lib/finder.js` and `components/finder.js` in the browser, so Finder works instantly without a page reload. | Basically never. |
| `build.js` | **The Luvent Engine itself.** Reads everything in `data/` and `content/`, runs it through the components and layout, and writes finished static HTML into `dist/`. This is the only file that knows how to turn data into pages. | Only when adding a brand-new *page type* (Blueprint Ch.5 — homepage, tool page, comparison page, category page, guide, top list, about, how-we-test are the only page types that should ever exist). |
| `dist/` | **Generated output — never edit by hand.** Deleted and rebuilt from scratch on every run of `node build.js`. This is what actually gets deployed. | Never touch directly. |
| `.github/workflows/deploy.yml` | The automation that runs the build on GitHub's servers and publishes `dist/` every time you push a change. This is *why* you never need a computer. | Only if you change hosting providers later. |

## The rule that keeps this scalable

Every page on the site is one of exactly 8 page types (Blueprint Ch.5), and
every page type in `build.js` only ever calls functions from `components/`
and `lib/` — it never writes raw HTML strings of its own beyond the small
bit of layout glue holding components together. If you (or a future Claude
session) ever find yourself writing a chunk of HTML that isn't coming from
a component, that's the signal to make it a new component instead —
that's what Chapter 11's "no isolated pages" rule means in practice.

## Migrating to Next.js later

Nothing in `lib/` or `components/` touches the DOM or Node's filesystem
(except `lib/data.js`, which is the one file that would be swapped for a
data-fetching hook). Every component is already a pure `(data) => HTML`
function and every page type is already "fetch data, pass it to
components." That's precisely the shape of a Next.js page — the move,
when it happens, is mechanical, not a rewrite.
