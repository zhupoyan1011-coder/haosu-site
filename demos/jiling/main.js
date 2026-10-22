/* ==========================================================
   內容設定：品牌、房間、規格、照片說明、平面圖、預約選項集中在這裡。
   換成真實客戶時，主要改這個物件；照片可在 rooms[].photos 填入網址取代模擬圖。
   ========================================================== */
const SITE = {
  brand: { name: "霽嶺", latin: "JI LING", location: "中部山區・海拔約 860 公尺（虛構地點）" },
  home: {
    title: "山上四間房，\n選一扇窗。",
    leadMouse: "把滑鼠移到窗戶上，那間房的燈會亮起；點下去，就走進那間房。",
    leadTouch: "點一下窗戶，那間房的燈會亮起；再點一次，就走進那間房。",
    hintMouse: "滑到窗戶上",
    hintTouch: "點窗戶，或從下方清單選房",
    roomsTitle: "四間房，四種看山的方式。",
    roomsLead: "每間房每晚只接待一組客人。所有規格為示範用設定。",
    aboutTitle: "沿著等高線，把房間拆成四棟。",
    about: [
      "霽嶺沒有大廳，也沒有走廊式的客房。四間房各自是一棟小木構，順著山坡往下排，彼此用半戶外的步道相連。",
      "每間房的主要開窗都朝東。晚上燈亮起來時，從山下看上去，就是四扇不同大小的窗。"
    ]
  },
  booking: {
    months: 6,
    maxNights: 7,
    slots: ["15:00–17:00", "17:00–19:00", "19:00–21:00"],
    fullRate: 0.16           /* 示範用：約 16% 日期顯示為已滿 */
  },
  rooms: [
    {
      id: "yun", name: "雲間", latin: "Cloud", area: "28 m²", bed: "雙人床 ×1", guests: "1–2 人", capacity: 2, view: "東側稜線", floor: "1 樓",
      lead: "最小的一間。床尾正對整面東窗，天氣好的早晨，第一道光會落在被子上。",
      headline: "床尾，就是整座山。",
      story: ["雲間只有 28 平方公尺，所以我們把能拿掉的都拿掉了：沒有電視、沒有沙發，只留一張床、一盞燈和一扇窗。", "窗前左側加了一道木格柵，躺著看出去，山會被切成幾段，像慢慢翻過的書頁。"],
      art: { wall: "#d9d0c1", wood: "#b08a60", floor: "#94714f", ceil: "#a8825a", linen: "#ece6db", accent: "#8c6d55", frame: "#2a2119", tone: "dawn", grille: true, seed: 0 },
      photos: [
        { kind: "room", title: "房間全景", note: "床、吊燈與東窗" },
        { kind: "bed", title: "床", note: "偏硬的獨立筒床墊、亞麻寢具" },
        { kind: "bath", title: "浴室", note: "檜木泡湯桶，窗外是竹林" },
        { kind: "view", title: "窗景", note: "窗邊的單人椅與小桌" },
        { kind: "detail", title: "細節", note: "入住時奉上的熱茶" }
      ],
      materials: [
        ["檜木泡湯桶", "桶身為檜木板材，熱水由屋頂熱泵供應，24 小時可用。"],
        ["亞麻寢具", "床包與被套為亞麻，每組客人退房後更換。"],
        ["實木地板", "未上亮漆的實木地板，赤腳行走不冰冷。"],
        ["木格柵", "窗前格柵可篩掉午後直射光，也讓窗景保有層次。"],
        ["手作陶杯", "茶具為手作陶器，每一只的釉色都不太一樣。"]
      ],
      plan: { w: 100, h: 62, size: "7.0 m × 4.0 m", zones: [
        { id: "bed", label: "臥室", x: 4, y: 4, w: 54, h: 54, area: "15 m²", note: "床頭靠內牆，躺著就能看到整面東窗。" },
        { id: "bath", label: "浴室", x: 58, y: 4, w: 38, h: 30, area: "8 m²", note: "檜木泡湯桶在窗邊，窗外是竹林，視線不受打擾。" },
        { id: "entry", label: "玄關", x: 58, y: 34, w: 38, h: 24, area: "5 m²", note: "入口設有鞋櫃與脫鞋處，室內全區赤腳。" }
      ] }
    },
    {
      id: "shi", name: "石庭", latin: "Stone court", area: "34 m²", bed: "雙人床 ×1", guests: "2 人", capacity: 2, view: "內庭與稜線", floor: "1 樓",
      lead: "臥室與浴室之間夾著一座小石庭。下雨的時候，可以聽見水落在石頭上的聲音。",
      headline: "雨落在石頭上的聲音。",
      story: ["石庭的臥室有兩面窗，一面向山，一面向內庭。內庭鋪滿碎石，中間種了一株楓樹，秋天會轉紅。", "浴室在石庭另一側，是半戶外的空間，上方有屋簷遮雨，泡湯時能同時看到樹和天空。"],
      art: { wall: "#cfc8bc", wood: "#8f6b4a", floor: "#7c5f45", ceil: "#8a6747", linen: "#e8e4dc", accent: "#6f7a64", frame: "#231c16", tone: "mist", grille: false, trees: true, seed: 1.5 },
      photos: [
        { kind: "room", title: "房間全景", note: "向山與向庭的兩面窗" },
        { kind: "bed", title: "床", note: "苔綠色床尾毯" },
        { kind: "bath", title: "浴室", note: "半戶外泡湯，上方有屋簷" },
        { kind: "view", title: "窗景", note: "霧天的稜線" },
        { kind: "detail", title: "細節", note: "內庭採下的楓葉" }
      ],
      materials: [
        ["碎石內庭", "庭內鋪滿碎石與一株楓樹，只供觀看，不開放踩踏。"],
        ["半戶外檜木泡湯桶", "位於屋簷下，雨天也能使用。"],
        ["洗石子地坪", "浴室地面為洗石子，止滑且容易保持乾燥。"],
        ["苔綠色織品", "床尾毯與座墊呼應內庭的苔色。"],
        ["竹編燈罩", "閱讀燈為竹編燈罩，光線柔和不刺眼。"]
      ],
      plan: { w: 100, h: 62, size: "8.5 m × 4.0 m", zones: [
        { id: "bed", label: "臥室", x: 4, y: 4, w: 44, h: 54, area: "16 m²", note: "臥室兩面開窗，一面向山，一面向石庭。" },
        { id: "court", label: "石庭", x: 48, y: 4, w: 22, h: 54, area: "6 m²", note: "鋪滿碎石與一株楓樹，只供觀看。" },
        { id: "bath", label: "浴室", x: 70, y: 4, w: 26, h: 34, area: "9 m²", note: "泡湯桶位於半戶外空間，上方有屋簷遮雨。" },
        { id: "entry", label: "玄關", x: 70, y: 38, w: 26, h: 20, area: "3 m²", note: "入口與鞋櫃。" }
      ] }
    },
    {
      id: "ling", name: "稜線", latin: "Ridge", area: "40 m²", bed: "雙人床 ×1、沙發床 ×1", guests: "2–3 人", capacity: 3, view: "東側與南側稜線", floor: "2 樓（需走樓梯）",
      lead: "全館最高的一間。起居區有一扇轉角窗，可以同時看見東側與南側的山。",
      headline: "全館最高的一扇窗。",
      story: ["稜線位於建築最高處，需要走一段室外樓梯。上樓之後，起居區的轉角窗會把兩側的山一起放進來。", "牆面用了較深的灰泥，晚上燈光收得很低，適合待到很晚、看山的輪廓慢慢消失。"],
      art: { wall: "#3a342d", wood: "#6a4b34", floor: "#4f3a2a", ceil: "#5a4130", linen: "#e4ddd0", accent: "#a0643c", frame: "#15110d", tone: "dusk", grille: true, seed: 3 },
      photos: [
        { kind: "room", title: "房間全景", note: "深色灰泥牆與暖光" },
        { kind: "bed", title: "床", note: "赭色床尾毯" },
        { kind: "bath", title: "浴室", note: "檜木泡湯桶與獨立淋浴" },
        { kind: "view", title: "窗景", note: "黃昏的南側稜線" },
        { kind: "detail", title: "細節", note: "起居桌上的茶具" }
      ],
      materials: [
        ["深色灰泥牆", "礦物灰泥手作塗抹，夜裡反光少，眼睛較舒服。"],
        ["轉角窗", "兩面落地玻璃在轉角相接，沒有柱子遮擋視線。"],
        ["檜木泡湯桶", "與獨立淋浴間分開，兩人可同時使用。"],
        ["沙發床", "起居區沙發可展開為單人床，適合第三位入住者。"],
        ["遮光簾", "臥室遮光簾可完全關閉，不怕清晨太早亮。"]
      ],
      plan: { w: 100, h: 62, size: "9.0 m × 4.5 m", zones: [
        { id: "bed", label: "臥室", x: 4, y: 4, w: 40, h: 54, area: "14 m²", note: "臥室位於北側，較安靜，遮光簾可完全關閉。" },
        { id: "living", label: "起居", x: 44, y: 4, w: 52, h: 32, area: "15 m²", note: "轉角窗下是一張可以展開的沙發床。" },
        { id: "bath", label: "浴室", x: 44, y: 36, w: 34, h: 22, area: "8 m²", note: "檜木泡湯桶與獨立淋浴間。" },
        { id: "entry", label: "玄關", x: 78, y: 36, w: 18, h: 22, area: "3 m²", note: "入口在樓梯上方，有行李放置處。" }
      ] }
    },
    {
      id: "chang", name: "長屋", latin: "Long house", area: "46 m²", bed: "雙人床 ×2", guests: "2–4 人", capacity: 4, view: "東側稜線與果園", floor: "1 樓",
      lead: "最大的一間。兩間臥室分在起居區兩端，適合家人或朋友同行。",
      headline: "一起來，各有一扇門。",
      story: ["長屋是一棟細長的平房，中間是可以坐四個人的木桌，兩端各是一間臥室，彼此不會打擾。", "浴室有兩座洗手台，早上不必排隊。窗外是一片小果園，季節對的時候可以跟我們一起採。"],
      art: { wall: "#e0d8ca", wood: "#c09a6c", floor: "#a07e5a", ceil: "#b4916a", linen: "#efeae1", accent: "#5f6e7a", frame: "#2b231b", tone: "day", grille: false, beds: 2, seed: 4.5 },
      photos: [
        { kind: "room", title: "房間全景", note: "兩張雙人床與果園窗景" },
        { kind: "bed", title: "床", note: "藍灰色床尾毯" },
        { kind: "bath", title: "浴室", note: "兩座洗手台與泡湯桶" },
        { kind: "view", title: "窗景", note: "晴天的東側稜線" },
        { kind: "detail", title: "細節", note: "木桌上的早茶" }
      ],
      materials: [
        ["長木桌", "起居區中央的木桌可坐四人，用餐、工作、玩桌遊都可以。"],
        ["兩座洗手台", "浴室並排兩座洗手台，早上不必排隊。"],
        ["檜木泡湯桶", "桶身較大，親子可以一起使用。"],
        ["淺色實木", "全室使用淺色木材，白天光線充足。"],
        ["兒童備品", "可於預約時備註，提供兒童拖鞋與牙刷。"]
      ],
      plan: { w: 100, h: 62, size: "11.0 m × 4.2 m", zones: [
        { id: "bed1", label: "臥室 A", x: 4, y: 4, w: 30, h: 54, area: "13 m²", note: "主臥，東向大窗。" },
        { id: "living", label: "起居", x: 34, y: 4, w: 32, h: 34, area: "14 m²", note: "中央起居區有一張可坐四人的木桌。" },
        { id: "bath", label: "浴室", x: 34, y: 38, w: 32, h: 20, area: "8 m²", note: "兩座洗手台，早晨不必排隊。" },
        { id: "bed2", label: "臥室 B", x: 66, y: 4, w: 30, h: 54, area: "11 m²", note: "次臥，面向果園，與主臥隔著起居區。" }
      ] }
    }
  ]
};

/* ==========================================================
   模擬圖產生器：以 SVG 繪製外觀全景與室內。
   外觀的「白天／亮燈」是同一份幾何，只切換燈光圖層，所以永遠對齊。
   ========================================================== */
const Art = (() => {
  const R = n => Math.round(n * 10) / 10;
  const TONES = {
    dawn:   { sky: ["#41475a", "#9c958c", "#e3c9a4"], hills: ["#8e8f93", "#727479", "#5a5c60", "#45474a", "#323335"], mist: "#eadbc4", sun: "#ffe2b0" },
    day:    { sky: ["#6f8aa6", "#a9bccb", "#dfe3df"], hills: ["#8ea0a6", "#73868a", "#5b6c6c", "#465552", "#33403c"], mist: "#eef0ec", sun: "#ffffff" },
    mist:   { sky: ["#8a9096", "#b9bcbc", "#dedcd4"], hills: ["#a7aba9", "#8f9492", "#787d7a", "#626763", "#4c514d"], mist: "#f1efe8", sun: "#ffffff" },
    dusk:   { sky: ["#1b2233", "#4d4a5c", "#d29a6a"], hills: ["#4f4a57", "#3e3b47", "#302e38", "#24232b", "#19181e"], mist: "#d9a47a", sun: "#ffc68a" },
    forest: { sky: ["#7f8f86", "#b3bfb2", "#dfe4d6"], hills: ["#6f8270", "#5b6e5c", "#4a5c4a", "#3a4a3a", "#2b382b"], mist: "#e7ecdf", sun: "#ffffff" }
  };
  let uid = 0;

  function ridge(x0, y0, w, h, base, amp, seed) {
    let d = `M${x0} ${y0 + h}`;
    for (let i = 0; i <= 64; i++) {
      const t = i / 64, x = x0 + w * t;
      const y = y0 + h * base - h * amp * (0.55 * Math.sin(t * 4.3 + seed) + 0.3 * Math.sin(t * 10.9 + seed * 2.1) + 0.15 * Math.sin(t * 25.7 + seed * 3.3) + 0.45);
      d += `L${R(x)} ${R(y)}`;
    }
    return d + `L${x0 + w} ${y0 + h}Z`;
  }

  /* 遠景山巒，可放進窗框 */
  function landscape(x, y, w, h, toneName, opt = {}) {
    const T = TONES[toneName], id = "l" + (uid++);
    let s = `<defs>
      <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.sky[0]}"/><stop offset=".6" stop-color="${T.sky[1]}"/><stop offset="1" stop-color="${T.sky[2]}"/></linearGradient>
      <linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.mist}" stop-opacity="0"/><stop offset=".55" stop-color="${T.mist}" stop-opacity=".6"/><stop offset="1" stop-color="${T.mist}" stop-opacity="0"/></linearGradient>
      <radialGradient id="${id}g" cx=".7" cy=".62" r=".5"><stop offset="0" stop-color="${T.sun}" stop-opacity=".55"/><stop offset="1" stop-color="${T.sun}" stop-opacity="0"/></radialGradient>
    </defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}s)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}g)"/>`;
    const L = [[.5, .15, 1.3], [.6, .14, 2.7], [.71, .13, 4.1], [.83, .12, 5.6], [.97, .1, 7.9]];
    L.forEach((l, i) => {
      s += `<path d="${ridge(x, y, w, h, l[0], l[1], l[2] + (opt.seed || 0))}" fill="${T.hills[i]}"/>`;
      if (i < 4) s += `<rect x="${x}" y="${R(y + h * (l[0] - .03))}" width="${w}" height="${R(h * .17)}" fill="url(#${id}m)" opacity="${.85 - i * .14}"/>`;
    });
    if (opt.trees) {
      for (let i = 0; i < 26; i++) {
        const tx = x + (i * 61.7 % 100) / 100 * w, th = h * (.16 + (i * 37 % 10) / 50), tb = y + h * (.96 + (i % 3) * .02);
        s += conifer(tx, tb, th, th * .32, T.hills[4]);
      }
    }
    return s;
  }

  function conifer(x, base, h, w, fill, op = 1) {
    let p = "";
    for (let i = 0; i < 4; i++) {
      const top = base - h + i * h * .2, bw = w * (.45 + i * .2), bot = base - h * .1 - (3 - i) * h * .14;
      p += `M${R(x)} ${R(top)}L${R(x + bw / 2)} ${R(bot)}L${R(x - bw / 2)} ${R(bot)}Z`;
    }
    return `<path d="${p}M${R(x - w * .03)} ${R(base - h * .12)}h${R(w * .06)}V${R(base)}h${R(-w * .06)}Z" fill="${fill}" opacity="${op}"/>`;
  }
  function broadleaf(x, base, h, fill, op = 1) {
    let s = `<rect x="${R(x - h * .02)}" y="${R(base - h * .45)}" width="${R(h * .04)}" height="${R(h * .45)}" fill="${fill}" opacity="${op}"/>`;
    [[0, -.62, .3], [-.18, -.5, .22], [.2, -.52, .24], [-.06, -.8, .2], [.12, -.72, .18]].forEach(c => {
      s += `<ellipse cx="${R(x + c[0] * h)}" cy="${R(base + c[1] * h)}" rx="${R(c[2] * h)}" ry="${R(c[2] * h * .8)}" fill="${fill}" opacity="${op}"/>`;
    });
    return s;
  }

  /* ---------- 外觀全景 ---------- */
  const VOLUMES = [
    { id: "yun",   x: 500, w: 124, base: 588, h: 94,  wins: [[14, 20, 96, 56]] },
    { id: "shi",   x: 646, w: 150, base: 600, h: 98,  wins: [[16, 22, 70, 58], [96, 22, 40, 58]] },
    { id: "ling",  x: 818, w: 138, base: 584, h: 158, wins: [[14, 18, 110, 62], [14, 96, 64, 46]] },
    { id: "chang", x: 980, w: 172, base: 606, h: 100, wins: [[14, 22, 66, 58], [92, 22, 66, 58]] }
  ];

  function panorama(opt = {}) {
    const W = 1600, H = 900, id = "p" + (uid++), lit = opt.lit || [], all = !!opt.allLit;
    const vb = opt.viewBox || `0 0 ${W} ${H}`;
    let s = `<defs>
      <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a2b"/><stop offset=".45" stop-color="#36405a"/><stop offset=".78" stop-color="#8d7d84"/><stop offset="1" stop-color="#e2a676"/></linearGradient>
      <radialGradient id="${id}sun" cx=".76" cy=".58" r=".42"><stop offset="0" stop-color="#ffcf98" stop-opacity=".75"/><stop offset=".5" stop-color="#e79d6c" stop-opacity=".18"/><stop offset="1" stop-color="#e79d6c" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7a586" stop-opacity="0"/><stop offset=".5" stop-color="#d7a586" stop-opacity=".45"/><stop offset="1" stop-color="#d7a586" stop-opacity="0"/></linearGradient>
      <linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4b5670"/><stop offset=".45" stop-color="#232a3a"/><stop offset=".55" stop-color="#39435a"/><stop offset="1" stop-color="#161b26"/></linearGradient>
      <linearGradient id="${id}warm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3b0"/><stop offset=".6" stop-color="#ffb867"/><stop offset="1" stop-color="#e48a42"/></linearGradient>
      <linearGradient id="${id}spill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb46a" stop-opacity=".55"/><stop offset="1" stop-color="#ffb46a" stop-opacity="0"/></linearGradient>
      <linearGradient id="${id}wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4433"/><stop offset="1" stop-color="#3b2c22"/></linearGradient>
      <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a1f"/><stop offset="1" stop-color="#0b0b0e"/></linearGradient>
      <radialGradient id="${id}vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
      <filter id="${id}blur" x="-400%" y="-400%" width="900%" height="900%"><feGaussianBlur stdDeviation="16"/></filter>
      <filter id="${id}soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#${id}sky)"/><rect width="${W}" height="${H}" fill="url(#${id}sun)"/>`;
    /* 星點與雲 */
    for (let i = 0; i < 40; i++) s += `<circle cx="${(i * 389) % W}" cy="${(i * 137) % 260}" r="${i % 4 ? .8 : 1.3}" fill="#fff" opacity="${.15 + (i % 5) * .08}"/>`;
    s += `<g filter="url(#${id}soft)" opacity=".35"><ellipse cx="320" cy="230" rx="260" ry="10" fill="#c9a59a"/><ellipse cx="1180" cy="300" rx="320" ry="12" fill="#e2b08f"/><ellipse cx="900" cy="250" rx="180" ry="7" fill="#b89aa0"/></g>`;
    /* 遠山 */
    const hills = ["#5c5468", "#4a4458", "#3a3648", "#2b2937"];
    [[.62, .16, 1.1], [.67, .14, 2.6], [.72, .12, 4.4], [.77, .1, 6.2]].forEach((l, i) => {
      s += `<path d="${ridge(0, 0, W, H, l[0], l[1], l[2])}" fill="${hills[i]}"/>`;
      s += `<rect y="${R(H * (l[0] - .02))}" width="${W}" height="${R(H * .12)}" fill="url(#${id}mist)" opacity="${.9 - i * .2}"/>`;
    });
    /* 建築所在的山坡 */
    s += `<path d="M0 520 C220 470 420 520 600 548 C780 572 980 560 1180 566 C1360 572 1480 548 1600 540 V900 H0Z" fill="#1d1c22"/>`;
    for (let i = 0; i < 34; i++) {
      const x = (i * 97.3) % W, b = 540 + Math.sin(i) * 18 + (x > 450 && x < 1180 ? -10 : 0);
      if (x > 470 && x < 1170) continue;
      s += conifer(x, b + 40, 70 + (i * 13 % 50), 30 + (i % 4) * 6, i % 2 ? "#17161b" : "#141318");
    }
    /* 建築後方樹林 */
    for (let i = 0; i < 18; i++) {
      const x = 480 + i * 39 + (i % 3) * 7;
      s += conifer(x, 560 - (i % 2) * 6, 80 + (i * 17 % 40), 34, "#121116", .95);
    }

    /* 建築 */
    const glowLayer = [];
    VOLUMES.forEach(v => {
      const top = v.base - v.h, dx = 20, dy = 11;
      /* 平台與擋土牆 */
      s += `<path d="M${v.x - 10} ${v.base}h${v.w + 40}l-6 ${26}h${-v.w - 30}Z" fill="#2c2a2c"/><path d="M${v.x - 10} ${v.base + 26}h${v.w + 34}v4h${-v.w - 34}Z" fill="#3a3739"/>`;
      /* 側面 */
      s += `<path d="M${v.x + v.w} ${top}l${dx} ${-dy}V${v.base - dy}l${-dx} ${dy}Z" fill="#2a211b"/>`;
      /* 立面木材 */
      s += `<rect x="${v.x}" y="${top}" width="${v.w}" height="${v.h}" fill="url(#${id}wood)"/>`;
      for (let x = v.x + 4; x < v.x + v.w; x += 5) s += `<line x1="${x}" x2="${x}" y1="${top + 4}" y2="${v.base}" stroke="#2f241c" stroke-width="1.4" opacity=".7"/>`;
      /* 窗 */
      v.wins.forEach(wn => {
        s += `<rect x="${v.x + wn[0]}" y="${top + wn[1]}" width="${wn[2]}" height="${wn[3]}" fill="url(#${id}glass)"/>`;
        s += `<line x1="${v.x + wn[0] + wn[2] * .62}" x2="${v.x + wn[0] + wn[2] * .62}" y1="${top + wn[1]}" y2="${top + wn[1] + wn[3]}" stroke="#151515" stroke-width="2"/>`;
      });
      /* 燈光圖層（亮燈版） */
      let g = `<g class="glow" data-glow="${v.id}" style="opacity:${all || lit.includes(v.id) ? 1 : 0}">`;
      g += `<path d="M${v.x - 30} ${v.base + 4}h${v.w + 60}l40 70h${-v.w - 140}Z" fill="url(#${id}spill)" opacity=".75"/>`;
      v.wins.forEach(wn => {
        const x = v.x + wn[0], y = top + wn[1];
        g += `<rect x="${x - 6}" y="${y - 6}" width="${wn[2] + 12}" height="${wn[3] + 12}" fill="#ffad5c" opacity=".55" filter="url(#${id}blur)"/>`;
        g += `<rect x="${x}" y="${y}" width="${wn[2]}" height="${wn[3]}" fill="url(#${id}warm)"/>`;
        /* 室內剪影：床、燈 */
        g += `<rect x="${x + wn[2] * .08}" y="${y + wn[3] * .7}" width="${wn[2] * .5}" height="${wn[3] * .3}" fill="#8a5a33" opacity=".55"/>`;
        g += `<rect x="${x + wn[2] * .08}" y="${y + wn[3] * .66}" width="${wn[2] * .5}" height="${wn[3] * .06}" fill="#fff4e0" opacity=".7"/>`;
        g += `<circle cx="${x + wn[2] * .78}" cy="${y + wn[3] * .35}" r="${Math.min(wn[2], wn[3]) * .07}" fill="#fff6e4"/>`;
        g += `<line x1="${x + wn[2] * .78}" x2="${x + wn[2] * .78}" y1="${y}" y2="${y + wn[3] * .3}" stroke="#6a4a30" stroke-width="1"/>`;
        g += `<line x1="${x + wn[2] * .62}" x2="${x + wn[2] * .62}" y1="${y}" y2="${y + wn[3]}" stroke="#4a3322" stroke-width="2"/>`;
      });
      g += `</g>`;
      s += g;
      /* 木格柵：蓋在窗前左側 */
      v.wins.forEach(wn => {
        for (let k = 0; k < 6; k++) s += `<rect x="${v.x + wn[0] + 2 + k * 6}" y="${top + wn[1] - 2}" width="2.4" height="${wn[3] + 4}" fill="#2a1f17"/>`;
      });
      /* 屋頂板 */
      s += `<path d="M${v.x - 12} ${top - 8}h${v.w + 24}l${dx} ${-dy}h${-v.w - 24}Z" fill="#3a3a40"/><rect x="${v.x - 12}" y="${top - 8}" width="${v.w + 24}" height="8" fill="#141418"/>`;
      glowLayer.push(v);
    });
    /* 石庭的矮牆、稜線的樓梯 */
    s += `<rect x="796" y="566" width="22" height="34" fill="#2a2829"/><path d="M956 584h24v22h-24z" fill="#242226"/>`;
    /* 步道燈與階梯 */
    s += `<path d="M700 640 L760 640 L800 700 L860 700 L900 760 L960 760 L1000 820 L1060 820 L1080 900 L980 900 Z" fill="#26242a"/>`;
    [[730, 636], [830, 696], [930, 756], [1030, 816], [560, 620], [1120, 640]].forEach(p => {
      s += `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="#ffb867" opacity=".35" filter="url(#${id}blur)"/><rect x="${p[0] - 2}" y="${p[1] - 14}" width="4" height="14" fill="#ffd9a3"/>`;
    });
    /* 前景樹與草 */
    s += `<path d="M0 760 C200 720 380 770 560 800 C760 830 1000 800 1200 790 C1380 780 1500 740 1600 730 V900 H0Z" fill="url(#${id}fg)"/>`;
    s += broadleaf(300, 800, 330, "#0e0e11") + broadleaf(1380, 790, 300, "#0d0d10") + conifer(160, 780, 300, 110, "#0c0c0f") + conifer(1500, 770, 280, 100, "#0b0b0e");
    for (let i = 0; i < 160; i++) {
      const x = (i * 53.3) % W, b = 860 + (i % 7) * 6, hh = 30 + (i * 29 % 50);
      s += `<path d="M${R(x)} ${b}q${(i % 2 ? 6 : -6)} ${-hh / 2} ${(i % 2 ? 12 : -10)} ${-hh}" stroke="#0a0a0c" stroke-width="2" fill="none"/>`;
    }
    s += `<rect width="${W}" height="${H}" fill="url(#${id}vig)"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice">${s}</svg>`;
  }

  /* ---------- 室內：一點透視 ---------- */
  function interior(kind, p, W = 1600, H = 1100) {
    const id = "i" + (uid++);
    const k = kind === "view" ? .78 : kind === "bed" ? .6 : kind === "bath" ? .56 : .5;
    const cx = W * (kind === "bed" ? .44 : .5), cy = H * .44;
    const sc = d => 1 / (1 + d * (1 / k - 1));
    const P = (x, y, d) => { const f = sc(d); return [R(cx + (x - cx) * f), R(cy + (y - cy) * f)]; };
    const poly = (pts, fill, extra = "") => `<path d="M${pts.map(q => q.join(" ")).join("L")}Z" fill="${fill}" ${extra}/>`;
    const box = (x0, x1, y0, y1, d0, d1, c) => {
      /* c: {front, top, side} */
      let o = "";
      if (y0 > cy) o += poly([P(x0, y0, d0), P(x1, y0, d0), P(x1, y0, d1), P(x0, y0, d1)], c.top);
      else if (y1 < cy) o += poly([P(x0, y1, d0), P(x1, y1, d0), P(x1, y1, d1), P(x0, y1, d1)], c.bottom || c.side);
      if (x0 > cx) o += poly([P(x0, y0, d0), P(x0, y0, d1), P(x0, y1, d1), P(x0, y1, d0)], c.side);
      if (x1 < cx) o += poly([P(x1, y0, d0), P(x1, y0, d1), P(x1, y1, d1), P(x1, y1, d0)], c.side);
      o += poly([P(x0, y0, d0), P(x1, y0, d0), P(x1, y1, d0), P(x0, y1, d0)], c.front);
      return o;
    };
    const B = { x0: P(0, 0, 1)[0], y0: P(0, 0, 1)[1], x1: P(W, H, 1)[0], y1: P(W, H, 1)[1] };
    const bw = B.x1 - B.x0, bh = B.y1 - B.y0;
    let s = `<defs>
      <linearGradient id="${id}shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2d8" stop-opacity=".22"/><stop offset="1" stop-color="#fff2d8" stop-opacity="0"/></linearGradient>
      <radialGradient id="${id}lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd59a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd59a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}vig" cx=".5" cy=".48" r=".78"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
      <linearGradient id="${id}wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${p.wall}" stop-opacity=".0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
      <filter id="${id}b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>`;
    /* 牆、天花、地板 */
    s += poly([[0, 0], [W, 0], [B.x1, B.y0], [B.x0, B.y0]], p.ceil || p.wood);
    s += poly([[0, 0], [B.x0, B.y0], [B.x0, B.y1], [0, H]], shade(p.wall, -.12));
    s += poly([[W, 0], [B.x1, B.y0], [B.x1, B.y1], [W, H]], shade(p.wall, -.22));
    s += `<rect x="${B.x0}" y="${B.y0}" width="${R(bw)}" height="${R(bh)}" fill="${p.wall}"/>`;
    s += poly([[0, H], [B.x0, B.y1], [B.x1, B.y1], [W, H]], p.floor);
    /* 天花木條 */
    for (let i = 0; i <= 14; i++) {
      const x = W * i / 14;
      s += `<path d="M${R(x)} 0L${P(x, 0, 1).join(" ")}" stroke="${shade(p.ceil || p.wood, -.25)}" stroke-width="${R(3 * (1 - i % 2 * .4))}"/>`;
    }
    /* 地板：石材或木條 */
    if (kind === "bath") {
      for (let i = 0; i <= 8; i++) s += `<path d="M${R(W * i / 8)} ${H}L${P(W * i / 8, H, 1).join(" ")}" stroke="${shade(p.floor, -.15)}" stroke-width="2"/>`;
      [.1, .25, .45, .7].forEach(d => s += `<path d="M${P(0, H, d).join(" ")}L${P(W, H, d).join(" ")}" stroke="${shade(p.floor, -.15)}" stroke-width="2"/>`);
    } else {
      for (let i = 0; i <= 22; i++) s += `<path d="M${R(W * i / 22)} ${H}L${P(W * i / 22, H, 1).join(" ")}" stroke="${shade(p.floor, -.18)}" stroke-width="1.6" opacity=".8"/>`;
    }
    /* 大窗 */
    const win = kind === "view" ? { u0: .04, u1: .96, v0: .05, v1: .9 } : kind === "bath" ? { u0: .1, u1: .9, v0: .12, v1: .72 } : { u0: .1, u1: .9, v0: .08, v1: .86 };
    const wx = B.x0 + bw * win.u0, wy = B.y0 + bh * win.v0, ww = bw * (win.u1 - win.u0), wh = bh * (win.v1 - win.v0);
    const viewTone = kind === "bath" ? "forest" : p.tone;
    s += `<svg x="${R(wx)}" y="${R(wy)}" width="${R(ww)}" height="${R(wh)}" viewBox="0 0 1000 ${R(1000 * wh / ww)}" preserveAspectRatio="none">${landscape(0, -40, 1000, R(1000 * wh / ww) + 120, viewTone, { trees: kind === "bath" || p.trees, seed: p.seed })}</svg>`;
    const fw = Math.max(4, bw * .012);
    s += `<rect x="${R(wx)}" y="${R(wy)}" width="${R(ww)}" height="${R(wh)}" fill="none" stroke="${p.frame}" stroke-width="${R(fw * 1.6)}"/>`;
    const mullions = kind === "view" ? [.5] : [1 / 3, 2 / 3];
    mullions.forEach(m => s += `<rect x="${R(wx + ww * m - fw / 2)}" y="${R(wy)}" width="${R(fw)}" height="${R(wh)}" fill="${p.frame}"/>`);
    /* 窗前格柵（部分房型） */
    if (p.grille && kind !== "view") for (let i = 0; i < 9; i++) s += `<rect x="${R(wx + ww * .02 + i * ww * .02)}" y="${R(wy)}" width="${R(ww * .008)}" height="${R(wh)}" fill="${shade(p.wood, -.3)}"/>`;
    /* 光束與地上光斑 */
    const fl = [P(W * .3, H, .25), P(W * .78, H, .25), P(W * .98, H, .78), P(W * .5, H, .78)];
    s += poly([[R(wx + ww * .2), R(wy)], [R(wx + ww * .85), R(wy)], fl[2], fl[3]], `url(#${id}shaft)`);
    s += poly(fl, "#fff1d6", `opacity=".14"`);

    const wood = { front: p.wood, top: shade(p.wood, .12), side: shade(p.wood, -.2) };
    const linen = { front: shade(p.linen, -.08), top: p.linen, side: shade(p.linen, -.18) };
    const accent = { front: shade(p.accent, -.05), top: p.accent, side: shade(p.accent, -.2) };

    if (kind === "room" || kind === "bed") {
      const beds = p.beds === 2 && kind === "room" ? [[W * .06, W * .4], [W * .6, W * .94]] : kind === "bed" ? [[W * .14, W * .86]] : [[W * .26, W * .8]];
      /* 地毯 */
      s += poly([P(W * .12, H, .2), P(W * .9, H, .2), P(W * .9, H, .9), P(W * .12, H, .9)], shade(p.floor, .12), `opacity=".55"`);
      beds.forEach(([a, b]) => {
        s += box(a, b, H * .58, H * .99, .9, .95, wood);            /* 床頭板 */
        s += box(a, b, H * .82, H, .38, .9, wood);                 /* 床架 */
        s += box(a + 8, b - 8, H * .74, H * .82, .4, .89, linen);  /* 床墊 */
        s += box(a + 8, b - 8, H * .725, H * .76, .4, .62, accent); /* 床尾毯 */
        const mid = (a + b) / 2;
        s += box(a + 30, mid - 12, H * .66, H * .74, .8, .88, { front: "#f3efe7", top: "#fbf8f2", side: "#d9d3c8" });
        s += box(mid + 12, b - 30, H * .66, H * .74, .8, .88, { front: "#f3efe7", top: "#fbf8f2", side: "#d9d3c8" });
      });
      /* 床邊桌與燈 */
      const tx = kind === "bed" ? W * .9 : beds[0][0] - W * .14;
      if (p.beds !== 2 || kind === "bed") {
        s += box(tx, tx + W * .1, H * .8, H, .82, .92, wood);
        const lp = P(tx + W * .05, H * .68, .87);
        s += `<circle cx="${lp[0]}" cy="${lp[1]}" r="${R(W * .09)}" fill="url(#${id}lamp)"/>` + box(tx + W * .035, tx + W * .065, H * .7, H * .8, .86, .88, { front: "#efe3cc", top: "#fff3dc", side: "#d8c7a8" });
      }
      /* 吊燈 */
      const pd = P(W * .56, H * .3, .6), pt = P(W * .56, 0, .6);
      s += `<line x1="${pt[0]}" y1="${pt[1]}" x2="${pd[0]}" y2="${pd[1]}" stroke="#1d1712" stroke-width="2"/><circle cx="${pd[0]}" cy="${pd[1]}" r="${R(W * .07)}" fill="url(#${id}lamp)"/><path d="M${pd[0] - W * .022} ${pd[1] + 8}q${W * .022} -${W * .03} ${W * .044} 0Z" fill="#2a221b"/>`;
    }
    if (kind === "room") {
      /* 植栽 */
      const pp = P(W * .9, H, .55);
      s += box(W * .86, W * .94, H * .86, H, .5, .58, { front: "#6f6a62", top: "#837d74", side: "#5a554e" });
      for (let i = 0; i < 9; i++) s += `<ellipse cx="${R(pp[0] - 10 + Math.sin(i) * 34)}" cy="${R(pp[1] - 130 - i * 14)}" rx="${R(22 + i % 3 * 6)}" ry="9" fill="${i % 2 ? "#4f5d45" : "#5f6e52"}" transform="rotate(${-30 + i * 9} ${R(pp[0])} ${R(pp[1] - 130 - i * 14)})"/>`;
    }
    if (kind === "bath") {
      const hin = { front: "#c7a273", top: "#d9b98b", side: "#a9845a" };
      s += box(W * .2, W * .72, H * .66, H, .42, .82, hin);
      const wt = [P(W * .2 + 26, H * .675, .45), P(W * .72 - 26, H * .675, .45), P(W * .72 - 26, H * .675, .79), P(W * .2 + 26, H * .675, .79)];
      s += poly(wt, "#6f8a86") + poly([wt[0], wt[1], P(W * .62, H * .675, .6), P(W * .3, H * .675, .6)], "#a9c2bc", `opacity=".35"`);
      for (let i = 0; i < 5; i++) s += `<path d="M${R(W * (.3 + i * .08))} ${R(H * .6)}c-30 -60 40 -110 0 -190" stroke="#fff" stroke-width="26" fill="none" opacity=".06" filter="url(#${id}b)"/>`;
      s += box(W * .78, W * .88, H * .86, H, .5, .6, hin);
      s += box(W * .785, W * .875, H * .84, H * .86, .52, .58, { front: "#e9e4d9", top: "#f6f2ea", side: "#d2ccc0" });
    }
    if (kind === "view") {
      s += box(W * .06, W * .34, H * .68, H, .05, .3, wood);
      s += box(W * .08, W * .32, H * .62, H * .7, .06, .28, linen);
      s += box(W * .06, W * .1, H * .5, H * .68, .22, .3, wood);
      s += box(W * .55, W * .7, H * .78, H, .25, .38, wood);
      const c = P(W * .62, H * .78, .3);
      s += `<ellipse cx="${c[0]}" cy="${c[1] - 6}" rx="22" ry="7" fill="#e8e1d4"/><rect x="${c[0] - 20}" y="${c[1] - 40}" width="40" height="34" fill="#e8e1d4"/><ellipse cx="${c[0]}" cy="${c[1] - 40}" rx="20" ry="6" fill="#5a3a22"/>`;
    }
    s += `<rect width="${W}" height="${H}" fill="url(#${id}vig)"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${s}</svg>`;
  }

  /* ---------- 細節特寫（俯視） ---------- */
  function detail(p, W = 1600, H = 1100) {
    const id = "d" + (uid++);
    let s = `<defs><radialGradient id="${id}v" cx=".5" cy=".5" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
      <radialGradient id="${id}c" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fbf7ef"/><stop offset="1" stop-color="#cfc7b8"/></radialGradient>
      <filter id="${id}s"><feGaussianBlur stdDeviation="14"/></filter></defs>`;
    s += `<rect width="${W}" height="${H}" fill="${p.wood}"/>`;
    for (let i = 0; i < 90; i++) {
      const y0 = i / 90 * H * 1.1 - 40;
      let d = `M0 ${R(y0)}`;
      for (let x = 0; x <= W; x += W / 30) d += `L${R(x)} ${R(y0 + Math.sin(x / W * 5 + i * .6) * 14 + Math.sin(x / W * 19 + i) * 4)}`;
      s += `<path d="${d}" stroke="${shade(p.wood, i % 6 ? -.08 : -.2)}" stroke-width="${i % 6 ? 1.4 : 3}" fill="none" opacity=".8"/>`;
    }
    /* 托盤、茶壺、杯 */
    s += `<rect x="${W * .2 + 20}" y="${H * .24 + 24}" width="${W * .6}" height="${H * .52}" fill="#000" opacity=".35" filter="url(#${id}s)"/>`;
    s += `<rect x="${W * .2}" y="${H * .24}" width="${W * .6}" height="${H * .52}" fill="${shade(p.accent, -.25)}"/><rect x="${W * .2 + 14}" y="${H * .24 + 14}" width="${W * .6 - 28}" height="${H * .52 - 28}" fill="${shade(p.accent, -.12)}"/>`;
    [[.38, .5, 120], [.6, .42, 64], [.66, .62, 64]].forEach(([x, y, r], i) => {
      s += `<circle cx="${W * x + 14}" cy="${H * y + 16}" r="${r}" fill="#000" opacity=".35" filter="url(#${id}s)"/><circle cx="${W * x}" cy="${H * y}" r="${r}" fill="url(#${id}c)"/>`;
      s += i === 0 ? `<circle cx="${W * x}" cy="${H * y}" r="${r * .22}" fill="#d8cfbf"/><path d="M${W * x + r * .9} ${H * y}h${r * .7}" stroke="#cfc7b8" stroke-width="22" stroke-linecap="round"/>` : `<circle cx="${W * x}" cy="${H * y}" r="${r * .78}" fill="#7a5a2c"/><circle cx="${W * x - r * .25}" cy="${H * y - r * .25}" r="${r * .18}" fill="#c4a06a" opacity=".5"/>`;
    });
    s += `<path d="M${W * .24} ${H * .7}c80 -20 160 10 240 -8" stroke="#3e5a3a" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    [0, 1, 2].forEach(i => s += `<ellipse cx="${W * (.27 + i * .06)}" cy="${H * (.69 - i * .01)}" rx="26" ry="10" fill="#4f6b48" transform="rotate(${-20 + i * 15} ${W * (.27 + i * .06)} ${H * (.69 - i * .01)})"/>`);
    s += `<rect width="${W}" height="${H}" fill="url(#${id}v)"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${s}</svg>`;
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const f = v => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return "#" + [f(r), f(g), f(b)].map(v => v.toString(16).padStart(2, "0")).join("");
  }

  const toURL = svg => "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  return { panorama, interior, detail, toURL, VOLUMES };
})();


/* ==========================================================
   工具
   ========================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const isMobileLayout = () => matchMedia("(max-width: 900px)").matches;
const canHover = matchMedia("(hover: hover) and (pointer: fine)");
const ARROW = `<svg viewBox="0 0 18 10" aria-hidden="true"><path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor"/></svg>`;
const ARROW_L = `<svg viewBox="0 0 18 10" aria-hidden="true"><path d="M18 5H2M6 1L2 5l4 4" fill="none" stroke="currentColor"/></svg>`;
const roomById = id => SITE.rooms.find(r => r.id === id);
const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* 模擬圖快取 */
const imgCache = {};
function photoURL(room, i) {
  const ph = room.photos[i];
  if (ph.src) return ph.src;
  const key = room.id + i;
  if (!imgCache[key]) imgCache[key] = Art.toURL(ph.kind === "detail" ? Art.detail(room.art) : Art.interior(ph.kind, room.art));
  return imgCache[key];
}
function exteriorURL(room) {
  const key = "ext" + (room ? room.id : "all");
  if (!imgCache[key]) {
    if (!room) imgCache[key] = Art.toURL(Art.panorama({ allLit: true, viewBox: "380 300 900 480" }));
    else {
      const v = Art.VOLUMES.find(v => v.id === room.id), w = 520, h = 260, cx = v.x + v.w / 2, cy = v.base - v.h / 2;
      imgCache[key] = Art.toURL(Art.panorama({ lit: [room.id], viewBox: `${cx - w / 2} ${cy - h / 2 - 10} ${w} ${h}` }));
    }
  }
  return imgCache[key];
}
function frame(url, alt, { eager = false, parallax = 0 } = {}) {
  return `<div class="frame"${parallax ? ` data-parallax="${parallax}"` : ""}><img src="${url}" alt="${esc(alt)}" ${eager ? "" : 'loading="lazy"'} decoding="async"><span class="tag" aria-hidden="true">模擬示意圖</span></div>`;
}

/* ==========================================================
   首頁：全景、亮燈、小卡
   ========================================================== */
const pano = { selected: null, armed: null, lastPointer: "mouse", interacted: false };

function renderHome() {
  $$("[data-bind]").forEach(el => { el.textContent = get(SITE, el.dataset.bind); });
  const stage = $("#panoStage");
  stage.innerHTML = Art.panorama({ viewBox: panoViewBox() });
  const svg = $("svg", stage);
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", "霽嶺外觀全景（模擬示意圖）。四扇窗各代表一間房。");
  /* 每間房的點擊範圍：可用滑鼠、觸控、鍵盤操作 */
  const NS = "http://www.w3.org/2000/svg";
  Art.VOLUMES.forEach(v => {
    const r = roomById(v.id), hit = document.createElementNS(NS, "rect");
    hit.setAttribute("x", v.x - 14); hit.setAttribute("y", v.base - v.h - 24);
    hit.setAttribute("width", v.w + 38); hit.setAttribute("height", v.h + 36);
    hit.setAttribute("class", "hit"); hit.setAttribute("tabindex", "0"); hit.setAttribute("role", "button");
    hit.setAttribute("aria-label", `${r.name}，${r.area}，${r.guests}。按下進入這間房`);
    hit.dataset.hit = v.id;
    svg.appendChild(hit);
  });
  $("#rows").innerHTML = SITE.rooms.map((r, i) => `
    <button class="row reveal" type="button" data-room="${r.id}" style="--delay:${i * .06}s">
      <span class="num">0${i + 1}</span><b>${esc(r.name)}</b>
      <span class="meta">${esc(r.area)}・${esc(r.guests)}・${esc(r.bed)}</span>
      <span class="view">${esc(r.view)}</span>${ARROW}
    </button>`).join("");
  $("#aboutText").innerHTML = SITE.home.about.map(p => `<p>${esc(p)}</p>`).join("");
  $("#aboutFigure").innerHTML = `<img src="${exteriorURL(null)}" alt="霽嶺夜景，四棟木構客房同時亮燈（模擬示意圖）" loading="lazy" decoding="async"><span class="tag" aria-hidden="true">模擬示意圖</span>`;
  updatePanoCopy();
  bindPano();
}

function panoViewBox() { return isMobileLayout() ? "455 300 690 640" : "250 220 1100 650"; }
function updatePanoCopy() {
  const touch = !canHover.matches;
  $("#panoLead").textContent = touch ? SITE.home.leadTouch : SITE.home.leadMouse;
  $("#panoHint").textContent = touch ? SITE.home.hintTouch : SITE.home.hintMouse;
}

function setGlow(id) {
  $$("#panoStage .glow").forEach(g => { g.style.opacity = g.dataset.glow === id ? 1 : 0; });
  $$("#rows .row").forEach(r => r.classList.toggle("is-on", r.dataset.room === id));
}

function selectRoom(id, { touch = false } = {}) {
  pano.selected = id;
  setGlow(id);
  const card = $("#card");
  if (!id) { card.classList.remove("is-on", "is-touch"); card.setAttribute("aria-hidden", "true"); return; }
  const r = roomById(id), i = SITE.rooms.indexOf(r);
  card.innerHTML = `<span class="eyebrow">0${i + 1} / ${esc(r.latin)}</span><p class="card__name">${esc(r.name)}</p>
    <p class="card__specs">${esc(r.area)}・${esc(r.guests)}<br>${esc(r.view)}</p>
    ${touch ? `<button class="btn" type="button" data-enter="${id}">進入${esc(r.name)}${ARROW}</button>` : `<p class="card__go"><span>點擊進入</span>${ARROW}</p>`}`;
  card.classList.toggle("is-touch", touch);
  card.removeAttribute("aria-hidden");
  if (touch) { card.style.left = ""; card.style.top = ""; }
  positionCard(id);
  card.classList.add("is-on");
}

function positionCard(id) {
  const card = $("#card"), hit = $(`#panoStage [data-hit="${id}"]`);
  if (!hit || card.classList.contains("is-touch")) return;
  const pr = $("#pano").getBoundingClientRect(), hr = hit.getBoundingClientRect();
  const cw = card.offsetWidth || 248, ch = card.offsetHeight || 150, pad = 12;
  let x = hr.left - pr.left + hr.width / 2 - cw / 2;
  let y = hr.top - pr.top - ch - 14;
  const minY = isMobileLayout() ? pad + parseFloat(getComputedStyle($("#pano")).paddingTop) : 130;
  if (y < minY) y = hr.bottom - pr.top + 12;
  x = Math.max(pad, Math.min(pr.width - cw - pad, x));
  card.style.left = x + "px";
  card.style.top = y + "px";
}

function bindPano() {
  const stage = $("#panoStage");
  stage.addEventListener("pointerdown", e => { pano.lastPointer = e.pointerType; pano.interacted = true; });
  $$(".hit", stage).forEach(hit => {
    const id = hit.dataset.hit;
    hit.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") { pano.interacted = true; selectRoom(id); } });
    hit.addEventListener("pointerleave", e => { if (e.pointerType === "mouse" && pano.selected === id) selectRoom(null); });
    hit.addEventListener("focus", () => { pano.interacted = true; selectRoom(id); });
    hit.addEventListener("blur", () => { if (pano.selected === id && !pano.armed) selectRoom(null); });
    hit.addEventListener("click", () => {
      if (pano.lastPointer !== "mouse" && pano.armed !== id) {
        pano.armed = id;
        selectRoom(id, { touch: true });
        return;
      }
      enterRoom(id);
    });
    hit.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enterRoom(id); } });
  });
  $("#card").addEventListener("click", e => { const b = e.target.closest("[data-enter]"); if (b) enterRoom(b.dataset.enter); });
  /* 點空白處：取消亮燈 */
  document.addEventListener("pointerdown", e => {
    if (!pano.armed) return;
    if (e.target.closest(".hit, #card")) return;
    pano.armed = null; selectRoom(null);
  });
  /* 觸控小卡固定在底部：往下捲動離開全景時自動收起 */
  window.addEventListener("scroll", () => {
    if (pano.armed && $("#pano").getBoundingClientRect().bottom < innerHeight * .45) { pano.armed = null; selectRoom(null); }
  }, { passive: true });
  /* 房間清單：滑過亮燈，點擊進入 */
  $$("#rows .row").forEach(row => {
    row.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") setGlow(row.dataset.room); });
    row.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") setGlow(pano.selected); });
    row.addEventListener("click", () => enterRoom(row.dataset.room));
  });
  window.addEventListener("resize", () => {
    const want = panoViewBox(), svg = $("#panoStage svg");
    if (svg && svg.getAttribute("viewBox") !== want) svg.setAttribute("viewBox", want);
    if (pano.selected) positionCard(pano.selected);
    updatePanoCopy();
  });
}

/* 首次載入時，四扇窗依序亮一次，提示可以互動 */
async function hintSweep() {
  if (reduceMotion.matches) return;
  await sleep(1400);
  for (const r of SITE.rooms) {
    if (pano.interacted || current?.name !== "home") return setGlow(pano.selected);
    setGlow(r.id);
    await sleep(520);
  }
  if (!pano.interacted) setGlow(null);
}

function enterRoom(id) {
  pano.armed = null;
  const target = `#/room/${id}`;
  if (location.hash !== target) location.hash = target;
}

/* ==========================================================
   房間頁
   ========================================================== */
function renderRoom(id) {
  const r = roomById(id), i = SITE.rooms.indexOf(r), n = SITE.rooms.length;
  const prev = SITE.rooms[(i - 1 + n) % n], next = SITE.rooms[(i + 1) % n];
  const v = $("#viewRoom");
  v.innerHTML = `
  <section class="r-hero" id="r-top" aria-labelledby="r-title">
    ${frame(photoURL(r, 0), `${r.name}：${r.photos[0].note}（模擬示意圖）`, { eager: true, parallax: .14 })}
    <div class="r-hero__back"><div class="wrap"><a class="link-btn" href="#/">${ARROW_L}返回全景</a></div></div>
    <div class="wrap r-hero__body">
      <span class="eyebrow reveal">0${i + 1} / 0${n}・${esc(r.latin)}</span>
      <h1 class="reveal" id="r-title" style="--delay:.06s">${esc(r.name)}</h1>
      <p class="lead reveal" style="--delay:.12s">${esc(r.lead)}</p>
    </div>
    <div class="specbar"><div class="wrap reveal" style="--delay:.2s"><dl>
      <div><dt>面積</dt><dd>${esc(r.area)}</dd></div>
      <div><dt>床型</dt><dd>${esc(r.bed)}</dd></div>
      <div><dt>人數</dt><dd>${esc(r.guests)}</dd></div>
      <div><dt>景觀</dt><dd>${esc(r.view)}</dd></div>
    </dl></div></div>
  </section>

  <section class="section" id="r-overview" aria-labelledby="r-ov-title">
    <div class="wrap">
      <div class="split">
        <div class="reveal"><span class="eyebrow">Overview</span><h2 class="h2" id="r-ov-title">${esc(r.headline)}</h2></div>
        <div class="split__text reveal" style="--delay:.1s">${r.story.map(p => `<p>${esc(p)}</p>`).join("")}</div>
      </div>
      <figure class="r-figure reveal">
        ${frame(exteriorURL(r), `${r.name}的外觀，窗戶亮燈（模擬示意圖）`, { parallax: .1 })}
        <figcaption class="caption"><span>${esc(r.name)}外觀・${esc(r.floor)}</span><span>模擬示意圖，非實景照片</span></figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--alt" id="r-gallery" aria-labelledby="r-gal-title">
    <div class="wrap">
      <div class="gal__head reveal">
        <div><span class="eyebrow">Gallery</span><h2 class="h2" id="r-gal-title">房間裡的五個角落。</h2></div>
        <p class="lead">用左右鍵、按鈕、縮圖或在手機上左右滑動切換。</p>
      </div>
      <div class="gal__stage reveal" id="gal" tabindex="0" role="region" aria-roledescription="照片輪播" aria-label="${esc(r.name)}照片">
        <div class="stack" id="galStack">${r.photos.map((ph, k) => `<div class="${k === 0 ? "is-active" : ""}" ${k ? 'aria-hidden="true"' : ""}>${frame(photoURL(r, k), `${r.name}：${ph.title}，${ph.note}（模擬示意圖）`)}</div>`).join("")}</div>
        <div class="gal__bar">
          <p class="gal__cap" id="galCap" aria-live="polite"></p>
          <div class="gal__ctrl">
            <span class="gal__count" id="galCount"></span>
            <button class="icon-btn" type="button" data-gal="-1" aria-label="上一張">${ARROW_L}</button>
            <button class="icon-btn" type="button" data-gal="1" aria-label="下一張">${ARROW}</button>
          </div>
        </div>
        <div class="thumbs" role="group" aria-label="選擇照片">${r.photos.map((ph, k) => `<button class="thumb" type="button" data-thumb="${k}" aria-label="${esc(ph.title)}" aria-current="${k === 0}"><img src="${photoURL(r, k)}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>
      </div>
    </div>
  </section>

  <section class="section" id="r-materials" aria-labelledby="r-mat-title">
    <div class="wrap split">
      <div class="reveal"><span class="eyebrow">Materials</span><h2 class="h2" id="r-mat-title">摸得到的材料。</h2><p class="lead" style="margin-top:20px">這間房裡你會用到、碰到的東西。</p></div>
      <ol class="mlist">${r.materials.map((m, k) => `<li class="reveal" style="--delay:${(k % 3) * .06}s"><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p></li>`).join("")}</ol>
    </div>
  </section>

  <section class="section blueprint" id="r-plan" aria-labelledby="r-plan-title">
    <div class="wrap">
      <div class="reveal"><span class="eyebrow">Floor plan</span><h2 class="h2" id="r-plan-title">平面圖，一眼看懂。</h2></div>
      <div class="bp">
        <div class="reveal">
          <div class="bp__sheet">${planSVG(r)}</div>
          <p class="bp__meta"><span>${esc(r.name.toUpperCase())}・${esc(r.area)}</span><span>${esc(r.plan.size)}・示意比例</span></p>
        </div>
        <div class="reveal" style="--delay:.1s">
          <p class="lead">點平面圖上的區域，或下方清單，查看那個空間的說明。</p>
          <div class="zones" style="margin-top:24px">${r.plan.zones.map(z => `<button class="zone-btn" type="button" data-zone-btn="${z.id}" aria-pressed="false"><span>${esc(z.label)}</span><span>${esc(z.area)}</span></button>`).join("")}</div>
          <p class="zone-note" id="zoneNote" aria-live="polite"></p>
        </div>
      </div>
    </div>
  </section>

  <section class="r-cta" aria-labelledby="r-cta-title">
    ${frame(photoURL(r, 3), "", { parallax: .12 })}
    <div class="wrap reveal">
      <span class="eyebrow">Stay</span>
      <h2 class="h2" id="r-cta-title">挑一個日子，來${esc(r.name)}住一晚。</h2>
      <p>每晚只接待一組客人。先選日期，我們確認空房後才會請你付款。</p>
      <button class="btn" type="button" data-scroll="r-booking">選擇日期${ARROW}</button>
    </div>
  </section>

  <section class="section" id="r-booking" aria-labelledby="r-bk-title">
    <div class="wrap">
      <div class="reveal">
        <span class="eyebrow">Reservation</span>
        <h2 class="h2" id="r-bk-title">預約${esc(r.name)}</h2>
        <p class="notice" role="note"><strong>展示用預約</strong>這是示範網站，沒有連到任何訂房系統或信箱。「已滿」日期是隨機產生的示意。按下按鈕只會在畫面上檢查欄位並整理摘要，資料不會被送出或儲存，也不代表預約成立。</p>
      </div>
      <div class="bk">
        <div class="cal reveal" id="cal"></div>
        <div class="reveal" style="--delay:.1s">
          <form class="panel" id="bkForm" novalidate>
            <div class="panel__dates"><span class="eyebrow">入住與退房<span class="req" aria-hidden="true">*</span></span><b id="bkDates" class="is-empty">請在左側月曆選擇入住日，再選退房日</b><span class="error" id="dates-err" aria-live="polite"></span></div>
            <fieldset class="field" data-field="slot">
              <legend>預計抵達時段<span class="req" aria-hidden="true">*</span></legend>
              <div class="slots">${SITE.booking.slots.map((s, k) => `<label class="slot"><input type="radio" name="slot" value="${esc(s)}"><span>${esc(s)}</span></label>`).join("")}</div>
              <span class="error" id="slot-err" aria-live="polite"></span>
            </fieldset>
            <div class="field" data-field="guests">
              <label id="guests-label">入住人數</label>
              <div class="stepper" role="group" aria-labelledby="guests-label">
                <button type="button" data-step="-1" aria-label="減少一位">−</button><output id="guestsOut" aria-live="polite"></output><button type="button" data-step="1" aria-label="增加一位">+</button>
              </div>
              <span class="hint">${esc(r.name)}最多 ${r.capacity} 人</span>
            </div>
            <div class="two">
              <div class="field" data-field="name"><label for="bkName">姓名<span class="req" aria-hidden="true">*</span></label><input class="input" id="bkName" name="name" autocomplete="name" maxlength="40" placeholder="王小明" aria-describedby="name-err"><span class="error" id="name-err" aria-live="polite"></span></div>
              <div class="field" data-field="phone"><label for="bkPhone">手機<span class="req" aria-hidden="true">*</span></label><input class="input" id="bkPhone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="0912 345 678" aria-describedby="phone-err"><span class="error" id="phone-err" aria-live="polite"></span></div>
            </div>
            <div class="field" data-field="note"><label for="bkNote">備註</label><textarea class="input" id="bkNote" name="note" rows="3" maxlength="300" placeholder="飲食限制、紀念日、需要的協助（選填）"></textarea></div>
            <div class="field" data-field="agree"><label class="check" for="bkAgree"><input type="checkbox" id="bkAgree" name="agree" aria-describedby="agree-err"><span>我了解這是示範預約，資料不會被送出，也不會成立任何預約。</span></label><span class="error" id="agree-err" aria-live="polite"></span></div>
            <div class="panel__foot"><button class="btn" type="submit">檢查並預覽預約內容</button><span class="status" id="bkStatus" role="status" aria-live="polite"></span></div>
          </form>
          <div class="result" id="bkResult" hidden tabindex="-1" aria-labelledby="bkResultTitle">
            <span class="eyebrow">Demo only</span>
            <h3 id="bkResultTitle">欄位檢查完成：以下是你填寫的內容</h3>
            <p><strong>資料沒有送出，預約也沒有成立。</strong>這是展示模式。正式網站接上訂房系統或通知信之後，這一步才會真的送出，並由民宿確認空房後回覆。</p>
            <dl id="bkSummary"></dl>
            <button class="btn btn--ghost" type="button" id="bkEdit">返回修改</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <nav class="next" aria-label="其他房間">
    <button type="button" data-goto="${prev.id}"><span class="eyebrow">上一間</span><b>${esc(prev.name)}</b></button>
    <button type="button" data-goto="${next.id}"><span class="eyebrow">下一間</span><b>${esc(next.name)}</b></button>
  </nav>`;
  v.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => enterRoom(b.dataset.goto)));
  setupGallery(r);
  setupPlan(r);
  setupBooking(r);
}

/* 照片輪播：所有照片疊在一起，只切換 is-active，快速連點不會空白或錯位 */
function setupGallery(r) {
  const stack = $("#galStack"), items = [...stack.children], thumbs = $$("[data-thumb]"), total = items.length;
  let idx = 0;
  function show(n) {
    idx = (n + total) % total;
    items.forEach((el, k) => { el.classList.toggle("is-active", k === idx); k === idx ? el.removeAttribute("aria-hidden") : el.setAttribute("aria-hidden", "true"); });
    thumbs.forEach((t, k) => t.setAttribute("aria-current", String(k === idx)));
    $("#galCap").innerHTML = `${esc(r.photos[idx].title)}<span>${esc(r.photos[idx].note)}</span>`;
    $("#galCount").textContent = `${String(idx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
  $$("[data-gal]").forEach(b => b.addEventListener("click", () => show(idx + +b.dataset.gal)));
  thumbs.forEach(t => t.addEventListener("click", () => show(+t.dataset.thumb)));
  $("#gal").addEventListener("keydown", e => {
    if (e.target.closest("button") && !e.target.closest(".thumb")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); show(idx + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); show(idx - 1); }
  });
  /* 手機左右滑動 */
  let sx = null, sy = null;
  stack.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") { sx = e.clientX; sy = e.clientY; } });
  stack.addEventListener("pointerup", e => {
    if (sx == null) return;
    const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) show(idx + (dx < 0 ? 1 : -1));
  });
  stack.addEventListener("pointercancel", () => { sx = null; });
  stack.style.touchAction = "pan-y";
  show(0);
}

/* 藍圖平面圖 */
function planSVG(r) {
  const p = r.plan;
  return `<svg class="bp" viewBox="-6 -10 ${p.w + 12} ${p.h + 20}" role="img" aria-label="${esc(r.name)}平面示意圖">
    <path class="dim" d="M4 -5H${p.w - 4}M4 -7v4M${p.w - 4} -7v4"/>
    <text class="small" x="${p.w / 2}" y="-6.6" text-anchor="middle">${esc(p.size.split("×")[0].trim())}</text>
    <path class="dim" d="M-3 4V${p.h - 4}M-5 4h4M-5 ${p.h - 4}h4"/>
    ${p.zones.map(z => `<rect class="zone" data-zone="${z.id}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}"/>
      <text class="lbl" data-zone-label="${z.id}" x="${z.x + 2.2}" y="${z.y + 5.4}">${esc(z.label)}</text>
      <text class="small" x="${z.x + 2.2}" y="${z.y + 9.4}">${esc(z.area)}</text>`).join("")}
    <rect class="wall" x="4" y="4" width="${p.w - 8}" height="${p.h - 8}"/>
    <path class="dim" d="M${p.w - 4} ${p.h - 14}a10 10 0 0 0 -10 10" style="stroke-width:.4"/>
    <g transform="translate(${p.w + 1} ${p.h + 6})"><path class="dim" d="M0 -6v6M-1.6 -3.6L0 -6l1.6 2.4" style="stroke-width:.35"/><text class="small" x="0" y="-7.4" text-anchor="middle">N</text></g>
  </svg>`;
}
function setupPlan(r) {
  const sheet = $(".bp__sheet");
  function pick(zid) {
    const z = r.plan.zones.find(z => z.id === zid);
    if (!z) return;
    $$("[data-zone]", sheet).forEach(el => el.classList.toggle("is-on", el.dataset.zone === zid));
    $$("[data-zone-label]", sheet).forEach(el => el.classList.toggle("is-on", el.dataset.zoneLabel === zid));
    $$("[data-zone-btn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.zoneBtn === zid)));
    $("#zoneNote").innerHTML = `<strong>${esc(z.label)}・${esc(z.area)}</strong>${esc(z.note)}`;
  }
  sheet.addEventListener("click", e => { const z = e.target.closest("[data-zone]"); if (z) pick(z.dataset.zone); });
  $$("[data-zone-btn]").forEach(b => b.addEventListener("click", () => pick(b.dataset.zoneBtn)));
  pick(r.plan.zones[0].id);
}

/* ==========================================================
   預約月曆（展示用：只做前端檢查與摘要，不送出）
   ========================================================== */
function setupBooking(r) {
  const cfg = SITE.booking, today = new Date(); today.setHours(0, 0, 0, 0);
  const first = new Date(today.getFullYear(), today.getMonth(), 1);
  const last = new Date(today.getFullYear(), today.getMonth() + cfg.months, 0);
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const WD = ["日", "一", "二", "三", "四", "五", "六"];
  const label = d => `${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）`;
  /* 示範用的「已滿」：以房間與日期計算，重新整理後仍一致 */
  const isFull = d => {
    if (d <= addDays(today, 2)) return false;
    let h = 0; for (const c of r.id + ymd(d)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b) >>> 0; h ^= h >>> 16;
    return (h % 1000) / 1000 < cfg.fullRate;
  };
  const st = { month: new Date(first), checkin: null, checkout: null, focus: addDays(today, 1), guests: Math.min(2, r.capacity) };
  const cal = $("#cal");

  function renderCal(focusAfter = false) {
    const y = st.month.getFullYear(), m = st.month.getMonth();
    const start = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
    let cells = "";
    for (let i = 0; i < start.getDay(); i++) cells += `<span aria-hidden="true"></span>`;
    for (let dnum = 1; dnum <= days; dnum++) {
      const d = new Date(y, m, dnum), key = ymd(d);
      const past = d <= today, full = isFull(d);
      const isStart = st.checkin && key === ymd(st.checkin), isEnd = st.checkout && key === ymd(st.checkout);
      const inRange = st.checkin && st.checkout && d > st.checkin && d < st.checkout;
      const focusable = ymd(st.focus) === key;
      const status = past ? "不可選" : full ? "已滿" : isStart ? "入住日" : isEnd ? "退房日" : "可預約";
      cells += `<button type="button" class="day${past ? "" : ""}${full ? " is-full" : ""}${ymd(today) === key ? " is-today" : ""}${isStart ? " is-start" : ""}${isEnd ? " is-end" : ""}${inRange ? " in-range" : ""}" data-date="${key}" tabindex="${focusable ? 0 : -1}" ${past || full ? "disabled" : ""} aria-pressed="${!!(isStart || isEnd)}" aria-label="${m + 1}月${dnum}日 星期${WD[d.getDay()]}，${status}">${dnum}</button>`;
    }
    const canPrev = st.month > first, canNext = new Date(y, m + 1, 1) <= last;
    cal.innerHTML = `
      <div class="cal__head"><p class="cal__month" aria-live="polite">${y} 年 ${m + 1} 月</p>
        <div class="cal__nav"><button class="icon-btn" type="button" data-month="-1" aria-label="上個月" ${canPrev ? "" : "disabled"}>${ARROW_L}</button><button class="icon-btn" type="button" data-month="1" aria-label="下個月" ${canNext ? "" : "disabled"}>${ARROW}</button></div></div>
      <div class="cal__grid" role="group" aria-label="${y}年${m + 1}月">${WD.map(w => `<span class="cal__dow" aria-hidden="true">${w}</span>`).join("")}${cells}</div>
      <p class="cal__legend"><span><i style="background:var(--c-accent)"></i>入住／退房</span><span><i style="background:rgba(233,183,122,.25)"></i>住宿期間</span><span><i style="border-bottom:1px solid var(--c-text-2);height:7px;width:14px"></i>刪除線：已滿（示意）</span></p>
      <p class="cal__msg" id="calMsg" aria-live="polite"></p>`;
    if (focusAfter) { const b = $(`[data-date="${ymd(st.focus)}"]`, cal); if (b && !b.disabled) b.focus(); else $(".day:not(:disabled)", cal)?.focus(); }
    /* 若可聚焦的日期不在本月或不可選，改由本月第一個可選日接手鍵盤焦點 */
    if (!$(".day[tabindex='0']:not(:disabled)", cal)) { const f = $(".day:not(:disabled)", cal); if (f) f.tabIndex = 0; }
  }

  function msg(t) { const el = $("#calMsg"); if (el) el.textContent = t; }

  function pickDate(d) {
    if (!st.checkin || st.checkout || d <= st.checkin) {
      st.checkin = d; st.checkout = null;
    } else {
      const nights = Math.round((d - st.checkin) / 864e5);
      let blocked = false;
      for (let x = addDays(st.checkin, 1); x < d; x = addDays(x, 1)) if (isFull(x)) blocked = true;
      if (nights > cfg.maxNights) { st.checkin = d; st.checkout = null; renderCal(true); updateDates(); return msg(`最多連住 ${cfg.maxNights} 晚，已改為從 ${label(d)} 重新選擇。`); }
      if (blocked) { st.checkin = d; st.checkout = null; renderCal(true); updateDates(); return msg("中間有已滿的日期，已改為從這天重新選擇。"); }
      st.checkout = d;
    }
    st.focus = d;
    renderCal(true);
    updateDates();
    msg(st.checkout ? "" : "請再選一個退房日。");
  }

  function updateDates() {
    const el = $("#bkDates");
    if (!st.checkin) { el.textContent = "請在左側月曆選擇入住日，再選退房日"; el.classList.add("is-empty"); return; }
    el.classList.remove("is-empty");
    el.textContent = st.checkout ? `${label(st.checkin)} 入住 → ${label(st.checkout)} 退房，${Math.round((st.checkout - st.checkin) / 864e5)} 晚` : `${label(st.checkin)} 入住 → 請選退房日`;
    if (st.checkout) clearErr("dates");
  }

  cal.addEventListener("click", e => {
    const mb = e.target.closest("[data-month]");
    if (mb && !mb.disabled) {
      st.month = new Date(st.month.getFullYear(), st.month.getMonth() + +mb.dataset.month, 1);
      st.focus = new Date(st.month);
      renderCal();
      $(`[data-month="${mb.dataset.month}"]`, cal)?.focus();
      return;
    }
    const day = e.target.closest("[data-date]");
    if (day && !day.disabled) { const [y, m, d] = day.dataset.date.split("-").map(Number); pickDate(new Date(y, m - 1, d)); }
  });
  /* 鍵盤：方向鍵移動日期，跨月自動翻頁 */
  cal.addEventListener("keydown", e => {
    const day = e.target.closest("[data-date]");
    if (!day) return;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const [y, m, d] = day.dataset.date.split("-").map(Number);
    let n = addDays(new Date(y, m - 1, d), step);
    if (n <= today || n > last) return;
    st.focus = n;
    if (n.getMonth() !== st.month.getMonth() || n.getFullYear() !== st.month.getFullYear()) st.month = new Date(n.getFullYear(), n.getMonth(), 1);
    renderCal();
    const b = $(`[data-date="${ymd(n)}"]`, cal);
    if (b) { $$(".day", cal).forEach(x => x.tabIndex = -1); b.tabIndex = 0; b.focus(); }
  });

  /* 人數 */
  const out = $("#guestsOut"), minus = $('[data-step="-1"]'), plus = $('[data-step="1"]');
  function setGuests(n) { st.guests = Math.max(1, Math.min(r.capacity, n)); out.textContent = `${st.guests} 位`; minus.disabled = st.guests <= 1; plus.disabled = st.guests >= r.capacity; }
  $$("[data-step]").forEach(b => b.addEventListener("click", () => setGuests(st.guests + +b.dataset.step)));
  setGuests(st.guests);

  /* 驗證 */
  const form = $("#bkForm");
  const rules = {
    dates: () => !st.checkin ? "請選擇入住日" : !st.checkout ? "請選擇退房日" : "",
    slot: () => form.slot.value ? "" : "請選擇抵達時段",
    name: () => { const v = form.name.value.trim(); return !v ? "請填寫姓名" : v.length < 2 ? "姓名至少 2 個字" : ""; },
    phone: () => { const v = form.phone.value.replace(/[\s-]/g, ""); return !v ? "請填寫手機號碼" : /^09\d{8}$/.test(v) ? "" : "請填寫 09 開頭的 10 碼手機號碼"; },
    agree: () => form.agree.checked ? "" : "請勾選確認"
  };
  const wrapOf = k => k === "dates" ? $(".panel__dates") : $(`[data-field="${k}"]`, form);
  function setErr(k, t) { wrapOf(k).classList.add("has-error"); $(`#${k}-err`).textContent = t; const i = form[k]; if (i && i.setAttribute && k !== "slot") i.setAttribute("aria-invalid", "true"); }
  function clearErr(k) { wrapOf(k).classList.remove("has-error"); $(`#${k}-err`).textContent = ""; const i = form[k]; if (i && i.removeAttribute && k !== "slot") i.removeAttribute("aria-invalid"); }
  ["name", "phone"].forEach(k => {
    form[k].addEventListener("blur", () => { if (form[k].value) { const t = rules[k](); t ? setErr(k, t) : clearErr(k); } });
    form[k].addEventListener("input", () => { if (wrapOf(k).classList.contains("has-error") && !rules[k]()) clearErr(k); });
  });
  form.addEventListener("change", e => { if (e.target.name === "slot") clearErr("slot"); if (e.target.name === "agree") clearErr("agree"); });

  form.addEventListener("submit", e => {
    e.preventDefault();
    let firstBad = null;
    for (const k of Object.keys(rules)) { const t = rules[k](); if (t) { setErr(k, t); firstBad = firstBad || k; } else clearErr(k); }
    if (firstBad) {
      $("#bkStatus").textContent = `還有 ${$$(".has-error", $("#r-booking")).length} 個項目需要處理`;
      const target = firstBad === "dates" ? ($(".day[tabindex='0']:not(:disabled)", cal) || $(".day:not(:disabled)", cal)) : firstBad === "slot" ? form.querySelector("[name=slot]") : form[firstBad];
      if (firstBad === "dates") cal.scrollIntoView({ block: "center", behavior: reduceMotion.matches ? "auto" : "smooth" });
      target?.focus({ preventScroll: firstBad === "dates" });
      return;
    }
    $("#bkStatus").textContent = "";
    const nights = Math.round((st.checkout - st.checkin) / 864e5);
    const rows = [["房間", r.name], ["日期", `${label(st.checkin)} → ${label(st.checkout)}，${nights} 晚`], ["抵達", form.slot.value], ["人數", `${st.guests} 位`], ["姓名", form.name.value.trim()], ["手機", form.phone.value.trim()], ["備註", form.note.value.trim() || "（無）"]];
    $("#bkSummary").innerHTML = rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    form.hidden = true; $("#bkResult").hidden = false; $("#bkResult").focus();
  });
  $("#bkEdit").addEventListener("click", () => { $("#bkResult").hidden = true; form.hidden = false; form.name.focus(); });

  renderCal();
}

/* ==========================================================
   導覽列（內容隨頁面改變）與手機選單
   ========================================================== */
function renderNav(route) {
  const items = route.name === "home"
    ? [["rooms", "房間", "Rooms"], ["about", "關於", "About"]]
    : [["r-overview", "概覽", "Overview"], ["r-gallery", "照片", "Gallery"], ["r-materials", "材質", "Materials"], ["r-plan", "平面圖", "Floor plan"]];
  $("#navLinks").innerHTML = items.map(([id, t]) => `<button type="button" data-scroll="${id}">${t}</button>`).join("");
  const cta = route.name === "home" ? `<button class="btn" type="button" data-scroll="rooms">選房預約</button>` : `<a class="link-btn" href="#/">${ARROW_L}全景</a><button class="btn" type="button" data-scroll="r-booking">立即預約</button>`;
  $("#navCta").innerHTML = cta;
  $("#menuList").innerHTML = (route.name === "home" ? [] : [["__home", "回到全景", "Home"]]).concat(items).map(([id, t, l]) => `<li><button type="button" data-scroll="${id}">${t}<small>${l}</small></button></li>`).join("");
  $("#menuFoot").innerHTML = `${route.name === "home" ? `<button class="btn" type="button" data-scroll="rooms">選房預約</button>` : `<button class="btn" type="button" data-scroll="r-booking">立即預約</button>`}<p>示範作品，民宿為虛構。</p>`;
  observeSections(items.map(i => i[0]));
}

let sectionObserver = null;
function observeSections(ids) {
  sectionObserver?.disconnect();
  sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) $$("#navLinks [data-scroll]").forEach(b => b.setAttribute("aria-current", String(b.dataset.scroll === en.target.id))); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["pano", "r-top", "r-cta-title", "r-booking", ...ids].forEach(id => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });
}

function setupChrome() {
  const nav = $("#nav"), toggle = $(".nav__toggle"), menu = $("#menu");
  const solid = () => nav.classList.toggle("is-solid", window.scrollY > 30 || menu.classList.contains("is-open"));
  solid();
  window.addEventListener("scroll", solid, { passive: true });
  const setOpen = open => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    document.body.style.overflow = open ? "hidden" : "";
    solid();
    if (open) $("button", menu)?.focus();
  };
  menu.inert = true;
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    if (e.key === "Tab" && menu.classList.contains("is-open")) {
      const list = [toggle, ...$$("button, a", menu)], i = list.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
      else if (!e.shiftKey && i === list.length - 1) { e.preventDefault(); list[0].focus(); }
    }
  });
  matchMedia("(min-width: 901px)").addEventListener("change", e => { if (e.matches) setOpen(false); });
  /* 所有 data-scroll 按鈕：捲動到區塊（不改網址，以免影響頁面路由） */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-scroll]");
    if (!b) return;
    const id = b.dataset.scroll;
    if (menu.classList.contains("is-open")) setOpen(false);
    if (id === "__home") { location.hash = "#/"; return; }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    const h = el.querySelector("h2, h1");
    if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
  });
  /* 選單中的連結（回全景）也要關閉選單 */
  menu.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
  $("#toTop").addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" }); $(".brand").focus({ preventScroll: true }); });
}

/* ==========================================================
   進場動畫與 parallax
   ========================================================== */
let revealObserver = null;
function observeReveals(root) {
  const els = $$(".reveal:not(.is-in)", root);
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return els.forEach(el => el.classList.add("is-in"));
  revealObserver = revealObserver || new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObserver.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -6% 0px", threshold: .06 });
  els.forEach(el => revealObserver.observe(el));
}
let ticking = false;
function parallax() {
  ticking = false;
  if (reduceMotion.matches) return;
  const vh = innerHeight;
  $$("main [data-parallax]").forEach(el => {
    if (el.offsetParent === null) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const y = Math.max(-r.height * .035, Math.min(r.height * .035, ((r.top + r.height / 2) - vh / 2) * -(+el.dataset.parallax)));
    const img = $("img", el); if (img) img.style.setProperty("--py", y.toFixed(1) + "px");
  });
}
const requestParallax = () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } };

/* ==========================================================
   路由與鏡頭轉場
   #/           全景首頁
   #/room/<id>  房間頁
   快速連點或連按上一頁時，只執行最後一個目的地，不會同時跑兩段轉場。
   ========================================================== */
let current = null, busy = false, queued = false;
function parseRoute() {
  const m = location.hash.match(/^#\/room\/([a-z]+)/);
  return m && roomById(m[1]) ? { name: "room", id: m[1] } : { name: "home" };
}
const sameRoute = (a, b) => a && b && a.name === b.name && a.id === b.id;

async function onRoute() {
  if (busy) { queued = true; return; }
  const next = parseRoute();
  if (sameRoute(current, next)) return;
  busy = true;
  try { await transition(current, next); current = next; }
  catch (err) { console.error(err); showView(next); current = next; }
  finally { busy = false; }
  if (queued) { queued = false; onRoute(); }
}

function showView(route) {
  $("#viewHome").hidden = route.name !== "home";
  $("#viewRoom").hidden = route.name !== "room";
  if (route.name === "room") document.title = `${roomById(route.id).name}｜霽嶺（示範作品）`;
  else document.title = "霽嶺｜選一扇窗（示範作品）";
  renderNav(route);
}

/* 轉場時把全景換成同一張圖的點陣快照，放大與模糊交給顯示卡處理，手機上也順暢 */
const snapCache = {};
function snapURL(id) {
  const key = id + panoViewBox();
  return snapCache[key] || (snapCache[key] = Art.toURL(Art.panorama({ lit: [id], viewBox: panoViewBox() })));
}
async function useSnapshot(id) {
  const stage = $("#panoStage"), img = new Image();
  img.className = "pano__snap"; img.alt = ""; img.src = snapURL(id);
  try { await img.decode(); } catch (e) { /* 解碼失敗時直接用原本的 SVG */ return () => {}; }
  stage.appendChild(img);
  const svg = $("svg", stage); svg.style.visibility = "hidden";
  return () => { img.remove(); svg.style.visibility = ""; };
}
function warmSnapshots() {
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 600));
  SITE.rooms.forEach(r => idle(() => { const im = new Image(); im.src = snapURL(r.id); im.decode?.().catch(() => {}); }));
}

function camera(id) {
  /* 計算推近目標：以該間房為中心放大，移到畫面中央 */
  const stage = $("#panoStage"), hit = $(`[data-hit="${id}"]`, stage);
  const sr = stage.getBoundingClientRect(), hr = hit.getBoundingClientRect();
  const ox = hr.left - sr.left + hr.width / 2, oy = hr.top - sr.top + hr.height / 2;
  const viewCx = innerWidth / 2 - sr.left, viewCy = Math.min(innerHeight, sr.bottom) / 2 + Math.max(0, sr.top) / 2 - sr.top;
  const s = Math.max(2.2, Math.min(5.5, (sr.width * .62) / hr.width));
  return { origin: `${ox}px ${oy}px`, to: `translate(${viewCx - ox}px, ${viewCy - oy}px) scale(${s})`, visible: hr.top >= 0 && hr.bottom <= innerHeight && hr.width > 0 };
}

async function transition(prev, next) {
  const veil = $("#veil"), stage = $("#panoStage"), copy = $$(".pano__copy, .pano__shade, #card");
  const calm = reduceMotion.matches;
  if (!prev) {
    /* 第一次載入 */
    if (next.name === "room") renderRoom(next.id);
    showView(next);
    observeReveals(document);
    if (next.name === "home") hintSweep();
    warmSnapshots();
    return;
  }
  if (prev.name === "home" && next.name === "room") {
    const cam = camera(next.id);
    selectRoom(null); setGlow(next.id);
    if (!calm && cam.visible) {
      const restore = await useSnapshot(next.id);
      stage.style.transformOrigin = cam.origin;
      copy.forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" }));
      const a = stage.animate([{ transform: "none", filter: "blur(0px) brightness(1)" }, { offset: .6, filter: "blur(1.5px) brightness(1.05)" }, { transform: cam.to, filter: "blur(12px) brightness(1.25)" }], { duration: 950, easing: "cubic-bezier(.65,0,.25,1)", fill: "forwards" });
      const vv = veil.animate([{ opacity: 0 }, { opacity: 0, offset: .55 }, { opacity: 1 }], { duration: 950, easing: "ease-in", fill: "forwards" });
      await Promise.all([a.finished, vv.finished]);
      restore();
    } else {
      await veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: calm ? 1 : 420, fill: "forwards" }).finished;
    }
    renderRoom(next.id);
    showView(next);
    scrollTop();
    stage.getAnimations().forEach(a => a.cancel());
    copy.forEach(el => el.getAnimations().forEach(a => a.cancel()));
    setGlow(null);
    observeReveals($("#viewRoom"));
    $("#main").focus({ preventScroll: true });
    await veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: calm ? 1 : 700, easing: "ease-out", fill: "forwards" }).finished;
    veil.getAnimations().forEach(a => a.cancel());
    return;
  }
  if (prev.name === "room" && next.name === "home") {
    await veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: calm ? 1 : 380, easing: "ease-in", fill: "forwards" }).finished;
    showView(next);
    scrollTop();
    $("#viewRoom").innerHTML = "";
    const cam = camera(prev.id);
    setGlow(prev.id);
    if (!calm) {
      const restore = await useSnapshot(prev.id);
      stage.style.transformOrigin = cam.origin;
      const a = stage.animate([{ transform: cam.to, filter: "blur(12px) brightness(1.25)" }, { offset: .5, filter: "blur(2px) brightness(1.05)" }, { transform: "none", filter: "blur(0px) brightness(1)" }], { duration: 1000, easing: "cubic-bezier(.65,0,.25,1)" });
      const vv = veil.animate([{ opacity: 1 }, { opacity: 0, offset: .45 }, { opacity: 0 }], { duration: 1000, fill: "forwards" });
      copy.forEach(el => el.animate([{ opacity: 0 }, { opacity: 0, offset: .6 }, { opacity: 1 }], { duration: 1000 }));
      await Promise.all([a.finished, vv.finished]);
      restore();
    }
    veil.getAnimations().forEach(a => a.cancel());
    observeReveals($("#viewHome"));
    const back = $(`[data-hit="${prev.id}"]`);
    back?.focus({ preventScroll: true });
    setTimeout(() => { if (current?.name === "home" && document.activeElement !== back) setGlow(pano.selected); }, 1600);
    return;
  }
  /* 房間 → 房間 */
  await veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: calm ? 1 : 380, fill: "forwards" }).finished;
  renderRoom(next.id);
  showView(next);
  scrollTop();
  observeReveals($("#viewRoom"));
  $("#main").focus({ preventScroll: true });
  await veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: calm ? 1 : 600, fill: "forwards" }).finished;
  veil.getAnimations().forEach(a => a.cancel());
}

/* ==========================================================
   啟動
   ========================================================== */
document.documentElement.classList.add("js");
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
renderHome();
setupChrome();
window.addEventListener("hashchange", onRoute);
window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);
onRoute().then(requestParallax);
