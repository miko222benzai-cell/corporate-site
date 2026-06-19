"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { historyData } from "@/data/historyData";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function About() {
  return (
    <section
      id="about"
      className="py-28 md:py-44 bg-white overflow-hidden relative"
    >
      {/* 背景：薄い赤の巨大英字（控えめだが存在感を強めた） */}
      <span
        aria-hidden="true"
        className="absolute -top-2 right-0 text-[7rem] sm:text-[11rem] lg:text-[15rem] font-black
                   text-red-600/[0.09] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
      >
        ABOUT
      </span>

      {/* 右上の細い赤コーナーマーク */}
      <div aria-hidden="true" className="absolute top-10 right-6 sm:right-12 pointer-events-none">
        <div className="flex flex-col items-end gap-2">
          <span className="block w-16 sm:w-24 h-[3px] bg-red-600" />
          <span className="block w-8 sm:w-12 h-[2px] bg-red-600/60" />
          <span className="block w-3 sm:w-4 h-[2px] bg-red-600/40" />
        </div>
      </div>

      {/* 左側に薄く流れる赤斜め線（フィロソフィー風の世界観継承） */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-40 pointer-events-none overflow-hidden">
        <div className="absolute bg-red-600" style={{ width: 3, height: "160%", top: "-30%", left: "22%", transform: "rotate(-19deg)", opacity: 0.12 }} />
        <div className="absolute bg-red-600" style={{ width: 1, height: "160%", top: "-30%", left: "14%", transform: "rotate(-19deg)", opacity: 0.07 }} />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* ラベル：赤バー強化版 */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-16 md:mb-20">
            <div className="w-12 h-[3px] bg-red-600" />
            <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">ABOUT</p>
          </div>
        </FadeIn>

        {/* ── 見出し ── */}
        <div className="mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.18] tracking-tight max-w-5xl"
          >
            エンタメから、
            <br className="hidden sm:block" />
            <span className="relative inline-block">
              <span className="relative z-10">
                <span className="text-red-600">AI×SNS</span>マーケティング
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
                className="absolute bottom-1 left-0 right-0 h-[6px] md:h-[10px] bg-red-100"
              />
            </span>
            へ。
          </motion.h2>

          {/* 本文：1カラム自然読み・最大960px */}
          <FadeIn delay={0.25}>
            <div className="mt-12 md:mt-14 max-w-[960px] border-l-2 border-red-600 pl-5 md:pl-8 flex flex-col gap-7 md:gap-8">
              <p className="text-gray-600 text-base md:text-[17px] leading-[2.1]">
                Crazy株式会社は、エンターテイメント領域で培った発信力を土台に、AI時代のSNSマーケティング会社へと進化してきました。
              </p>
              <p className="text-gray-600 text-base md:text-[17px] leading-[2.1]">
                インフルエンサー・ライバー・クリエイター領域で向き合ってきた「人を惹きつける力」を、今はSNS・動画・LINEを活用した集客・採用・ブランドづくりの仕組みへと変えています。
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── HISTORY タイムライン ── */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-gray-100" />
            <div className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="text-red-600 text-[10px] tracking-[0.3em] font-bold">HISTORY</span>
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
        </FadeIn>

        <div className="relative">
          {/* 縦の赤ライン（タイムライン軸） */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease }}
            style={{ transformOrigin: "top" }}
            className="absolute left-3 sm:left-6 md:left-10 top-2 bottom-2 w-[2px] bg-red-600"
          />

          <ol className="flex flex-col gap-16 md:gap-20 lg:gap-24">
            {historyData.map((h, i) => (
              <FadeIn key={h.number} delay={i * 0.08} direction="up" distance={28}>
                <li className="relative pl-14 sm:pl-20 md:pl-28">
                  {/* ノードドット（タイムライン軸上） */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.45, delay: 0.1, ease }}
                    className="absolute left-0 sm:left-3 md:left-7 top-1.5 flex h-7 w-7 items-center justify-center
                               rounded-full bg-red-600 ring-4 ring-white shadow-[0_0_0_2px_rgb(220_38_38)]"
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-white" />
                  </motion.span>

                  {/* 中央テキスト + 右画像 のグリッド（PCのみ2カラム） */}
                  <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_400px] gap-8 md:gap-10 lg:gap-12 items-start">
                    {/* 中央：テキスト */}
                    <div>
                      <p className="text-red-600 font-mono text-[12px] tracking-[0.25em] font-bold mb-2">
                        {h.number}
                      </p>
                      <p className="text-[11px] font-bold tracking-[0.2em] text-gray-400 mb-3">
                        {h.phase}
                      </p>
                      <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-black text-gray-900 leading-snug tracking-tight mb-5">
                        {h.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] md:text-base leading-[2] max-w-2xl">
                        {h.body}
                      </p>
                    </div>

                    {/* 右：画像（縦長 3:4 = 420×560 想定、hover で zoom+brightness+赤グロー） */}
                    <HistoryPhaseImage
                      src={h.image}
                      number={h.number}
                      phase={h.phase}
                    />
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// HISTORY 各フェーズの右側画像
//   - 縦長 3:4（420×560 相当）
//   - object-cover で中央トリミング
//   - hover: 微ズーム + 微ブライト + 赤グロー
// ──────────────────────────────────────────────────────────
function HistoryPhaseImage({
  src,
  number,
  phase,
}: {
  src: string;
  number: string;
  phase: string;
}) {
  return (
    <div
      className="group relative aspect-[3/4] w-full max-w-[320px] xl:max-w-[400px]
                 overflow-hidden bg-gray-100
                 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.28)]
                 transition-shadow duration-500
                 hover:shadow-[0_24px_60px_-20px_rgba(220,38,38,0.32),0_0_40px_rgba(220,38,38,0.18)]"
    >
      <Image
        src={src}
        alt={`${number} ${phase}`}
        fill
        sizes="(max-width: 1024px) 320px, 400px"
        className="object-cover object-center
                   transition-all duration-700 ease-out
                   group-hover:scale-[1.05] group-hover:brightness-110"
      />

      {/* 暗→赤の薄いオーバーレイ（世界観統一、hover で薄れて写真がクリアに） */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-red-700/20
                   opacity-90 group-hover:opacity-60 transition-opacity duration-500"
      />

      {/* hover時の赤グロー（内側） */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none
                   ring-1 ring-inset ring-red-500/0 group-hover:ring-red-500/40
                   transition-all duration-500"
      />

      {/* 左下：番号ラベル */}
      <div className="absolute left-3 bottom-3 flex items-center gap-2 z-10">
        <span className="block w-5 h-[2px] bg-red-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        <span className="text-white text-[10px] font-bold tracking-[0.3em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {number}
        </span>
      </div>
    </div>
  );
}
