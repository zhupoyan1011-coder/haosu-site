// AI 分類：把 Ben 丟進來的一段文字，判斷是「專案」還是「日常問答」，並歸類。
// 用 Anthropic 官方 SDK；金鑰只從 Cloudflare 的密鑰 ANTHROPIC_API_KEY 讀，程式裡沒有金鑰。

import Anthropic from '@anthropic-ai/sdk';
import { KINDS, CATEGORIES, STAGES, TYPES, keys } from './meta.js';

export const MODEL = 'claude-opus-5-5';
export const MAX_INPUT_CHARS = 20000;

export function aiConfigured(env) {
  return typeof env.ANTHROPIC_API_KEY === 'string' && env.ANTHROPIC_API_KEY.length > 10;
}

const list = (arr) => arr.map((x) => `- ${x.key}：${x.label}${x.hint ? `（${x.hint}）` : ''}`).join('\n');

const SYSTEM = `你是「留燈設計工作室」的資料管家。留燈是 Ben 一個人經營的民宿官網工作室。
Ben 會丟給你一段文字：可能是他問 Claude 的問題、一段 prompt（給 Claude 的指令）、客人的 LINE 訊息、筆記、待辦或決定。
你的工作是幫這段文字歸類，讓 Ben 以後找得到。只歸類，不回答文字裡的問題，也不改寫原文的意思。

判斷「專案」或「日常問答」的規則：
- 有特定客人或民宿、有要交出去的東西、或有期限 → project（專案）
- 其他（一般問題、學習、想法、跟留燈無關的事）→ daily（日常問答）

kind 只能是：
${list(KINDS)}

category（大類）只能是：
${list(CATEGORIES)}

stage（做網站的哪個階段）只能是：
${list(STAGES)}
跟做網站流程無關時用 none。

type（這段文字是什麼）只能是：
${list(TYPES)}
文字是要貼給 Claude 執行的指令時，type 用 prompt。

其他欄位：
- case_code：文字明顯屬於下面「目前案件」的某一件時，填那件的 id；看不出來就填空字串。不要猜。
- title：20 個字以內的標題，用繁體中文。
- summary：60 個字以內的重點，用繁體中文，白話。
- tags：最多 5 個短關鍵字。
- due_date：文字裡有明確日期期限時填 YYYY-MM-DD，沒有就填空字串。不要自己推算沒寫的日期。
- reason：一句話說明你為什麼這樣分，讓 Ben 看得懂。`;

const SCHEMA = {
  type: 'object',
  properties: {
    kind: { type: 'string', enum: keys(KINDS) },
    category: { type: 'string', enum: keys(CATEGORIES) },
    stage: { type: 'string', enum: keys(STAGES) },
    type: { type: 'string', enum: keys(TYPES) },
    case_code: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    due_date: { type: 'string' },
    reason: { type: 'string' },
  },
  required: ['kind', 'category', 'stage', 'type', 'case_code', 'title', 'summary', 'tags', 'due_date', 'reason'],
  additionalProperties: false,
};

export class AiError extends Error {}

export async function classify(env, text, cases, today) {
  const client = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
    ...(env.ANTHROPIC_BASE_URL ? { baseURL: env.ANTHROPIC_BASE_URL } : {}),
    maxRetries: 2,
    timeout: 60_000,
  });
  const caseList = cases.length
    ? cases.map((c) => `- id=${c.id}｜${c.code || '無編號'}｜${c.name}｜${c.status}`).join('\n')
    : '（目前沒有案件）';

  let res;
  try {
    res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: `今天是 ${today}。\n\n目前案件：\n${caseList}\n\n要歸類的文字：\n<text>\n${text}\n</text>`,
      }],
    });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) throw new AiError('AI 金鑰無效，請檢查 GitHub Secrets 的 ANTHROPIC_API_KEY。');
    if (err instanceof Anthropic.PermissionDeniedError) throw new AiError('AI 帳號沒有權限，可能是還沒儲值。');
    if (err instanceof Anthropic.RateLimitError) throw new AiError('AI 暫時太忙或額度用完，請稍後再試。');
    if (err instanceof Anthropic.APIConnectionError) throw new AiError('連不上 AI，請稍後再試。');
    if (err instanceof Anthropic.APIError) throw new AiError(`AI 回傳錯誤（${err.status}），請稍後再試。`);
    throw err;
  }

  if (res.stop_reason === 'refusal') throw new AiError('AI 拒絕處理這段文字，請改用手動分類。');
  if (res.stop_reason === 'max_tokens') throw new AiError('AI 回覆被截斷，請改用手動分類。');
  const textBlock = res.content.find((b) => b.type === 'text');
  if (!textBlock) throw new AiError('AI 沒有回覆內容，請改用手動分類。');
  let out;
  try {
    out = JSON.parse(textBlock.text);
  } catch {
    throw new AiError('AI 回覆格式不對，請改用手動分類。');
  }
  const validCase = cases.some((c) => c.id === out.case_code);
  return {
    kind: out.kind,
    category: out.category,
    stage: out.stage,
    type: out.type,
    case_id: validCase ? out.case_code : null,
    title: String(out.title || '').slice(0, 80),
    summary: String(out.summary || '').slice(0, 300),
    tags: (out.tags || []).slice(0, 5).map((t) => String(t).slice(0, 20)).join(','),
    due_date: /^\d{4}-\d{2}-\d{2}$/.test(out.due_date) ? out.due_date : null,
    ai_reason: String(out.reason || '').slice(0, 300),
    usage: res.usage ? { input: res.usage.input_tokens, output: res.usage.output_tokens } : null,
  };
}
