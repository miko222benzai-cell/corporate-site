// ──────────────────────────────────────────────────────────
// 問い合わせフォーム API Route（POST /api/contact）
// 送信先は環境変数で切り替え：
//   1) CONTACT_RESEND_API_KEY + CONTACT_TO_EMAIL があれば Resend で本送信
//   2) CONTACT_WEBHOOK_URL があれば Webhook(JSON POST) に送信
//   3) どれも無ければ console.log のみ（開発・初期構築時のフォールバック）
// 失敗してもサイトは落とさない。クライアントには ok/ng を返すだけ。
// ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import {
  validateContact,
  isLikelyBot,
  type ContactPayload,
} from "@/lib/contact";

// Resend SDK の代わりに直接 REST API を叩く（依存ゼロ）
const RESEND_ENDPOINT = "https://api.resend.com/emails";

function getDeliveryMode():
  | { type: "resend"; apiKey: string; to: string; from: string }
  | { type: "webhook"; url: string }
  | { type: "console" } {
  const resendKey = process.env.CONTACT_RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (resendKey && toEmail) {
    return {
      type: "resend",
      apiKey: resendKey,
      to: toEmail,
      from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
    };
  }
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) return { type: "webhook", url: webhook };
  return { type: "console" };
}

function buildEmailText(p: ContactPayload): string {
  return [
    "お問い合わせを受信しました。",
    "",
    `お名前: ${p.name}`,
    `会社名: ${p.company ?? "（未入力）"}`,
    `メール: ${p.email}`,
    `お問い合わせ種別: ${p.inquiryType}`,
    "",
    "── お問い合わせ内容 ──",
    p.message,
  ].join("\n");
}

async function deliver(payload: ContactPayload): Promise<void> {
  const mode = getDeliveryMode();
  const text = buildEmailText(payload);
  const subject = `[サイトお問い合わせ] ${payload.inquiryType} - ${payload.name}`;

  if (mode.type === "resend") {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mode.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: mode.from,
        to: [mode.to],
        reply_to: payload.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
    }
    return;
  }

  if (mode.type === "webhook") {
    const res = await fetch(mode.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, payload }),
    });
    if (!res.ok) {
      throw new Error(`Webhook ${res.status}`);
    }
    return;
  }

  // console モード（dev / 未設定時）
  console.info("[contact] dry-run（CONTACT_* env 未設定のため送信はスキップ）");
  console.info(text);
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // ボット判定：受け取った体で 200 を返して相手を欺く（攻撃元に学習させない）
  if (isLikelyBot(payload)) {
    console.warn("[contact] bot suspected, silently dropped");
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "validation", errors },
      { status: 400 }
    );
  }

  try {
    await deliver(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 }
    );
  }
}
