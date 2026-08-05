// lib/compare.js
// Blueprint Chapter 5 / 14 — comparisons are always framed around a
// question, never a neutral feature dump. This builds the structured
// data a compare page needs; components/compare-card.js turns it into HTML.
//
// Pure function, no DOM/HTML — portable to Next.js later.

/**
 * @param {Array} toolSlugs - e.g. ["jasper-ai", "copy-ai"]
 * @param {Array} allTools - full tool list from lib/data.js
 * @param {string} useCase - e.g. "blog writing"
 */
export function buildComparison(toolSlugs, allTools, useCase) {
  const tools = toolSlugs.map((slug) => {
    const tool = allTools.find((t) => t.slug === slug);
    if (!tool) throw new Error(`Compare engine: unknown tool slug "${slug}"`);
    return tool;
  });

  const winner = [...tools].sort((a, b) => b.rating - a.rating)[0];

  const featureRows = buildFeatureMatrix(tools);

  return {
    question: `${tools.map((t) => t.name).join(" vs ")} — which is better for ${useCase}?`,
    tools,
    winner,
    verdict: `For ${useCase}, ${winner.name} comes out ahead with a ${winner.rating}/5 rating.`,
    featureRows,
  };
}

function buildFeatureMatrix(tools) {
  const allFeatureKeys = [...new Set(tools.flatMap((t) => t.features.map((f) => f.key)))];
  return allFeatureKeys.map((key) => {
    const row = { feature: key };
    for (const tool of tools) {
      const match = tool.features.find((f) => f.key === key);
      row[tool.slug] = match ? match.value : "—";
    }
    return row;
  });
}
