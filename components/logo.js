// components/logo.js
// Single reusable Logo component. Every place the Luvent mark appears
// (header, footer, hero, 404, loading states, finder, trust badges)
// renders through this function — one source of truth, one place to
// update if the brand ever changes.
//
// Usage:
//   renderLogo()                                   // default: medium, horizontal, color
//   renderLogo({ size: "small", variant: "icon" })  // icon-only, small
//   renderLogo({ tone: "white", animated: false })  // static monochrome
//
import { BASE_PATH } from "../lib/seo.js";

const SIZES = {
  large: { icon: 56, text: 30 },
  medium: { icon: 32, text: 18 },
  small: { icon: 22, text: 14 },
};

const SRC_BY_TONE = {
  color: `${BASE_PATH}/assets/logos/luvent-icon.svg`,
  white: `${BASE_PATH}/assets/logos/luvent-white.svg`,
  dark: `${BASE_PATH}/assets/logos/luvent-dark.svg`,
};

/**
 * @param {Object} opts
 * @param {"large"|"medium"|"small"} [opts.size] - visual scale
 * @param {"horizontal"|"icon"} [opts.variant] - icon+wordmark, or icon only
 * @param {"color"|"white"|"dark"} [opts.tone] - gradient color, or flat monochrome
 * @param {boolean} [opts.animated] - opt into the idle brand animation (float/glow/twinkle)
 * @param {boolean} [opts.link] - wrap in an <a> back to the homepage
 * @param {string} [opts.className] - extra class(es) on the wrapper
 */
export function renderLogo(opts = {}) {
  const {
    size = "medium",
    variant = "horizontal",
    tone = "color",
    animated = true,
    link = false,
    className = "",
  } = opts;

  const dims = SIZES[size] || SIZES.medium;
  const iconSrc = tone === "color"
    ? `${BASE_PATH}/assets/logos/luvent-icon.svg`
    : SRC_BY_TONE[tone];

  const classes = [
    "luvent-logo",
    `luvent-logo--${size}`,
    `luvent-logo--${variant}`,
    animated ? "luvent-logo--animated" : "",
    className,
  ].filter(Boolean).join(" ");

  const mark = `
    <span class="luvent-logo__mark" style="--luvent-logo-icon-size:${dims.icon}px">
      <img
        src="${iconSrc}"
        alt=""
        aria-hidden="true"
        width="${dims.icon}"
        height="${dims.icon}"
        loading="eager"
        decoding="async"
        class="luvent-logo__icon"
      >
      <span class="luvent-logo__star" aria-hidden="true"></span>
    </span>
  `;

  const wordmark = variant === "icon"
    ? ""
    : `<span class="luvent-logo__word" style="font-size:${dims.text}px">LUVENT</span>`;

  const inner = `${mark}${wordmark}`;

  if (link) {
    return `<a class="${classes}" href="${BASE_PATH}/" aria-label="Luvent — home">${inner}</a>`;
  }
  return `<span class="${classes}">${inner}</span>`;
}

/**
 * The animated loading mark: shown wherever Finder is searching or a
 * page/section is fetching data, instead of a generic spinner.
 */
export function renderLogoLoader({ label = "Loading" } = {}) {
  return `
    <div class="luvent-loader" role="status" aria-live="polite">
      <span class="luvent-loader__mark">
        <img
          src="${BASE_PATH}/assets/logos/luvent-icon.svg"
          alt=""
          aria-hidden="true"
          width="40"
          height="40"
          class="luvent-loader__icon"
        >
        <span class="luvent-loader__star" aria-hidden="true"></span>
      </span>
      <span class="luvent-loader__label">${label}</span>
    </div>
  `;
}
