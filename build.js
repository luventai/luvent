const body = `
  ${renderHero({
    title: "Choose AI with confidence.",
    subtitle: "Independent reviews, side-by-side comparisons and smart recommendations that help you choose the perfect AI tool.",
    ctaLabel: "Explore AI Tools",
    ctaHref: "/best/",
  })}

  ${renderSearch()}

  <section class="section container">
    <h2>Recently tested AI tools</h2>
    <div class="grid">
      ${tools.map(renderToolCard).join("\n")}
    </div>
  </section>

  <section id="finder" class="section container">
    <h2>AI Finder</h2>
    <p>Answer a few questions and we'll recommend the best AI tool for your needs.</p>
    ${renderFinderForm()}
  </section>

  ${renderFaq(generalFaq)}
`;