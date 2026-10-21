// 鹽光 demo: reveal on scroll, header turns solid past the hero, room slider buttons,
// the "now" dot that walks along the tide curve, demo-only booking button.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  requestAnimationFrame(function () { root.classList.add('loaded'); });
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  var top = document.querySelector('.top');
  var hero = document.querySelector('.hero');
  function onScroll() { top.classList.toggle('solid', window.scrollY > hero.offsetHeight - 110); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var slider = document.querySelector('.slider');
  document.querySelectorAll('.slider-nav button').forEach(function (b) {
    b.addEventListener('click', function () {
      var card = slider.querySelector('.card');
      slider.scrollBy({ left: (card.offsetWidth + 24) * Number(b.dataset.dir), behavior: still ? 'auto' : 'smooth' });
    });
  });

  // the dot follows the curve once, from midnight to "now" in the demo day (about 09:00)
  var line = document.querySelector('.t-line'), dot = document.querySelector('.t-now');
  if (line && dot && line.getTotalLength) {
    var len = line.getTotalLength(), target = 0.37, started = false;
    function place(f) { var pt = line.getPointAtLength(len * f); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); }
    place(still ? target : 0);
    if (!still && 'IntersectionObserver' in window) new IntersectionObserver(function (e, obs) {
      if (!e[0].isIntersecting || started) return;
      started = true; obs.disconnect();
      var t0 = performance.now();
      (function step(t) {
        var k = Math.min(1, (t - t0) / 2400), ease = 1 - Math.pow(1 - k, 3);
        place(target * ease);
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: .4 }).observe(line.ownerSVGElement);
  }

  var btn = document.querySelector('[data-demo-btn]');
  if (btn) btn.addEventListener('click', function () { btn.nextElementSibling.hidden = false; });
})();
