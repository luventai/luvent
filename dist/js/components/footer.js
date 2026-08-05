import { BASE_PATH } from "../lib/seo.js";

export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div class="site-footer__brand">
          <a class="site-logo" href="${BASE_PATH}/">
            <span class="site-logo__mark" aria-hidden="true"></span>
            Luvent AI
          </a>
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
        <span>&copy; ${year} Luvent. All rights reserved.</span>
        <span>Some links on this site are affiliate links — clearly marked, never influencing our scores.</span>
      </div>
    </footer>
  `;
} 