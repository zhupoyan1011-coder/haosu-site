// 杉間 demo: ridge parallax, trees on the middle ridge, reveal on scroll,
// season tabs, the trail that draws itself, a twinkling night sky, demo-only booking button.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  requestAnimationFrame(function () { root.classList.add('loaded'); });
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // a few cedar silhouettes along the third ridge
  var trees = document.querySelector('.trees');
  if (trees) {
    var svgNS = 'http://www.w3.org/2000/svg', d = '';
    for (var i = 0; i < 46; i++) {
      var x = 20 + i * 34 + (i * 53 % 17), base = 650 - Math.sin(i * 0.55) * 22, h = 34 + (i * 37 % 26);
      d += 'M' + x + ' ' + base + 'L' + (x + 9) + ' ' + (base - h) + 'L' + (x + 18) + ' ' + base + 'Z';
    }
    var p = document.createElementNS(svgNS, 'path'); p.setAttribute('d', d); trees.appendChild(p);
  }

  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add(e.target.classList.contains('trail') ? 'drawn' : 'in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('.reveal, .trail').forEach(function (el) { io ? io.observe(el) : el.classList.add('in', 'drawn'); });

  var top = document.querySelector('.top');
  var hero = document.querySelector('.hero');
  var layers = document.querySelectorAll('.ridges g[data-depth]');
  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle('solid', y > hero.offsetHeight - 120);
    if (still || y > hero.offsetHeight) return;
    layers.forEach(function (g) { g.style.transform = 'translateY(' + (y * parseFloat(g.dataset.depth)).toFixed(1) + 'px)'; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var SEASONS = {
    spring: ['螢', '四月到五月：螢火蟲的季節', '天黑後沿著溪邊的步道走，不用走遠就看得到。請關掉手電筒，安靜地看。'],
    summer: ['涼', '六月到八月：上山避暑', '山下三十幾度的時候，這裡晚上要蓋薄被。下午常有一場雷陣雨，雨停後霧會從山谷爬上來。'],
    autumn: ['雲', '九月到十一月：雲海的季節', '天氣好的清晨，從陽台就能看到山谷裡的雲海。我們會在前一晚告訴你隔天的機會大不大。'],
    winter: ['星', '十二月到二月：星星最亮的季節', '空氣乾冷，夜空特別清楚。我們準備了厚毯子和熱可可，陽台就是最好的位置。']
  };
  var tabs = document.querySelectorAll('.season-tabs button');
  var box = document.querySelector('.season');
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === b ? 'true' : 'false'); });
      var s = SEASONS[b.dataset.s];
      box.classList.add('swap');
      setTimeout(function () {
        document.getElementById('seasonBig').textContent = s[0];
        document.getElementById('seasonTitle').textContent = s[1];
        document.getElementById('seasonText').textContent = s[2];
        box.classList.remove('swap');
      }, still ? 0 : 300);
    });
  });

  // night sky
  var c = document.querySelector('.stars');
  if (c && c.getContext) {
    var ctx = c.getContext('2d'), stars = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2), running = false;
    function size() {
      w = c.offsetWidth; h = c.offsetHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = [];
      for (var i = 0; i < Math.round(w * h / 2600); i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + .2, p: Math.random() * 6.28 });
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(function (s) {
        var a = still ? .7 : .35 + .45 * (0.5 + 0.5 * Math.sin(t / 900 + s.p));
        ctx.fillStyle = 'rgba(236,230,214,' + a.toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      });
      if (running && !still) requestAnimationFrame(draw);
    }
    size(); draw(0);
    window.addEventListener('resize', function () { size(); draw(0); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
      var was = running; running = e[0].isIntersecting; if (running && !was) requestAnimationFrame(draw);
    }).observe(c);
  }

  var btn = document.querySelector('[data-demo-btn]');
  if (btn) btn.addEventListener('click', function () { btn.nextElementSibling.hidden = false; });
})();
