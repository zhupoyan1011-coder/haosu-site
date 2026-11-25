// 留燈資料管家：所有分類的唯一來源（前端從 /api/meta 讀同一份）。
// 改分類只改這裡。

export const KINDS = [
  { key: 'project', label: '專案', hint: '有客人、有要交的東西、或有期限' },
  { key: 'daily', label: '日常問答', hint: '一般問題、想法、學習，沒有客人或期限' },
];

// 12 大類，對應「留燈_製作網站大重點分類.pdf」，另加「其他」放跟留燈無關的事。
export const CATEGORIES = [
  { key: 'prep', label: '開張前準備' },
  { key: 'clients', label: '找客人' },
  { key: 'flow', label: '接案流程' },
  { key: 'money', label: '錢' },
  { key: 'legal', label: '合約與法律' },
  { key: 'domain', label: '網域與上線' },
  { key: 'quality', label: '網站製作品質' },
  { key: 'aftercare', label: '售後與續約' },
  { key: 'comms', label: '跟客人溝通' },
  { key: 'security', label: '帳號與安全' },
  { key: 'files', label: '文件與檔案' },
  { key: 'exception', label: '例外狀況' },
  { key: 'other', label: '其他（跟留燈無關）' },
];

// 做網站的順序（Ben 選 4A）。
export const STAGES = [
  { key: 'start', label: '開始', hint: '估價、諮詢、合約、收款、收素材、文案' },
  { key: 'build', label: '製作', hint: '規劃、選範本、建站' },
  { key: 'revise', label: '修改', hint: '交初稿、看稿回覆、改稿' },
  { key: 'debug', label: '錯誤排除', hint: '網站壞掉、跑版、部署失敗、網域沒生效' },
  { key: 'launch', label: '上線', hint: '網域、Cloudflare、驗收、交接' },
  { key: 'maintain', label: '維護', hint: '上線後修改、保固、續約' },
  { key: 'none', label: '不適用' },
];

export const TYPES = [
  { key: 'prompt', label: '指令（Prompt）' },
  { key: 'note', label: '筆記／知識' },
  { key: 'qa', label: '問答' },
  { key: 'todo', label: '待辦' },
  { key: 'message', label: '客人訊息' },
  { key: 'decision', label: '決定事項' },
];

export const CASE_STATUS = ['潛在', '進行中', '暫停', '已結案', '取消'];
export const PLANS = ['半客製', '全客製', '其他'];
export const PAY_KINDS = ['第一期款', '尾款', '一次付清', '加購／修改', '網址代辦', '其他'];

// 接案 6 步，每步的打勾項目，依「留燈接案SOP_一頁版與規則表」。
export const STEPS = [
  { n: 1, label: '聊', checks: [
    ['quote', '估價單編號建立'],
    ['license', '台灣旅宿網查得到登記'],
    ['consult', 'LINE 15 分鐘諮詢'],
  ]},
  { n: 2, label: '簽', checks: [
    ['quote_sent', '報價單傳給客人'],
    ['contract_check', '合約檢查清單對過'],
    ['contract_signed', '合約雙方簽好（簽約人＝登記證經營者）'],
    ['amount_check', '收回後對過金額沒被改'],
    ['deposit', '第一期款入帳'],
    ['receipt1', '3 天內開收據、記收入'],
  ]},
  { n: 3, label: '收', checks: [
    ['pack_sent', '傳資料包＋拍照指南'],
    ['material', '素材到齊（照片有授權）'],
    ['due_told', '告訴客人交稿日'],
  ]},
  { n: 4, label: '做', checks: [
    ['copy', '問答式文案改寫，客人確認'],
    ['progress', '第 7 天傳進度截圖'],
    ['selfcheck', 'iPhone 自驗清單全過'],
    ['draft', '交初稿'],
  ]},
  { n: 5, label: '改', checks: [
    ['rev1', '第 1 次修改完成'],
    ['rev2', '第 2 次修改完成'],
    ['rev3', '第 3 次修改完成'],
    ['domain_buy', '網址申請好'],
    ['icann', 'ICANN 信箱驗證已點'],
    ['ok_launch', '客人回「可以上線」'],
  ]},
  { n: 6, label: '交', checks: [
    ['accepted', '驗收通過'],
    ['final_pay', '尾款入帳（驗收後 7 天內）'],
    ['receipt2', '3 天內開收據、記收入'],
    ['live', '正式上線'],
    ['handover', '交接包（備份、說明、帳號清單）'],
    ['calendar', '日曆加保固與續約提醒'],
    ['feedback', '第 7 天問心得'],
  ]},
];

export const INCOME_WARN = 40000; // 本月收入到這裡先提醒
export const INCOME_LIMIT = 50000; // 規則表：接近前先問國稅局

export function meta() {
  return { KINDS, CATEGORIES, STAGES, TYPES, CASE_STATUS, PLANS, PAY_KINDS, STEPS, INCOME_WARN, INCOME_LIMIT };
}

export const keys = (list) => list.map((x) => x.key);
