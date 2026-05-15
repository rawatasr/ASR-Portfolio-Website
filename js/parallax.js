/**
 * Hero Parallax — Scroll-driven offset for background name text
 */
window.initParallax = function() {
  const heroBg = document.getElementById('heroBg');
  const heroOv = document.getElementById('heroOv');
  const hero = heroBg?.closest('.hero') || heroOv?.closest('.hero');

  if (!heroBg && !heroOv) return;

  const applyParallax = () => {
    const y = window.scrollY;
    const transform = `translate(-50%, calc(-50% + ${y * 0.28}px))`;

    if (heroBg) heroBg.style.transform = transform;
    if (heroOv) heroOv.style.transform = transform;
  };

  const fitHeroName = () => {
    if (!heroBg || !hero) return;

    if (window.innerWidth <= 767 || window.innerWidth >= 1920) {
      heroBg.style.removeProperty('--hero-name-fit-size');
      return;
    }

    heroBg.style.setProperty('--hero-name-fit-size', '100px');

    requestAnimationFrame(() => {
      const textRange = document.createRange();
      textRange.selectNodeContents(heroBg);

      const textWidth = textRange.getBoundingClientRect().width;
      const targetWidth = hero.clientWidth;
      textRange.detach();

      if (!textWidth || !targetWidth) return;

      const fittedSize = (targetWidth / textWidth) * 100;
      heroBg.style.setProperty('--hero-name-fit-size', `${fittedSize}px`);
    });
  };

  fitHeroName();
  window.addEventListener('resize', fitHeroName, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(fitHeroName);
  }

  if (window.ResizeObserver && hero) {
    new ResizeObserver(fitHeroName).observe(hero);
  }

  window.addEventListener('scroll', () => {
    // Disable parallax on mobile viewports
    if (window.innerWidth <= 768) return;

    applyParallax();
  }, { passive: true });
};
