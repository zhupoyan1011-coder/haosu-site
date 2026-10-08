// 好宿設計工作室 — page behaviour
// Fill these in to turn on the LINE / Email buttons in the contact form.
var CONTACT = {
  line: '',   // LINE ID, e.g. 'haosu' or '@haosu' for an official account
  email: ''   // e.g. 'hello@haosu.studio'
};

(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- nav: transparent over the hero, solid after it ----
  var nav = $('#nav'), hero = $('.hero');
  function onScroll() {
    if (nav && hero) nav.classList.toggle('solid', window.scrollY > hero.offsetHeight - 70);
    if (bar && !cssProgress) {
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
    }
  }
  var bar = $('.progress');
  var cssProgress = window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- mobile menu ----
  var btn = $('#menuBtn'), menu = $('#menu');
  function setMenu(open) {
    document.documentElement.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    menu.setAttribute('aria-hidden', !open);
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (innerWidth > 860) setMenu(false); });
  }

  // ---- style rail: dots + the centred card previews its page ----
  var rail = $('#styleRail');
  if (rail) {
    var cards = $$('.style-card', rail), dots = $$('#styleDots i');
    var sizeMocks = function () {
      cards.forEach(function (c) { var m = $('.mock', c); c.style.setProperty('--mock-h', m.clientHeight + 'px'); });
    };
    sizeMocks(); window.addEventListener('resize', sizeMocks);
    var pick = function () {
      var r = rail.getBoundingClientRect(), best = 0, bestD = 1e9;
      cards.forEach(function (c, i) {
        var b = c.getBoundingClientRect(), d = Math.abs(b.left - r.left - parseFloat(getComputedStyle(rail).scrollPaddingLeft || 0));
        if (d < bestD) { bestD = d; best = i; }
      });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === best); });
      return best;
    };
    var touch = window.matchMedia('(hover: none)').matches;
    var activate = function () {
      if (!touch || reduce) return;
      var i = pick();
      cards.forEach(function (c, j) { c.classList.toggle('active', j === i); });
    };
    var t;
    rail.addEventListener('scroll', function () { pick(); clearTimeout(t); t = setTimeout(activate, 180); }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) activate(); else cards.forEach(function (c) { c.classList.remove('active'); });
      }, { threshold: .6 }).observe(rail);
    }
    pick();
  }

  // ---- compare tabs ----
  var DATA = {
    agency: { name: '大型設計公司', price: 'NT$10 萬起', speed: '2–3 個月', fit: '通用模板，要自己解釋', after: '另外收費' },
    saas:   { name: '自助建站平台', price: '月租，長期累積', speed: '快，但要自己做', fit: '模板通用', after: '只有客服中心' },
    free:   { name: '一般接案設計師', price: '因人而異', speed: '因人而異', fit: '大多不專精', after: '不一定找得到人' }
  };
  var tabs = $$('.tabs [role="tab"]'), ink = $('.tab-ink'), cmp = $('#cmp');
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab); });
      ink.style.transform = 'translateX(' + (i * 100) + '%)';
      cmp.classList.add('swap');
      setTimeout(function () {
        var d = DATA[tab.dataset.k];
        $$('[data-f]', cmp).forEach(function (el) { el.textContent = d[el.dataset.f]; });
        cmp.classList.remove('swap');
      }, reduce ? 0 : 260);
    });
    tab.addEventListener('keydown', function (e) {
      var k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!k) return;
      var n = tabs[(i + k + tabs.length) % tabs.length]; n.focus(); n.click();
    });
  });

  // ---- process: light the steps in order; on phones a track follows the swipe ----
  var steps = $('#steps');
  if (steps) {
    var items = $$('li', steps), stepBar = $('#stepBar');
    if ('IntersectionObserver' in window && !reduce) {
      new IntersectionObserver(function (e, o) {
        if (!e[0].isIntersecting) return;
        items.forEach(function (li, i) { setTimeout(function () { li.classList.add('lit'); }, i * 140); });
        o.disconnect();
      }, { threshold: .35 }).observe(steps);
    } else items.forEach(function (li) { li.classList.add('lit'); });
    steps.addEventListener('scroll', function () {
      var max = steps.scrollWidth - steps.clientWidth;
      var p = max > 0 ? steps.scrollLeft / max : 1;
      stepBar.style.transform = 'scaleX(' + (0.16 + p * 0.84) + ')';
    }, { passive: true });
  }

  // ---- inquiry builder ----
  var form = $('#inquiry');
  if (form) {
    var msgEl = $('#q-msg'), line = $('#q-line'), mail = $('#q-mail'), copy = $('#q-copy'), note = $('#q-note');
    var build = function () {
      var f = new FormData(form), name = (f.get('name') || '').trim();
      return '你好，我想了解民宿官網。\n' +
        (name ? '民宿：' + name + '\n' : '') +
        '偏好風格：' + f.get('style') + '\n' +
        '目前狀況：' + f.get('site');
    };
    var lineUrl = function (text) {
      if (!CONTACT.line) return '';
      var id = CONTACT.line.replace(/^@/, '');
      return CONTACT.line.charAt(0) === '@'
        ? 'https://line.me/R/oaMessage/@' + id + '/?' + encodeURIComponent(text)
        : 'https://line.me/ti/p/~' + id;
    };
    var update = function () {
      var text = build();
      msgEl.textContent = text;
      var lu = lineUrl(text);
      line.href = lu || '#'; line.setAttribute('aria-disabled', !lu);
      mail.href = CONTACT.email ? 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('民宿官網詢問') + '&body=' + encodeURIComponent(text) : '#';
      mail.setAttribute('aria-disabled', !CONTACT.email);
      if (!CONTACT.line && !CONTACT.email) note.textContent = '聯絡管道即將開放，可先複製訊息。';
    };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    copy.addEventListener('click', function () {
      var text = build();
      var done = function () { note.textContent = '已複製，貼到 LINE 或 Email 即可。'; };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      else { fallback(text); done(); }
    });
    var fallback = function (text) {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    };
    update();
  }
})();
