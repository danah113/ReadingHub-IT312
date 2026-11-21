/* ReadingHub — shared script (loaded in <head> on Home and Offerings)
   1. Theme switcher (light / dark), remembered between pages
      (the header logo also changes: images/logodark.png in the dark theme)
   2. Collapsible navigation menu on small screens */

(function () {
  var root = document.documentElement;
  var KEY = 'rh-theme';

  // Lets the CSS know JavaScript is running
  root.classList.add('js');

  function getSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* storage blocked: ignore */ }
  }

  var current = getSaved() === 'dark' ? 'dark' : 'light';

  // Logo shown in the dark (night) theme. The light-theme logo is whatever
  // image the page already uses, so it is remembered and restored automatically.
  var DARK_LOGO = 'images/logodark.png';

  function applyLogo(theme) {
    var logo = document.querySelector('.brand img');
    if (!logo) { return; }
    if (!logo.getAttribute('data-light-src')) {
      logo.setAttribute('data-light-src', logo.getAttribute('src'));
    }
    logo.setAttribute('src', theme === 'dark' ? DARK_LOGO : logo.getAttribute('data-light-src'));
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    applyLogo(theme); // does nothing until the logo exists in the page
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
    }
  }

  // Runs immediately (script is in <head>), so there is no flash of the wrong theme
  applyTheme(current);

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(current); // updates the button label now that it exists

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        current = current === 'dark' ? 'light' : 'dark';
        applyTheme(current);
        save(current);
      });
    }

    var navBtn = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (navBtn && nav) {
      function setMenu(open) {
        nav.classList.toggle('open', open);
        navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      navBtn.addEventListener('click', function () {
        setMenu(!nav.classList.contains('open'));
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setMenu(false); }
      });
      // If the window is resized to desktop width, reset the menu state
      window.addEventListener('resize', function () {
        if (window.innerWidth > 860) { setMenu(false); }
      });
    }
  });
})();