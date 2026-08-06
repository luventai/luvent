// components/newsletter.js
// Static for now — no submission endpoint wired up yet. Swap the
// form's action/method for a real provider (Mailchimp, ConvertKit,
// Buttondown...) when one is chosen; markup and styling won't need to change.
import { renderLogo } from "./logo.js";

export function renderNewsletter() {
  return `
    <section class="newsletter section container">
      <span class="luvent-badge">${renderLogo({ size: "small", variant: "icon", animated: false })} AI Finder</span>
      <h2>One email a week. Zero fluff.</h2>
      <p>New tools, updated rankings, and the occasional tool we tell you to skip.</p>
      <form class="newsletter__form" data-luvent-newsletter>
        <input type="email" name="email" placeholder="you@email.com" required aria-label="Email address">
        <button class="btn btn-primary" type="submit">Subscribe</button>
      </form>
    </section>
  `;
}
