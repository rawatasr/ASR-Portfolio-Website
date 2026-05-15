/**
 * Hero Parallax — Scroll-driven offset for background name text
 */
window.initParallax = function() {
  const heroBg = document.getElementById('heroBg');
  const heroOv = document.getElementById('heroOv');

  if (!heroBg && !heroOv) return;

  window.addEventListener('scroll', () => {
    // Disable parallax on mobile viewports
    if (window.innerWidth <= 768) return;

    const y = window.scrollY;
    const transform = `translate(-50%, calc(-50% + ${y * 0.28}px))`;

    if (heroBg) heroBg.style.transform = transform;
    if (heroOv) heroOv.style.transform = transform;
  }, { passive: true });
}
