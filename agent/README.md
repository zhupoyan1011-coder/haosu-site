# 留燈資料管家（agent/）

Ben 自己用的接案與資料管理 app。跟留燈官網完全分開：獨立的 Cloudflare Pages 專案 `liudeng-agent`，資料在 Cloudflare D1 資料庫 `liudeng-agent-db`。

- `public/`：網頁（純 HTML/CSS/JS，不用外部套件）
- `functions/api/[[path]].js`：所有 `/api/*`
- `src/meta.js`：分類（專案／日常、12 大類、6 階段、類型、接案 6 步）唯一來源
- `src/ai.js`：AI 分類（claude-opus-5-5，金鑰只從 Cloudflare 密鑰讀）
- `src/auth.js`：單一密碼登入、30 天簽名 cookie、15 分鐘錯 8 次鎖住
- `schema.sql`：資料表（只有 CREATE IF NOT EXISTS，部署時執行，不會刪資料）
- 部署：`.github/workflows/agent-deploy.yml`，只在 `agent/**` 有改時跑

**個資不進這個 repo**（repo 是公開的）。客人資料只存在 D1；要匯入的資料檔放在專案共用資料夾 `管理app/`，由 Ben 在 app 的「設定 → 匯入」上傳。

本機測試：`npm install`，自己寫一份 wrangler.toml（見 workflow）與 `.dev.vars`（APP_PASSWORD、ANTHROPIC_API_KEY），`npx wrangler d1 execute liudeng-agent-db --local --file schema.sql`，`npx wrangler pages dev public`。
