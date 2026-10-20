/* Oia Cafe B&B — redesign interactions */
(() => {
  const IMG = 'img/';
  const THUMB = 'img/thumb/';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = () => matchMedia('(min-width: 821px)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const intro = document.documentElement.classList.contains('intro');
  const BOOK = 'https://wrs.ec-hotel.net/wep4webhotel/webhotel/0243/hotel/showProductRoomList.action?locale=zh_TW';

  /* ---------- data ----------
     館別、樓層、房型、衛浴、陽台、加大床：伊亞官網 oiacafe.com 的房型說明圖。
     坪數、觀星窗、彈珠台：公開資料整理，待老闆確認；null 表示沒有資料，不自行填寫。 */
  const MAIN = '伊亞旅宿', ANNEX = '伊亞二館';
  const ROOMS = [
    { name: '伊亞房', en: 'Oia', bldg: MAIN, floor: '2F', type: '雙人套房', line: '與民宿同名，最有聖托里尼味道的一間',
      desc: '白牆、藍窗與木質的溫度，像把伊亞小鎮的一角搬進台東。衛浴乾溼分離，附法式浴缸與專屬陽台。',
      size: null, ppl: '2', bath: '乾溼分離・法式浴缸', balcony: true, tags: ['法式浴缸', '專屬陽台'], filters: ['two', 'bath'],
      photos: ['oia.webp', ...range(3, 9).map(n => `roomoia_${n}.webp`)] },
    { name: '希臘公主房', en: 'Greek Princess', bldg: MAIN, floor: '3F', type: '雙人套房', line: '兩面玻璃牆，附專屬陽台',
      desc: '公主風格的寬敞雙人套房，兩面玻璃牆，附專屬陽台。',
      size: 28, ppl: '2', bath: null, balcony: true, tags: ['兩面玻璃牆', '專屬陽台'], filters: ['two'],
      photos: ['princess.webp', ...range(2, 7).map(n => `roomprim_${n}.webp`)] },
    { name: '雅典星空房', en: 'Athens Starlight', bldg: MAIN, floor: '3F', type: '雙人套房', line: '天花板有一扇觀星窗',
      desc: '關燈之後抬頭，天花板的觀星窗就是今晚的夜空。浴廁分離，附專屬陽台，適合想安靜一點的兩個人。',
      size: 20, ppl: '2', bath: '浴廁分離', balcony: true, tags: ['觀星窗', '專屬陽台'], filters: ['two', 'stars'],
      photos: ['sky.webp', ...[2, 3, 4, 5, 7].map(n => `roomsky_${n}.webp`)] },
    { name: '橘子汽水', en: 'Orange Soda', bldg: ANNEX, floor: '1F', type: '雙人套房', line: '整間橘色調，甜甜的情侶房',
      desc: '明亮的橘色調雙人套房，衛浴乾溼分離，附浴缸。',
      size: 22, ppl: '2', bath: '乾溼分離・浴缸', balcony: false, tags: ['橘色調', '浴缸'], filters: ['two', 'bath'],
      photos: ['2room/1a_room.webp', ...range(1, 8).map(n => `2room/1a_room_${n}.webp`)] },
    { name: '咖啡因中毒', en: 'Caffeine Overdose', bldg: ANNEX, floor: '2F', type: '雙人套房', line: '給離不開咖啡的人',
      desc: '以咖啡為主題的房間，樓下就是咖啡館，名副其實。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      size: null, ppl: '2', bath: '乾溼分離・浴缸', balcony: true, tags: ['加大床', '浴缸', '專屬陽台'], filters: ['two', 'bath'],
      photos: ['2room/2a_room.webp', ...range(1, 7).map(n => `2room/2a_room_${n}.webp`)] },
    { name: '陽光優格', en: 'Sunny Yogurt', bldg: ANNEX, floor: '2F', type: '3+1 人套房', line: '伊亞最大的房型，一家人住得開',
      desc: '伊亞面積最大的房型，3+1 人入住，衛浴乾溼分離並附浴缸，適合一家人或好友同行。',
      size: 36, ppl: '3+1', bath: '乾溼分離・浴缸', balcony: false, tags: ['家庭', '浴缸'], filters: ['family', 'bath'],
      photos: ['2room/2b_room.webp', ...range(1, 13).map(n => `2room/2b_room_${n}.webp`)] },
    { name: '黑色螺絲釘', en: 'Black Screw', bldg: ANNEX, floor: '3F', type: '雙人套房', line: '黑色調、帶點工業感的房',
      desc: '以黑色為主調的主題房，和白色的伊亞形成對比。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      size: null, ppl: '2', bath: '乾溼分離・浴缸', balcony: true, tags: ['加大床', '浴缸', '專屬陽台'], filters: ['two', 'bath'],
      photos: ['2room/3a_room.webp', ...range(1, 11).map(n => `2room/3a_room_${n}.webp`)] },
    { name: 'XO白蘭地', en: 'XO Brandy', bldg: ANNEX, floor: '3F', type: '雙人套房', line: '寬敞，還有彈珠台或街機可以玩',
      desc: '空間寬敞的雙人套房，放了彈珠台或街機，住一晚像回到小時候。加大床、衛浴乾溼分離，附浴缸與專屬陽台。',
      size: 32, ppl: '2', bath: '乾溼分離・浴缸', balcony: true, tags: ['彈珠台／街機', '加大床', '浴缸'], filters: ['two', 'bath', 'play'],
      photos: ['2room/3b_room.webp', ...range(1, 8).map(n => `2room/3b_room_${n}.webp`)] },
  ];
  const GALLERY = {
    env: { label: '館外', files: range(1, 6).map(n => `env_${n}.webp`) },
    spac: { label: '館內', files: [0, 1, 3, 4, 5, 6, 8, 9, 10, 14].map(n => `spac_${n}.webp`) },
    room: { label: '客房', files: range(1, 9).map(n => `room_${n}.webp`) },
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

  /* ---------- 對話框共用：鍵盤焦點留在裡面、關閉後回到原本的按鈕 ---------- */
  const focusables = el => $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', el).filter(x => x.offsetParent !== null);
  const trapTab = (e, el) => {
    if (e.key !== 'Tab') return;
    const f = focusables(el); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  // 換照片：舊的往按的方向滑出，新的載好後從另一邊滑進來
  const swapImg = (el, src, alt, dir) => {
    const token = (el._t = (el._t || 0) + 1);
    el.style.setProperty('--dir', dir);
    const show = () => {
      if (token !== el._t) return;
      el.classList.add('is-enter'); el.classList.remove('is-swap');
      el.src = src; el.alt = alt;
      const done = () => { if (token !== el._t) return; void el.offsetWidth; el.classList.remove('is-enter'); };
      (el.decode ? Promise.race([el.decode(), new Promise(r => setTimeout(r, 1500))]) : Promise.resolve()).catch(() => {}).then(done);
    };
    if (reduce || !el.getAttribute('src')) { show(); return; }
    el.classList.add('is-swap');
    setTimeout(show, 260);
  };

  /* ---------- loader：每個瀏覽階段只播一次 ---------- */
  const ready = () => {
    document.body.classList.add('is-ready');
    document.body.classList.remove('is-loading');
    setTimeout(() => $('.loader')?.remove(), 1400);
  };
  if (intro) setTimeout(ready, 1300);
  else { $('.loader')?.remove(); requestAnimationFrame(() => requestAnimationFrame(ready)); setTimeout(ready, 120); }

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
      `<span><em>${r.ppl}</em>人</span>`,
      `<span>${r.bldg.replace('伊亞', '')}・${r.floor}</span>`,
    ].join('');
    li.innerHTML = `
      <button class="room__btn" type="button" data-room="${i}" aria-haspopup="dialog" aria-label="${r.name}，看照片與房型資訊">
        <span class="room__thumb ph" data-ph="${r.en}"></span>
        <span class="room__no">${String(i + 1).padStart(2, '0')}</span>
        <span class="room__name"><b>${r.name}</b><i>${r.en}</i></span>
        <span class="room__line">${r.line}</span>
        <span class="room__spec">${spec}</span>
        <span class="room__arrow" aria-hidden="true">→</span>
      </button>`;
    $('.room__thumb', li).append(mkImg(IMG + r.photos[0], r.name));
    list.append(li);
  });

  const count = $('#rooms-count');
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => { x.classList.toggle('is-on', x === c); x.setAttribute('aria-pressed', x === c); });
    const f = c.dataset.filter;
    let n = 0, k = 0;
    $$('.room').forEach(li => {
      const out = f !== 'all' && !li.dataset.filters.split(' ').includes(f);
      li.classList.toggle('is-out', out);
      li.inert = out; // 淡掉的房不能被點，也不能用 Tab 走到
      if (!out) {
        n++;
        if (!reduce && f !== 'all') { li.classList.remove('is-hit'); li.style.animationDelay = `${k++ * 70}ms`; void li.offsetWidth; li.classList.add('is-hit'); }
      }
    });
    count.textContent = f === 'all' ? `共 ${n} 間` : `符合條件 ${n} 間`;
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
  const showShot = (n, dir = 1) => {
    const ph = cur.photos;
    shot = (n + ph.length) % ph.length;
    swapImg(stage, IMG + ph[shot], `${cur.name} 照片 ${shot + 1}`, dir);
    $('.panel__count', panel).textContent = `${shot + 1} / ${ph.length}`;
    $$('.panel__thumbs button', panel).forEach((b, i) => { b.classList.toggle('is-on', i === shot); b.setAttribute('aria-current', i === shot); });
    $$('.panel__thumbs button', panel)[shot]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  const openRoom = i => {
    cur = ROOMS[i]; lastFocus = document.activeElement;
    $('.panel__no', panel).textContent = `Room ${String(i + 1).padStart(2, '0')}・${cur.bldg} ${cur.floor}`;
    $('.panel__title', panel).textContent = cur.name;
    $('.panel__en', panel).textContent = cur.en;
    $('.panel__desc', panel).textContent = cur.desc;
    $('.panel__spec', panel).innerHTML =
      `<dt>房型</dt><dd>${cur.type}</dd>` +
      `<dt>坪數</dt><dd>${cur.size ? `約 ${cur.size} ㎡` : '請見訂房系統'}</dd>` +
      `<dt>衛浴</dt><dd>${cur.bath || '請見訂房系統'}</dd>` +
      `<dt>陽台</dt><dd>${cur.balcony ? '專屬陽台' : '—'}</dd>` +
      `<dt>早晨</dt><dd>每人每日一杯現做飲品</dd>`;
    $('.panel__tags', panel).innerHTML = cur.tags.map(t => `<li>${t}</li>`).join('');
    const th = $('.panel__thumbs', panel);
    th.innerHTML = '';
    cur.photos.forEach((p, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `第 ${k + 1} 張`);
      b.className = 'ph'; b.dataset.ph = '';
      b.append(mkImg(IMG + p));
      b.onclick = () => showShot(k, k >= shot ? 1 : -1);
      th.append(b);
    });
    stage.removeAttribute('src');
    panel.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));
    setTimeout(() => panel.classList.add('is-open'), 60);
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
    const s = e.target.closest('[data-step]'); if (s) showShot(shot + +s.dataset.step, +s.dataset.step);
  });
  // swipe on the photo stage
  let sx = null;
  $('.panel__stage', panel).addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  $('.panel__stage', panel).addEventListener('touchend', e => {
    if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { const d = dx < 0 ? 1 : -1; showShot(shot + d, d); }
  });

  /* ---------- gallery ---------- */
  const track = $('#track');
  const gCount = $('.gallery__count');
  const pill = $('.tabs__pill');
  let gSet = 'env';
  const pad = n => String(n).padStart(2, '0');
  const renderGallery = key => {
    gSet = key;
    track.classList.remove('is-in');
    track.innerHTML = '';
    GALLERY[key].files.forEach((f, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ph'; b.dataset.ph = GALLERY[key].label;
      b.style.transitionDelay = `${Math.min(i, 8) * 0.06}s`;
      b.setAttribute('aria-label', `放大 ${GALLERY[key].label} 第 ${i + 1} 張`);
      b.setAttribute('aria-haspopup', 'dialog');
      b.append(mkImg(THUMB + f, `${GALLERY[key].label} ${i + 1}`, IMG + f));
      const s = document.createElement('span'); s.textContent = pad(i + 1); b.append(s);
      b.onclick = () => openLb(i, b);
      track.append(b);
    });
    if (gCount) gCount.textContent = `01 / ${pad(GALLERY[key].files.length)}`;
    requestAnimationFrame(() => { sizeGallery(); requestAnimationFrame(() => track.classList.add('is-in')); });
    setTimeout(() => track.classList.add('is-in'), 400);
  };
  const tabs = $$('.tabs [role="tab"]');
  const movePill = t => { if (!pill || !t) return; pill.style.width = `${t.offsetWidth}px`; pill.style.transform = `translateX(${t.offsetLeft}px)`; };
  const selectTab = t => {
    tabs.forEach(x => { const on = x === t; x.classList.toggle('is-on', on); x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
    movePill(t);
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
  const placePill = () => movePill($('.tabs .is-on'));
  document.fonts?.ready.then(placePill);

  const gallery = $('#gallery');
  let gExtra = 0;
  const sizeGallery = () => {
    if (!desktop() || reduce) { gallery.style.height = ''; track.style.transform = ''; gExtra = 0; return; }
    const visible = innerWidth - track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).transform.split(',')[4] || 0);
    gExtra = Math.max(0, track.scrollWidth - visible);
    gallery.style.height = `${innerHeight + gExtra}px`;
  };
  addEventListener('resize', () => { sizeGallery(); placePill(); });
  track.addEventListener('load', sizeGallery, true);

  /* lightbox：從縮圖的位置放大出來 */
  const lb = $('#lightbox'), lbImg = $('img', lb), lbFig = $('figure', lb);
  let lbI = 0, lbFrom = null;
  const lbShow = (i, dir = 1) => {
    const files = GALLERY[gSet].files;
    lbI = (i + files.length) % files.length;
    lbFig.classList.remove('noimg');
    lbImg.dataset.altSrc = THUMB + files[lbI];
    swapImg(lbImg, IMG + files[lbI], `${GALLERY[gSet].label} ${lbI + 1}`, dir);
    $('.lightbox__count', lb).textContent = `${lbI + 1} / ${files.length}`;
  };
  // 圖片用 contain 顯示時，實際畫出來的範圍
  const shownRect = () => {
    const f = lbFig.getBoundingClientRect(), w = lbImg.naturalWidth, h = lbImg.naturalHeight;
    if (!w || !h) return f;
    const s = Math.min(f.width / w, f.height / h), W = w * s, H = h * s;
    return { left: f.left + (f.width - W) / 2, top: f.top + (f.height - H) / 2, width: W, height: H };
  };
  const openLb = async (i, from) => {
    lbFrom = from || document.activeElement;
    const files = GALLERY[gSet].files;
    lbI = i;
    lbImg._t = (lbImg._t || 0) + 1;
    lbImg.classList.remove('is-swap', 'is-enter');
    lbImg.dataset.altSrc = THUMB + files[i];
    lbImg.src = IMG + files[i]; lbImg.alt = `${GALLERY[gSet].label} ${i + 1}`;
    $('.lightbox__count', lb).textContent = `${i + 1} / ${files.length}`;
    lb.classList.toggle('is-entering', !reduce);
    lbImg.style.opacity = '0';
    lb.hidden = false; document.body.style.overflow = 'hidden';
    $('.lightbox__close', lb).focus({ preventScroll: true });
    try { await Promise.race([lbImg.decode(), new Promise(r => setTimeout(r, 900))]); } catch {}
    lbImg.style.opacity = '';
    requestAnimationFrame(() => lb.classList.remove('is-entering'));
    setTimeout(() => lb.classList.remove('is-entering'), 80);
    if (reduce || !from || !lbImg.animate) return;
    const a = from.getBoundingClientRect(), b = shownRect();
    if (!b.width) return;
    const fr = lbFig.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2);
    // 以實際畫面中心為基準縮放
    lbImg.style.transformOrigin = `${b.left - fr.left + b.width / 2}px ${b.top - fr.top + b.height / 2}px`;
    lbImg.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width})`, opacity: .5 }, { transform: 'none', opacity: 1 }], { duration: 750, easing: 'cubic-bezier(.22,.7,.12,1)' });
  };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ''; lbImg.style.transformOrigin = ''; lbFrom?.focus({ preventScroll: true }); };
  lb.addEventListener('click', e => {
    if (e.target.closest('[data-lb-close]') || e.target === lb) closeLb();
    const n = e.target.closest('[data-lb]'); if (n) lbShow(lbI + +n.dataset.lb, +n.dataset.lb);
  });
  let lsx = null;
  lb.addEventListener('touchstart', e => { lsx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (lsx === null) return; const dx = e.changedTouches[0].clientX - lsx; lsx = null;
    if (Math.abs(dx) > 40) { const d = dx < 0 ? 1 : -1; lbShow(lbI + d, d); }
  });

  addEventListener('keydown', e => {
    if (!lb.hidden) {
      trapTab(e, lb);
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') lbShow(lbI + 1, 1);
      if (e.key === 'ArrowLeft') lbShow(lbI - 1, -1);
    } else if (!panel.hidden) {
      trapTab(e, panel);
      if (e.key === 'Escape') closeRoom();
      if (e.key === 'ArrowRight') showShot(shot + 1, 1);
      if (e.key === 'ArrowLeft') showShot(shot - 1, -1);
    } else if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      setDrawer(false); menuBtn.focus();
    }
  });

  /* ---------- nav drawer ---------- */
  const menuBtn = $('.bar__menu'), drawer = $('#drawer');
  const setDrawer = open => {
    menuBtn.setAttribute('aria-expanded', open);
    if (open) { drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('is-open')); setTimeout(() => drawer.classList.add('is-open'), 60); }
    else { drawer.classList.remove('is-open'); setTimeout(() => { if (!drawer.classList.contains('is-open')) drawer.hidden = true; }, 800); }
    $('.bar').classList.toggle('is-menu', open);
    if (open) $('.bar').classList.remove('is-hidden');
  };
  menuBtn.addEventListener('click', () => setDrawer(menuBtn.getAttribute('aria-expanded') !== 'true'));
  $$('a', drawer).forEach(a => a.addEventListener('click', () => setDrawer(false)));

  /* ---------- copy address ---------- */
  $$('[data-copy]').forEach(b => {
    const label = b.textContent; // 先記下原文字，連按也不會卡在「已複製」
    let t;
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = '已複製 ✓'; }
      catch { b.textContent = b.dataset.copy; }
      clearTimeout(t); t = setTimeout(() => { b.textContent = label; }, 2200);
    });
  });

  /* ---------- departure-board flaps ---------- */
  const FLAP = '0123456789:–ABCDEFHINOPRUW';
  const flap = el => {
    const target = el.dataset.flap;
    el.setAttribute('aria-label', target);
    el.innerHTML = [...target].map(() => '<b aria-hidden="true"></b>').join('');
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

  /* ---------- reveal on scroll ----------
     每次捲動都檢查：已經捲過、或進到畫面 88% 以內的一律顯示。
     點選單快速跳轉時，中間經過的區塊不會留下空白。 */
  const pending = new Set($$('.reveal, .reveal-lines, .reveal-img, .reveal-group, .line-map'));
  const reveal = el => {
    pending.delete(el);
    el.classList.add('is-in');
    if (el.classList.contains('reveal-group')) $$(':scope>*', el).forEach((c, i) => { c.style.transitionDelay = `${i * 0.09}s`; });
    if (el.classList.contains('board')) $$('.board__t', el).forEach((t, i) => setTimeout(() => flap(t), i * 120));
    if (el.classList.contains('line-map') && !reduce) setTimeout(() => {
      el.classList.add('is-run');
      try { $('#lm-run')?.beginElement(); } catch {}
    }, 2400);
  };
  const sweep = () => {
    if (!pending.size) return;
    const limit = innerHeight * 0.88;
    pending.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < limit && (r.width || r.height)) reveal(el); });
  };
  if (reduce) pending.forEach(reveal);

  /* ---------- marquee：平常慢慢走，捲得越快走得越快，往回捲就反方向 ---------- */
  const mq = $('.marquee'), mqTrack = $('.marquee__track');
  let mqX = 0, mqOn = false, mqDir = -1, vel = 0;
  if (!reduce) {
    mq.classList.add('is-js');
    new IntersectionObserver(([e]) => { mqOn = e.isIntersecting; if (mqOn) kick(); }).observe(mq);
  }

  /* ---------- scroll-driven: bar, rail, parallax, gallery ---------- */
  const bar = $('.bar'), barP = $('.bar__progress'), hero = $('.hero'), heroImg = $('.hero__media img'), heroInner = $('.hero__inner');
  const rail = $('.rail'), railFill = $('.rail__fill');
  const stops = $$('[data-stop]');
  const railItems = $$('.rail__stops li');
  const navLinks = $$('.bar__nav a');
  const para = $$('[data-parallax]');
  const mbook = $('.mbook');
  const cafe = $('#cafe');
  const stamp = $('.cafe__stamp svg');
  let lastY = scrollY;

  const onScroll = () => {
    const y = scrollY, vh = innerHeight;
    const pastHero = y > hero.offsetHeight * 0.6;
    bar.classList.toggle('is-solid', pastHero);
    mbook.classList.toggle('is-on', y > hero.offsetHeight * 0.8);

    // 頁首：往下捲收起、往上捲出現；閱讀進度
    const max = document.documentElement.scrollHeight - vh;
    barP.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    if (y > lastY + 6 && y > vh && menuBtn.getAttribute('aria-expanded') !== 'true' && panel.hidden && lb.hidden) bar.classList.add('is-hidden');
    else if (y < lastY - 6 || y < vh) bar.classList.remove('is-hidden');
    if (Math.abs(y - lastY) > 6) lastY = y;

    if (!reduce) {
      if (y < vh * 1.2) {
        heroImg.style.transform = `translate3d(0,${y * 0.25}px,0)`;
        // 首頁文字往上淡出，比照片走得快一點
        const k = Math.min(1, y / (vh * 0.75));
        heroInner.style.transform = `translate3d(0,${-y * 0.18}px,0)`;
        heroInner.style.opacity = (1 - k * 0.9).toFixed(3);
      }
      para.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const d = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.translate = `0 ${d.toFixed(1)}px`;
      });
      if (stamp) stamp.style.rotate = `${(y * 0.12).toFixed(1)}deg`;
    }

    // horizontal gallery
    if (gExtra > 0) {
      const top = gallery.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / gExtra));
      track.style.transform = `translate3d(${-p * gExtra}px,0,0)`;
    }
    // 相簿：每張照片在框裡反向微動；計數跟著畫面中央那張
    if (!reduce) {
      const btns = track.children, mid = innerWidth / 2;
      let best = 0, bestD = Infinity;
      for (let i = 0; i < btns.length; i++) {
        const r = btns[i].getBoundingClientRect();
        if (r.right < -50 || r.left > innerWidth + 50) continue;
        const c = r.left + r.width / 2 - mid;
        const im = btns[i].querySelector('img'); if (im) im.style.translate = `${(-c * 0.06).toFixed(1)}px 0`;
        if (Math.abs(c) < bestD) { bestD = Math.abs(c); best = i; }
      }
      if (gCount && btns.length) gCount.textContent = `${pad(best + 1)} / ${pad(btns.length)}`;
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
    sweep();
  };

  let ticking = false, prevY = scrollY;
  addEventListener('scroll', () => {
    const dy = scrollY - prevY; prevY = scrollY;
    vel = vel * 0.6 + dy * 0.4;
    if (dy) mqDir = dy > 0 ? -1 : 1;
    sweep(); // 進場檢查直接跑，不等畫面更新（背景分頁或忙碌時也不會漏）
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    kick();
  }, { passive: true });
  addEventListener('resize', onScroll);
  addEventListener('load', sweep);

  // 動畫迴圈：游標預覽、跑馬燈；沒事做時自動停下
  let looping = false;
  const frame = () => {
    let busy = false;
    if (prevOn) { px += (mx - px) * 0.14; py += (my - py) * 0.14; prev.style.left = `${px}px`; prev.style.top = `${py}px`; busy = true; }
    if (mqOn) {
      vel *= 0.94;
      mqX += mqDir * (0.5 + Math.min(Math.abs(vel) * 0.45, 18));
      const half = mqTrack.scrollWidth / 2;
      if (mqX <= -half) mqX += half; else if (mqX > 0) mqX -= half;
      mqTrack.style.transform = `translate3d(${mqX.toFixed(1)}px,0,0)`;
      busy = true;
    }
    if (busy) requestAnimationFrame(frame); else looping = false;
  };
  function kick() { if (reduce || looping) return; looping = true; requestAnimationFrame(frame); }
  if (!reduce) list.addEventListener('pointerover', kick);

  renderGallery('env');
  placePill();
  onScroll();
  sweep();
  setTimeout(sweep, 300);
})();
