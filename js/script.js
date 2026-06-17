// ============================================
// SHARED JAVASCRIPT — MARIA CLARA FOTOGRAFIA
// ============================================

// ── LOADER ────────────────────────────────────
const loader = document.getElementById('loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 1600);
  });
}

// ── CURSOR ────────────────────────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
if (cursor && follower) {
  let fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    fx += (e.clientX - fx) * 0.12;
    fy += (e.clientY - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
  });
}

// ── NAV SCROLL ────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── MOBILE MENU ───────────────────────────────
const menuBtn    = document.getElementById('navMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
    })
  );
}

// ── REVEAL ON SCROLL ──────────────────────────
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-card, .reveal-mosaic, .reveal-strip'
);
if (revealEls.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// ── PARALLAX HERO CARDS ───────────────────────
const parallaxCards = document.querySelectorAll('.parallax-card');
if (parallaxCards.length > 0) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    parallaxCards.forEach(card => {
      const speed = parseFloat(card.dataset.speed || 0.05);
      card.style.transform = `translateY(${sy * speed}px)`;
    });
  });
}

// ── COUNTER ANIMATION ─────────────────────────
const counterStats = document.querySelectorAll('.counter-stat');
if (counterStats.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target.querySelector('[data-target]');
        if (!el) return;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1800;
        const step   = 16;
        const inc    = target / (dur / step);
        let cur      = 0;
        const timer  = setInterval(() => {
          cur += inc;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = Math.floor(cur).toLocaleString('pt-BR');
        }, step);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterStats.forEach(el => counterObserver.observe(el));
}