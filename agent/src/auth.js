// 登入：只有一組密碼（APP_PASSWORD，放在 GitHub Secrets，由部署流程交給 Cloudflare）。
// 登入後發一張 30 天的簽名 cookie。沒設密碼時一律拒絕，不會變成公開。

const COOKIE = 'ld_s';
const DAYS = 30;
const MAX_FAILS = 8; // 15 分鐘內錯 8 次就暫停登入
const WINDOW_MS = 15 * 60 * 1000;

const enc = new TextEncoder();

function b64url(bytes) {
  let s = '';
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacKey(password) {
  const raw = await crypto.subtle.digest('SHA-256', enc.encode('liudeng-agent|' + password));
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function sign(password, payload) {
  const key = await hmacKey(password);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function readCookie(request, name) {
  const h = request.headers.get('Cookie') || '';
  for (const part of h.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return '';
}

export function passwordConfigured(env) {
  return typeof env.APP_PASSWORD === 'string' && env.APP_PASSWORD.length >= 8;
}

export async function isLoggedIn(request, env) {
  if (!passwordConfigured(env)) return false;
  const c = readCookie(request, COOKIE);
  const [exp, sig] = c.split('.');
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await sign(env.APP_PASSWORD, exp));
}

function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown';
}

export async function login(request, env, password) {
  if (!passwordConfigured(env)) {
    return { ok: false, status: 503, error: '還沒設定登入密碼（GitHub Secrets 的 APP_PASSWORD），請照使用教學第 2 步設定。' };
  }
  const ip = clientIp(request);
  const since = Date.now() - WINDOW_MS;
  await env.DB.prepare('DELETE FROM login_fail WHERE ts < ?').bind(since).run();
  const { n } = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_fail WHERE ip = ?').bind(ip).first();
  if (n >= MAX_FAILS) return { ok: false, status: 429, error: '密碼錯太多次，請 15 分鐘後再試。' };

  const a = await sign(env.APP_PASSWORD, 'pw:' + String(password || ''));
  const b = await sign(env.APP_PASSWORD, 'pw:' + env.APP_PASSWORD);
  if (!safeEqual(a, b)) {
    await env.DB.prepare('INSERT INTO login_fail (ip, ts) VALUES (?, ?)').bind(ip, Date.now()).run();
    return { ok: false, status: 401, error: '密碼不對。' };
  }
  await env.DB.prepare('DELETE FROM login_fail WHERE ip = ?').bind(ip).run();
  const exp = String(Date.now() + DAYS * 864e5);
  const value = exp + '.' + (await sign(env.APP_PASSWORD, exp));
  return {
    ok: true,
    cookie: `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${DAYS * 86400}`,
  };
}

export function logoutCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}
