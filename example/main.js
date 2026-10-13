// QuoteColo — behaviour from DESIGN.md §7–§8
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Smooth scrolling (§8.9) ── */
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ lerp: 0.16, wheelMultiplier: 1, smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const lockScroll = (on) => { document.body.classList.toggle('is-locked', on); if (lenis) (on ? lenis.stop() : lenis.start()); };

  /* ── Desktop dropdowns (§7.1) ── */
  const items = $$('.nav__item');
  const closeAll = (except) => items.forEach((it) => { if (it !== except) { it.classList.remove('is-open'); $('.nav__btn', it).setAttribute('aria-expanded', 'false'); } });
  items.forEach((it) => {
    const btn = $('.nav__btn', it);
    let timer;
    const open = () => { clearTimeout(timer); closeAll(it); it.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
    const close = () => { it.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    it.addEventListener('mouseenter', () => { if (hoverable.matches) open(); });
    it.addEventListener('mouseleave', () => { if (hoverable.matches) timer = setTimeout(close, 150); });
    btn.addEventListener('click', () => (it.classList.contains('is-open') ? close() : open()));
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav__item')) closeAll(); });

  /* ── Mobile menu (§3.5.4) ── */
  const burger = $('.burger');
  const mmenu = $('#mmenu');
  const setMenu = (open) => {
    mmenu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('.icon', burger).className = 'icon ' + (open ? 'i-close' : 'i-menu');
    lockScroll(open);
  };
  burger.addEventListener('click', () => setMenu(!mmenu.classList.contains('is-open')));
  $$('.mmenu__item').forEach((it) => {
    $('.mmenu__row', it).addEventListener('click', () => {
      const was = it.classList.contains('is-open');
      $$('.mmenu__item').forEach((x) => x.classList.remove('is-open'));
      if (!was) it.classList.add('is-open');
    });
  });
  $$('.mmenu a, .mmenu .js-quote').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => { if (window.innerWidth >= 1280 && mmenu.classList.contains('is-open')) setMenu(false); });

  /* ── Marquee: duplicate the row (§8.3) ── */
  $$('.marquee__row').forEach((row) => { row.innerHTML += row.innerHTML; });

  /* ── Carousels / horizontal scrollers (§8.4) ── */
  $$('[data-carousel]').forEach((c) => {
    const track = $('.js-track', c);
    const controls = $('.controls', c);
    const prev = $('[data-prev]', c);
    const next = $('[data-next]', c);
    const step = () => {
      // tables: one data column (§6.10); other rows: one card
      if (c.dataset.step === 'col') { const row = $('tbody tr', track); const cell = row.children[1]; return cell.getBoundingClientRect().width + (parseFloat(getComputedStyle(row).columnGap) || 0); }
      const first = track.children[0]; return first.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      controls.hidden = max <= 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  });

  /* ── FAQ (§8.5) ── */
  $$('.faq__item').forEach((b) => b.addEventListener('click', () => {
    const open = b.classList.toggle('is-open');
    b.setAttribute('aria-expanded', String(open));
  }));

  /* ── Services explorer: autoplay every 6 s (§8.5) ── */
  const explorer = $('.explorer');
  const xitems = $$('.xitem');
  const activate = (x) => {
    xitems.forEach((y) => { y.classList.remove('is-active'); y.setAttribute('aria-selected', 'false'); });
    void x.offsetWidth; // restart the progress animation
    x.classList.add('is-active'); x.setAttribute('aria-selected', 'true');
  };
  xitems.forEach((x, i) => {
    x.addEventListener('click', (e) => { if (e.target.closest('.js-quote')) return; activate(x); });
    $('.xitem__fill', x).addEventListener('animationend', () => { if (!reduced) activate(xitems[(i + 1) % xitems.length]); });
  });
  if (explorer && 'IntersectionObserver' in window) {
    // run the timer only while the block is on screen
    new IntersectionObserver(([e]) => explorer.classList.toggle('is-paused', !e.isIntersecting), { threshold: 0.3 }).observe(explorer);
  }

  /* ── Quote modal (§8.6) ── */
  const modal = $('#quote-modal');
  let lastTrigger = null;
  const focusables = () => $$('button, a, input, textarea', modal).filter((el) => !el.disabled);
  const openModal = (trigger) => {
    lastTrigger = trigger;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    $('input', modal).focus();
  };
  const closeModal = () => {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    if (!mmenu.classList.contains('is-open')) lockScroll(false);
    if (lastTrigger) lastTrigger.focus();
  };
  $$('.js-quote').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openModal(b); }));
  $('.modal__close', modal).addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal || e.target.classList.contains('modal__wrap')) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('is-open')) closeModal();
      else if (mmenu.classList.contains('is-open')) setMenu(false);
      else closeAll();
    }
    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const f = focusables(); const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ── Forms (§8.8) ── */
  const valid = (input) => {
    const v = input.value.trim();
    if (!v) return false;
    if (input.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (input.type === 'tel') return /^[0-9 +()\-]{5,}$/.test(v);
    return true;
  };
  $$('.js-form').forEach((form) => {
    let submitted = false;
    const check = (input) => {
      const ok = valid(input);
      const field = input.closest('.field');
      field.classList.toggle('is-error', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    $$('.input', form).forEach((i) => i.addEventListener('blur', () => { if (submitted) check(i); }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitted = true;
      const ok = $$('.input', form).map(check).every(Boolean);
      if (ok) window.location.href = 'thank-you/';
    });
  });

  /* ── Reveal on scroll (§8.10) ── */
  const revealSel = [
    '.section-head', '.hero__top', '.hero__bottom', '.hero__right', '.metric', '.deploy__card', '.providers > h2', '.marquee',
    '.step', '.notice', '.msg', '.match__img', '.crit', '.review', '.panel', '.mrow', '.mquote', '.scen__card', '.scen-cta',
    '.who__big', '.use', '.case', '.founder', '.video', '.explorer', '.browse', '.faq__item', '.fcol', '.loc-group > h3', '.table-scroll', '.note-card', '.table-foot', '.listed__title', '.listed__card'
  ].join(',');
  // cards inside horizontal scrollers reveal together with their track
  const els = [...new Set($$(revealSel).map((el) => el.closest('.js-track') || el))];
  els.forEach((el) => {
    el.setAttribute('data-reveal', '');
    // stagger siblings of the same kind (cards in a row)
    const sibs = [...el.parentElement.children].filter((n) => n.matches(revealSel) || n.classList.contains('js-track'));
    const idx = sibs.indexOf(el);
    if (idx > 0) el.style.setProperty('--reveal-delay', Math.min(idx, 6) * 80 + 'ms');
  });
  if (reduced || !('IntersectionObserver' in window)) els.forEach((el) => el.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }
})();
