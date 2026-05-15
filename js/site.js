/* js/scroll-reveal.js */
/**
 * Scroll Reveal — IntersectionObserver-based element reveal animation
 */
window.initScrollReveal = function() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* js/portfolio-scroll.js */
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

/* js/parallax.js */
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

/* js/contact-interactions.js */
/**
 * Contact Interactions — Handles email, phone, and location interactions
 */

window.initContactInteractions = () => {
  const phoneLink = document.getElementById('phone-link');
  const toast = document.getElementById('toast');
  let toastTimeout;

  const emailLink = document.querySelector('a[href^="mailto:"]');

  if (!phoneLink || !toast || !emailLink) return;

  // Email interaction
  emailLink.addEventListener('click', (e) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;
    
    if (!isMobile) {
      // On desktop, we copy the email to clipboard as a fallback
      const email = 'rawatasr01@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
      });
      // We DON'T preventDefault() here, so the mailto: still fires
    }
  });

  // Phone interaction
  phoneLink.addEventListener('click', (e) => {
    // Detect if the device is a mobile device or desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    if (!isMobile) {
      // Desktop behavior: Copy to clipboard
      e.preventDefault();
      const phoneNumber = '+91 90562-78405';

      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast('Phone number copied');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    }
    // Mobile behavior: Let the default tel: link work
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

/* js/main.js */
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
