// 留燈設計工作室 — page behaviour
// Fill these in to turn on the LINE / Email buttons in the contact form.
var CONTACT = {
  line: 'benben951011',   // Ben's personal LINE ID, e.g. 'liudeng'; the "add my LINE" button stays hidden while empty
  email: 'liudengsheji@gmail.com',
  quoteUrl: 'https://script.google.com/macros/s/AKfycbwCWvaggQ5gy0VAYnm-k3r-jyooy4HEobbxKQr5ht_n-Co9JgGkmaae_QAG7T12EbYT/exec'  // Google Apps Script web app that saves quotes to Ben's sheet and emails the studio inbox
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
  // sources: /mnt/project-files/notes/比較表草稿與來源.md (checked 2026-10)
  var DATA = {
    agency: { name: '一般設計公司', price: '形象官網中位數約 NT$26,000；半客製中位數約 NT$50,800', yearly: '主機約 NT$3,000–8,000／年；民宿小站年費實例 NT$6,000–8,800', move: '依各家合約而定' },
    saas:   { name: '架站平台', price: '平台不收製作費，要自己動手做；請人代做另外計價', yearly: '要每年付平台方案費，例如台灣代理商公開的一個方案為 NT$16,000／年', move: '平台官方說明：網站必須在它的主機上運作，不能搬到別的主機' }
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

  // ---- quote form: posts the quote to Ben's Google Sheet script, then shows a quote number to paste on LINE ----
  var form = $('#inquiry');
  if (form) {
    var send = $('#q-send'), done = $('#q-done'), msgEl = $('#q-msg'), line = $('#q-line'), copy = $('#q-copy'), note = $('#q-note');
    var code = '';
    var newCode = function () {
      var d = new Date(), pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = '';
      for (var i = 0; i < 4; i++) r += abc.charAt(Math.floor(Math.random() * abc.length));
      return 'LD-' + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + r;
    };
    var build = function (f) {
      return '估價單編號：' + code + '\n' +
        '民宿／暱稱：' + f.get('name').trim() + '\n' +
        '聯絡方式：' + f.get('reach').trim() + '\n' +
        '方案：' + f.get('plan') + '\n' +
        '風格：' + f.get('style') + '\n' +
        '上線時間：' + f.get('speed') + '\n' +
        '目前狀況：' + f.get('site') + '\n' +
        '想說的話：' + ((f.get('message') || '').trim() || '（無）');
    };
    if (CONTACT.line) { line.href = 'https://line.me/ti/p/~' + CONTACT.line.replace(/^@/, ''); line.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#q-name'), reach = $('#q-reach');
      [name, reach].forEach(function (el) { el.classList.add('touched'); });
      if (!name.value.trim() || !reach.value.trim()) {
        note.textContent = '請填寫民宿名稱或暱稱，以及聯絡方式。';
        (name.value.trim() ? reach : name).focus();
        return;
      }
      code = newCode();
      var f = new FormData(form), text = build(f);
      send.disabled = true; send.textContent = '送出中…';
      var finish = function (ok) {
        send.disabled = false; send.textContent = '送出估價單';
        if (ok) {
          msgEl.textContent = '你的估價單編號是 ' + code + '。' +
            (CONTACT.line ? '請加我們的 LINE，並把這個編號傳給我們，方便對照你的估價單。' : '請把這個編號記下來，我們聯絡你時會用它對照估價單。') +
            '我們會盡快回覆。';
          done.hidden = false; send.hidden = true;
          note.textContent = '';
          done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        } else {
          var mail = 'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('估價單 ' + code) + '&body=' + encodeURIComponent(text);
          note.innerHTML = '';
          note.appendChild(document.createTextNode('送出失敗，可能是網路不穩。你可以再試一次，或'));
          var a = document.createElement('a'); a.href = mail; a.textContent = '改用 Email 寄出'; a.style.textDecoration = 'underline';
          note.appendChild(a); note.appendChild(document.createTextNode('。'));
        }
      };
      if (!CONTACT.quoteUrl) { finish(false); return; }
      var body = new URLSearchParams();
      body.append('code', code);
      ['name', 'reach', 'plan', 'style', 'speed', 'site', 'message', 'website'].forEach(function (k) { body.append(k, (f.get(k) || '').trim()); });
      fetch(CONTACT.quoteUrl, { method: 'POST', body: body })
        .then(function (r) { return r.json(); })
        .then(function (j) { finish(j && j.success === true); })
        .catch(function () { finish(false); });
    });
    copy.addEventListener('click', function () {
      var ok = function () { note.textContent = '已複製編號 ' + code + '。'; };
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(ok, function () { fallback(code); ok(); });
      else { fallback(code); ok(); }
    });
    var fallback = function (text) {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    };
  }
})();
