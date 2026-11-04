/* 伊亞咖啡民宿 — 改版提案 v2 interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = document.documentElement.classList.contains('reduce');
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  /* ---------- room data ----------
     一館: names, floors, features and prices are quoted from the original site (mobile/room.php, read 2026-11-04).
     二館: names come from online travel write-ups; name↔photo pairing is unconfirmed, so no features or prices. */
  const ROOMS = [
    { house: 1, name: '伊亞房', en: 'Oia Room', floor: '2F', line: '雙人套房，乾溼分離，法式浴缸與專屬陽台。',
      feat: ['雙人套房', '乾溼分離', '法式浴缸', '專屬陽台'], price: [2000, 2500],
      photos: ['oia.webp', ...range(3, 9).map(n => `roomoia_${n}.webp`)] },
    { house: 1, name: '希臘公主房', en: 'Greek Princess', floor: '3F', line: '雙人套房，兩面玻璃牆，採光明亮，附專屬陽台。',
      feat: ['雙人套房', '兩面玻璃牆', '專屬陽台'], price: [1800, 2200],
      photos: ['princess.webp', ...range(2, 7).map(n => `roomprim_${n}.webp`)] },
    { house: 1, name: '雅典星空房', en: 'Athens Starlight', floor: '3F', line: '雙人套房，浴廁分離，附專屬陽台。',
      feat: ['雙人套房', '浴廁分離', '專屬陽台'], price: [1600, 2000],
      photos: ['sky.webp', ...[2, 3, 4, 5, 7].map(n => `roomsky_${n}.webp`)] },
    { house: 2, name: '橘子汽水', en: 'Orange Soda', photos: ['2room/1a_room.webp', ...range(1, 8).map(n => `2room/1a_room_${n}.webp`)] },
    { house: 2, name: '咖啡因中毒', en: 'Caffeine', photos: ['2room/2a_room.webp', ...range(1, 7).map(n => `2room/2a_room_${n}.webp`)] },
    { house: 2, name: '陽光優格', en: 'Sunny Yogurt', photos: ['2room/2b_room.webp', ...range(1, 13).map(n => `2room/2b_room_${n}.webp`)] },
    { house: 2, name: '黑色螺絲釘', en: 'Black Screw', photos: ['2room/3a_room.webp', ...range(1, 11).map(n => `2room/3a_room_${n}.webp`)] },
    { house: 2, name: 'XO白蘭地', en: 'XO Brandy', photos: ['2room/3b_room.webp', ...range(1, 8).map(n => `2room/3b_room_${n}.webp`)] },
  ];
  const fmt = n => n.toLocaleString('en-US');

  /* ---------- build room cards ---------- */
  $$('.cards').forEach(list => {
    const house = +list.dataset.house;
    ROOMS.forEach((r, i) => {
      if (r.house !== house) return;
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML =
        `<button class="card__btn" type="button" data-room="${i}" aria-haspopup="dialog">` +
          `<span class="card__pic"><img src="img/${r.photos[0]}" alt="${r.name}的房間照片" loading="lazy" width="1024" height="640"></span>` +
          `<span class="card__meta"><span class="card__name">${r.name}</span><span class="card__floor">${r.floor || r.en}</span></span>` +
          (r.line ? `<span class="card__line">${r.line}</span>` : `<span class="card__line">共 ${r.photos.length} 張照片・介紹待民宿提供</span>`) +
          (r.price ? `<span class="card__price"><span>平日<b>${fmt(r.price[0])}</b></span><span>假日<b>${fmt(r.price[1])}</b></span></span>` : '') +
        `</button>`;
      list.appendChild(li);
    });
  });

  /* ---------- room dialog ---------- */
  const dlg = $('#room-dlg');
  const dImg = $('#dlg-img');
  let cur = null, idx = 0, opener = null;
  const show = (n, animate = true) => {
    const p = cur.photos;
    idx = (n + p.length) % p.length;
    const set = () => { dImg.src = `img/${p[idx]}`; dImg.alt = `${cur.name}，第 ${idx + 1} 張照片`; dImg.classList.remove('is-swap'); };
    $('#dlg-count').textContent = `${idx + 1} / ${p.length}`;
    if (animate && !reduce) { dImg.classList.add('is-swap'); setTimeout(set, 180); } else set();
  };
  const openRoom = (i, btn) => {
    cur = ROOMS[i]; opener = btn;
    $('#dlg-house').textContent = cur.house === 1 ? `伊亞一館・${cur.floor}` : '伊亞二館';
    $('#dlg-title').textContent = cur.name;
    $('#dlg-en').textContent = cur.en;
    $('#dlg-feat').innerHTML = (cur.feat || []).map(f => `<li>${f}</li>`).join('') ||
      '<li>房型介紹、人數與床型待民宿提供</li>';
    $('#dlg-price').innerHTML = cur.price
      ? `<dt>平日</dt><dd>NT$ ${fmt(cur.price[0])}／晚</dd><dt>假日</dt><dd>NT$ ${fmt(cur.price[1])}／晚</dd><dt>春節</dt><dd>另訂</dd><dt>說明</dt><dd>原官網標示價格，<span class="tbc">待確認</span></dd>`
      : '<dt>房價</dt><dd>以線上訂房系統為準 <span class="tbc">待確認</span></dd>';
    show(0, false);
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  };
  const closeRoom = () => { if (dlg.open) dlg.close(); };
  dlg.addEventListener('close', () => { document.documentElement.style.overflow = ''; opener?.focus(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-room]');
    if (b) openRoom(+b.dataset.room, b);
  });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-close]')) closeRoom();
    const s = e.target.closest('[data-step]');
    if (s) show(idx + +s.dataset.step);
  });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  // swipe on the photo
  let sx = null;
  $('.room-dlg__stage').addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  $('.room-dlg__stage').addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
  });

  /* ---------- tabs (一館 / 二館) ---------- */
  const tabs = $$('.tabs [role="tab"]');
  const pill = $('.tabs__pill');
  const placePill = () => {
    const on = tabs.find(t => t.getAttribute('aria-selected') === 'true');
    if (!on || !pill) return;
    pill.style.width = on.offsetWidth + 'px';
    pill.style.transform = `translateX(${on.offsetLeft - 4}px)`;
  };
  const pick = t => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      const panel = $('#' + x.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) $$('.card', panel).forEach((c, i) => { c.classList.remove('in'); setTimeout(() => c.classList.add('in'), 40 + i * 90); });
    });
    placePill();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(t));
    t.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      n.focus(); pick(n);
    });
  });
  addEventListener('resize', placePill);
  document.fonts?.ready.then(placePill);
  placePill();

  /* ---------- split section headings into lines ---------- */
  $$('.split').forEach(h => {
    h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i)
      .map((p, i) => `<span class="sl"><span style="transition-delay:${i * 0.12}s">${p.trim()}</span></span>`).join('');
  });

  /* ---------- reveal on scroll ---------- */
  const targets = $$('.split, .rv, .rv-group, .rv-img, .card, [data-roll]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.classList.contains('card')) {
        const sibs = $$('.card', el.parentElement);
        setTimeout(() => el.classList.add('in'), sibs.indexOf(el) * 90);
      } else el.classList.add('in');
      if (el.hasAttribute('data-roll')) roll(el);
      io.unobserve(el);
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add('in'));

  // check-in / check-out digits count up like a clock
  function roll(el) {
    const [h, m] = el.textContent.split(':').map(Number);
    const total = h * 60 + m, t0 = performance.now(), dur = 1200;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      const v = Math.round(total * e);
      el.textContent = `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- day clock + active nav ---------- */
  const clock = $('.clock');
  const hh = $('.clock__hh'), mm = $('.clock__mm'), label = $('.clock__label'), time = $('.clock__time');
  const fill = $('.clock__fill'), sun = $('.clock__sun');
  const sections = $$('[data-hour]');
  const navLinks = $$('.nav a');
  let curHour = '15:00';
  const setClock = s => {
    const hour = s.dataset.hour;
    clock.classList.toggle('on-dark', s.dataset.tone === 'night' || s.dataset.tone === 'dusk');
    label.textContent = s.dataset.label;
    if (hour !== curHour) {
      curHour = hour;
      time.classList.add('is-flip');
      setTimeout(() => { [hh.textContent, mm.textContent] = hour.split(':'); time.classList.remove('is-flip'); }, reduce ? 0 : 250);
    }
    // sun position on the arc: 06:00 → left, 21:00+ → right
    const [h, m] = hour.split(':').map(Number);
    const k = Math.max(0, Math.min(1, (h + m / 60 - 6) / 15));
    fill.style.strokeDashoffset = 1 - k;
    const a = Math.PI * (1 - k);
    sun.setAttribute('cx', (60 + 52 * Math.cos(a)).toFixed(1));
    sun.setAttribute('cy', (60 - 52 * Math.sin(a)).toFixed(1));
    navLinks.forEach(l => l.classList.toggle('is-on', l.getAttribute('href') === '#' + s.id));
  };
  const onScroll = () => {
    const y = innerHeight * 0.45;
    let active = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= y) active = s;
    setClock(active);
    clock.classList.toggle('is-on', scrollY > innerHeight * 0.5);
    $('.bar').classList.toggle('is-scrolled', scrollY > 8);
    // rail draw in the walk section
    const rail = $('.rail');
    if (rail) {
      const r = rail.getBoundingClientRect();
      const k = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * 0.8)));
      rail.style.setProperty('--draw', (1 - k).toFixed(3));
    }
  };
  /* gentle parallax */
  const par = $$('[data-par]');
  const parallax = () => {
    if (reduce || innerWidth < 761) return;
    par.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const c = r.top + r.height / 2 - innerHeight / 2;
      el.style.translate = `0 ${(c * +el.dataset.par).toFixed(1)}px`;
    });
  };
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { onScroll(); parallax(); ticking = false; });
  }, { passive: true });
  onScroll(); parallax();

  /* ---------- mobile drawer ---------- */
  const mb = $('.menu-btn'), drawer = $('#drawer');
  const setDrawer = open => {
    mb.setAttribute('aria-expanded', open);
    $('.menu-btn__txt').textContent = open ? '關閉' : '選單';
    drawer.hidden = !open;
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) $('a', drawer).focus();
  };
  mb.addEventListener('click', () => setDrawer(mb.getAttribute('aria-expanded') !== 'true'));
  drawer.addEventListener('click', e => { if (e.target.closest('a')) setDrawer(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); mb.focus(); } });
  addEventListener('resize', () => { if (innerWidth > 1080 && !drawer.hidden) setDrawer(false); });

  /* ---------- copy address ---------- */
  const toast = $('.toast');
  const say = msg => { toast.textContent = msg; toast.classList.add('is-on'); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('is-on'), 2200); };
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const text = b.dataset.copy;
    try { await navigator.clipboard.writeText(text); say('地址已複製'); }
    catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch {}
      ta.remove(); say(ok ? '地址已複製' : '請長按地址文字複製');
    }
  }));

  /* ---------- start opening animation ---------- */
  const start = () => requestAnimationFrame(() => document.body.classList.add('is-ready'));
  const heroImg = $('.hero__arch img');
  if (heroImg.complete) start(); else { heroImg.addEventListener('load', start, { once: true }); heroImg.addEventListener('error', start, { once: true }); setTimeout(start, 1800); }
})();
