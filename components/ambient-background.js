// components/ambient-background.js
// A single fixed, decorative layer sitting behind every page: a few
// slow-drifting gradient orbs plus a faint network-line pattern.
// Pure CSS (transform/opacity only, see ambient-background.css) — no
// canvas, no JS, no particles library. Rendered once by lib/layout.js
// so it appears on every page without any page having to know about it.

export function renderAmbientBackground() {
  return `
    <div class="ambient-bg" aria-hidden="true">
      <span class="ambient-bg__orb ambient-bg__orb--1"></span>
      <span class="ambient-bg__orb ambient-bg__orb--2"></span>
      <span class="ambient-bg__orb ambient-bg__orb--3"></span>
      <svg class="ambient-bg__net" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <g class="ambient-bg__net-group">
          <line x1="0" y1="130" x2="1200" y2="70" />
          <line x1="0" y1="430" x2="1200" y2="370" />
          <line x1="90" y1="0" x2="230" y2="800" />
          <line x1="970" y1="0" x2="1110" y2="800" />
          <line x1="230" y1="800" x2="620" y2="370" />
          <line x1="1110" y1="0" x2="620" y2="370" />
          <circle cx="230" cy="800" r="3" />
          <circle cx="620" cy="370" r="3" />
          <circle cx="1110" cy="0" r="3" />
          <circle cx="90" cy="0" r="3" />
          <circle cx="970" cy="800" r="3" />
        </g>
      </svg>
    </div>
  `;
}
