// lib/data.js
// SINGLE SOURCE OF TRUTH for reading data. Every page, every engine
// (Finder, Compare) reads through this file — never straight from a
// JSON file, and never a second copy of the data anywhere else.
//
// Today this reads local JSON. Later, swapping to Airtable's API is a
// one-file change: only loadTools()/loadCompares() change internally,
// nothing that calls them has to change.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

export function loadTools() {
  const raw = readFileSync(path.join(DATA_DIR, "tools.json"), "utf-8");
  const tools = JSON.parse(raw);
  validateTools(tools);
  return tools;
}

export function loadCompareList() {
  const raw = readFileSync(path.join(DATA_DIR, "compares.json"), "utf-8");
  return JSON.parse(raw);
}

export function getToolBySlug(tools, slug) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`No tool found with slug "${slug}"`);
  return tool;
}

export function getToolsByCategory(tools, category) {
  return tools.filter((t) => t.category === category);
}

export function getAllCategories(tools) {
  return [...new Set(tools.map((t) => t.category))];
}

// Blueprint Chapter 4 / Chapter 14: a tool cannot be published as
// "tested" unless the data model is complete. This is the enforcement
// point for that rule — the build fails loudly instead of shipping a
// half-filled tool page.
const REQUIRED_FIELDS = [
  "name", "slug", "category", "price", "freePlan", "rating",
  "pros", "cons", "features", "affiliateLink", "lastTested", "lastUpdated",
];

// Optional fields, added for the "IMDb-level" tool profile expansion.
// Not enforced by validateTools() — a tool can still publish without
// them — but any component that reads one of these must handle it
// being absent (see components/company-profile.js, use-cases.js,
// update-history.js, screenshots.js for the pattern).
//   verified            boolean
//   bestFor             string
//   isTrending          boolean
//   isEditorsPick       boolean
//   isFeatured          boolean
//   isNew               boolean
//   ratingBreakdown     { [criterion: string]: number (1-5) }
//   screenshots         string[] (paths under /assets/screenshots/)
//   verdict             string — short, card-length summary
//   companyProfile      { founded, headquarters, website }
//   alternatives        string[] — slugs of other tools in this file
//   useCases            { title, description }[]
//   editorReview        string — the long-form review paragraph(s)
//   faq                 { question, answer }[]
//   updateHistory       { date, note }[]

function validateTools(tools) {
  for (const tool of tools) {
    for (const field of REQUIRED_FIELDS) {
      if (tool[field] === undefined || tool[field] === null || tool[field] === "") {
        throw new Error(
          `Tool "${tool.name || tool.slug || "unknown"}" is missing required field "${field}". ` +
          `It cannot be published until the data model is complete (Blueprint Ch.4/14).`
        );
      }
    }
  }
}
