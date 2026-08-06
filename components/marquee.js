// components/marquee.js
// The "AI conveyor belt" — two infinite marquee rows shown directly
// below the hero. Row 1 is tools, row 2 is capabilities. Pure CSS
// animation (transform only, see marquee.css) so it costs nothing in
// JS and pauses cleanly on hover / under prefers-reduced-motion.
// One component, reused nowhere else — but kept as its own file so it
// follows the same "one file per section" rule as every other piece
// of the homepage.

const TOOLS = [
  "ChatGPT", "Claude", "Gemini", "Cursor", "Perplexity", "Midjourney",
  "ElevenLabs", "Runway", "Zapier", "Lovable", "n8n", "Supabase", "Gamma", "v0",
];

const CAPABILITIES = [
  "Writing", "Coding", "Research", "Video", "Images", "Voice",
  "Marketing", "Agents", "Automation", "SEO", "Presentations",
];

function renderRow(items, { reverse = false, label }) {
  // Items are duplicated once so the track can loop seamlessly: at the
  // halfway point (-50%) the duplicate set lines up exactly with where
  // the original set started.
  const doubled = [...items, ...items];
  const chips = doubled
    .map(
      (item, i) => `<span class="marquee__item"${i >= items.length ? ' aria-hidden="true"' : ""}>${item}</span>`
    )
    .join("\n");

  return `
    <div class="marquee${reverse ? " marquee--reverse" : ""}" role="group" aria-label="${label}">
      <div class="marquee__track">
        ${chips}
      </div>
    </div>
  `;
}

export function renderMarquee() {
  return `
    <section class="marquee-belt" aria-label="AI tools and capabilities Luvent covers">
      ${renderRow(TOOLS, { label: "AI tools we cover" })}
      ${renderRow(CAPABILITIES, { reverse: true, label: "Capabilities we cover" })}
    </section>
  `;
}
