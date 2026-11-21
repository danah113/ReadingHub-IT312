/* ReadingHub — Home page script
   1. "Back to top" button: appears after scrolling down, scrolls back up when clicked
   2. Real-time clock in the footer */

(function () {
  // ---------- 1. Back to top ----------
  var topBtn = document.getElementById('back-to-top');
  var SHOW_AFTER = 300; // pixels scrolled before the button appears

  function updateButton() {
    topBtn.hidden = window.scrollY < SHOW_AFTER;
  }

  if (topBtn) {
    window.addEventListener('scroll', updateButton, { passive: true });
    updateButton();

    topBtn.addEventListener('click', function () {
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      // keep keyboard focus somewhere sensible once the button hides
      var brand = document.querySelector('.brand');
      if (brand) { brand.focus({ preventScroll: true }); }
    });
  }

  // ---------- 2. Real-time clock ----------
  var clock = document.getElementById('clock');

  function tick() {
    var now = new Date();
    var date = now.toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    var time = now.toLocaleTimeString(undefined, {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    clock.textContent = date + ', ' + time;
    clock.setAttribute('datetime', now.toISOString());
  }

  if (clock) {
    tick();
    setInterval(tick, 1000);
  }
})();