// ── TYPEWRITER ──
const words = ['Telegram-боты', 'SaaS-сервисы', 'FastAPI бэкенды', 'Mini Apps', 'ИИ-ассистентов'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById('typewriter');

function typeLoop() {
  const current = words[wordIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  el.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

// Запуск через 800ms чтобы не мигало сразу
setTimeout(typeLoop, 800);

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1200;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ── INTERSECTION OBSERVER ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    // Анимация появления
    if (e.target.classList.contains('anim')) {
      e.target.classList.add('visible');
    }

    // Счётчики
    e.target.querySelectorAll('.counter').forEach(counter => {
      if (!counter.dataset.counted) {
        counter.dataset.counted = '1';
        animateCounter(counter);
      }
    });
  });
}, { threshold: 0.15 });

// Навешиваем анимацию на карточки
document.querySelectorAll('.card, .pcard, .step, .stack__item').forEach((el, i) => {
  el.classList.add('anim');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// Observe секции для счётчиков
document.querySelectorAll('.hero__stats').forEach(el => observer.observe(el));

// ── ACTIVE NAV LINKS ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${e.target.id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── NAV SCROLL SHADOW ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = '';
  }
}, { passive: true });
