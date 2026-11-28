/* Oia Cafe B&B — redesign interactions */
(() => {
  const IMG = 'https://www.oiacafe.com/img/';
  const THUMB = 'https://www.oiacafe.com/thumb/';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = () => matchMedia('(min-width: 821px)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  /* ---------- data ---------- */
  // Sizes and features come from public write-ups of the B&B; rooms marked null are to be confirmed with the owner.
  const ROOMS = [
    { name: '伊亞房', en: 'Oia', line: '與民宿同名，最有聖托里尼味道的一間',
      desc: '白牆、藍窗與木質的溫度，像把伊亞小鎮的一角搬進台東。',
      size: null, ppl: null, tags: [], filters: [],
      photos: ['oia.jpg', ...range(3, 9).map(n => `roomoia_${n}.jpg`)] },
    { name: '希臘公主房', en: 'Greek Princess', line: '雙洗手檯與浴缸，慢慢梳妝的房',
      desc: '公主風格的寬敞雙人房，浴室有雙洗手檯與浴缸，兩個人早上不用搶鏡子。',
      size: 28, ppl: 2, tags: ['浴缸', '雙洗手檯'], filters: ['two', 'bath'],
      photos: ['princess.jpg', ...range(2, 7).map(n => `roomprim_${n}.jpg`)] },
    { name: '雅典星空房', en: 'Athens Starlight', line: '天花板有一扇觀星窗',
      desc: '關燈之後抬頭，天花板的觀星窗就是今晚的夜空。適合想安靜一點的兩個人。',
      size: 20, ppl: 2, tags: ['觀星窗'], filters: ['two', 'stars'],
      photos: ['sky.jpg', ...range(2, 7).map(n => `roomsky_${n}.jpg`)] },
    { name: '橘子汽水', en: 'Orange Soda', line: '整間橘色調，甜甜的情侶房',
      desc: '明亮的橘色調房間，衛浴以薄拉簾區隔，比較適合情侶或夫妻入住。',
      size: 22, ppl: 2, tags: ['橘色調', '拉簾式衛浴'], filters: ['two'],
      photos: ['2room/1a_room.jpg', ...range(1, 8).map(n => `2room/1a_room_${n}.jpg`)] },
    { name: '咖啡因中毒', en: 'Caffeine Overdose', line: '給離不開咖啡的人',
      desc: '以咖啡為主題的房間，樓下就是咖啡館，名副其實。',
      size: null, ppl: null, tags: [], filters: [],
      photos: ['2room/2a_room.jpg', ...range(1, 7).map(n => `2room/2a_room_${n}.jpg`)] },
    { name: '陽光優格', en: 'Sunny Yogurt', line: '兩張雙人床＋大浴缸的家庭房',
      desc: '伊亞最大的房型，兩張雙人床與大浴缸，一家四口或好友同行都住得開。',
      size: 36, ppl: 4, tags: ['兩張雙人床', '大浴缸', '家庭'], filters: ['family', 'bath'],
      photos: ['2room/2b_room.jpg', ...range(1, 13).map(n => `2room/2b_room_${n}.jpg`)] },
    { name: '黑色螺絲釘', en: 'Black Screw', line: '黑色調、帶點工業感的房',
      desc: '以黑色為主調的主題房，和白色的伊亞形成對比。',
      size: null, ppl: null, tags: [], filters: [],
      photos: ['2room/3a_room.jpg', ...range(1, 11).map(n => `2room/3a_room_${n}.jpg`)] },
    { name: 'XO白蘭地', en: 'XO Brandy', line: '寬敞，還有彈珠台或街機可以玩',
      desc: '空間寬敞的雙人房，部分房間放了彈珠台或街機，住一晚像回到小時候。',
      size: 32, ppl: 2, tags: ['彈珠台／街機', '寬敞'], filters: ['two', 'play'],
      photos: ['2room/3b_room.jpg', ...range(1, 9).map(n => `2room/3b_room_${n}.jpg`)] },
  ];
  const GALLERY = {
    env: { label: '館外', files: range(1, 6).map(n => `env_${n}.jpg`) },
    spac: { label: '館內', files: [0, 1, 3, 4, 5, 6, 8, 9, 10, 13, 14, 15].map(n => `spac_${n}.jpg`) },
    room: { label: '客房', files: range(1, 9).map(n => `room_${n}.jpg`) },
  };

  /* ---------- image fallback: try alt source, then show a tinted placeholder ---------- */
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const alt = img.dataset.altSrc;
    if (alt && img.src !== alt) { img.src = alt; img.removeAttribute('data-alt-src'); return; }
    img.closest('.ph')?.classList.add('noimg');
  }, true);
  const mkImg = (src, alt = '', altSrc) => {
    const i = new Image();
    i.src = src; i.alt = alt; i.loading = 'lazy'; i.referrerPolicy = 'no-referrer';
    if (altSrc) i.dataset.altSrc = altSrc;
    return i;
  };

  /* ---------- loader ---------- */
  const ready = () => {
    document.body.classList.add('is-ready');
    document.body.classList.remove('is-loading');
    setTimeout(() => $('.loader')?.remove(), 1400);
  };
  setTimeout(ready, reduce ? 0 : 1300);

  /* ---------- split headings into lines ---------- */
  $$('.reveal-lines').forEach(h => {
    const parts = h.innerHTML.split(/<br\s*\/?>/i);
    h.innerHTML = parts.map((p, i) => `<span class="rl"><span style="transition-delay:${i * 0.1}s">${p.trim()}</span></span>`).join('');
  });

  /* ---------- rooms ---------- */
  const list = $('#roomlist');
  ROOMS.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'room reveal';
    li.dataset.filters = r.filters.join(' ');
    const spec = [
      r.size ? `<span><em>${r.size}</em>㎡</span>` : '',
      r.ppl ? `<span><em>${r.ppl}</em>人</span>` : '',
      !r.size && !r.ppl ? '<span>坪數人數・見訂房頁</span>' : '',
    ].join('');
    li.innerHTML = `
      <button class="room__btn" data-room="${i}" aria-label="${r.name}，看照片與房型資訊">
        <span class="room__thumb ph" data-ph="${r.en}"></span>
        <span class="room__no">${String(i + 1).padStart(2, '0')}</span>
        <span class="room__name"><b>${r.name}</b><i>${r.en}</i></span>
        <span class="room__line">${r.line}</span>
        <span class="room__spec">${spec}</span>
        <span class="room__arrow">→</span>
      </button>`;
    $('.room__thumb', li).append(mkImg(IMG + r.photos[0], r.name));
    list.append(li);
  });

  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.toggle('is-on', x === c));
    const f = c.dataset.filter;
    $$('.room').forEach(li => li.classList.toggle('is-out', f !== 'all' && !li.dataset.filters.split(' ').includes(f)));
  }));

  // cursor-following preview on desktop
  const prev = $('.cursor-preview'), prevImg = $('img', prev);
  let mx = 0, my = 0, px = 0, py = 0, prevOn = false;
  if (!reduce) {
    list.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
    list.addEventListener('pointerover', e => {
      const b = e.target.closest('.room__btn');
      if (!b || !desktop() || b.closest('.is-out')) return;
      const src = IMG + ROOMS[b.dataset.room].photos[0];
      if (prevImg.src !== src) prevImg.src = src;
      if (!prevOn) { px = mx = e.clientX; py = my = e.clientY; }
      prevOn = true; prev.classList.add('is-on');
    });
    list.addEventListener('pointerleave', () => { prevOn = false; prev.classList.remove('is-on'); });
    prevImg.referrerPolicy = 'no-referrer';
    prevImg.onerror = () => prev.classList.remove('is-on');
  }

  /* room panel */
  const panel = $('#panel');
  const stage = $('.panel__stage img', panel);
  stage.addEventListener('load', () => $('.panel__stage', panel).classList.remove('noimg'));
  let cur = null, shot = 0, lastFocus = null;
  const showShot = n => {
    const ph = cur.photos;
    shot = (n + ph.length) % ph.length;
    stage.classList.add('is-swap');
    setTimeout(() => { stage.src = IMG + ph[shot]; stage.alt = `${cur.name} 照片 ${shot + 1}`; stage.classList.remove('is-swap'); }, reduce ? 0 : 220);
    $('.panel__count', panel).textContent = `${shot + 1} / ${ph.length}`;
    $$('.panel__thumbs button', panel).forEach((b, i) => b.classList.toggle('is-on', i === shot));
    $$('.panel__thumbs button', panel)[shot]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  const openRoom = i => {
    cur = ROOMS[i]; lastFocus = document.activeElement;
    $('.panel__no', panel).textContent = `Room ${String(i + 1).padStart(2, '0')}`;
    $('.panel__title', panel).textContent = cur.name;
    $('.panel__en', panel).textContent = cur.en;
    $('.panel__desc', panel).textContent = cur.desc;
    $('.panel__spec', panel).innerHTML =
      `<dt>坪數</dt><dd>${cur.size ? `約 ${cur.size} ㎡` : '請見訂房系統'}</dd>` +
      `<dt>人數</dt><dd>${cur.ppl ? `${cur.ppl} 人` : '請見訂房系統'}</dd>` +
      `<dt>早晨</dt><dd>每人每日一杯現做飲品</dd>`;
    $('.panel__tags', panel).innerHTML = cur.tags.map(t => `<li>${t}</li>`).join('');
    const th = $('.panel__thumbs', panel);
    th.innerHTML = '';
    cur.photos.forEach((p, k) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `第 ${k + 1} 張`);
      b.className = 'ph'; b.dataset.ph = '';
      b.append(mkImg(IMG + p));
      b.onclick = () => showShot(k);
      th.append(b);
    });
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));
    showShot(0);
    $('.panel__close', panel).focus({ preventScroll: true });
  };
  const closeRoom = () => {
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { panel.hidden = true; }, reduce ? 0 : 800);
    lastFocus?.focus({ preventScroll: true });
  };
  list.addEventListener('click', e => { const b = e.target.closest('.room__btn'); if (b) openRoom(+b.dataset.room); });
  panel.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) closeRoom();
    const s = e.target.closest('[data-step]'); if (s) showShot(shot + +s.dataset.step);
  });
  // swipe on the photo stage
  let sx = null;
  $('.panel__stage', panel).addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  $('.panel__stage', panel).addEventListener('touchend', e => {
    if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) showShot(shot + (dx < 0 ? 1 : -1));
  });

  /* ---------- gallery ---------- */
  const track = $('#track');
  let gSet = 'env';
  const renderGallery = key => {
    gSet = key;
    track.classList.remove('is-in');
    track.innerHTML = '';
    GALLERY[key].files.forEach((f, i) => {
      const b = document.createElement('button');
      b.className = 'ph'; b.dataset.ph = GALLERY[key].label;
      b.style.transitionDelay = `${Math.min(i, 8) * 0.06}s`;
      b.setAttribute('aria-label', `放大 ${GALLERY[key].label} 第 ${i + 1} 張`);
      b.append(mkImg(THUMB + f, `${GALLERY[key].label} ${i + 1}`, IMG + f));
      const s = document.createElement('span'); s.textContent = String(i + 1).padStart(2, '0'); b.append(s);
      b.onclick = () => openLb(i);
      track.append(b);
    });
    requestAnimationFrame(() => { sizeGallery(); requestAnimationFrame(() => track.classList.add('is-in')); });
  };
  $$('.tabs button').forEach(t => t.addEventListener('click', () => {
    $$('.tabs button').forEach(x => { x.classList.toggle('is-on', x === t); x.setAttribute('aria-selected', x === t); });
    renderGallery(t.dataset.set);
  }));

  const gallery = $('#gallery');
  let gExtra = 0;
  const sizeGallery = () => {
    if (!desktop() || reduce) { gallery.style.height = ''; track.style.transform = ''; gExtra = 0; return; }
    const visible = innerWidth - track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).transform.split(',')[4] || 0);
    gExtra = Math.max(0, track.scrollWidth - visible);
    gallery.style.height = `${innerHeight + gExtra}px`;
  };
  addEventListener('resize', sizeGallery);
  track.addEventListener('load', sizeGallery, true);

  /* lightbox */
  const lb = $('#lightbox'), lbImg = $('img', lb);
  let lbI = 0;
  const lbShow = i => {
    const files = GALLERY[gSet].files;
    lbI = (i + files.length) % files.length;
    $('figure', lb).classList.remove('noimg');
    lbImg.src = IMG + files[lbI]; lbImg.dataset.altSrc = THUMB + files[lbI];
    lbImg.alt = `${GALLERY[gSet].label} ${lbI + 1}`;
    $('.lightbox__count', lb).textContent = `${lbI + 1} / ${files.length}`;
  };
  const openLb = i => { lb.hidden = false; document.body.style.overflow = 'hidden'; lbShow(i); $('.lightbox__close', lb).focus(); };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; };
  lb.addEventListener('click', e => {
    if (e.target.closest('[data-lb-close]') || e.target === lb) closeLb();
    const n = e.target.closest('[data-lb]'); if (n) lbShow(lbI + +n.dataset.lb);
  });

  addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') lbShow(lbI + 1);
      if (e.key === 'ArrowLeft') lbShow(lbI - 1);
    } else if (!panel.hidden) {
      if (e.key === 'Escape') closeRoom();
      if (e.key === 'ArrowRight') showShot(shot + 1);
      if (e.key === 'ArrowLeft') showShot(shot - 1);
    }
  });

  /* ---------- nav drawer ---------- */
  const menuBtn = $('.bar__menu'), drawer = $('#drawer');
  const setDrawer = open => {
    menuBtn.setAttribute('aria-expanded', open);
    if (open) { drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('is-open')); }
    else { drawer.classList.remove('is-open'); setTimeout(() => { if (!drawer.classList.contains('is-open')) drawer.hidden = true; }, 800); }
    $('.bar').classList.toggle('is-menu', open);
  };
  menuBtn.addEventListener('click', () => setDrawer(menuBtn.getAttribute('aria-expanded') !== 'true'));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));

  /* ---------- copy address ---------- */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = '已複製 ✓'; }
    catch { b.textContent = b.dataset.copy; }
    setTimeout(() => { b.textContent = '複製地址'; }, 2200);
  }));

  /* ---------- departure-board flaps ---------- */
  const FLAP = '0123456789:–ABCDEFHPRU';
  const flap = el => {
    const target = el.dataset.flap;
    el.innerHTML = [...target].map(() => '<b></b>').join('');
    const cells = $$('b', el);
    cells.forEach((c, i) => {
      if (reduce) { c.textContent = target[i]; return; }
      let n = 0; const stop = 8 + i * 3;
      const t = setInterval(() => {
        c.textContent = ++n >= stop ? target[i] : FLAP[Math.floor(Math.random() * FLAP.length)];
        if (n >= stop) clearInterval(t);
      }, 55);
    });
  };

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add('is-in');
    if (el.classList.contains('reveal-group')) $$(':scope>*', el).forEach((c, i) => { c.style.transitionDelay = `${i * 0.09}s`; });
    if (el.classList.contains('board')) $$('.board__t', el).forEach((t, i) => setTimeout(() => flap(t), i * 120));
    io.unobserve(el);
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  $$('.reveal, .reveal-lines, .reveal-img, .reveal-group, .line-map').forEach(el => io.observe(el));

  /* ---------- scroll-driven: bar, rail, parallax, gallery ---------- */
  const bar = $('.bar'), hero = $('.hero'), heroImg = $('.hero__media img');
  const rail = $('.rail'), railFill = $('.rail__fill');
  const stops = $$('[data-stop]');
  const railItems = $$('.rail__stops li');
  const navLinks = $$('.bar__nav a');
  const para = $$('[data-parallax]');
  const mbook = $('.mbook');
  const cafe = $('#cafe');

  const onScroll = () => {
    const y = scrollY, vh = innerHeight;
    const pastHero = y > hero.offsetHeight * 0.6;
    bar.classList.toggle('is-solid', pastHero);
    mbook.classList.toggle('is-on', y > hero.offsetHeight * 0.8);

    if (!reduce) {
      if (y < vh * 1.2) heroImg.style.transform = `translate3d(0,${y * 0.25}px,0)`;
      para.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const d = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.translate = `0 ${d.toFixed(1)}px`;
      });
    }

    // horizontal gallery
    if (gExtra > 0) {
      const top = gallery.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / gExtra));
      track.style.transform = `translate3d(${-p * gExtra}px,0,0)`;
    }

    // rail + nav state
    const first = stops[0].offsetTop, last = stops[stops.length - 1];
    const end = last.offsetTop + last.offsetHeight - vh;
    const prog = Math.min(1, Math.max(0, (y - first + vh * 0.5) / (end - first + vh * 0.5)));
    railFill.style.transform = `scaleY(${prog})`;
    rail.classList.toggle('is-on', y > first - vh * 0.5 && y < end + vh * 0.3);
    let here = -1;
    stops.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.5) here = i; });
    railItems.forEach((li, i) => { li.classList.toggle('is-here', i === here); li.classList.toggle('is-past', i < here); });
    navLinks.forEach(a => a.classList.toggle('is-here', here >= 0 && a.getAttribute('href') === `#${stops[here].id}`));
    const cr = cafe.getBoundingClientRect();
    rail.classList.toggle('on-dark', cr.top < vh / 2 && cr.bottom > vh / 2);
  };

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', onScroll);

  // smooth lerp for the cursor preview
  const loop = () => {
    if (prevOn) { px += (mx - px) * 0.14; py += (my - py) * 0.14; prev.style.left = `${px}px`; prev.style.top = `${py}px`; }
    requestAnimationFrame(loop);
  };
  if (!reduce) loop();

  renderGallery('env');
  onScroll();
})();
