
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

const carousel = document.querySelector('[data-team-carousel]');

if (carousel) {
  const cards = Array.from(carousel.querySelectorAll('.team-card'));
  const dots = Array.from(document.querySelectorAll('.carousel-dots button'));
  const previousButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  let activeIndex = 0;
  let scrollTimeout;

  const updateCarousel = (index) => {
    activeIndex = Math.max(0, Math.min(index, cards.length - 1));

    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;

      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });

    if (previousButton) {
      previousButton.disabled = false;
    }

    if (nextButton) {
      nextButton.disabled = false;
    }
  };

  const goToSlide = (index) => {
    if (!cards.length) return;

    const targetIndex = (index + cards.length) % cards.length;

    carousel.scrollTo({
      left: cards[targetIndex].offsetLeft - cards[0].offsetLeft,
      behavior: 'smooth'
    });

    updateCarousel(targetIndex);
  };

  previousButton?.addEventListener('click', () => {
    goToSlide(activeIndex - 1);
  });

  nextButton?.addEventListener('click', () => {
    goToSlide(activeIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft - cards[0].offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      updateCarousel(closestIndex);
    }, 80);
  }, { passive: true });

  updateCarousel(0);
}

const revealTargets = document.querySelectorAll(
  '.practice, .team, .contact, .site-footer'
);

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
  revealTargets.forEach((section) => {
    section.classList.add('is-visible');
  });
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });
