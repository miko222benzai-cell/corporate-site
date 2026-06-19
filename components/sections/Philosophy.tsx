"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

interface PhilosophyProps {
  /** /public/images/philosophy-mission.{jpg,png,webp,avif} を page.tsx で解決して渡す。 */
  missionImage?: string | null;
}

export default function Philosophy({ missionImage }: PhilosophyProps) {
  return (
    <section
      id="philosophy"
      className="py-28 md:py-48 bg-white overflow-hidden relative"
    >
      {/* 背景：薄い赤の巨大英字 */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-0 text-[7rem] sm:text-[11rem] lg:text-[15rem] font-black
                   text-red-600/[0.09] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
      >
        PHILOSOPHY
      </span>

      {/* 右側赤ライン装飾 */}
      <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none overflow-hidden">
        <div className="absolute bg-red-600" style={{ width: 3, height: "160%", top: "-30%", right: "20%", transform: "rotate(-19deg)", opacity: 0.14 }} />
        <div className="absolute bg-red-600" style={{ width: 1, height: "160%", top: "-30%", right: "13%", transform: "rotate(-19deg)", opacity: 0.08 }} />
      </div>

      {/* 右上の細い赤コーナーマーク */}
      <div aria-hidden="true" className="absolute top-10 right-6 sm:right-12 pointer-events-none">
        <div className="flex flex-col items-end gap-2">
          <span className="block w-16 sm:w-24 h-[3px] bg-red-600" />
          <span className="block w-8 sm:w-12 h-[2px] bg-red-600/60" />
          <span className="block w-3 sm:w-4 h-[2px] bg-red-600/40" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* ラベル */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-16 md:mb-24">
            <div className="w-12 h-[3px] bg-red-600" />
            <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">PHILOSOPHY</p>
          </div>
        </FadeIn>

        {/* ── MISSION（左：テキスト / 右：ビジュアル）── */}
        <div className="mb-28 md:mb-40 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* 左：テキスト */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
                <p className="text-red-600 text-[11px] tracking-[0.3em] font-bold">MISSION</p>
                <span className="block w-10 h-[2px] bg-red-600/40" />
              </div>
            </FadeIn>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem]
                         font-black text-gray-900 leading-[1.1] tracking-tight"
            >
              <span className="text-red-600">AI</span>で、
              <br />
              挑戦する人の
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">可能性</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-1 left-0 right-0 h-[6px] md:h-[10px] bg-red-100"
                />
              </span>を
              <br />
              突き抜けさせる。
            </motion.h2>
          </div>

          {/* 右：MISSION ビジュアル */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.25}>
              <MissionVisual src={missionImage ?? null} />
            </FadeIn>
          </div>
        </div>

        {/* ── VISION（中央強調）── */}
        <FadeIn>
          <div className="mb-28 md:mb-36 flex flex-col items-center text-center relative">
            <div className="w-px h-12 bg-red-600/40 mb-8" />
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-10 h-[2px] bg-red-600/40" />
              <p className="text-red-600 text-[11px] tracking-[0.3em] font-bold">VISION</p>
              <span className="block w-10 h-[2px] bg-red-600/40" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.4] tracking-tight max-w-3xl">
              関西から、<br className="sm:hidden" />
              <span className="text-red-600">AI時代</span>のマーケターを<br className="hidden sm:block" />
              育てる。
            </p>
            <div className="w-px h-12 bg-red-600/40 mt-8" />
          </div>
        </FadeIn>

        {/* ── VALUES（コンパクト一列） ── */}
        <FadeIn>
          <div className="mb-24 md:mb-32 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-7">
              <span className="block w-10 h-[2px] bg-red-600/40" />
              <p className="text-red-600 text-[11px] tracking-[0.3em] font-bold">VALUES</p>
              <span className="block w-10 h-[2px] bg-red-600/40" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl font-black text-gray-900 tracking-tight
                          flex items-center gap-3 sm:gap-5 md:gap-7 flex-wrap justify-center">
              <span>実行</span>
              <span className="text-red-600/60 font-thin">/</span>
              <span>仕組み化</span>
              <span className="text-red-600/60 font-thin">/</span>
              <span>進化</span>
            </p>
          </div>
        </FadeIn>

        {/* ── 締めの説明文 ── */}
        <FadeIn>
          <div className="max-w-3xl mx-auto border-l-4 border-red-600 pl-6 md:pl-10 py-2">
            <p className="text-gray-600 text-lg md:text-xl leading-[2] font-medium">
              挑戦する人の可能性を突き抜けさせ、
              <br className="hidden sm:block" />
              関西から<span className="text-red-600 font-black">AI時代のマーケター</span>を育てる。
              <br className="hidden sm:block" />
              そのために、<span className="font-black text-gray-900">実行し、仕組み化し、進化し続ける。</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// MISSION ビジュアル：写真 or 赤プレースホルダ ＋ 赤アクセント
// ──────────────────────────────────────────────────────────
function MissionVisual({ src }: { src: string | null }) {
  return (
    <div className="relative">
      {/* 背面の赤い斜めアクセント帯 */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 -bottom-4 -left-4 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute bg-gradient-to-br from-red-600/20 to-red-900/10"
          style={{
            width: "60%",
            height: "200%",
            top: "-50%",
            right: "-10%",
            transform: "rotate(-19deg)",
          }}
        />
      </div>

      {/* 画像コンテナ */}
      <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden shadow-[0_24px_64px_-32px_rgba(0,0,0,0.35)]">
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        ) : (
          <MissionImagePlaceholder />
        )}

        {/* 装飾オーバーレイ群：画像がある場合は完成度を尊重して非表示 */}
        {!src && (
          <>
        {/* 赤グラデオーバーレイ（左から白へフェードしてセクション背景に馴染ませる） */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-red-600/10 lg:from-white/40"
        />

        {/* 右下：赤い濃いめのグラデーション（写真の右側を赤く染める） */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-red-700/25 via-transparent to-transparent"
        />

        {/* 斜めスピードライン（既存ヒーロー世界観継承） */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute bg-white"
            style={{ width: 30, height: "200%", top: "-50%", left: "55%", transform: "rotate(-19deg)", opacity: 0.08 }}
          />
          <div
            className="absolute bg-red-500"
            style={{ width: 4, height: "200%", top: "-50%", left: "72%", transform: "rotate(-19deg)", opacity: 0.45 }}
          />
        </div>

        {/* 右上：細い赤コーナーマーク */}
        <div aria-hidden="true" className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          <span className="block w-10 h-[2px] bg-red-500" />
          <span className="block w-5 h-[2px] bg-red-500/70" />
        </div>

        {/* 左下：AI × HUMAN ラベル */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
          <span className="block w-6 h-[2px] bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
          <span className="text-white text-[10px] tracking-[0.3em] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            AI × HUMAN
          </span>
        </div>
          </>
        )}

        {/* 画像あり時：左端のみ控えめに白フェード（セクション背景へ自然に馴染ませる） */}
        {src && (
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white/30 to-transparent pointer-events-none"
          />
        )}
      </div>
    </div>
  );
}

/** 画像未設定時の赤プレースホルダ */
function MissionImagePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900 overflow-hidden"
    >
      {/* 斜めスピードライン */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bg-white" style={{ width: 56, height: "200%", top: "-50%", left: "20%", transform: "rotate(-19deg)", opacity: 0.06 }} />
        <div className="absolute bg-white" style={{ width: 22, height: "200%", top: "-50%", left: "30%", transform: "rotate(-19deg)", opacity: 0.04 }} />
        <div className="absolute bg-white" style={{ width: 6,  height: "200%", top: "-50%", left: "38%", transform: "rotate(-19deg)", opacity: 0.22 }} />
      </div>

      {/* 中央の AI 演出 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="block font-black text-white/30 leading-none text-[6rem] sm:text-[8rem] md:text-[10rem] tracking-tighter">
          AI
        </span>
        <span className="block w-24 h-[2px] bg-white/60" />
        <span className="text-white/70 text-[10px] tracking-[0.35em] font-bold">
          PHOTO COMING SOON
        </span>
      </div>
    </div>
  );
}
