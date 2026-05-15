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
