# Crazy株式会社 コーポレートサイト

Next.js (App Router) + Tailwind CSS + microCMS で構築されたコーポレートサイト。

## 開発

```bash
npm install
cp .env.local.example .env.local   # ← 値を入れる（下記microCMSセクション参照）
npm run dev
```

http://localhost:3000 を開く。

## 本番ビルド

```bash
npm run build
npm start
```

---

## microCMS セットアップ

NEWSは [microCMS](https://microcms.io) で管理しています。新しいサービスや別環境にセットアップする場合は以下の手順で。

### 1. microCMS サービスを作成

1. https://microcms.io にサインアップ
2. 「サービスを作成」→ サービスID（例: `crazy-inc`）を決める
   - 管理画面URLは `https://crazy-inc.microcms.io` となる
   - この `crazy-inc` の部分が `MICROCMS_SERVICE_DOMAIN`

### 2. NEWS の API（エンドポイント）を作成

管理画面 → 「API」→「APIを作成」

| 項目 | 値 |
|---|---|
| API名 | NEWS |
| **エンドポイント** | **`news`**（小文字）※コードがこの名前を参照しています |
| API の型 | **リスト形式** |

### 3. NEWS の API スキーマ（フィールド）を設定

「API スキーマ」タブで以下のフィールドを追加してください。**フィールドID（英語名）は完全一致にしてください**（コードがこの名前で参照します）。

| フィールドID | 表示名 | 種類 | 必須 | 補足 |
|---|---|---|---|---|
| `slug` | スラッグ | テキストフィールド | ✓ | URL用。半角英数字とハイフン。重複不可（管理画面では「重複を許可しない」をON） |
| `title` | タイトル | テキストフィールド | ✓ | |
| `category` | カテゴリ | セレクトフィールド | ✓ | 選択肢: `お知らせ` / `プレスリリース` / `メディア掲載` / `イベント`<br>「複数選択可」はOFF推奨（ON可・先頭1件を表示） |
| `excerpt` | 抜粋 | テキストエリア | | 一覧やTOPに表示する短い説明（1〜2行） |
| `body` | 本文 | **リッチエディタ** | ✓ | HTMLで保存される。見出し・リンク・画像挿入OK |
| `eyecatch` | アイキャッチ | 画像 | | 任意。一覧と詳細ヘッダーに表示される |

> **重要：** `body` フィールドは必ず「リッチエディタ」を選んでください。「テキストエリア」だと改行がHTMLとして反映されません。

「投稿日」は microCMS が自動で `publishedAt` として持つので、フィールド追加は不要です。

### 4. APIキーを取得

管理画面 → 「サービス設定」→「APIキー」

- **デフォルトキー**で十分。`GET` 権限があればOK
- 下書きプレビューも使うなら「GET（下書き含む）」も有効に
- このキーが `MICROCMS_API_KEY`

### 5. 環境変数を設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集:

```env
MICROCMS_SERVICE_DOMAIN=crazy-inc
MICROCMS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**注意:** 値に `NEXT_PUBLIC_` プレフィックスは付けない（ブラウザに漏れます）。

Vercel 等にデプロイする場合は、同じ環境変数をデプロイ先のプロジェクト設定にも登録してください。

### 6. 最初の記事を投稿

管理画面 → NEWS → 「+ 追加」
- slug: `welcome` のように適当な英数字
- title・category・excerpt・body を埋める
- 「公開する」ボタン

http://localhost:3000/news で一覧に出ること、http://localhost:3000/news/welcome で詳細が出ることを確認。

---

## 下書きプレビュー

microCMS の「画面プレビュー」機能で下書き内容を確認できます。

### microCMS 側の設定

管理画面 → NEWS の「API設定」→「画面プレビュー設定」

```
https://{デプロイ先ドメイン}/news/{CONTENT_ID}?draftKey={DRAFT_KEY}
```

ローカル確認用:
```
http://localhost:3000/news/{CONTENT_ID}?draftKey={DRAFT_KEY}
```

`{CONTENT_ID}` と `{DRAFT_KEY}` はテンプレ変数なのでそのまま貼り付けてください（microCMSが置換します）。

### 動作

- `?draftKey=xxx` 付きでアクセスすると、下書き状態の記事も取得・表示されます
- プレビュー時は画面上部に「PREVIEW MODE」バーが表示されます
- プレビューページは `noindex` で検索エンジンに乗りません

---

## キャッシュと再検証（ISR）

すべての NEWS ページは **60秒の ISR** で配信されます。

| ページ | 再検証 |
|---|---|
| `/` のNEWSセクション | 60秒 |
| `/news` 一覧 | 60秒 |
| `/news/[slug]` 詳細 | 60秒 |

更新後すぐに反映したい場合は、microCMS の Webhook で `/api/revalidate?tag=news&secret=...` を叩く構成も可能です（コードに同エンドポイントを足す必要あり）。

---

## ディレクトリ構成

```
app/
  page.tsx              # TOP（NEWS最新3件をサーバーで取得して表示）
  news/
    page.tsx            # NEWS 一覧
    [slug]/page.tsx     # NEWS 詳細
  recruit/page.tsx
  services/[slug]/page.tsx
  layout.tsx
  globals.css

components/
  sections/             # トップページ各セクション
  Navigation.tsx
  Footer.tsx
  ...

data/
  jobs.ts               # 採用情報（静的データ）
  services.ts           # サービス一覧（静的データ）
  serviceDetails.ts
  siteConfig.ts
  talent.ts
  team.ts

lib/
  microcms.ts           # microCMS クライアントとNEWS取得関数 ★

next.config.ts          # セキュリティHTTPヘッダ + 画像配信ドメイン許可
```

---

## セキュリティ

- CSP / HSTS / X-Frame-Options など主要ヘッダは `next.config.ts` で設定済み
- microCMS の APIキーは `MICROCMS_API_KEY`（サーバー専用）に隔離
- `next/image` のリモートホストは microCMS の `images.microcms-assets.io` のみ許可
- 詳細は監査メモを参照（過去のセキュリティレポート）
