/* inkboom — shared mobile navigation
   Handles:
   - .nav__burger  →  toggles .nav--open on the closest <header class="nav">
   - .sidebar-toggle  →  toggles .sidebar-drawer--open on the next sibling .sidebar-drawer
   - Close drawer when any link inside it is clicked
   - Close drawer on resize back to desktop
*/
(function () {
  'use strict';

  /* ── Nav burger ────────────────────────────────────────────────── */
  document.querySelectorAll('.nav__burger').forEach(function (btn) {
    var header = btn.closest('.nav');
    if (!header) return;

    btn.addEventListener('click', function () {
      var open = header.classList.toggle('nav--open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  });

  /* Close nav drawer when a link inside it is tapped */
  document.querySelectorAll('.nav__drawer-link').forEach(function (link) {
    link.addEventListener('click', function () {
      var header = link.closest('.nav');
      if (header) {
        header.classList.remove('nav--open');
        var btn = header.querySelector('.nav__burger');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-label', 'Open menu');
        }
      }
    });
  });

  /* ── Docs sidebar toggle ────────────────────────────────────────── */
  document.querySelectorAll('.sidebar-toggle').forEach(function (btn) {
    var drawer = document.querySelector('.sidebar-drawer');
    if (!drawer) return;

    btn.addEventListener('click', function () {
      var open = drawer.classList.toggle('sidebar-drawer--open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* Close sidebar drawer when a link inside it is tapped */
  document.querySelectorAll('.sidebar-drawer__links a').forEach(function (link) {
    link.addEventListener('click', function () {
      var drawer = document.querySelector('.sidebar-drawer');
      if (drawer) {
        drawer.classList.remove('sidebar-drawer--open');
        var btn = document.querySelector('.sidebar-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ── Reset on desktop resize ─────────────────────────────────────── */
  var mq = window.matchMedia('(min-width: 768px)');
  function onResize(e) {
    if (e.matches) {
      document.querySelectorAll('.nav').forEach(function (h) {
        h.classList.remove('nav--open');
      });
      document.querySelectorAll('.nav__burger').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.setAttribute('aria-label', 'Open menu');
      });
    }
  }
  mq.addEventListener('change', onResize);
})();
