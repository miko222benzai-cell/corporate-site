// ──────────────────────────────────────────────────────────
// 問い合わせフォーム：共通の型・バリデーション
// クライアント / API Route の両方から import される
// ──────────────────────────────────────────────────────────

export const INQUIRY_TYPES = [
  "サービス相談",
  "見積もり",
  "採用応募",
  "タレント出演依頼",
  "その他",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  inquiryType: InquiryType | "";
  message: string;
  /** honeypot：ボットだけが値を入れる隠しフィールド */
  website?: string;
  /** フォーム表示〜送信までの経過ms。3秒未満ならボット扱い */
  elapsedMs?: number;
}

export type ContactErrors = Partial<
  Record<"name" | "email" | "inquiryType" | "message" | "form", string>
>;

// 上限文字数（DoSと不正データ防止）
const MAX = {
  name: 100,
  company: 100,
  email: 254,
  phone: 30,
  message: 5000,
} as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: ContactPayload): ContactErrors {
  const e: ContactErrors = {};

  if (!data.name?.trim()) e.name = "お名前を入力してください";
  else if (data.name.length > MAX.name) e.name = `お名前は${MAX.name}文字以内で入力してください`;

  if (!data.email?.trim()) e.email = "メールアドレスを入力してください";
  else if (data.email.length > MAX.email) e.email = "メールアドレスが長すぎます";
  else if (!emailRe.test(data.email)) e.email = "正しいメールアドレスを入力してください";

  if (!data.inquiryType) e.inquiryType = "お問い合わせ種別を選択してください";
  else if (!(INQUIRY_TYPES as readonly string[]).includes(data.inquiryType))
    e.inquiryType = "正しい種別を選択してください";

  if (!data.message?.trim()) e.message = "お問い合わせ内容を入力してください";
  else if (data.message.length > MAX.message)
    e.message = `お問い合わせ内容は${MAX.message}文字以内で入力してください`;

  // 任意フィールドは上限チェックのみ
  if (data.company && data.company.length > MAX.company) e.form = "会社名が長すぎます";
  if (data.phone && data.phone.length > MAX.phone) e.form = "電話番号が長すぎます";

  return e;
}

/** ボット判定。true ならスパム扱いで黙って 200 を返す。 */
export function isLikelyBot(data: ContactPayload): boolean {
  if (data.website && data.website.length > 0) return true;
  if (typeof data.elapsedMs === "number" && data.elapsedMs < 3000) return true;
  return false;
}
