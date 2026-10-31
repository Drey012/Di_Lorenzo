const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const header = document.querySelector('[data-header]');
const desktopNav = window.matchMedia('(min-width: 1024px)');

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menu');
  siteNav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  if (desktopNav.matches) return;

  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  siteNav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

desktopNav.addEventListener('change', () => {
  if (desktopNav.matches) closeMenu();
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.querySelectorAll('.carousel-dots button').forEach((dot) => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('.carousel-dots button').forEach((item) => item.classList.remove('is-active'));
    dot.classList.add('is-active');
  });
});

const revealTargets = document.querySelectorAll('.practice, .team, .contact, .site-footer');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((section) => {
    section.classList.add('is-reveal');
    revealObserver.observe(section);
  });
} else {
  revealTargets.forEach((section) => section.classList.add('is-visible'));
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });
