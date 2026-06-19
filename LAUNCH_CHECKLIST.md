# 本番公開前チェックリスト

最終確認日: 2026-06-18

## 1. npm audit
- 検出: 4件（low 1 / moderate 3）— `js-yaml`(low), `postcss <8.5.10`(moderate, CSS出力XSS), 依存する`next`
- postcss脆弱性は**ビルド時ツール**のもので実行時に露出しない（実害低）
- [ ] `npm audit fix` を実行（非破壊。js-yamlのみ解消）
- [ ] ⚠️ `npm audit fix --force` は使わない（next@9.3.3へダウングレードする破壊的変更）

## 2. セキュリティHTTPヘッダ（next.config.ts）
対応済み。本番で以下が全パスに付与される:
- [x] Content-Security-Policy（dev時のみ unsafe-eval / ws を許可、本番は除外）
- [x] Strict-Transport-Security (HSTS, preload)
- [x] X-Frame-Options: DENY / frame-ancestors 'none'
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy / Permissions-Policy
- [ ] 公開後 securityheaders.com 等で実機確認

## 3. CONTACTフォーム本送信
- 実装済み: バリデーション + ボット判定 + Resend/Webhook/console の3モード
- ⚠️ **現状 .env.local には CONTACT_* が未設定 → console出力のみ（実送信されない）**
- [ ] 本番envに以下のどちらかを設定:
  - `CONTACT_RESEND_API_KEY` + `CONTACT_TO_EMAIL`（+任意 `CONTACT_FROM_EMAIL`）
  - または `CONTACT_WEBHOOK_URL`
- [ ] 本番環境で実際に送信テスト（受信確認）

## 4. APIキーの露出（NEXT_PUBLIC）
- [x] ソース内に `NEXT_PUBLIC` 変数なし
- [x] `MICROCMS_API_KEY` / `CONTACT_*` は全てサーバー側のみ（クライアントに出ない）

## 5. env管理
- [x] `.env.local` は .gitignore 対象（`.env*`）でコミットされていない
- [x] `.env.local.example` に必要キーを記載済み
- [ ] 本番ホスティング側に環境変数を登録（MICROCMS_* / CONTACT_*）

## 6. ダミー情報の差し替え（data/siteConfig.ts）
- [ ] `info.email: "info@example.com"` → 実メールアドレス
- [ ] `social` のリンク（twitter/instagram/youtube が空ドメイン）→ 実URL or 空文字
- 補足: components/sections/Contact.tsx の `株式会社〇〇` / `info@example.com` は入力欄プレースホルダーのため変更不要
