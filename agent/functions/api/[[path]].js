// 留燈資料管家：所有 /api/* 都由這個檔案處理。
import { meta, KINDS, CATEGORIES, STAGES, TYPES, CASE_STATUS, PLANS, PAY_KINDS, INCOME_WARN, INCOME_LIMIT, keys } from '../../src/meta.js';
import { isLoggedIn, login, logoutCookie, passwordConfigured } from '../../src/auth.js';
import { aiConfigured, classify, AiError, MAX_INPUT_CHARS, MODEL } from '../../src/ai.js';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
const fail = (error, status = 400) => json({ error }, status);

const now = () => new Date().toISOString();
// 台灣時間的今天（YYYY-MM-DD）
const todayTW = () => new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
const addDays = (d, n) => new Date(Date.parse(d + 'T00:00:00Z') + n * 864e5).toISOString().slice(0, 10);
const uid = () => crypto.randomUUID();
const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
const str = (v, max = 5000) => (v == null ? '' : String(v)).slice(0, max);
const int = (v) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : 0);
const oneOf = (v, allowed, dflt) => (allowed.includes(v) ? v : dflt);
const dateOrNull = (v) => (isDate(v) ? v : null);

// ---------- 欄位清洗 ----------
function cleanItem(b, old = {}) {
  const pick = (k, d) => (b[k] !== undefined ? b[k] : old[k] !== undefined ? old[k] : d);
  return {
    kind: oneOf(pick('kind'), keys(KINDS), 'daily'),
    category: oneOf(pick('category'), keys(CATEGORIES), 'other'),
    stage: oneOf(pick('stage'), keys(STAGES), 'none'),
    type: oneOf(pick('type'), keys(TYPES), 'note'),
    case_id: pick('case_id', null) || null,
    title: str(pick('title', ''), 120) || '（未命名）',
    summary: str(pick('summary', ''), 600),
    body: str(pick('body', ''), 60000),
    tags: str(pick('tags', ''), 200),
    due_date: dateOrNull(pick('due_date', null)),
    done: pick('done', 0) ? 1 : 0,
    source: str(pick('source', 'manual'), 20),
    ai_reason: str(pick('ai_reason', ''), 600),
  };
}

function cleanCase(b, old = {}) {
  const pick = (k, d) => (b[k] !== undefined ? b[k] : old[k] !== undefined ? old[k] : d);
  let checks = pick('checks', '{}');
  if (typeof checks !== 'string') checks = JSON.stringify(checks || {});
  try { JSON.parse(checks); } catch { checks = '{}'; }
  return {
    code: str(pick('code', ''), 40),
    name: str(pick('name', ''), 80) || '（未命名案件）',
    contact: str(pick('contact', ''), 200),
    status: oneOf(pick('status'), CASE_STATUS, '潛在'),
    plan: oneOf(pick('plan'), PLANS, '半客製'),
    total: int(pick('total', 0)),
    rush: pick('rush', 0) ? 1 : 0,
    start_date: dateOrNull(pick('start_date', null)),
    due_date: dateOrNull(pick('due_date', null)),
    next_action: str(pick('next_action', ''), 300),
    next_date: dateOrNull(pick('next_date', null)),
    domain: str(pick('domain', ''), 120),
    domain_registrant: str(pick('domain_registrant', ''), 80),
    domain_expiry: dateOrNull(pick('domain_expiry', null)),
    warranty_end: dateOrNull(pick('warranty_end', null)),
    portfolio: oneOf(pick('portfolio'), ['未問', '同意', '不同意'], '未問'),
    folder: str(pick('folder', ''), 200),
    notes: str(pick('notes', ''), 20000),
    checks,
  };
}

function cleanPayment(b) {
  return {
    case_id: b.case_id || null,
    date: isDate(b.date) ? b.date : null,
    amount: int(b.amount),
    kind: oneOf(b.kind, PAY_KINDS, '其他'),
    receipt: b.receipt ? 1 : 0,
    note: str(b.note, 500),
  };
}

// ---------- 共用 SQL ----------
async function insert(db, table, row) {
  const cols = Object.keys(row);
  await db.prepare(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`)
    .bind(...cols.map((c) => row[c])).run();
}
async function update(db, table, id, row) {
  const cols = Object.keys(row);
  await db.prepare(`UPDATE ${table} SET ${cols.map((c) => c + '=?').join(',')} WHERE id=?`)
    .bind(...cols.map((c) => row[c]), id).run();
}
async function upsert(db, table, row) {
  const cols = Object.keys(row);
  await db.prepare(
    `INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})
     ON CONFLICT(id) DO UPDATE SET ${cols.filter((c) => c !== 'id').map((c) => `${c}=excluded.${c}`).join(',')}`,
  ).bind(...cols.map((c) => row[c])).run();
}
const all = async (db, sql, ...args) => (await db.prepare(sql).bind(...args).all()).results;

// ---------- 今天的提醒 ----------
async function summary(db) {
  const today = todayTW();
  const month = today.slice(0, 7);
  const cases = await all(db, 'SELECT * FROM cases');
  const payments = await all(db, 'SELECT * FROM payments');
  const todos = await all(db, "SELECT id,title,due_date,case_id FROM items WHERE type='todo' AND done=0 ORDER BY due_date IS NULL, due_date");
  const alerts = [];
  const push = (level, text, link) => alerts.push({ level, text, link });
  const paidBy = {};
  for (const p of payments) if (p.case_id) paidBy[p.case_id] = (paidBy[p.case_id] || 0) + p.amount;

  for (const c of cases) {
    const link = '#/case/' + c.id;
    const nm = c.code ? `${c.name}（${c.code}）` : c.name;
    const active = c.status === '進行中' || c.status === '潛在';
    if (c.next_date && active) {
      if (c.next_date < today) push('red', `${nm}：「${c.next_action || '下一步'}」已過期（${c.next_date}）`, link);
      else if (c.next_date <= addDays(today, 2)) push('amber', `${nm}：${c.next_date} 要「${c.next_action || '下一步'}」`, link);
    }
    if (c.due_date && c.status === '進行中') {
      const checks = safeChecks(c.checks);
      if (!checks.draft) {
        if (c.due_date < today) push('red', `${nm}：初稿已超過交稿日 ${c.due_date}（遲交要從尾款扣，見合約）`, link);
        else if (c.due_date <= addDays(today, 3)) push('amber', `${nm}：初稿 ${c.due_date} 要交`, link);
      }
    }
    if (c.domain_expiry && c.status !== '取消') {
      if (c.domain_expiry < today) push('red', `${nm}：網址 ${c.domain} 已在 ${c.domain_expiry} 到期`, link);
      else if (c.domain_expiry <= addDays(today, 60)) push('amber', `${nm}：網址 ${c.domain} 將在 ${c.domain_expiry} 到期，先 LINE 通知客人付款再續約`, link);
    }
    if (c.warranty_end && c.warranty_end >= addDays(today, -1) && c.warranty_end <= addDays(today, 7)) {
      push('amber', `${nm}：免費保固 ${c.warranty_end} 到期，可提醒客人`, link);
    }
    if (c.status === '進行中' && c.updated_at && c.updated_at.slice(0, 10) <= addDays(today, -30)) {
      push('amber', `${nm}：已經 30 天沒有更新（客人 60 天不回可依合約結案）`, link);
    }
    if (c.total > 0 && (paidBy[c.id] || 0) > c.total) {
      push('amber', `${nm}：登記的收款 NT$${paidBy[c.id].toLocaleString()} 比總價 NT$${c.total.toLocaleString()} 多，請檢查有沒有登記錯`, link);
    }
    if (c.status === '已結案' && c.total > 0 && (paidBy[c.id] || 0) < c.total) {
      push('amber', `${nm}：已結案，但收款只登記 NT$${(paidBy[c.id] || 0).toLocaleString()}／總價 NT$${c.total.toLocaleString()}，請補登收款`, link);
    }
  }
  for (const p of payments) {
    if (!p.receipt) {
      const late = p.date <= addDays(today, -3);
      push(late ? 'red' : 'amber', `${p.date} 收的 NT$${p.amount.toLocaleString()} 還沒開收據${late ? '（已超過 3 天）' : ''}`, '#/money');
    }
  }
  for (const t of todos) {
    if (t.due_date && t.due_date < today) push('red', `待辦過期：${t.title}（${t.due_date}）`, '#/item/' + t.id);
    else if (t.due_date && t.due_date <= addDays(today, 2)) push('amber', `待辦：${t.title}（${t.due_date}）`, '#/item/' + t.id);
  }
  const monthIncome = payments.filter((p) => p.date.startsWith(month)).reduce((s, p) => s + p.amount, 0);
  if (monthIncome >= INCOME_LIMIT) push('red', `本月收入 NT$${monthIncome.toLocaleString()} 已達 NT$50,000，請先打國稅局 0800-000-321 問稅籍登記（不是稅務建議）`, '#/money');
  else if (monthIncome >= INCOME_WARN) push('amber', `本月收入 NT$${monthIncome.toLocaleString()}，接近 NT$50,000，先問國稅局再接下一筆`, '#/money');

  const order = { red: 0, amber: 1 };
  alerts.sort((a, b) => order[a.level] - order[b.level]);
  const counts = (await db.prepare(
    "SELECT SUM(kind='project') AS project, SUM(kind='daily') AS daily, SUM(type='prompt') AS prompt, COUNT(*) AS total FROM items",
  ).first()) || {};
  return {
    today, month, monthIncome, alerts,
    openTodos: todos.length,
    activeCases: cases.filter((c) => c.status === '進行中').length,
    counts,
  };
}
function safeChecks(s) { try { return JSON.parse(s || '{}') || {}; } catch { return {}; } }

// ---------- 路由 ----------
export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const path = (params.path || []).join('/');
  const method = request.method;

  if (!env.DB) return fail('資料庫還沒接上（DB）。請看使用教學的「部署」段落。', 503);

  // 寫入類的請求一定要帶這個標頭，擋掉別的網站偷送表單
  if (method !== 'GET' && request.headers.get('X-Requested-With') !== 'liudeng') return fail('不允許的請求', 403);

  const body = method === 'GET' || method === 'DELETE' ? {} : await request.json().catch(() => ({}));

  if (path === 'login' && method === 'POST') {
    const r = await login(request, env, body.password);
    return r.ok ? json({ ok: true }, 200, { 'Set-Cookie': r.cookie }) : fail(r.error, r.status);
  }
  if (path === 'logout' && method === 'POST') return json({ ok: true }, 200, { 'Set-Cookie': logoutCookie() });
  if (path === 'me') {
    return json({
      loggedIn: await isLoggedIn(request, env),
      passwordSet: passwordConfigured(env),
    });
  }

  if (!(await isLoggedIn(request, env))) return fail('請先登入', 401);
  const db = env.DB;
  const [res, id] = path.split('/');

  try {
    switch (res) {
      case 'meta':
        return json({ ...meta(), ai: aiConfigured(env), model: MODEL, maxInput: MAX_INPUT_CHARS });

      case 'summary':
        return json(await summary(db));

      // 丟進來：AI 分類後直接存，回傳存好的資料（Ben 選 3C）
      case 'inbox': {
        if (method !== 'POST') break;
        const text = str(body.text, MAX_INPUT_CHARS + 1).trim();
        if (!text) return fail('請先貼上內容');
        if (text.length > MAX_INPUT_CHARS) return fail(`內容超過 ${MAX_INPUT_CHARS.toLocaleString()} 字，請分成幾段再丟。`);
        const cases = await all(db, "SELECT id,code,name,status FROM cases WHERE status != '取消' ORDER BY updated_at DESC LIMIT 50");
        let guess;
        let aiNote = '';
        if (aiConfigured(env) && !body.manual) {
          try {
            guess = await classify(env, text, cases, todayTW());
          } catch (e) {
            if (!(e instanceof AiError)) throw e;
            aiNote = e.message;
          }
        } else if (!aiConfigured(env)) {
          aiNote = 'AI 還沒開（沒有金鑰），先用手動分類存起來。';
        }
        const firstLine = text.split('\n').find((l) => l.trim()) || '';
        const base = guess || {
          kind: body.kind, category: body.category, stage: body.stage, type: body.type,
          case_id: body.case_id, title: body.title || firstLine.slice(0, 30), summary: '', tags: '', due_date: null, ai_reason: '',
        };
        const t = now();
        const row = { id: uid(), created_at: t, updated_at: t, ...cleanItem({ ...base, body: text, source: guess ? 'ai' : 'manual' }) };
        await insert(db, 'items', row);
        return json({ item: row, ai: !!guess, aiNote, usage: guess?.usage || null });
      }

      case 'items': {
        if (method === 'GET' && !id) {
          const where = [];
          const args = [];
          for (const k of ['kind', 'category', 'stage', 'type', 'case_id']) {
            const v = url.searchParams.get(k);
            if (v) { where.push(`${k}=?`); args.push(v); }
          }
          const q = url.searchParams.get('q');
          if (q) {
            where.push('(title LIKE ? OR summary LIKE ? OR body LIKE ? OR tags LIKE ?)');
            const like = `%${q.replace(/[%_]/g, '')}%`;
            args.push(like, like, like, like);
          }
          if (url.searchParams.get('open') === '1') where.push('done=0');
          const sql = `SELECT * FROM items ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT 500`;
          return json({ items: await all(db, sql, ...args) });
        }
        if (method === 'GET') {
          const it = await db.prepare('SELECT * FROM items WHERE id=?').bind(id).first();
          return it ? json({ item: it }) : fail('找不到', 404);
        }
        if (method === 'POST' && !id) {
          const t = now();
          const row = { id: uid(), created_at: t, updated_at: t, ...cleanItem(body) };
          await insert(db, 'items', row);
          return json({ item: row });
        }
        if (method === 'PATCH' && id) {
          const old = await db.prepare('SELECT * FROM items WHERE id=?').bind(id).first();
          if (!old) return fail('找不到', 404);
          const row = { ...cleanItem(body, old), updated_at: now() };
          await update(db, 'items', id, row);
          return json({ item: { ...old, ...row } });
        }
        if (method === 'DELETE' && id) {
          await db.prepare('DELETE FROM items WHERE id=?').bind(id).run();
          return json({ ok: true });
        }
        break;
      }

      case 'cases': {
        if (method === 'GET' && !id) {
          const cases = await all(db, 'SELECT * FROM cases ORDER BY CASE status WHEN \'進行中\' THEN 0 WHEN \'潛在\' THEN 1 WHEN \'暫停\' THEN 2 ELSE 3 END, updated_at DESC');
          const paid = await all(db, 'SELECT case_id, SUM(amount) AS paid FROM payments GROUP BY case_id');
          const map = Object.fromEntries(paid.map((p) => [p.case_id, p.paid]));
          return json({ cases: cases.map((c) => ({ ...c, paid: map[c.id] || 0 })) });
        }
        if (method === 'GET') {
          const c = await db.prepare('SELECT * FROM cases WHERE id=?').bind(id).first();
          if (!c) return fail('找不到', 404);
          const items = await all(db, 'SELECT * FROM items WHERE case_id=? ORDER BY created_at DESC', id);
          const payments = await all(db, 'SELECT * FROM payments WHERE case_id=? ORDER BY date', id);
          return json({ case: c, items, payments });
        }
        if (method === 'POST' && !id) {
          const t = now();
          const row = { id: uid(), created_at: t, updated_at: t, ...cleanCase(body) };
          await insert(db, 'cases', row);
          return json({ case: row });
        }
        if (method === 'PATCH' && id) {
          const old = await db.prepare('SELECT * FROM cases WHERE id=?').bind(id).first();
          if (!old) return fail('找不到', 404);
          const row = { ...cleanCase(body, old), updated_at: now() };
          await update(db, 'cases', id, row);
          return json({ case: { ...old, ...row } });
        }
        if (method === 'DELETE' && id) {
          await db.batch([
            db.prepare('DELETE FROM cases WHERE id=?').bind(id),
            db.prepare('UPDATE items SET case_id=NULL WHERE case_id=?').bind(id),
            db.prepare('UPDATE payments SET case_id=NULL WHERE case_id=?').bind(id),
          ]);
          return json({ ok: true });
        }
        break;
      }

      case 'payments': {
        if (method === 'GET') {
          return json({ payments: await all(db, 'SELECT p.*, c.name AS case_name FROM payments p LEFT JOIN cases c ON c.id=p.case_id ORDER BY p.date DESC') });
        }
        if (method === 'POST' && !id) {
          const p = cleanPayment(body);
          if (!p.date) return fail('請填收款日期');
          if (p.amount <= 0) return fail('金額要大於 0');
          const row = { id: uid(), created_at: now(), ...p };
          await insert(db, 'payments', row);
          return json({ payment: row });
        }
        if (method === 'PATCH' && id) {
          const old = await db.prepare('SELECT * FROM payments WHERE id=?').bind(id).first();
          if (!old) return fail('找不到', 404);
          const p = cleanPayment({ ...old, ...body });
          if (!p.date || p.amount <= 0) return fail('日期或金額不對');
          await update(db, 'payments', id, p);
          return json({ payment: { ...old, ...p } });
        }
        if (method === 'DELETE' && id) {
          await db.prepare('DELETE FROM payments WHERE id=?').bind(id).run();
          return json({ ok: true });
        }
        break;
      }

      // 備份：下載全部資料
      case 'export': {
        const data = {
          app: 'liudeng-agent', version: 1, exported_at: now(),
          cases: await all(db, 'SELECT * FROM cases'),
          items: await all(db, 'SELECT * FROM items'),
          payments: await all(db, 'SELECT * FROM payments'),
        };
        return new Response(JSON.stringify(data, null, 2), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Disposition': `attachment; filename="liudeng-backup-${todayTW()}.json"`,
            'Cache-Control': 'no-store',
          },
        });
      }

      // 匯入：同一個 id 會更新，新的會新增；不會刪掉任何資料
      case 'import': {
        if (method !== 'POST') break;
        if (body.app !== 'liudeng-agent') return fail('這不是資料管家的備份檔');
        let n = { cases: 0, items: 0, payments: 0 };
        for (const c of body.cases || []) {
          if (!c.id) continue;
          await upsert(db, 'cases', { id: str(c.id, 64), created_at: c.created_at || now(), updated_at: c.updated_at || now(), ...cleanCase(c) });
          n.cases++;
        }
        for (const it of body.items || []) {
          if (!it.id) continue;
          await upsert(db, 'items', { id: str(it.id, 64), created_at: it.created_at || now(), updated_at: it.updated_at || now(), ...cleanItem(it) });
          n.items++;
        }
        for (const p of body.payments || []) {
          const clean = cleanPayment(p);
          if (!p.id || !clean.date || clean.amount <= 0) continue;
          await upsert(db, 'payments', { id: str(p.id, 64), created_at: p.created_at || now(), ...clean });
          n.payments++;
        }
        return json({ ok: true, imported: n });
      }
    }
  } catch (e) {
    return fail('系統出錯：' + (e && e.message ? e.message : '未知錯誤'), 500);
  }
  return fail('找不到這個功能', 404);
}
