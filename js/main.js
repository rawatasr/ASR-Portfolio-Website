/**
 * Main — Entry point, initializes all modules
 */

document.addEventListener('DOMContentLoaded', () => {
  initLazyBackgrounds();
  if (window.initScrollReveal) window.initScrollReveal();
  if (window.initPortfolioScroll) window.initPortfolioScroll();
  if (window.initParallax) window.initParallax();
  if (window.initContactInteractions) window.initContactInteractions();
});

function initLazyBackgrounds() {
  const sections = document.querySelectorAll('.lazy-bg');
  if (!sections.length) return;

  const loadBackground = (section) => {
    section.classList.add('lazy-bg-loaded');
  };

  if (!('IntersectionObserver' in window)) {
    sections.forEach(loadBackground);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadBackground(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '150px 0px' });

  sections.forEach((section) => observer.observe(section));
}
