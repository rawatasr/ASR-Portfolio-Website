/**
 * Portfolio Scroll — Arrow-button horizontal card carousel
 */
window.initPortfolioScroll = function() {
  // Expose scroll function globally for inline onclick handlers
  window.scrollPort = function (direction) {
    const grid = document.getElementById('portGrid');
    if (!grid) return;
    grid.scrollBy({ left: direction * 420, behavior: 'smooth' });
  };

  // Mobile pagination indicator logic
  const grid = document.getElementById('portGrid');
  const dots = document.querySelectorAll('.port-dot');
  
  if (grid && dots.length > 0) {
    grid.addEventListener('scroll', () => {
      const cards = grid.querySelectorAll('.port-card');
      if (cards.length === 0) return;
      
      let minDistance = Infinity;
      let activeIndex = 0;
      
      cards.forEach((card, index) => {
        const distance = Math.abs((card.offsetLeft - grid.offsetLeft) - grid.scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });
  }
}
