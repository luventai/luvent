// components/footer.js
export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <p>&copy; ${year} Luvent. All rights reserved.</p>
        <nav>
          <a href="/about.html">About</a>
          <a href="/how-we-test.html">How we test</a>
        </nav>
      </div>
    </footer>
  `;
}
