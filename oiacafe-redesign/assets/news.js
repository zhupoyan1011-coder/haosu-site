/* Oia Cafe B&B — "最新消息" read from the owner's Google Sheet.
   The owner edits the sheet (columns: 日期, 標題, 內容, 顯示); the site picks it up on the next visit.
   The sheet must be shared as "anyone with the link can view". If it can't be read, the section stays hidden. */
(() => {
  const SHEET_ID = '114hrST9OffVhwoOGhcldvJivEk-bVTTNRO9GvmHdowk';
  const MAX_ITEMS = 3;
  const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  const section = document.getElementById('news');
  if (!section) return;
  const list = section.querySelector('.news__list');

  // Minimal CSV parser: handles quoted fields, escaped quotes and newlines inside quotes.
  const parseCSV = text => {
    const rows = [];
    let row = [], field = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') quoted = false;
        else field += c;
      } else if (c === '"') quoted = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else field += c;
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    return rows;
  };

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  fetch(URL)
    .then(r => (r.ok ? r.text() : Promise.reject(r.status)))
    .then(text => {
      const [head, ...rows] = parseCSV(text.trim());
      const col = name => head.findIndex(h => h.trim() === name);
      const iDate = col('日期'), iTitle = col('標題'), iBody = col('內容'), iShow = col('顯示');
      if (iTitle < 0) return;
      const items = rows
        .map(r => ({
          date: (r[iDate] || '').trim(),
          title: (r[iTitle] || '').trim(),
          body: (r[iBody] || '').trim(),
          show: iShow < 0 || (r[iShow] || '').trim() !== '否',
        }))
        .filter(n => n.title && n.show)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, MAX_ITEMS);
      if (!items.length) return;
      items.forEach(n => {
        const li = el('li', 'news__item');
        if (n.date) {
          const t = el('time', 'news__date', n.date.replace(/-/g, '.'));
          t.dateTime = n.date;
          li.append(t);
        }
        const text = el('div', 'news__text');
        text.append(el('h3', 'news__h', n.title));
        if (n.body) text.append(el('p', 'news__p', n.body));
        li.append(text);
        list.append(li);
      });
      section.hidden = false;
      requestAnimationFrame(() => section.classList.add('is-in'));
    })
    .catch(() => {});
})();
