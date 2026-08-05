// lib/finder.js
// Blueprint Chapter 6 — Finder is Luvent's signature feature. It never
// just returns three tools; it always returns WHY those three tools.
//
// Pure function: (tools[], answers) -> ranked recommendations with reasons.
// No DOM, no HTML — this is what keeps it portable to Next.js later,
// and testable on its own.

/**
 * @param {Array} tools - full tool list from lib/data.js
 * @param {Object} answers - user's Finder answers, e.g.
 *   { category: "writing", budget: "free", priority: "ease-of-use" }
 * @returns {Array<{tool, score, reasons: string[]}>} top matches, best first
 */
export function findTools(tools, answers) {
  const scored = tools
    .filter((t) => !answers.category || t.category === answers.category)
    .map((tool) => scoreTool(tool, answers));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function scoreTool(tool, answers) {
  let score = 0;
  const reasons = [];

  // Budget fit
  if (answers.budget === "free" && tool.freePlan) {
    score += 30;
    reasons.push(`Has a usable free plan`);
  } else if (answers.budget === "paid-ok") {
    score += 10;
  }

  // Priority fit — maps a stated priority to a specific rating dimension
  if (answers.priority && tool.ratingBreakdown && tool.ratingBreakdown[answers.priority] != null) {
    const dimensionScore = tool.ratingBreakdown[answers.priority];
    score += dimensionScore * 10;
    reasons.push(`Scores ${dimensionScore}/5 on ${formatDimension(answers.priority)}, your top priority`);
  }

  // Overall rating always contributes
  score += (tool.rating || 0) * 5;
  reasons.push(`Overall rating of ${tool.rating}/5 from our testing`);

  // Recency signal - keeps recommendations honest about freshness
  reasons.push(`Last tested ${tool.lastTested}`);

  return { tool, score, reasons };
}

function formatDimension(key) {
  return key.replace(/-/g, " ");
}
