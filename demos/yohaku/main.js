// 余白 demo: reveal on scroll, header hairline, the "sun" that crosses the day section,
// and a demo-only booking button.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  requestAnimationFrame(function () { root.classList.add('loaded'); });

  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  var top = document.querySelector('.top');
  var day = document.getElementById('day');
  var sun = document.querySelector('.sun');
  function onScroll() {
    top.classList.toggle('scrolled', window.scrollY > 8);
    if (!sun) return;
    var r = day.getBoundingClientRect(), h = window.innerHeight;
    var p = Math.min(1, Math.max(0, (h - r.top) / (r.height + h * 0.4)));
    sun.style.left = (p * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var btn = document.querySelector('[data-demo-btn]');
  if (btn) btn.addEventListener('click', function () { btn.nextElementSibling.hidden = false; });
})();
