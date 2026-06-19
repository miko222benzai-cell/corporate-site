// ──────────────────────────────────────────────────────────
// public/ 配下から拡張子違いの画像を順に探して URL を返す。
// サーバーコンポーネント専用（Node の fs を使用）。
// ──────────────────────────────────────────────────────────

import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

/**
 * 例: resolvePublicImage("images/philosophy-mission")
 *  → /images/philosophy-mission.jpg があれば "/images/philosophy-mission.jpg"
 *  → 無ければ null
 */
export function resolvePublicImage(basenameNoExt: string): string | null {
  const publicDir = path.join(process.cwd(), "public");
  for (const ext of EXTENSIONS) {
    const rel = `${basenameNoExt}.${ext}`;
    if (existsSync(path.join(publicDir, rel))) {
      return `/${rel}`;
    }
  }
  return null;
}

/**
 * WHAT WE DO 個別ページ用ショートカット。
 * 配置先: /public/images/we-do/{slug}.{jpg|jpeg|png|webp|avif}
 *   例: /public/images/we-do/ai-strategy.jpg
 *       /public/images/we-do/sns-content.jpg
 *       /public/images/we-do/creative.jpg
 */
export function resolveServiceImage(slug: string): string | null {
  return resolvePublicImage(`images/we-do/${slug}`);
}
