/* ═══════════════════════════════════════════════
   CUIDMED — animações e interações
   ═══════════════════════════════════════════════ */
(() => {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Habilita estados iniciais de animação apenas com JS ativo
  document.body.classList.add('js-anim');

  /* ── Preloader ─────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const hero = document.querySelector('.hero');
  const finishPreload = () => {
    preloader.classList.add('is-done');
    hero.classList.add('is-in');
    setTimeout(() => preloader.classList.add('is-hidden'), 1300);
  };
  if (prefersReducedMotion) {
    finishPreload();
  } else {
    window.addEventListener('load', () => setTimeout(finishPreload, 2100));
    // fallback caso 'load' demore (fontes lentas)
    setTimeout(finishPreload, 4500);
  }

  /* ── Cruzes flutuantes no hero ─────────────── */
  const crossesWrap = document.getElementById('heroCrosses');
  if (crossesWrap && !prefersReducedMotion) {
    const COUNT = 14;
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('span');
      el.className = 'cross';
      el.textContent = '✚';
      el.style.left = `${Math.random() * 100}%`;
      el.style.fontSize = `${12 + Math.random() * 20}px`;
      el.style.animationDuration = `${16 + Math.random() * 22}s`;
      el.style.animationDelay = `${-Math.random() * 30}s`;
      el.style.opacity = String(0.35 + Math.random() * 0.5);
      crossesWrap.appendChild(el);
    }
  }

  /* ── Header + barra de progresso ───────────── */
  const header = document.getElementById('header');
  const progress = document.getElementById('scrollProgress');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    updateActiveLink();
    driveTruck();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Menu mobile ───────────────────────────── */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ── Link ativo conforme a seção ───────────── */
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav__link')];
  function updateActiveLink() {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    for (const s of sections) if (s.offsetTop <= pos) current = s;
    links.forEach((l) =>
      l.classList.toggle('is-active', l.getAttribute('href') === `#${current.id}`)
    );
  }

  /* ── Reveal on scroll ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const delay = Number(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('is-visible'), delay);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ── Contadores animados ───────────────────── */
  const counters = document.querySelectorAll('[data-counter]');
  const ioCount = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        animateCounter(e.target);
        ioCount.unobserve(e.target);
      }
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => ioCount.observe(el));

  function animateCounter(el) {
    const target = Number(el.dataset.counter);
    if (prefersReducedMotion) { el.textContent = String(target); return; }
    const duration = 1800;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * ease(p)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── Tilt 3D nos cards ─────────────────────── */
  if (!prefersReducedMotion && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      let raf = null;
      card.addEventListener('mousemove', (ev) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5;
          const y = (ev.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
          raf = null;
        });
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── Botões magnéticos ─────────────────────── */
  if (!prefersReducedMotion && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn--magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (ev) => {
        const r = btn.getBoundingClientRect();
        const x = ev.clientX - r.left - r.width / 2;
        const y = ev.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Parallax dos orbes do hero ────────────── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!prefersReducedMotion && parallaxEls.length) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y > window.innerHeight * 1.3) return;
        parallaxEls.forEach((el) => {
          el.style.translate = `0 ${y * Number(el.dataset.parallax)}px`;
        });
      },
      { passive: true }
    );
  }

  /* ── Glow que segue o cursor ───────────────── */
  const glow = document.getElementById('cursorGlow');
  if (glow && !prefersReducedMotion && matchMedia('(hover: hover)').matches) {
    let gx = -500, gy = -500, tx = gx, ty = gy;
    window.addEventListener('mousemove', (ev) => {
      tx = ev.clientX; ty = ev.clientY;
      document.body.classList.add('has-cursor');
    }, { passive: true });
    const loop = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx - 240}px, ${gy - 240}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ── Caminhão na rota (Como funciona) ──────── */
  const route = document.getElementById('stepsRoute');
  const truck = document.getElementById('stepsTruck');
  let routeLen = 0;
  if (route && truck) routeLen = route.getTotalLength();

  function driveTruck() {
    if (!route || !truck || !routeLen || prefersReducedMotion) return;
    const svg = route.ownerSVGElement;
    const r = svg.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight || r.width === 0) return;
    // progresso: 0 quando o topo do SVG entra na tela, 1 quando sai por cima
    const raw = (window.innerHeight - r.top) / (window.innerHeight + r.height);
    const p = Math.min(Math.max(raw, 0), 1);
    const pt = route.getPointAtLength(p * routeLen);
    const ahead = route.getPointAtLength(Math.min(p * routeLen + 1, routeLen));
    const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    truck.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${angle})`);
  }

  /* ── Ano no rodapé ─────────────────────────── */
  document.getElementById('year').textContent = String(new Date().getFullYear());

  onScroll();
})();
