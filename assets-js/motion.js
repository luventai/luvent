// assets-js/motion.js
// Client-only premium motion layer: section reveal-on-scroll and
// animated stat counters. Lives in assets-js/ (not lib/) because it's
// browser-only — DOM, IntersectionObserver, requestAnimationFrame —
// and is never touched by the Node build itself (see build.js's
// copyAssets(), which copies this folder to dist/js/ verbatim).

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ---------- Section reveal ----------
// Targets the direct children of <main> — every homepage section
// (hero, marquee belt, tool grids, trust, finder, newsletter, faq)
// is exactly that, and so is every other page's single content div,
// so this one rule reveals consistently across the whole site without
// any component needing to opt in individually.

function initRevealOnScroll() {
  const targets = document.querySelectorAll("main > section, main > div");
  if (targets.length === 0) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el, i) => {
    // Stagger only the first few — sections further down the page are
    // already off-screen long enough that a delay would just feel laggy.
    el.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
    observer.observe(el);
  });
}

// ---------- Animated stat counters ----------
// Looks for elements marked data-counter with a numeric data-count-to
// target (see components/hero.js). Counts up once, on first view.

function animateCount(el) {
  const target = parseFloat(el.dataset.countTo);
  const suffix = el.dataset.countSuffix || "";
  if (Number.isNaN(target)) return;

  if (prefersReducedMotion()) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initStatCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

export function initMotion() {
  initRevealOnScroll();
  initStatCounters();
}
