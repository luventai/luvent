import { escapeHtml } from "../lib/seo.js";

export function renderHero({ title, subtitle, ctaLabel, ctaHref }) {
  return `
<section class="hero section">

  <div class="container hero__inner">

    <div class="hero__eyebrow">
      <span class="hero__dot"></span>
      Find your AI tool
    </div>

    <h1 class="hero__title">
      ${escapeHtml(title)}
    </h1>

    <p class="hero__subtitle">
      ${escapeHtml(subtitle)}
    </p>

    <div class="hero__actions">
      ${
        ctaLabel
          ? `<a class="btn btn-primary" href="${ctaHref}">
              ${escapeHtml(ctaLabel)}
            </a>`
          : ""
      }

      <a class="btn btn-ghost" href="/luvent/best/">
        Browse AI Tools
      </a>
    </div>

    <div class="hero__stats">

      <div class="hero__stat">
        <strong>50+</strong>
        <span>AI tools tested</span>
      </div>

      <div class="hero__stat">
        <strong