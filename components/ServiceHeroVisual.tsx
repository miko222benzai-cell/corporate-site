// ──────────────────────────────────────────────────────────
// WHAT WE DO 個別ページの右側ビジュアル。
// 画像が無いときは赤×黒のブランドポスター調プレースホルダ。
// 配置先: /public/images/we-do/{slug}.{jpg|jpeg|png|webp|avif}
// ──────────────────────────────────────────────────────────

import Image from "next/image";

interface ServiceHeroVisualProps {
  imageSrc: string | null;
  number: string;        // "01"
  titleEn: string;       // "AI STRATEGY"
  alt: string;           // 画像がある場合のalt
}

export default function ServiceHeroVisual({
  imageSrc,
  number,
  titleEn,
  alt,
}: ServiceHeroVisualProps) {
  return (
    <div className="relative w-full h-full min-h-[60vh] lg:min-h-[85vh] bg-black overflow-hidden">
      {/* ── 背景：写真 or 赤プレースホルダ ── */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <PlaceholderBackground />
      )}

      {/* 画像なし時のみ：装飾オーバーレイ群を重ねる
          （提供画像は完成ポスター仕様で「番号・英字・斜めライン・赤グロー」を内包するため、
           画像がある場合は重複を避けて素のままを尊重） */}
      {!imageSrc && (
        <>
          {/* 暗→赤グラデオーバーレイ */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/25 to-red-900/65 mix-blend-multiply"
          />
          {/* 右下→左上：赤の追加グロー */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(220,38,38,0.35),transparent_60%)]"
          />
          {/* 斜めスピードライン */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bg-red-500" style={{ width: 2, height: "150%", top: "-25%", left: "32%", transform: "rotate(-19deg)", opacity: 0.55 }} />
            <div className="absolute bg-red-500" style={{ width: 1, height: "150%", top: "-25%", left: "44%", transform: "rotate(-19deg)", opacity: 0.35 }} />
            <div className="absolute bg-white"   style={{ width: 1, height: "150%", top: "-25%", left: "56%", transform: "rotate(-19deg)", opacity: 0.18 }} />
          </div>
          {/* 右上：番号 + 英字 */}
          <div className="absolute top-8 sm:top-12 lg:top-16 right-6 sm:right-10 lg:right-14 text-right z-10">
            <p
              className="font-mono font-black text-red-500 leading-none tracking-tighter
                         text-[4.5rem] sm:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem]
                         drop-shadow-[0_6px_24px_rgba(220,38,38,0.45)]"
            >
              {number}
            </p>
            <p
              className="font-black text-red-500 tracking-[0.15em] mt-2
                         text-sm sm:text-base lg:text-lg
                         drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            >
              {titleEn}
            </p>
          </div>
          {/* 右下：PHOTO COMING SOON */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 flex items-center gap-3 z-10">
            <span className="block w-8 sm:w-12 h-[2px] bg-white" />
            <span className="text-white text-[10px] tracking-[0.3em] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              PHOTO COMING SOON
            </span>
          </div>
        </>
      )}

      {/* 画像あり時：左端のみ控えめに白フェード（左カラムのテキストと自然につなぐ） */}
      {imageSrc && (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white/15 to-transparent pointer-events-none lg:from-white/20"
        />
      )}
    </div>
  );
}

/** 画像未配置時の背景：赤グラデ + HUD風アクセント */
function PlaceholderBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-900 to-black"
    >
      {/* 強めの追加スピードライン */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bg-white" style={{ width: 56, height: "200%", top: "-50%", left: "18%", transform: "rotate(-19deg)", opacity: 0.05 }} />
        <div className="absolute bg-white" style={{ width: 22, height: "200%", top: "-50%", left: "30%", transform: "rotate(-19deg)", opacity: 0.04 }} />
        <div className="absolute bg-white" style={{ width: 6,  height: "200%", top: "-50%", left: "40%", transform: "rotate(-19deg)", opacity: 0.20 }} />
      </div>

      {/* グリッドパターン（薄め、HUD風） */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
