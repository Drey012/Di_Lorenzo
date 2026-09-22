const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const header = document.querySelector('[data-header]');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

const dots = [...document.querySelectorAll('.slider-dot')];
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    dots.forEach((item) => item.classList.remove('is-active'));
    dot.classList.add('is-active');
    const card = document.querySelector('[data-team-card]');
    if (card) card.dataset.active = String(index);
  });
});

const form = document.querySelector('[data-contact-form]');
const toast = document.querySelector('[data-toast]');
let toastTimer;
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.reset();
  if (toast) {
    toast.textContent = 'Mensagem recebida. Em breve entraremos em contato.';
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });
