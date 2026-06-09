// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// tutup menu mobile saat diklik
document.querySelectorAll('.navbar__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// tautan navigasi aktif saat scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__link');
const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

function setActiveLink(sectionId) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
  mobileLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

function getActiveSection() {
  const navbarHeight = 80;
  const scrollY = window.scrollY;

  // Cek dari bagian bawah ke atas
  // Bagian dianggap aktif kalau top-nya sudah melewati tengah layar ke atas
  const triggerPoint = scrollY + navbarHeight + 40;

  let active = sections[0].id; // default ke section pertama

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (triggerPoint >= sectionTop) {
      active = section.id;
    }
  });

  return active;
}

function onScroll() {
  setActiveLink(getActiveSection());
}

window.addEventListener('scroll', onScroll, { passive: true });
// Set active on load
onScroll();

// Animasi tampilan scroll
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement
        ? Array.from(entry.target.parentElement.querySelectorAll(':scope > .reveal'))
        : [];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});