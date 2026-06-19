// ──────────────────────────────────────────────────────────
// microCMS クライアントと NEWS 取得関数
// ──────────────────────────────────────────────────────────
// 環境変数（.env.local）に以下を設定してください:
//   MICROCMS_SERVICE_DOMAIN=your-service       (xxx.microcms.io の xxx 部分のみ。URLは入れない)
//   MICROCMS_API_KEY=xxxxxxxxxxxxxxxx          (APIキー)
//
// セットアップ手順は README.md を参照してください。
// ──────────────────────────────────────────────────────────

import {
  createClient,
  type MicroCMSContentId,
  type MicroCMSDate,
  type MicroCMSImage,
  type MicroCMSQueries,
} from "microcms-js-sdk";

// ──────────────────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────────────────

export type NewsCategory =
  | "お知らせ"
  | "プレスリリース"
  | "メディア掲載"
  | "イベント";

export interface NewsFields {
  slug: string;
  title: string;
  category: NewsCategory[];
  excerpt: string;
  body: string;
  /** アイキャッチ画像（任意）。microCMSのフィールドID: image */
  image?: MicroCMSImage;
}

export type NewsItem = NewsFields & MicroCMSContentId & MicroCMSDate;

// ──────────────────────────────────────────────────────────
// 環境変数のバリデーション
// ──────────────────────────────────────────────────────────

const ENDPOINT = "news";

const rawServiceDomain = process.env.MICROCMS_SERVICE_DOMAIN ?? "";
const rawApiKey = process.env.MICROCMS_API_KEY ?? "";

/** よくある間違いを検出して分かりやすい指示を返す */
function diagnoseServiceDomain(value: string): string | null {
  if (!value) return "MICROCMS_SERVICE_DOMAIN が空です";
  if (value.includes("://"))
    return `MICROCMS_SERVICE_DOMAIN にURLが入っています ("${value}"). サブドメイン部分のみ（例: "crazy-inc"）を指定してください。`;
  if (value.includes("."))
    return `MICROCMS_SERVICE_DOMAIN に "." が含まれています ("${value}"). サブドメイン部分のみ（".microcms.io" 抜き）を指定してください。`;
  if (value.includes("/"))
    return `MICROCMS_SERVICE_DOMAIN に "/" が含まれています ("${value}"). サブドメイン部分のみを指定してください。`;
  if (!/^[a-z0-9-]+$/i.test(value))
    return `MICROCMS_SERVICE_DOMAIN は半角英数字とハイフンのみ使えます。現在の値: "${value}"`;
  return null;
}

const serviceDomainError = diagnoseServiceDomain(rawServiceDomain);
const apiKeyError = !rawApiKey ? "MICROCMS_API_KEY が空です" : null;

/** クライアント未初期化フラグ。初期化に失敗していても import 自体は成功させる */
const microcmsConfigError = serviceDomainError || apiKeyError;

// 診断ログはサーバー側のみで出す（クライアントへの import で混入しないよう）
if (microcmsConfigError && typeof window === "undefined") {
  console.error(`[microcms] 設定エラー: ${microcmsConfigError}`);
  console.error(
    "[microcms] .env.local を確認してください（READMEのmicroCMSセットアップ手順参照）"
  );
}

const client = microcmsConfigError
  ? null
  : createClient({
      serviceDomain: rawServiceDomain,
      apiKey: rawApiKey,
    });

/** 診断用：このプロセスが実際に叩こうとしている base URL */
export const microcmsBaseUrl = microcmsConfigError
  ? null
  : `https://${rawServiceDomain}.microcms.io/api/v1/${ENDPOINT}`;

// 起動時に1度だけ接続先を出力（運用時の問題切り分け用、サーバー側のみ）
if (typeof window === "undefined" && !microcmsConfigError) {
  console.info(`[microcms] base URL: ${microcmsBaseUrl}`);
}

// ──────────────────────────────────────────────────────────
// 再検証戦略（ISR）
// ──────────────────────────────────────────────────────────
const NEWS_REVALIDATE_SECONDS = 60;
const NEWS_TAG = "news";

const defaultRequestInit = {
  next: { revalidate: NEWS_REVALIDATE_SECONDS, tags: [NEWS_TAG] },
};

// ──────────────────────────────────────────────────────────
// 共通エラーハンドラ
// ──────────────────────────────────────────────────────────
function logMicrocmsError(opName: string, queries: unknown, error: unknown) {
  const url = microcmsBaseUrl ?? "(未設定)";
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    [
      `[microcms] ${opName} 失敗`,
      `  URL: ${url}`,
      `  queries: ${JSON.stringify(queries)}`,
      `  error: ${message}`,
    ].join("\n")
  );
  // microcms-js-sdk のエラーは "fetch API response status: 401 message is `..." 形式で
  // ステータスと本文を含むので、追加で構造化して出す
  if (error instanceof Error) {
    const m = error.message.match(/status:\s*(\d+)/);
    if (m) console.error(`  → HTTP status: ${m[1]}`);
    const body = error.message.match(/message is `([^`]+)`/);
    if (body) console.error(`  → response body: ${body[1]}`);
    if (error.cause) console.error("  → cause:", error.cause);
  }
}

// ──────────────────────────────────────────────────────────
// 取得関数（すべて失敗時はフォールバック値を返してサイト全体を落とさない）
// ──────────────────────────────────────────────────────────

const EMPTY_LIST = {
  contents: [] as NewsItem[],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

/** 一覧を取得（公開済みのみ）。新しい順。失敗時は空リスト。 */
export async function getNewsList(queries?: MicroCMSQueries) {
  if (!client) return EMPTY_LIST;
  try {
    return await client.getList<NewsFields>({
      endpoint: ENDPOINT,
      queries: {
        orders: "-publishedAt",
        limit: 100,
        ...queries,
      },
      customRequestInit: defaultRequestInit,
    });
  } catch (error) {
    logMicrocmsError("getNewsList", queries, error);
    return EMPTY_LIST;
  }
}

/** TOPページ用：最新 n 件。失敗時は空配列。 */
export async function getLatestNews(limit: number): Promise<NewsItem[]> {
  const res = await getNewsList({ limit, orders: "-publishedAt" });
  return res.contents;
}

/** 全件取得（generateStaticParams 用）。失敗時は空配列。 */
export async function getAllNews(): Promise<NewsItem[]> {
  if (!client) return [];
  try {
    return await client.getAllContents<NewsFields>({
      endpoint: ENDPOINT,
      queries: { orders: "-publishedAt" },
      customRequestInit: defaultRequestInit,
    });
  } catch (error) {
    logMicrocmsError("getAllNews", {}, error);
    return [];
  }
}

/**
 * slug から該当する1件を取得。
 * draftKey が指定されている場合は下書きを含めて取得（キャッシュなし）。
 * 失敗時は null。
 */
export async function getNewsBySlug(
  slug: string,
  draftKey?: string
): Promise<NewsItem | null> {
  if (!client) return null;
  const queries: MicroCMSQueries = {
    filters: `slug[equals]${slug}`,
    limit: 1,
    ...(draftKey ? { draftKey } : {}),
  };
  const requestInit = draftKey
    ? { cache: "no-store" as RequestCache }
    : defaultRequestInit;
  try {
    const res = await client.getList<NewsFields>({
      endpoint: ENDPOINT,
      queries,
      customRequestInit: requestInit,
    });
    return res.contents[0] ?? null;
  } catch (error) {
    logMicrocmsError("getNewsBySlug", queries, error);
    return null;
  }
}

/**
 * microCMS の content ID から取得（プレビューURL用フォールバック）。
 * 失敗時は null。
 */
export async function getNewsById(
  contentId: string,
  draftKey?: string
): Promise<NewsItem | null> {
  if (!client) return null;
  const queries: MicroCMSQueries | undefined = draftKey
    ? { draftKey }
    : undefined;
  try {
    return await client.getListDetail<NewsFields>({
      endpoint: ENDPOINT,
      contentId,
      queries,
      customRequestInit: draftKey
        ? { cache: "no-store" as RequestCache }
        : defaultRequestInit,
    });
  } catch (error) {
    logMicrocmsError(`getNewsById(${contentId})`, queries, error);
    return null;
  }
}

/**
 * 詳細ページ用：URLセグメントから記事を解決する。
 * slug で一致すればそれを返し、無ければ microCMS の content ID として再検索する。
 * これにより slug 未設定の記事も `/news/{id}` で表示できる。
 */
export async function getNewsDetail(
  slugOrId: string,
  draftKey?: string
): Promise<NewsItem | null> {
  const bySlug = await getNewsBySlug(slugOrId, draftKey);
  if (bySlug) return bySlug;
  return getNewsById(slugOrId, draftKey);
}

// ──────────────────────────────────────────────────────────
// 表示用ユーティリティ
// ──────────────────────────────────────────────────────────

/** 一覧から詳細ページへのリンク URL。slug が無ければ content ID にフォールバック。 */
export function newsHref(item: Pick<NewsItem, "slug" | "id">): string {
  const seg = item.slug && item.slug.length > 0 ? item.slug : item.id;
  return `/news/${seg}`;
}

export function formatNewsDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

export function primaryCategory(item: NewsItem): NewsCategory {
  return (item.category?.[0] ?? "お知らせ") as NewsCategory;
}
