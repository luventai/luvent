import { BASE_PATH } from "../lib/seo.js";
import { renderLogo } from "./logo.js";

export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div class="site-footer__brand">
          ${renderLogo({ size: "medium", variant: "horizontal", tone: "white", link: true, animated: true })}
          <p>We test AI tools ourselves and tell you exactly which one fits you.</p>
        </div>
        <div class="site-footer__col">
          <h4>Explore</h4>
          <a href="${BASE_PATH}/best/">Best Tools</a>
          <a href="${BASE_PATH}/guides/">Guides</a>
          <a href="${BASE_PATH}/#finder">Finder</a>
        </div>
        <div class="site-footer__col">
          <h4>Trust</h4>
          <a href="${BASE_PATH}/how-we-test.html">How we test</a>
          <a href="${BASE_PATH}/about.html">About</a>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span class="luvent-badge">${renderLogo({ size: "small", variant: "icon", animated: false })} Verified by Luvent</span>
        <span>&copy; ${year} Luvent. All rights reserved.</span>
        <span>Some links on this site are affiliate links — clearly marked, never influencing our scores.</span>
      </div>
    </footer>
  `;
}
