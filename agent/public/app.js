// 留燈資料管家 — 前端（不用任何外部套件）。
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app');
let META = null;

// ---------- 小工具 ----------
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => 'NT$' + Number(n || 0).toLocaleString('zh-TW');
const label = (list, key) => (META?.[list] || []).find((x) => x.key === key)?.label || key || '';
const todayTW = () => new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(Date.parse(d + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);
const options = (list, sel, withEmpty) =>
  (withEmpty ? `<option value="">${esc(withEmpty)}</option>` : '') +
  list.map((x) => {
    const k = typeof x === 'string' ? x : x.key;
    const l = typeof x === 'string' ? x : x.label;
    return `<option value="${esc(k)}"${k === sel ? ' selected' : ''}>${esc(l)}</option>`;
  }).join('');

function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (t.hidden = true), ms);
}

async function api(path, opts = {}) {
  const res = await fetch('/api/' + path, {
    method: opts.method || 'GET',
    headers: opts.body !== undefined ? { 'Content-Type': 'application/json', 'X-Requested-With': 'liudeng' } : { 'X-Requested-With': 'liudeng' },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    credentials: 'same-origin',
  });
  let data = {};
  try { data = await res.json(); } catch { /* 空回應 */ }
  if (res.status === 401 && path !== 'login') { renderLogin(); throw new Error('請先登入'); }
  if (!res.ok) throw new Error(data.error || '出錯了（' + res.status + '）');
  return data;
}

function formData(form) {
  const o = {};
  for (const el of form.elements) {
    if (!el.name) continue;
    if (el.type === 'checkbox') o[el.name] = el.checked ? 1 : 0;
    else o[el.name] = el.value;
  }
  return o;
}

async function busy(btn, fn) {
  btn.disabled = true;
  const old = btn.textContent;
  btn.textContent = '處理中…';
  try { await fn(); } catch (e) { toast(e.message, 4000); } finally { btn.disabled = false; btn.textContent = old; }
}

function chipsFor(it, cases) {
  const c = cases?.find((x) => x.id === it.case_id);
  return `<div class="chips">
    <span class="chip k-${esc(it.kind)}">${esc(label('KINDS', it.kind))}</span>
    <span class="chip">${esc(label('CATEGORIES', it.category))}</span>
    ${it.stage !== 'none' ? `<span class="chip">${esc(label('STAGES', it.stage))}</span>` : ''}
    <span class="chip${it.done ? ' done' : ''}">${esc(label('TYPES', it.type))}</span>
    ${c ? `<span class="chip">${esc(c.name)}</span>` : ''}
    ${it.due_date ? `<span class="chip">期限 ${esc(it.due_date)}</span>` : ''}
  </div>`;
}

function itemRow(it, cases) {
  return `<li>
    <a class="title-link" href="#/item/${esc(it.id)}">${esc(it.title)}</a>
    ${it.summary ? `<div class="sum">${esc(it.summary)}</div>` : ''}
    ${chipsFor(it, cases)}
    <div class="note">${esc(it.created_at.slice(0, 10))}${it.source === 'ai' ? '・AI 分類' : ''}</div>
  </li>`;
}

// 換頁時，還在載入的舊頁面不要蓋掉新頁面
let renderHash = '';
const gone = () => (location.hash || '#/') !== renderHash;

let casesCache = null;
async function getCases(force) {
  if (!casesCache || force) casesCache = (await api('cases')).cases;
  return casesCache;
}

// ---------- 登入 ----------
async function renderLogin() {
  $('#tabs').hidden = true;
  let me = { passwordSet: true };
  try { me = await (await fetch('/api/me')).json(); } catch { /* 顯示預設 */ }
  app.innerHTML = `<div class="login">
    <h1>登入</h1>
    ${me.passwordSet === false ? '<p class="alert red">還沒設定登入密碼。請照使用教學第 2 步，把 APP_PASSWORD 放進 GitHub Secrets 後重新部署。</p>' : ''}
    <form id="lf">
      <label for="pw">密碼</label>
      <input id="pw" name="password" type="password" autocomplete="current-password" required>
      <div class="btns"><button>登入</button></div>
    </form>
    <p class="note">這個網站只有 Ben 用。登入一次可以用 30 天。</p>
  </div>`;
  $('#lf').onsubmit = (e) => {
    e.preventDefault();
    busy($('#lf button'), async () => {
      await api('login', { method: 'POST', body: { password: $('#pw').value } });
      await boot();
    });
  };
}

// ---------- 今天 ----------
async function viewHome() {
  const s = await api('summary');
  const pct = Math.min(100, Math.round((s.monthIncome / META.INCOME_LIMIT) * 100));
  const barCls = s.monthIncome >= META.INCOME_LIMIT ? 'over' : s.monthIncome >= META.INCOME_WARN ? 'warn' : '';
  if (gone()) return;
  app.innerHTML = `
    <h1>今天 ${esc(s.today)}</h1>
    ${s.alerts.length
      ? s.alerts.map((a) => `<a class="alert ${esc(a.level)}" href="${esc(a.link)}">${esc(a.text)}</a>`).join('')
      : '<p class="ok-box">今天沒有到期或要注意的事。</p>'}
    <div class="stats">
      <div class="stat"><b>${s.activeCases}</b><span>進行中案件</span></div>
      <div class="stat"><b>${s.openTodos}</b><span>未完成待辦</span></div>
      <div class="stat"><b>${s.counts.prompt || 0}</b><span>Prompt</span></div>
      <div class="stat"><b>${s.counts.total || 0}</b><span>全部資料（專案 ${s.counts.project || 0}／日常 ${s.counts.daily || 0}）</span></div>
    </div>
    <h2>本月收入 ${esc(s.month)}</h2>
    <p><b>${money(s.monthIncome)}</b> <span class="muted">／ NT$50,000 前要先問國稅局</span></p>
    <div class="bar ${barCls}"><i style="width:${pct}%"></i></div>
    <h2>快速丟進來</h2>
    ${inboxForm()}
    <div id="inbox-result"></div>`;
  bindInbox();
}

// ---------- 丟進來 ----------
function inboxForm() {
  const ai = META.ai;
  return `<form id="inf">
    <label for="intext">貼上任何東西：問題、prompt、客人訊息、筆記、待辦</label>
    <textarea id="intext" name="text" class="big" required placeholder="例：某某民宿問可不可以改早餐時間，12/1 前要改好"></textarea>
    ${ai ? '' : '<p class="note">AI 還沒開（沒有金鑰），請自己選分類。</p>'}
    <details ${ai ? '' : 'open'}><summary class="note">${ai ? '自己選分類（不用 AI）' : '分類'}</summary>
      <div class="grid2">
        <div><label>專案／日常</label><select name="kind">${options(META.KINDS, 'daily')}</select></div>
        <div><label>大類</label><select name="category">${options(META.CATEGORIES, 'other')}</select></div>
        <div><label>階段</label><select name="stage">${options(META.STAGES, 'none')}</select></div>
        <div><label>類型</label><select name="type">${options(META.TYPES, 'note')}</select></div>
      </div>
      <label class="check"><input type="checkbox" name="manual"> 這次用我選的分類，不用 AI</label>
    </details>
    <div class="btns"><button>${ai ? '交給 AI 整理' : '存起來'}</button></div>
  </form>`;
}

function bindInbox() {
  const f = $('#inf');
  f.onsubmit = (e) => {
    e.preventDefault();
    busy($('button', f), async () => {
      const body = formData(f);
      if (!META.ai) body.manual = 1;
      const r = await api('inbox', { method: 'POST', body });
      const cases = await getCases();
      const it = r.item;
      const c = cases.find((x) => x.id === it.case_id);
      $('#inbox-result').innerHTML = `<div class="result">
        <div class="where">已歸到：${esc(label('KINDS', it.kind))}・${esc(label('CATEGORIES', it.category))}${it.stage !== 'none' ? '・' + esc(label('STAGES', it.stage)) : ''}・${esc(label('TYPES', it.type))}${c ? '・' + esc(c.name) : ''}</div>
        <p><b>${esc(it.title)}</b></p>
        ${it.summary ? `<p class="sum">${esc(it.summary)}</p>` : ''}
        ${it.ai_reason ? `<p class="note">AI 的理由：${esc(it.ai_reason)}</p>` : ''}
        ${r.aiNote ? `<p class="note">${esc(r.aiNote)}</p>` : ''}
        <div class="btns"><a class="btn ghost" href="#/item/${esc(it.id)}">分錯了，改一下</a></div>
      </div>`;
      f.reset();
    });
  };
}

async function viewInbox() {
  const [{ items }, cases] = await Promise.all([api('items'), getCases()]);
  if (gone()) return;
  app.innerHTML = `<h1>丟進來</h1>
    <p class="muted">規則：有客人、有要交的東西、或有期限＝專案；其他＝日常問答。AI 分好會直接存，分錯可以改。</p>
    ${inboxForm()}
    <div id="inbox-result"></div>
    <h2>最近 20 筆</h2>
    <ul class="list">${items.slice(0, 20).map((it) => itemRow(it, cases)).join('') || '<li class="muted">還沒有資料</li>'}</ul>`;
  bindInbox();
}

// ---------- 全部資料 ----------
async function viewItems(params) {
  const cases = await getCases();
  const q = new URLSearchParams(params);
  const { items } = await api('items?' + q.toString());
  const v = (k) => q.get(k) || '';
  if (gone()) return;
  app.innerHTML = `<h1>全部資料</h1>
    <form id="ff" class="filters">
      <div><label>搜尋</label><input name="q" value="${esc(v('q'))}" placeholder="關鍵字"></div>
      <div><label>專案／日常</label><select name="kind">${options(META.KINDS, v('kind'), '全部')}</select></div>
      <div><label>大類</label><select name="category">${options(META.CATEGORIES, v('category'), '全部')}</select></div>
      <div><label>階段</label><select name="stage">${options(META.STAGES, v('stage'), '全部')}</select></div>
      <div><label>類型</label><select name="type">${options(META.TYPES, v('type'), '全部')}</select></div>
      <div><label>案件</label><select name="case_id">${options(cases.map((c) => ({ key: c.id, label: c.name })), v('case_id'), '全部')}</select></div>
    </form>
    <div class="btns"><a class="btn ghost" href="#/item/new">＋ 手動新增一筆</a></div>
    <p class="muted">${items.length} 筆${items.length >= 500 ? '（只顯示最新 500 筆，請加條件）' : ''}</p>
    <ul class="list">${items.map((it) => itemRow(it, cases)).join('') || '<li class="muted">沒有符合的資料</li>'}</ul>`;
  const ff = $('#ff');
  const go = () => {
    const o = formData(ff);
    const qs = new URLSearchParams(Object.entries(o).filter(([, x]) => x)).toString();
    location.hash = '#/items' + (qs ? '?' + qs : '');
  };
  ff.onchange = go;
  ff.onsubmit = (e) => { e.preventDefault(); go(); };
}

async function viewItem(id) {
  const cases = await getCases();
  const it = id === 'new'
    ? { kind: 'daily', category: 'other', stage: 'none', type: 'note', title: '', summary: '', body: '', tags: '', due_date: '', case_id: '', done: 0 }
    : (await api('items/' + id)).item;
  if (gone()) return;
  app.innerHTML = `<h1>${id === 'new' ? '新增一筆' : '編輯資料'}</h1>
    <form id="itf">
      <label>標題</label><input name="title" value="${esc(it.title)}" required>
      <div class="grid2">
        <div><label>專案／日常</label><select name="kind">${options(META.KINDS, it.kind)}</select></div>
        <div><label>大類</label><select name="category">${options(META.CATEGORIES, it.category)}</select></div>
        <div><label>階段</label><select name="stage">${options(META.STAGES, it.stage)}</select></div>
        <div><label>類型</label><select name="type">${options(META.TYPES, it.type)}</select></div>
        <div><label>屬於哪個案件</label><select name="case_id">${options(cases.map((c) => ({ key: c.id, label: c.name })), it.case_id || '', '不屬於案件')}</select></div>
        <div><label>期限</label><input type="date" name="due_date" value="${esc(it.due_date || '')}"></div>
      </div>
      <label>重點</label><input name="summary" value="${esc(it.summary)}">
      <label>關鍵字（用逗號分開）</label><input name="tags" value="${esc(it.tags)}">
      <label>內容</label><textarea name="body" class="big">${esc(it.body)}</textarea>
      <label class="check"><input type="checkbox" name="done" ${it.done ? 'checked' : ''}> 已完成／已處理</label>
      ${it.ai_reason ? `<p class="note">AI 的理由：${esc(it.ai_reason)}</p>` : ''}
      <div class="btns">
        <button>儲存</button>
        ${it.type === 'prompt' ? '<button type="button" class="ghost" id="copy">複製內容</button>' : ''}
        ${id !== 'new' ? '<button type="button" class="danger" id="del">刪除</button>' : ''}
      </div>
    </form>`;
  const f = $('#itf');
  f.onsubmit = (e) => {
    e.preventDefault();
    busy($('button', f), async () => {
      const body = formData(f);
      if (id === 'new') {
        const r = await api('items', { method: 'POST', body });
        location.hash = '#/item/' + r.item.id;
      } else await api('items/' + id, { method: 'PATCH', body });
      toast('已儲存');
    });
  };
  const copy = $('#copy');
  if (copy) copy.onclick = () => copyText(it.body);
  const del = $('#del');
  if (del) del.onclick = () => confirmTwice(del, async () => {
    await api('items/' + id, { method: 'DELETE' });
    toast('已刪除');
    history.back();
  });
}

// 不用瀏覽器的確認視窗：按一次變「再按一次確定刪除」
function confirmTwice(btn, fn) {
  if (btn.dataset.armed) return busy(btn, fn);
  btn.dataset.armed = '1';
  btn.textContent = '再按一次確定刪除';
  setTimeout(() => { delete btn.dataset.armed; btn.textContent = '刪除'; }, 4000);
}

async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast('已複製，可以貼給 Claude 了'); }
  catch { toast('複製失敗，請手動選取'); }
}

// ---------- Prompt 庫 ----------
async function viewPrompts() {
  const [{ items }, cases] = await Promise.all([api('items?type=prompt'), getCases()]);
  const byStage = {};
  for (const it of items) (byStage[it.stage] ||= []).push(it);
  for (const k in byStage) byStage[k].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant', { numeric: true }));
  if (gone()) return;
  app.innerHTML = `<h1>Prompt 庫</h1>
    <p class="muted">照做網站的順序排：開始 → 製作 → 修改 → 錯誤排除 → 上線 → 維護。按「複製」後直接貼給 Claude。</p>
    <div class="btns"><a class="btn ghost" href="#/item/new">＋ 新增 Prompt</a></div>
    ${META.STAGES.map((s) => `
      <h2>${esc(s.label)} <small class="muted">${esc(s.hint || '')}</small></h2>
      ${(byStage[s.key] || []).map((it) => `<div class="card">
        <div class="row"><a class="title-link grow" href="#/item/${esc(it.id)}">${esc(it.title)}</a>
          <button class="small ghost" data-copy="${esc(it.id)}">複製</button></div>
        ${it.summary ? `<div class="sum">${esc(it.summary)}</div>` : ''}
        <details><summary class="note">看內容</summary><pre>${esc(it.body)}</pre></details>
      </div>`).join('') || '<p class="note">這個階段還沒有 Prompt。</p>'}`).join('')}`;
  const map = Object.fromEntries(items.map((it) => [it.id, it.body]));
  $$('[data-copy]').forEach((b) => (b.onclick = () => copyText(map[b.dataset.copy])));
  void cases;
}

// ---------- 案件 ----------
function stepState(c) {
  const checks = safeJSON(c.checks);
  return META.STEPS.map((s) => {
    const done = s.checks.filter(([k]) => checks[k]).length;
    return done === s.checks.length ? 'on' : done ? 'part' : '';
  });
}
const safeJSON = (s) => { try { return JSON.parse(s || '{}') || {}; } catch { return {}; } };

async function viewCases() {
  const cases = await getCases(true);
  if (gone()) return;
  app.innerHTML = `<h1>案件</h1>
    <div class="btns"><a class="btn" href="#/case/new">＋ 新案件</a></div>
    ${cases.map((c) => {
      const st = stepState(c);
      return `<div class="card">
        <div class="row"><a class="title-link grow" href="#/case/${esc(c.id)}">${esc(c.name)}</a>
          <span class="chip k-project">${esc(c.status)}</span></div>
        <div class="note">${esc(c.code || '無編號')}・${esc(c.plan)}・總價 ${money(c.total)}・已收 ${money(c.paid)}</div>
        <div class="steps">${META.STEPS.map((s, i) => `<span class="${st[i]}">${s.n} ${esc(s.label)}</span>`).join('')}</div>
        ${c.next_action ? `<div class="sum">下一步：${esc(c.next_action)}${c.next_date ? '（' + esc(c.next_date) + '）' : ''}</div>` : ''}
      </div>`;
    }).join('') || '<p class="muted">還沒有案件。</p>'}`;
}

async function viewCase(id) {
  const isNew = id === 'new';
  const data = isNew ? { case: { status: '潛在', plan: '半客製', total: 0, checks: '{}', portfolio: '未問' }, items: [], payments: [] } : await api('cases/' + id);
  const c = data.case;
  const checks = safeJSON(c.checks);
  const paid = data.payments.reduce((s, p) => s + p.amount, 0);
  if (gone()) return;
  app.innerHTML = `<h1>${isNew ? '新案件' : esc(c.name)}</h1>
    ${isNew ? '' : `<div class="steps">${META.STEPS.map((s, i) => `<span class="${stepState(c)[i]}">${s.n} ${esc(s.label)}</span>`).join('')}</div>`}
    <form id="cf">
      <h2>基本資料</h2>
      <div class="grid2">
        <div><label>民宿名稱</label><input name="name" value="${esc(c.name || '')}" required></div>
        <div><label>估價單編號</label><input name="code" value="${esc(c.code || '')}" placeholder="LD-1125-01"></div>
        <div><label>狀態</label><select name="status">${options(META.CASE_STATUS, c.status)}</select></div>
        <div><label>方案</label><select name="plan">${options(META.PLANS, c.plan)}</select></div>
        <div><label>總價（NT$）</label><input name="total" type="number" inputmode="numeric" min="0" value="${esc(c.total || 0)}"></div>
        <div><label>聯絡方式（LINE 名稱）</label><input name="contact" value="${esc(c.contact || '')}"></div>
      </div>
      <label class="check"><input type="checkbox" name="rush" ${c.rush ? 'checked' : ''}> 加急（7 天）</label>
      <div class="grid2">
        <div><label>開始算天數（第一期款入帳＋素材到齊的隔天）</label><input type="date" name="start_date" value="${esc(c.start_date || '')}"></div>
        <div><label>初稿交稿日 <button type="button" class="small ghost" id="calc">幫我算</button></label><input type="date" name="due_date" value="${esc(c.due_date || '')}"></div>
        <div><label>下一步要做什麼</label><input name="next_action" value="${esc(c.next_action || '')}"></div>
        <div><label>下一步日期</label><input type="date" name="next_date" value="${esc(c.next_date || '')}"></div>
      </div>
      <h2>網域與售後</h2>
      <div class="grid2">
        <div><label>網址</label><input name="domain" value="${esc(c.domain || '')}" placeholder="example.com"></div>
        <div><label>網址登記人</label><input name="domain_registrant" value="${esc(c.domain_registrant || '')}"></div>
        <div><label>網址到期日</label><input type="date" name="domain_expiry" value="${esc(c.domain_expiry || '')}"></div>
        <div><label>免費保固到期日</label><input type="date" name="warranty_end" value="${esc(c.warranty_end || '')}"></div>
        <div><label>作品展示同意</label><select name="portfolio">${options(['未問', '同意', '不同意'], c.portfolio)}</select></div>
        <div><label>專案資料夾（檔案放哪）</label><input name="folder" value="${esc(c.folder || '')}" placeholder="例：芭涵漢民宿/"></div>
      </div>
      <label>備註</label><textarea name="notes">${esc(c.notes || '')}</textarea>
      <h2>接案 6 步</h2>
      ${META.STEPS.map((s) => {
        const done = s.checks.filter(([k]) => checks[k]).length;
        return `<details class="step"${done && done < s.checks.length ? ' open' : ''}>
          <summary>${s.n}．${esc(s.label)}<small>${done}／${s.checks.length}</small></summary>
          ${s.checks.map(([k, l]) => `<label class="check"><input type="checkbox" data-check="${esc(k)}" ${checks[k] ? 'checked' : ''}>
            <span>${esc(l)}${checks[k] ? `<small>${esc(checks[k])}</small>` : ''}</span></label>`).join('')}
        </details>`;
      }).join('')}
      <div class="btns"><button>儲存案件</button>${isNew ? '' : '<button type="button" class="danger" id="del">刪除案件</button>'}</div>
    </form>
    ${isNew ? '' : `
      <h2>收款（已收 ${money(paid)}／總價 ${money(c.total)}）</h2>
      ${paymentTable(data.payments)}
      ${paymentForm(id)}
      <h2>這個案件的資料（${data.items.length}）</h2>
      <ul class="list">${data.items.map((it) => itemRow(it)).join('') || '<li class="muted">還沒有</li>'}</ul>`}`;

  const f = $('#cf');
  $('#calc').onclick = () => {
    const s = f.start_date.value;
    if (!s) return toast('先填「開始算天數」的日期');
    f.due_date.value = addDays(s, f.rush.checked ? 7 : 14);
    toast(`已算好：${f.rush.checked ? 7 : 14} 天後`);
  };
  f.onsubmit = (e) => {
    e.preventDefault();
    busy($('button:not([type])', f) || $('button', f), async () => {
      const body = formData(f);
      const newChecks = {};
      $$('[data-check]', f).forEach((el) => {
        if (el.checked) newChecks[el.dataset.check] = checks[el.dataset.check] || todayTW();
      });
      body.checks = newChecks;
      if (isNew) {
        const r = await api('cases', { method: 'POST', body });
        casesCache = null;
        location.hash = '#/case/' + r.case.id;
      } else {
        await api('cases/' + id, { method: 'PATCH', body });
        casesCache = null;
        toast('已儲存');
        viewCase(id);
      }
    });
  };
  const del = $('#del');
  if (del) del.onclick = () => confirmTwice(del, async () => {
    await api('cases/' + id, { method: 'DELETE' });
    casesCache = null;
    location.hash = '#/cases';
  });
  bindPayments(() => viewCase(id));
}

// ---------- 錢 ----------
function paymentTable(list, showCase) {
  if (!list.length) return '<p class="note">還沒有收款紀錄。</p>';
  return `<div class="tablewrap"><table><thead><tr><th>日期</th>${showCase ? '<th>案件</th>' : ''}<th>項目</th><th class="num">金額</th><th>收據</th><th></th></tr></thead><tbody>
    ${list.map((p) => `<tr>
      <td>${esc(p.date)}</td>${showCase ? `<td>${esc(p.case_name || '—')}</td>` : ''}
      <td>${esc(p.kind)}${p.note ? `<div class="note">${esc(p.note)}</div>` : ''}</td>
      <td class="num">${money(p.amount)}</td>
      <td><label class="check"><input type="checkbox" data-receipt="${esc(p.id)}" ${p.receipt ? 'checked' : ''}> 已開</label></td>
      <td><button class="small danger" data-delpay="${esc(p.id)}">刪除</button></td>
    </tr>`).join('')}</tbody></table></div>`;
}

function paymentForm(caseId, cases) {
  return `<form id="pf" class="card">
    <h3>登記一筆收款</h3>
    <div class="grid3">
      <div><label>入帳日期</label><input type="date" name="date" value="${todayTW()}" required></div>
      <div><label>金額（NT$）</label><input type="number" name="amount" inputmode="numeric" min="1" required></div>
      <div><label>項目</label><select name="kind">${options(META.PAY_KINDS, '第一期款')}</select></div>
    </div>
    ${caseId ? `<input type="hidden" name="case_id" value="${esc(caseId)}">` : `<label>案件</label><select name="case_id">${options((cases || []).map((c) => ({ key: c.id, label: c.name })), '', '不屬於案件')}</select>`}
    <label>備註</label><input name="note">
    <label class="check"><input type="checkbox" name="receipt"> 收據已開</label>
    <p class="note">只記實際入帳的錢（網路銀行確認過）。收據要在 3 天內開。</p>
    <div class="btns"><button>登記</button></div>
  </form>`;
}

function bindPayments(reload) {
  const pf = $('#pf');
  if (pf) pf.onsubmit = (e) => {
    e.preventDefault();
    busy($('button', pf), async () => {
      await api('payments', { method: 'POST', body: formData(pf) });
      toast('已登記');
      reload();
    });
  };
  $$('[data-receipt]').forEach((el) => (el.onchange = async () => {
    try { await api('payments/' + el.dataset.receipt, { method: 'PATCH', body: { receipt: el.checked ? 1 : 0 } }); toast('已更新'); }
    catch (e) { toast(e.message); el.checked = !el.checked; }
  }));
  $$('[data-delpay]').forEach((b) => (b.onclick = () => confirmTwice(b, async () => {
    await api('payments/' + b.dataset.delpay, { method: 'DELETE' });
    reload();
  })));
}

async function viewMoney() {
  const [{ payments }, cases] = await Promise.all([api('payments'), getCases()]);
  const byMonth = {};
  for (const p of payments) byMonth[p.date.slice(0, 7)] = (byMonth[p.date.slice(0, 7)] || 0) + p.amount;
  const months = Object.keys(byMonth).sort().reverse();
  if (gone()) return;
  app.innerHTML = `<h1>錢</h1>
    <p class="muted">每月收入接近 NT$50,000 前，先打國稅局 0800-000-321 問稅籍登記（這裡只是提醒，不是稅務建議）。</p>
    <h2>每月收入</h2>
    ${months.length ? `<div class="tablewrap"><table><thead><tr><th>月份</th><th class="num">收入</th><th>到 5 萬的比例</th></tr></thead><tbody>
      ${months.map((m) => {
        const v = byMonth[m];
        const cls = v >= META.INCOME_LIMIT ? 'over' : v >= META.INCOME_WARN ? 'warn' : '';
        return `<tr><td>${esc(m)}</td><td class="num">${money(v)}</td><td><div class="bar ${cls}"><i style="width:${Math.min(100, Math.round(v / META.INCOME_LIMIT * 100))}%"></i></div></td></tr>`;
      }).join('')}</tbody></table></div>` : '<p class="note">還沒有收入。</p>'}
    ${paymentForm(null, cases)}
    <h2>全部收款</h2>
    ${paymentTable(payments, true)}`;
  bindPayments(viewMoney);
}

// ---------- 設定 ----------
async function viewSettings() {
  if (gone()) return;
  app.innerHTML = `<h1>設定</h1>
    <h2>AI 狀態</h2>
    <p>${META.ai ? `已開啟（模型 ${esc(META.model)}）。每丟一筆會用一點 AI 額度。` : 'AI 還沒開：GitHub Secrets 還沒有 ANTHROPIC_API_KEY。不開也能用，分類改成自己選。'}</p>
    <h2>備份</h2>
    <p>下載一份全部資料（案件、資料、收款）。建議每週一下載一次，放進電腦或雲端硬碟。</p>
    <div class="btns"><a class="btn" href="/api/export">下載備份檔</a><button class="ghost" id="print">列印／存成 PDF</button></div>
    <h2>匯入</h2>
    <p>選一個備份檔或 Claude 給您的匯入檔。同一筆會更新，新的會加入，<b>不會刪掉任何資料</b>。</p>
    <input type="file" id="imp" accept=".json,application/json">
    <div class="btns"><button id="impbtn" class="ghost">匯入</button></div>
    <h2>登出</h2>
    <div class="btns"><button class="ghost" id="out">登出這台裝置</button></div>`;
  $('#out').onclick = async () => { await api('logout', { method: 'POST', body: {} }); renderLogin(); };
  $('#print').onclick = () => (location.hash = '#/print');
  $('#impbtn').onclick = () => busy($('#impbtn'), async () => {
    const file = $('#imp').files[0];
    if (!file) throw new Error('請先選檔案');
    let data;
    try { data = JSON.parse(await file.text()); } catch { throw new Error('檔案不是正確的格式'); }
    const r = await api('import', { method: 'POST', body: data });
    casesCache = null;
    toast(`匯入完成：案件 ${r.imported.cases}、資料 ${r.imported.items}、收款 ${r.imported.payments}`, 5000);
  });
}

// 列印頁：全部資料一頁攤開，Safari 選「檔案 → 輸出為 PDF」
async function viewPrint() {
  const [{ items }, cases, { payments }] = await Promise.all([api('items'), getCases(true), api('payments')]);
  if (gone()) return;
  app.innerHTML = `<h1>留燈資料管家 備份 ${todayTW()}</h1>
    <div class="btns"><button id="doprint">列印／存成 PDF</button></div>
    <h2>案件</h2>
    ${cases.map((c) => `<div class="card"><b>${esc(c.name)}</b>（${esc(c.code || '無編號')}・${esc(c.status)}）<br>
      總價 ${money(c.total)}・已收 ${money(c.paid)}・網址 ${esc(c.domain || '—')}（到期 ${esc(c.domain_expiry || '—')}）・保固到 ${esc(c.warranty_end || '—')}
      ${c.notes ? `<p class="sum">${esc(c.notes)}</p>` : ''}</div>`).join('')}
    <h2>收款</h2>${paymentTable(payments, true)}
    <h2>資料（${items.length}）</h2>
    ${items.map((it) => `<div class="card"><b>${esc(it.title)}</b>${chipsFor(it, cases)}<pre>${esc(it.body)}</pre></div>`).join('')}`;
  $('#doprint').onclick = () => window.print();
}

// ---------- 路由 ----------
async function route() {
  const hash = location.hash || '#/';
  renderHash = hash;
  const [path, qs] = hash.slice(1).split('?');
  const parts = path.split('/').filter(Boolean);
  const tab = '#/' + (parts[0] === 'case' ? 'cases' : parts[0] === 'item' ? 'items' : parts[0] || '');
  $$('#tabs a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === tab));
  window.scrollTo(0, 0);
  try {
    switch (parts[0]) {
      case undefined: return await viewHome();
      case 'inbox': return await viewInbox();
      case 'cases': return await viewCases();
      case 'case': return await viewCase(parts[1]);
      case 'prompts': return await viewPrompts();
      case 'items': return await viewItems(qs || '');
      case 'item': return await viewItem(parts[1]);
      case 'money': return await viewMoney();
      case 'settings': return await viewSettings();
      case 'print': return await viewPrint();
      default: app.innerHTML = '<p class="pad">找不到這一頁。<a href="#/">回今天</a></p>';
    }
  } catch (e) {
    if (e.message !== '請先登入') app.innerHTML = `<p class="alert red">${esc(e.message)}</p>`;
  }
}

async function boot() {
  try {
    const me = await (await fetch('/api/me')).json();
    if (!me.loggedIn) return renderLogin();
    META = await api('meta');
  } catch (e) {
    app.innerHTML = `<p class="alert red">連不上：${esc(e.message)}</p>`;
    return;
  }
  $('#tabs').hidden = false;
  await route();
}

window.addEventListener('hashchange', () => META && route());
boot();
