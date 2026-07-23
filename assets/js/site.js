/* ============================================================================
   HIVnext — shared site behaviour
   Runs on every page. Reads window.SITE_CONFIG (config.js) to build the nav,
   footer, and CTA links so branding only has to be edited in one place.
   ============================================================================ */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     THEME
     (Note: the *initial* theme is already applied by a tiny inline script
     in <head>, before this file loads, to avoid a flash of the wrong
     theme. This section just wires up the toggle switch.)
  --------------------------------------------------------------------- */
  function getTheme() { return root.getAttribute('data-theme') || 'dark'; }

  function applyThemeToLogos(theme) {
    document.querySelectorAll('[data-logo-dark]').forEach(function (img) {
      var next = theme === 'light' ? img.getAttribute('data-logo-light') : img.getAttribute('data-logo-dark');
      if (next && img.getAttribute('src') !== next) img.setAttribute('src', next);
    });
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) { try { localStorage.setItem('hivnext-theme', theme); } catch (e) {} }
    applyThemeToLogos(theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
    });
  }

  function initThemeToggle() {
    applyThemeToLogos(getTheme());
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
      });
    });
  }

  /* ---------------------------------------------------------------------
     HEADER
  --------------------------------------------------------------------- */
  function sunIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  }
  function moonIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';
  }

  function renderHeader(activePage) {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    var logo = (CFG.headerLogo || {});
    var pages = [
      { href: 'index.html', label: 'Home', id: 'home' },
      { href: 'poster.html', label: 'Virtual Poster', id: 'poster' },
      { href: 'abstract.html', label: 'Abstract', id: 'abstract' }
    ];
    var links = pages.map(function (p) {
      var current = p.id === activePage ? ' aria-current="page"' : '';
      return '<a href="' + p.href + '" class="nav-link"' + current + '>' + p.label + '</a>';
    }).join('');

    mount.innerHTML =
      '<nav class="site-nav">' +
        '<div class="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">' +
          '<a href="' + (logo.href || 'index.html') + '" class="flex items-center gap-2.5 logo-mark">' +
            '<img src="' + (logo.srcDark || '') + '" data-logo-dark="' + (logo.srcDark || '') + '" data-logo-light="' + (logo.srcLight || '') + '" alt="' + (logo.alt || CFG.siteName || 'Logo') + '">' +
          '</a>' +
          '<div class="hidden md:flex items-center gap-8">' + links + '</div>' +
          '<div class="flex items-center gap-4">' +
            '<button type="button" class="theme-toggle" role="switch" aria-checked="false" aria-label="Toggle light and dark theme">' +
              '<span class="knob">' + moonIcon() + '</span>' +
            '</button>' +
            '<a href="' + (CFG.demoBookingUrl || '#') + '" class="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5 rounded-full" data-cta="demo">' + (CFG.demoButtonLabel || 'Book a demo') + '</a>' +
            '<button type="button" id="mobile-menu-btn" class="md:hidden hamburger" aria-label="Open menu" aria-expanded="false">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<div class="mobile-menu md:hidden" id="mobile-menu">' +
        '<div class="h-full flex flex-col items-center justify-center gap-8 text-2xl font-display font-semibold">' +
          pages.map(function (p) {
            var current = p.id === activePage ? ' aria-current="page"' : '';
            return '<a href="' + p.href + '" class="nav-link"' + current + '>' + p.label + '</a>';
          }).join('') +
          '<a href="' + (CFG.demoBookingUrl || '#') + '" class="btn-primary text-lg px-8 py-3.5 rounded-full mt-2" data-cta="demo">' + (CFG.demoButtonLabel || 'Book a demo') + '</a>' +
        '</div>' +
      '</div>';

    // Mobile menu toggle
    var menuBtn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        menuBtn.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('open');
          menuBtn.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  /* ---------------------------------------------------------------------
     FOOTER
  --------------------------------------------------------------------- */
  function renderFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    var initiative = CFG.footerInitiative || {};
    var wordmark = CFG.footerWordmark || {};
    var initiativeHtml = '';
    var wordmarkHtml = '';

    if (initiative.logo || initiative.label) {
      initiativeHtml =
        '<div class="footer-initiative">' +
          (initiative.logo
            ? '<img class="footer-initiative-logo" src="' + initiative.logo + '" alt="' + (initiative.alt || '') + '">'
            : '') +
          (initiative.label
            ? '<span class="footer-initiative-copy">' + initiative.label + '</span>'
            : '') +
        '</div>';
    }

    if (wordmark.srcDark || wordmark.srcLight) {
      var wordmarkImage =
        '<img src="' + (wordmark.srcDark || wordmark.srcLight || '') + '"' +
          ' data-logo-dark="' + (wordmark.srcDark || wordmark.srcLight || '') + '"' +
          ' data-logo-light="' + (wordmark.srcLight || wordmark.srcDark || '') + '"' +
          ' alt="' + (wordmark.alt || CFG.siteName || 'HIVnext') + '">';

      wordmarkHtml = wordmark.href
        ? '<a class="footer-wordmark" href="' + wordmark.href + '" aria-label="' + (wordmark.alt || CFG.siteName || 'HIVnext') + '">' + wordmarkImage + '</a>'
        : '<div class="footer-wordmark">' + wordmarkImage + '</div>';
    }

    mount.innerHTML =
      '<footer class="site-footer border-t u-border py-12">' +
        '<div class="max-w-6xl mx-auto px-5">' +
          '<div class="footer-main">' +
            initiativeHtml +
            wordmarkHtml +
          '</div>' +
          '<div class="mt-8 pt-6 border-t u-border flex flex-col sm:flex-row items-center justify-between gap-3">' +
            '<p class="text-xs u-text-faint font-mono">' + (CFG.siteTagline || '') + ' · ' + (CFG.contactNote || '') + '</p>' +
            '<a href="mailto:' + (CFG.contactEmail || '') + '" class="text-xs u-text-faint font-mono hover:u-ink-1">' + (CFG.contactEmail || '') + '</a>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ---------------------------------------------------------------------
     CTA links — anything marked data-cta="demo" points at the config URL
  --------------------------------------------------------------------- */
  function wireCtas() {
    document.querySelectorAll('[data-cta="demo"]').forEach(function (a) {
      if (CFG.demoBookingUrl) a.setAttribute('href', CFG.demoBookingUrl);
    });
  }

  /* ---------------------------------------------------------------------
     PAGE TRANSITIONS
     Fade to background colour, then navigate — fade back in on load via
     the .page-enter class already present in the markup.
  --------------------------------------------------------------------- */
  function initPageTransitions() {
    var overlay = document.getElementById('page-transition');
    if (!overlay || reduced) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var isInternal = href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#') && a.target !== '_blank';
      if (!isInternal) return;
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(function () { window.location.href = href; }, 320);
    });
  }

  /* ---------------------------------------------------------------------
     Lightweight scroll reveal (CSS-only, no GSAP) — for poster.html/abstract.html
  --------------------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Init
  --------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderHeader(document.body.getAttribute('data-page') || 'home');
    renderFooter();
    initThemeToggle();
    wireCtas();
    initPageTransitions();
    initReveal();
  });
})();
