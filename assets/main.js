/* =========================================================
   Md. Meherab Hossen — portfolio behaviour
   No build step, no dependencies. Works on GitHub Pages.
   ========================================================= */
(function () {
  'use strict';

  var pages   = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var navLinks= Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  var rail    = document.getElementById('rail');
  var burger  = document.getElementById('burger');
  var scrim   = document.getElementById('scrim');
  var main    = document.getElementById('main');
  var mobile  = window.matchMedia('(max-width: 960px)');
  var DEFAULT = 'home';

  /* ---------- page switching ---------- */
  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)) || DEFAULT; }
    catch (err) { return DEFAULT; }
  }

  function show(id, push, moveFocus) {
    var anchor = document.getElementById(id);
    var target = anchor && anchor.closest('.page');
    // The skip link keeps the current section. References and study links
    // activate their containing page before the browser scrolls to them.
    if (id === 'main') target = document.querySelector('.page.is-active');
    if (!target) {
      id = DEFAULT;
      anchor = target = document.getElementById(DEFAULT);
    }
    var pageId = target.id;

    pages.forEach(function (p) { p.classList.toggle('is-active', p === target); });

    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + pageId;
      a.classList.toggle('is-current', on);
      if (on) { a.setAttribute('aria-current', 'page'); } else { a.removeAttribute('aria-current'); }
      if (on && a.closest('details')) a.closest('details').open = true;
    });

    document.title = titleFor(pageId);
    if (push && location.hash !== '#' + id) { history.pushState(null, '', '#' + id); }
    var destination = (anchor === target || id === 'main') ? target.querySelector('h1') : anchor;
    if (moveFocus && destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
    if (anchor === target || id === 'main') window.scrollTo(0, 0);
    else anchor.scrollIntoView({ block: 'start' });
  }

  function titleFor(id) {
    var link = document.querySelector('.menu a[href="#' + id + '"]');
    var label = link ? link.textContent.trim() : '';
    var base = 'Md. Meherab Hossen';
    return (id === 'home' || !label) ? base + ' — Mechanical Engineering, CFD & Thermal Sciences'
                                     : label + ' — ' + base;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey ||
        e.shiftKey || e.altKey || a.hasAttribute('download') || a.target) return;
    var id;
    try { id = decodeURIComponent(a.getAttribute('href').slice(1)); }
    catch (err) { return; }
    if (!id) return;
    e.preventDefault();
    closeRail();
    show(id, true, true);
  });

  window.addEventListener('hashchange', function () {
    closeRail();
    show(hashId(), false, true);
  });

  show(hashId(), false, false);

  /* ---------- mobile drawer ---------- */
  function openRail() {
    if (!mobile.matches) return;
    rail.classList.add('is-open');
    rail.inert = false;
    main.inert = true;
    document.body.classList.add('drawer-open');
    burger.setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    rail.querySelector('a').focus();
  }
  function closeRail(restoreFocus) {
    if (restoreFocus === true) burger.focus();
    rail.classList.remove('is-open');
    rail.inert = mobile.matches;
    main.inert = false;
    document.body.classList.remove('drawer-open');
    burger.setAttribute('aria-expanded', 'false');
    scrim.hidden = true;
  }
  burger.addEventListener('click', function () {
    rail.classList.contains('is-open') ? closeRail(true) : openRail();
  });
  scrim.addEventListener('click', function () { closeRail(true); });
  document.addEventListener('keydown', function (e) {
    if (!rail.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeRail(true); }
    if (e.key !== 'Tab') return;
    var items = [burger].concat(Array.prototype.slice.call(
      rail.querySelectorAll('a, button, summary')
    ).filter(function (el) { return el.getClientRects().length > 0; }));
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  mobile.addEventListener('change', function () { closeRail(); });
  closeRail();

  /* ---------- theme ---------- */
  var themeBtn = document.getElementById('theme');
  var label    = themeBtn.querySelector('.theme__txt');

  function store(key, val) { try { localStorage.setItem(key, val); } catch (err) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (err) { return null; } }

  function setTheme(mode) {
    if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    themeBtn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    label.textContent = mode === 'dark' ? 'Light' : 'Dark';
    store('theme', mode);
  }

  var saved = read('theme');
  if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { saved = 'dark'; }
  setTheme(saved === 'dark' ? 'dark' : 'light');

  themeBtn.addEventListener('click', function () {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- images that have not been added yet ---------- */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    var box = img.parentElement;
    if (!box) return;
    if (box.classList.contains('hero__img') || box.classList.contains('avatar') ||
        box.classList.contains('edu__logo')) {
      img.style.display = 'none';
      return;
    }
    box.classList.add('is-missing');
    box.setAttribute('data-hint', img.getAttribute('alt') || 'Image goes here');
  }, true);

  /* ---------- drop links that have not been filled in ---------- */
  // Video links stay hidden until you paste a real URL over the "#".
  Array.prototype.forEach.call(document.querySelectorAll('a[data-video]'), function (a) {
    var href = a.getAttribute('href');
    if (!href || href === '#') { a.remove(); }
  });

  // PDF links hide themselves until the file is actually uploaded, so a visitor
  // never lands on a 404. Skipped when opening the page straight off disk.
  if (location.protocol !== 'file:' && window.fetch) {
    Array.prototype.forEach.call(document.querySelectorAll('a[data-optional]'), function (a) {
      fetch(a.getAttribute('href'), { method: 'HEAD' })
        .then(function (r) { if (!r.ok) a.remove(); })
        .catch(function () { a.remove(); });
    });
  }

  /* ---------- year ---------- */
  var y = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll('#year, .year'), function (el) { el.textContent = y; });
})();
