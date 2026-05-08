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
}
