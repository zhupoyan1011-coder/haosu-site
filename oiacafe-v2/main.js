/* 伊亞咖啡民宿 — 互動與動態 */
(() => {
  // 照片放在同一層的 img 資料夾
  const IMG = 'img/';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const MOTION = document.documentElement.classList.contains('motion');
  const EASE = 'cubic-bezier(.16,1,.3,1)';
  const wait = ms => new Promise(r => setTimeout(r, ms));
  // 等動畫結束，但最多等到時間到：分頁在背景或手機很忙時，動畫可能暫停，不能讓內容卡住
  const settle = (anim, ms) => Promise.race([anim.finished.catch(() => {}), wait(ms)]);

  /* ---------- 房型資料 ----------
     館別、樓層、房型與設備：伊亞官網 oiacafe.com 的房型說明圖。
     坪數：上一版改版提案（公開資料整理），null 表示沒有資料，不自行填寫。 */
  const MAIN = '伊亞旅宿', ANNEX = '伊亞二館';
  const ROOMS = [
    { name: '伊亞房', en: 'Oia', bldg: MAIN, floor: '2F', type: '雙人套房', size: null, ppl: 2,
      line: '與民宿同名，最有聖托里尼味道的一間',
      desc: '白牆、藍窗與木質的溫度，像把伊亞小鎮的一角搬進台東。衛浴乾溼分離，附法式浴缸與專屬陽台。',
      bath: '乾溼分離・法式浴缸', features: ['法式浴缸', '專屬陽台'], filters: ['two', 'bath', 'balcony'],
      photos: ['oia.webp', ...range(3, 9).map(n => `roomoia_${n}.webp`)] },
    { name: '希臘公主房', en: 'Greek Princess', bldg: MAIN, floor: '3F', type: '雙人套房', size: 28, ppl: 2,
      line: '兩面玻璃牆，附專屬陽台',
      desc: '公主風格的寬敞雙人套房，兩面玻璃牆，附專屬陽台。',
      bath: null, features: ['兩面玻璃牆', '專屬陽台'], filters: ['two', 'balcony'],
      photos: ['princess.webp', ...range(2, 7).map(n => `roomprim_${n}.webp`)] },
    { name: '雅典星空房', en: 'Athens Starlight', bldg: MAIN, floor: '3F', type: '雙人套房', size: 20, ppl: 2,
      line: '天花板有一扇觀星窗',
      desc: '關燈之後抬頭，天花板的觀星窗就是今晚的夜空。浴廁分離，附專屬陽台，適合想安靜一點的兩個人。',
      bath: '浴廁分離', features: ['觀星窗', '專屬陽台'], filters: ['two', 'balcony'],
      photos: ['sky.webp', ...[2, 3, 4, 5, 7].map(n => `roomsky_${n}.webp`)] },
    { name: '橘子汽水', en: 'Orange Soda', bldg: ANNEX, floor: '1F', type: '雙人套房', size: 22, ppl: 2,
      line: '整間橘色調，甜甜的情侶房',
      desc: '明亮的橘色調雙人套房，衛浴乾溼分離，附浴缸。',
      bath: '乾溼分離・浴缸', features: ['浴缸'], filters: ['two', 'bath'],
      photos: ['2room/1a_room.webp', ...range(1, 8).map(n => `2room/1a_room_${n}.webp`)] },
    { name: '咖啡因中毒', en: 'Caffeine Overdose', bldg: ANNEX, floor: '2F', type: '雙人套房', size: null, ppl: 2,
      line: '給離不開咖啡的人',
      desc: '以咖啡為主題的房間，樓下就是咖啡館，名副其實。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      bath: '乾溼分離・浴缸', features: ['加大床', '浴缸', '專屬陽台'], filters: ['two', 'bath', 'balcony'],
      photos: ['2room/2a_room.webp', ...range(1, 7).map(n => `2room/2a_room_${n}.webp`)] },
    { name: '陽光優格', en: 'Sunny Yogurt', bldg: ANNEX, floor: '2F', type: '3+1 人套房', size: 36, ppl: 4,
      line: '伊亞最大的房型，一家人住得開',
      desc: '伊亞面積最大的房型，3+1 人入住，衛浴乾溼分離並附浴缸，適合一家人或好友同行。',
      bath: '乾溼分離・浴缸', features: ['家庭', '浴缸'], filters: ['family', 'bath'],
      photos: ['2room/2b_room.webp', ...range(1, 13).map(n => `2room/2b_room_${n}.webp`)] },
    { name: '黑色螺絲釘', en: 'Black Screw', bldg: ANNEX, floor: '3F', type: '雙人套房', size: null, ppl: 2,
      line: '黑色調、帶點工業感的房',
      desc: '以黑色為主調的主題房，和白色的伊亞形成對比。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      bath: '乾溼分離・浴缸', features: ['加大床', '浴缸', '專屬陽台'], filters: ['two', 'bath', 'balcony'],
      photos: ['2room/3a_room.webp', ...range(1, 11).map(n => `2room/3a_room_${n}.webp`)] },
    { name: 'XO白蘭地', en: 'XO Brandy', bldg: ANNEX, floor: '3F', type: '雙人套房', size: 32, ppl: 2,
      line: '寬敞，還有彈珠台或街機可以玩',
      desc: '空間寬敞的雙人套房，放了彈珠台或街機，住一晚像回到小時候。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      bath: '乾溼分離・浴缸', features: ['加大床', '浴缸', '專屬陽台'], filters: ['two', 'bath', 'balcony'],
      photos: ['2room/3b_room.webp', ...range(1, 8).map(n => `2room/3b_room_${n}.webp`)] },
  ];

  const GALLERY = {
    env: { label: '館外', files: range(1, 6).map(n => `env_${n}.webp`) },
    spac: { label: '館內', files: [0, 1, 3, 4, 5, 6, 8, 9, 10, 14].map(n => `spac_${n}.webp`) },
    room: { label: '客房', files: range(1, 9).map(n => `room_${n}.webp`) },
  };

  const img = (src, alt, lazy = true) => {
    const i = new Image();
    i.src = src; i.alt = alt; i.decoding = 'async';
    if (lazy) i.loading = 'lazy';
    return i;
  };

  /* ---------- header：捲動進度、往下收起往上出現 ---------- */
  const bar = $('.bar'), progress = $('.bar__progress');
  const menuBtn = $('.menu-btn'), drawer = $('#drawer');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    bar.classList.toggle('is-scrolled', y > 8);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    const down = y > lastY + 4, up = y < lastY - 4;
    if (down && y > 480 && drawer.hidden && !document.querySelector('dialog[open]')) bar.classList.add('is-hidden');
    else if (up || y < 480) bar.classList.remove('is-hidden');
    if (down || up) lastY = y;
  };
  // 鍵盤移到頁首時一定要看得到
  bar.addEventListener('focusin', () => bar.classList.remove('is-hidden'));

  const setDrawer = open => {
    menuBtn.setAttribute('aria-expanded', open); drawer.hidden = !open;
    if (open) bar.classList.remove('is-hidden');
  };
  menuBtn.addEventListener('click', () => setDrawer(drawer.hidden));
  drawer.addEventListener('click', e => { if (e.target.closest('a')) setDrawer(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); menuBtn.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setDrawer(false); });

  /* ---------- rooms ---------- */
  const grid = $('#room-grid');
  ROOMS.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'room';
    li.dataset.filters = r.filters.join(' ');
    const tags = [r.size ? `約 ${r.size}㎡` : null, `${r.ppl === 4 ? '3+1' : r.ppl} 人`, ...r.features]
      .filter(Boolean).map(t => `<span class="tag">${t}</span>`).join('');
    li.innerHTML = `
      <button class="room__btn" type="button" data-room="${i}" aria-haspopup="dialog">
        <span class="room__photo"><span class="room__more" aria-hidden="true">${r.photos.length} 張照片</span></span>
        <span class="room__where">${r.bldg}・${r.floor}</span>
        <span class="room__name">${r.name}</span>
        <span class="room__en" lang="en">${r.en}</span>
        <span class="room__line">${r.line}</span>
        <span class="room__tags">${tags}</span>
        <span class="sr">，查看照片與房型資訊</span>
      </button>`;
    $('.room__photo', li).prepend(img(IMG + r.photos[0], `${r.name}房內照片`));
    grid.append(li);
  });

  // 篩選：留下的卡片從原位置滑到新位置，新出現的淡入
  const count = $('#rooms-count');
  const filterRooms = f => {
    const items = $$('.room', grid);
    const before = new Map(items.map(li => [li, li.hidden ? null : li.getBoundingClientRect()]));
    let n = 0;
    items.forEach(li => {
      const show = f === 'all' || li.dataset.filters.split(' ').includes(f);
      li.hidden = !show; if (show) n++;
    });
    count.textContent = f === 'all' ? `共 ${n} 間` : `符合條件 ${n} 間`;
    sweep();
    if (!MOTION) return;
    items.forEach(li => {
      if (li.hidden) return;
      const a = before.get(li), b = li.getBoundingClientRect();
      if (!a) li.animate([{ opacity: 0, transform: 'translateY(24px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: EASE, delay: 120 });
      else if (a.left !== b.left || a.top !== b.top) li.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'none' }], { duration: 750, easing: EASE });
    });
  };
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    filterRooms(c.dataset.filter);
  }));

  /* ---------- 對話框共用：開關動畫 ---------- */
  const lockScroll = on => { document.body.style.overflow = on ? 'hidden' : ''; };
  const closeDialog = d => {
    if (!d.open || d.classList.contains('is-closing')) return;
    // 關閉時直接解除捲動鎖定，不等 close 事件（瀏覽器在背景時那個事件會延後）
    const done = () => { d.classList.remove('is-closing'); d.close(); if (!$('dialog[open]')) lockScroll(false); };
    if (!MOTION) { done(); return; }
    d.classList.add('is-closing');
    setTimeout(done, 300);
  };
  // 照片換張：往按的方向滑出、再從另一邊滑進來
  const swapImage = async (el, src, alt, dir) => {
    const token = (el._token = (el._token || 0) + 1);
    if (MOTION && el.getAttribute('src')) {
      await settle(el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${-dir * 28}px)` }], { duration: 160, easing: 'ease-in', fill: 'forwards' }), 200);
    }
    if (token !== el._token) return;
    el.src = src; el.alt = alt;
    try { await Promise.race([el.decode(), wait(1500)]); } catch {}
    if (token !== el._token) return;
    el.getAnimations().forEach(a => a.cancel());
    if (MOTION) el.animate([{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
  };

  /* room dialog */
  const dlg = $('#room-dlg');
  const stage = $('.room-dlg__stage img', dlg);
  let cur = null, shot = 0;
  const showShot = (n, dir = 1) => {
    const ph = cur.photos;
    shot = (n + ph.length) % ph.length;
    swapImage(stage, IMG + ph[shot], `${cur.name}，第 ${shot + 1} 張照片`, dir);
    $('.room-dlg__count', dlg).textContent = `${shot + 1} / ${ph.length}`;
    $$('.room-dlg__thumbs button', dlg).forEach((b, k) => {
      b.setAttribute('aria-current', k === shot);
      if (k === shot) b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: MOTION ? 'smooth' : 'auto' });
    });
  };
  const openRoom = i => {
    cur = ROOMS[i];
    $('.room-dlg__where', dlg).textContent = `${cur.bldg}・${cur.floor}`;
    $('.room-dlg__title', dlg).textContent = cur.name;
    $('.room-dlg__en', dlg).textContent = cur.en;
    $('.room-dlg__desc', dlg).textContent = cur.desc;
    const rows = [
      ['房型', cur.type],
      ['坪數', cur.size ? `約 ${cur.size} ㎡` : '請見訂房系統'],
      ['衛浴', cur.bath || '請見訂房系統'],
      ['陽台', cur.filters.includes('balcony') ? '專屬陽台' : '—'],
      ['早晨', '每人每日一杯現做飲品'],
    ];
    $('.room-dlg__spec', dlg).innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const th = $('.room-dlg__thumbs', dlg);
    th.innerHTML = '';
    cur.photos.forEach((p, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `看第 ${k + 1} 張`);
      b.append(img(IMG + p, ''));
      b.addEventListener('click', () => showShot(k, k >= shot ? 1 : -1));
      th.append(b);
    });
    stage.removeAttribute('src');
    dlg.showModal();
    lockScroll(true);
    showShot(0);
  };
  grid.addEventListener('click', e => { const b = e.target.closest('.room__btn'); if (b) openRoom(+b.dataset.room); });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-close]')) closeDialog(dlg);
    const s = e.target.closest('[data-step]'); if (s) showShot(shot + +s.dataset.step, +s.dataset.step);
  });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showShot(shot + 1, 1);
    if (e.key === 'ArrowLeft') showShot(shot - 1, -1);
  });
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeDialog(dlg); });
  dlg.addEventListener('close', () => lockScroll(false));

  // 手機左右滑動換照片
  const swipe = (el, fn) => {
    let sx = null;
    el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) fn(dx < 0 ? 1 : -1);
    });
  };
  swipe($('.room-dlg__stage', dlg), d => showShot(shot + d, d));

  /* ---------- gallery ---------- */
  const gGrid = $('#gallery-grid');
  const pill = $('.tabs__pill');
  let gSet = 'env';
  const renderGallery = (key, animate) => {
    gSet = key;
    const { label, files } = GALLERY[key];
    gGrid.innerHTML = '';
    files.forEach((f, i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-haspopup', 'dialog');
      b.append(img(IMG + 'thumb/' + f, `${label}照片 ${i + 1}，點擊放大`));
      b.addEventListener('click', () => openLb(i, b));
      li.append(b); gGrid.append(li);
      if (animate && MOTION) li.animate([{ opacity: 0, transform: 'translateY(30px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 800, easing: EASE, delay: i * 55, fill: 'backwards' });
    });
  };
  const movePill = t => {
    if (!pill) return;
    pill.style.width = `${t.offsetWidth}px`;
    pill.style.transform = `translateX(${t.offsetLeft}px)`;
  };
  const tabs = $$('.tabs [role="tab"]');
  const selectTab = async t => {
    if (t.getAttribute('aria-selected') === 'true') return;
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
    gGrid.setAttribute('aria-labelledby', t.id);
    movePill(t);
    if (MOTION) await settle(gGrid.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-10px)' }], { duration: 180, easing: 'ease-in' }), 220);
    if (t.getAttribute('aria-selected') !== 'true') return; // 連點時只畫最後選的那一組
    renderGallery(t.dataset.set, true);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const n = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(n); n.focus();
    });
  });
  renderGallery('env', false);
  const placePill = () => movePill($('.tabs [aria-selected="true"]'));
  placePill();
  addEventListener('resize', placePill);
  document.fonts?.ready.then(placePill);

  /* lightbox：從縮圖的位置放大出來 */
  const lb = $('#lightbox'), lbImg = $('img', lb);
  let lbI = 0;
  const lbShow = (i, dir = 1) => {
    const { label, files } = GALLERY[gSet];
    lbI = (i + files.length) % files.length;
    $('.lightbox__count', lb).textContent = `${lbI + 1} / ${files.length}`;
    return swapImage(lbImg, IMG + files[lbI], `${label}照片 ${lbI + 1}`, dir);
  };
  const openLb = async (i, from) => {
    const { label, files } = GALLERY[gSet];
    lbI = i;
    $('.lightbox__count', lb).textContent = `${i + 1} / ${files.length}`;
    lbImg._token = (lbImg._token || 0) + 1;
    lbImg.getAnimations().forEach(a => a.cancel());
    lbImg.src = IMG + files[i]; lbImg.alt = `${label}照片 ${i + 1}`;
    lbImg.style.opacity = '0';
    lb.showModal(); lockScroll(true);
    try { await Promise.race([lbImg.decode(), wait(900)]); } catch {}
    lbImg.style.opacity = '';
    if (!MOTION || !from) return;
    const a = from.getBoundingClientRect(), b = lbImg.getBoundingClientRect();
    if (!b.width) return;
    const s = a.width / b.width;
    lbImg.animate([
      { transform: `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${s})`, opacity: .4 },
      { transform: 'none', opacity: 1 },
    ], { duration: 700, easing: EASE });
  };
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.closest('[data-close]')) closeDialog(lb);
    const s = e.target.closest('[data-step]'); if (s) lbShow(lbI + +s.dataset.step, +s.dataset.step);
  });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') lbShow(lbI + 1, 1);
    if (e.key === 'ArrowLeft') lbShow(lbI - 1, -1);
  });
  lb.addEventListener('cancel', e => { e.preventDefault(); closeDialog(lb); });
  lb.addEventListener('close', () => lockScroll(false));
  swipe($('.lightbox__fig', lb), d => lbShow(lbI + d, d));

  /* ---------- copy address ---------- */
  $$('[data-copy]').forEach(b => {
    const label = b.textContent; // 先記下原文字，連按兩次也不會變成「已複製」
    let t;
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = '已複製'; }
      catch { b.textContent = b.dataset.copy; }
      clearTimeout(t); t = setTimeout(() => { b.textContent = label; }, 2200);
    });
  });

  /* ---------- 入住／退房時間：數字滾動到正確的時間 ---------- */
  $$('[data-roll]').forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    if (!MOTION) return;
    let k = 0;
    el.innerHTML = [...text].map(ch => {
      if (!/\d/.test(ch)) return `<span aria-hidden="true">${ch}</span>`;
      const digits = [...range(0, 9), ...range(0, 9)].map(d => `<span>${d}</span>`).join('');
      return `<span class="roll" aria-hidden="true"><span class="roll__col" style="--i:${k++}" data-to="${10 + +ch}">${digits}</span></span>`;
    }).join('');
  });
  const rollIn = el => $$('.roll__col', el).forEach(c => { c.style.transform = `translateY(${-1.2 * c.dataset.to}em)`; });

  /* ---------- 捲動進場 ----------
     不用「進到畫面才出現」的寫法，而是每次捲動都檢查：凡是已經捲過、或進到畫面 90% 以內的，
     一律顯示。這樣快速跳轉（點選單）時，經過的內容不會留下空白。 */
  const pending = new Set();
  const mark = (els, cls, opt = {}) => els.forEach((el, n) => {
    if (!el || el.closest('.hero')) return;
    el.classList.add(cls);
    if (opt.stagger) el.style.setProperty('--d', `${(n % opt.stagger) * 90}ms`);
    pending.add(el);
  });
  const reveal = el => {
    pending.delete(el);
    if (el.classList.contains('rv-group')) [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
    el.classList.add('is-in');
    if (el.classList.contains('rv-img')) setTimeout(() => el.classList.add('rv-done'), 2000);
    if (el.classList.contains('times')) rollIn(el);
  };
  const sweep = () => {
    if (!pending.size) return;
    const limit = innerHeight * 0.9;
    pending.forEach(el => { if (el.getBoundingClientRect().top < limit) reveal(el); });
  };

  if (MOTION) {
    // 標題拆成一行一行，用遮罩往上推出
    $$('.sec .h2, .finale .h2').forEach(h => {
      h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((p, i) => `<span class="ln"><span style="--i:${i}">${p.trim()}</span></span>`).join('');
    });
    // 引言拆成單字
    const q = $('.quote p');
    if (q) q.innerHTML = [...q.textContent].map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`).join('');

    mark($$('.sec .h2, .finale .h2'), 'rv-lines');
    mark($$('.sec .eyebrow, .lead, .addr, .btn-row, .note, .rooms__count, .filters, .tabs, .perk, .menu, .finale__card, .quote footer'), 'rv-up');
    mark($$('.stats, .points, .info, .times, .contact, .route, .gallery__grid'), 'rv-group');
    mark($$('.arch, .cafe__photo'), 'rv-img');
    mark([$('.quote')], 'rv-quote');
    mark($$('.wave').filter(w => !w.matches('.hero + .wave')), 'rv-wave');
    const cols = () => (innerWidth > 1080 ? 4 : innerWidth > 820 ? 3 : 2);
    mark($$('.room'), 'rv-up', { stagger: cols() });
    mark($$('.room__photo'), 'rv-img', { stagger: cols() });
    // 首頁下方的波浪跟著首頁進場一起畫
    const heroWave = $('.hero + .wave');
    if (heroWave) setTimeout(() => reveal(heroWave), document.documentElement.classList.contains('has-curtain') ? 1900 : 1100);

    /* 視差、跑馬燈：用同一個 rAF 迴圈，只在捲動或跑馬燈在畫面上時運作 */
    const par = $$('[data-parallax]').map(el => ({ el, img: $('img', el), k: +el.dataset.parallax }));
    const band = $('.band'), track = $('.band__track');
    let bandX = 0, bandOn = false, vel = 0, prevY = scrollY, ticking = false;
    new IntersectionObserver(([e]) => { bandOn = e.isIntersecting; if (bandOn) loop(); }).observe(band);

    const frame = () => {
      const y = scrollY;
      vel = vel * 0.9 + (y - prevY) * 0.1; prevY = y;
      par.forEach(({ el, img: im, k }) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) return;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        im.style.translate = `0 ${(-p * r.height * k).toFixed(1)}px`;
      });
      if (bandOn) {
        const half = track.scrollWidth / 2;
        bandX -= 0.6 + Math.min(Math.abs(vel) * 0.35, 14);
        if (bandX <= -half) bandX += half;
        track.style.transform = `translate3d(${bandX.toFixed(1)}px,0,0)`;
      }
    };
    function loop() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function step() {
        frame();
        if (bandOn || Math.abs(vel) > 0.5) requestAnimationFrame(step); else ticking = false;
      });
    }
    addEventListener('scroll', () => { onScroll(); sweep(); loop(); }, { passive: true });
    addEventListener('resize', () => { sweep(); loop(); });
    addEventListener('load', sweep);
    frame();
  } else {
    addEventListener('scroll', onScroll, { passive: true });
    $$('.times').forEach(rollIn);
  }
  onScroll();
  sweep();
})();
