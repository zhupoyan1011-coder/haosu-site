/* Desktop call card: desktops cannot dial, so show the number large with a one-click copy. */
(function () {
  var TEXT = {
    zh: { label: '電話直訂享 9 折', num: '0966-717-732', copyVal: '0966-717-732', note: '來電不限時段', copy: '複製號碼', done: '已複製' },
    en: { label: 'Call to book · 10% off', num: '+886 966 717 732', copyVal: '+886966717732', note: 'Calls welcome any time', copy: 'Copy number', done: 'Copied' }
  };
  var card, label, num, note, btn, timer;

  function t() { return TEXT[location.pathname.indexOf('/en') === 0 ? 'en' : 'zh']; }

  function render() {
    var s = t();
    label.textContent = s.label;
    num.textContent = s.num;
    note.textContent = s.note;
    btn.textContent = s.copy;
  }

  function copy() {
    var s = t();
    function ok() {
      btn.textContent = s.done;
      clearTimeout(timer);
      timer = setTimeout(function () { btn.textContent = t().copy; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(s.copyVal).then(ok, fallback);
    } else { fallback(); }
    function fallback() {
      var a = document.createElement('textarea');
      a.value = s.copyVal; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0';
      document.body.appendChild(a); a.select();
      try { document.execCommand('copy'); ok(); } catch (e) {}
      document.body.removeChild(a);
    }
  }

  function build() {
    card = document.createElement('div');
    card.className = 'call-card';
    card.setAttribute('role', 'complementary');
    label = document.createElement('span'); label.className = 'cc-label';
    num = document.createElement('a'); num.className = 'cc-num'; num.href = 'tel:+886966717732';
    var row = document.createElement('div'); row.className = 'cc-row';
    note = document.createElement('span');
    btn = document.createElement('button'); btn.type = 'button';
    btn.addEventListener('click', copy);
    row.appendChild(note); row.appendChild(btn);
    card.appendChild(label); card.appendChild(num); card.appendChild(row);
    document.body.appendChild(card);
    render();
    toggle();
  }

  // The site navigates client-side, so refresh the language when the path changes.
  ['pushState', 'replaceState'].forEach(function (k) {
    var orig = history[k];
    history[k] = function () { var r = orig.apply(this, arguments); setTimeout(function () { render(); toggle(); }, 0); return r; };
  });
  window.addEventListener('popstate', function () { setTimeout(render, 0); });

  // Show the card once the hero (and the header number) has scrolled away.
  function toggle() {
    if (!card) return;
    var f = document.querySelector('.site-footer');
    var atEnd = f && f.getBoundingClientRect().top < window.innerHeight - 40;
    card.classList.toggle('is-on', window.scrollY > 120 && !atEnd);
  }
  window.addEventListener('scroll', toggle, { passive: true });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
