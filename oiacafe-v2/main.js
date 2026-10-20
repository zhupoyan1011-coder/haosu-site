/* 伊亞咖啡民宿 — 互動 */
(() => {
  // 照片放在同一層的 img 資料夾
  const IMG = 'img/';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

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

  /* ---------- header ---------- */
  const bar = $('.bar');
  const onScroll = () => bar.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const menuBtn = $('.menu-btn'), drawer = $('#drawer');
  const setDrawer = open => { menuBtn.setAttribute('aria-expanded', open); drawer.hidden = !open; };
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

  const count = $('#rooms-count');
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
    const f = c.dataset.filter;
    let n = 0;
    $$('.room', grid).forEach(li => {
      const show = f === 'all' || li.dataset.filters.split(' ').includes(f);
      li.hidden = !show; if (show) n++;
    });
    count.textContent = f === 'all' ? `共 ${n} 間` : `符合條件 ${n} 間`;
  }));

  /* room dialog */
  const dlg = $('#room-dlg');
  const stage = $('.room-dlg__stage img', dlg);
  let cur = null, shot = 0;
  const showShot = n => {
    const ph = cur.photos;
    shot = (n + ph.length) % ph.length;
    stage.src = IMG + ph[shot];
    stage.alt = `${cur.name}，第 ${shot + 1} 張照片`;
    $('.room-dlg__count', dlg).textContent = `${shot + 1} / ${ph.length}`;
    $$('.room-dlg__thumbs button', dlg).forEach((b, k) => {
      b.setAttribute('aria-current', k === shot);
      if (k === shot) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
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
      b.addEventListener('click', () => showShot(k));
      th.append(b);
    });
    dlg.showModal();
    document.body.style.overflow = 'hidden';
    showShot(0);
  };
  grid.addEventListener('click', e => { const b = e.target.closest('.room__btn'); if (b) openRoom(+b.dataset.room); });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    const s = e.target.closest('[data-step]'); if (s) showShot(shot + +s.dataset.step);
  });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showShot(shot + 1);
    if (e.key === 'ArrowLeft') showShot(shot - 1);
  });
  dlg.addEventListener('close', () => { document.body.style.overflow = ''; });

  // 手機左右滑動換照片
  const swipe = (el, fn) => {
    let sx = null;
    el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 40) fn(dx < 0 ? 1 : -1);
    });
  };
  swipe($('.room-dlg__stage', dlg), d => showShot(shot + d));

  /* ---------- gallery ---------- */
  const gGrid = $('#gallery-grid');
  let gSet = 'env';
  const renderGallery = key => {
    gSet = key;
    const { label, files } = GALLERY[key];
    gGrid.innerHTML = '';
    files.forEach((f, i) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-haspopup', 'dialog');
      b.append(img(IMG + 'thumb/' + f, `${label}照片 ${i + 1}，點擊放大`));
      b.addEventListener('click', () => openLb(i));
      li.append(b); gGrid.append(li);
    });
  };
  const tabs = $$('.tabs [role="tab"]');
  const selectTab = t => {
    tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
    gGrid.setAttribute('aria-labelledby', t.id);
    renderGallery(t.dataset.set);
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
  renderGallery('env');

  const lb = $('#lightbox'), lbImg = $('img', lb);
  let lbI = 0;
  const lbShow = i => {
    const { label, files } = GALLERY[gSet];
    lbI = (i + files.length) % files.length;
    lbImg.src = IMG + files[lbI];
    lbImg.alt = `${label}照片 ${lbI + 1}`;
    $('.lightbox__count', lb).textContent = `${lbI + 1} / ${files.length}`;
  };
  const openLb = i => { lbShow(i); lb.showModal(); document.body.style.overflow = 'hidden'; };
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.closest('[data-close]')) lb.close();
    const s = e.target.closest('[data-step]'); if (s) lbShow(lbI + +s.dataset.step);
  });
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') lbShow(lbI + 1);
    if (e.key === 'ArrowLeft') lbShow(lbI - 1);
  });
  lb.addEventListener('close', () => { document.body.style.overflow = ''; });
  swipe($('.lightbox__fig', lb), d => lbShow(lbI + d));

  /* ---------- copy address ---------- */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const label = b.textContent;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = '已複製'; }
    catch { b.textContent = b.dataset.copy; }
    setTimeout(() => { b.textContent = label; }, 2200);
  }));
})();
