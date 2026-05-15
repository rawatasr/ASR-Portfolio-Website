/**
 * Main — Entry point, initializes all modules
 */

document.addEventListener('DOMContentLoaded', () => {
  initDeferredMedia();
  initLazyBackgrounds();
  if (window.initScrollReveal) window.initScrollReveal();
  if (window.initPortfolioScroll) window.initPortfolioScroll();
  if (window.initParallax) window.initParallax();
  if (window.initContactInteractions) window.initContactInteractions();
});

function initDeferredMedia() {
  const media = document.querySelectorAll('img[data-src], source[data-srcset]');
  if (!media.length) return;

  const loadMedia = (element) => {
    if (element.dataset.srcset) {
      element.srcset = element.dataset.srcset;
      element.removeAttribute('data-srcset');
    }

    if (element.dataset.src) {
      element.src = element.dataset.src;
      element.removeAttribute('data-src');
    }
  };

  if (!('IntersectionObserver' in window)) {
    media.forEach(loadMedia);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const container = entry.target;
      container.querySelectorAll('source[data-srcset], img[data-src]').forEach(loadMedia);
      if (container.matches('source[data-srcset], img[data-src]')) loadMedia(container);
      observer.unobserve(container);
    });
  }, { rootMargin: '250px 0px' });

  document.querySelectorAll('.video-thumbnail, .port-card').forEach((container) => {
    if (container.querySelector('img[data-src], source[data-srcset]')) observer.observe(container);
  });
}

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
