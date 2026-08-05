// components/search.js
// A static form that works with zero JS (submits to /search.html?q=...),
// and is progressively enhanced client-side by assets/js/search.js for
// instant filtering. No page ever builds its own search box markup.

export function renderSearch({ placeholder = "Search AI tools..." } = {}) {
  return `
    <section class="search-bar">
      <div class="container">
        <form class="search-bar__form" action="/search.html" method="get" data-luvent-search>
          <input
            class="search-bar__input"
            type="search"
            name="q"
            placeholder="${placeholder}"
            aria-label="Search AI tools"
          >
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
      </div>
    </section>
  `;
}
