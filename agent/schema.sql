-- 留燈資料管家資料庫（Cloudflare D1）。每次部署都會執行一次，所以只用 IF NOT EXISTS，不會刪資料。

CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'daily',
  category TEXT NOT NULL DEFAULT 'other',
  stage TEXT NOT NULL DEFAULT 'none',
  type TEXT NOT NULL DEFAULT 'note',
  case_id TEXT,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '',
  due_date TEXT,
  done INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manual',
  ai_reason TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS items_kind ON items(kind, category, stage);
CREATE INDEX IF NOT EXISTS items_case ON items(case_id);

CREATE TABLE IF NOT EXISTS cases (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  code TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  contact TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '潛在',
  plan TEXT NOT NULL DEFAULT '半客製',
  total INTEGER NOT NULL DEFAULT 0,
  rush INTEGER NOT NULL DEFAULT 0,
  start_date TEXT,
  due_date TEXT,
  next_action TEXT NOT NULL DEFAULT '',
  next_date TEXT,
  domain TEXT NOT NULL DEFAULT '',
  domain_registrant TEXT NOT NULL DEFAULT '',
  domain_expiry TEXT,
  warranty_end TEXT,
  portfolio TEXT NOT NULL DEFAULT '未問',
  folder TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  checks TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  case_id TEXT,
  date TEXT NOT NULL,
  amount INTEGER NOT NULL,
  kind TEXT NOT NULL DEFAULT '其他',
  receipt INTEGER NOT NULL DEFAULT 0,
  note TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS payments_date ON payments(date);

CREATE TABLE IF NOT EXISTS login_fail (
  ip TEXT NOT NULL,
  ts INTEGER NOT NULL
);
