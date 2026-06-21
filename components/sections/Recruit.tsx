"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { jobs, idealTraits } from "@/data/jobs";

export default function Recruit() {
  return (
    <section id="recruit" className="bg-white relative overflow-hidden">

      {/* ── ヒーローバナー ── */}
      <div className="relative overflow-hidden bg-red-700 noise" style={{ minHeight: "340px" }}>

        {/* 背景大文字 */}
        <span className="absolute top-0 right-0 text-[9rem] lg:text-[14rem] font-black
                          text-white/[0.07] leading-none select-none pointer-events-none">
          RECRUIT
        </span>

        {/* 斜めスピードライン */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bg-white" style={{ width: 56,  height: "200%", top: "-50%", left: "58%", transform: "rotate(-19deg)", opacity: 0.04 }} />
          <div className="absolute bg-white" style={{ width: 22,  height: "200%", top: "-50%", left: "63%", transform: "rotate(-19deg)", opacity: 0.03 }} />
          <div className="absolute bg-white" style={{ width: 5,   height: "200%", top: "-50%", left: "68%", transform: "rotate(-19deg)", opacity: 0.2  }} />
        </div>

        {/* 白へのグラデーション */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />

        {/* コンテンツ */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 py-14 md:py-20
                         flex flex-col lg:flex-row lg:items-end gap-8">
          <div className="flex-1">
            {/* ライブインジケーター */}
            <div className="flex items-center gap-3 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-[11px] font-black text-white/80 tracking-[0.2em]">
                現在 {jobs.length} 件 募集中
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/60" />
              <p className="text-white/60 text-[11px] font-bold tracking-[0.3em]">RECRUIT</p>
            </div>
            <Link href="/recruit"
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight
                             hover:text-red-200 transition-colors duration-200 block">
              関西から、<br />AI時代の<br />マーケターへ。
            </Link>
          </div>
          <div className="lg:max-w-md">
            <p className="text-red-100 text-sm md:text-[15px] leading-[1.95]">
              未経験でも、AI・SNS・動画・LINEを実践の中で学び、集客・採用・ブランドづくりを担うマーケターへ。
            </p>
            <p className="text-red-100 text-sm md:text-[15px] leading-[1.95] mt-4">
              Crazy株式会社は、関西からAI時代の新しい仕事をつくる仲間を募集しています。
            </p>
          </div>
        </div>
      </div>

      {/* ── 求める人物像 ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-14 md:pt-20 pb-10 md:pb-14">
        <FadeIn>
          <div className="mb-8 md:mb-10">
            <p className="text-red-600 text-[11px] font-bold tracking-[0.3em] mb-2">IDEAL PERSON</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.2] tracking-tight">
              求める人物像
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {idealTraits.map((trait, i) => (
            <FadeIn key={trait.number} delay={i * 0.07}>
              <div className="group relative flex flex-col h-full bg-white border border-gray-200
                              hover:border-red-600 transition-colors duration-300 p-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600
                                 group-hover:w-[5px] transition-all duration-300 pointer-events-none" />
                <span className="text-red-600 font-mono font-black text-[2rem] leading-none opacity-85 mb-3">
                  {trait.number}
                </span>
                <div className="w-8 h-[2px] bg-red-600 mb-4" />
                <h3 className="text-base md:text-lg font-black text-gray-900 leading-[1.4] mb-3
                               group-hover:text-red-600 transition-colors duration-200">
                  {trait.title}
                </h3>
                <p className="text-gray-500 text-[12.5px] leading-[1.95] flex-1">
                  {trait.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── 募集職種 ── */}
      <div id="open-positions" className="max-w-screen-xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <FadeIn>
          <div className="mb-8 md:mb-10">
            <p className="text-red-600 text-[11px] font-bold tracking-[0.3em] mb-2">OPEN POSITIONS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.2] tracking-tight">
              募集職種
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {jobs.map((job, i) => (
            <FadeIn key={job.id} delay={i * 0.08}>
              <div className="group relative flex flex-col h-full bg-white border border-gray-200
                              hover:border-red-600 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)] hover:-translate-y-1
                              transition-all duration-300 px-7 pt-7 pb-7">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600
                                 group-hover:w-[5px] transition-all duration-300 pointer-events-none" />

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[2.6rem] font-black text-red-600 font-mono leading-none opacity-85">
                    {job.number}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em]">
                    {job.location}
                  </span>
                </div>
                <div className="w-10 h-[2px] bg-red-600 mb-4" />

                <h3 className="text-xl md:text-[1.5rem] font-black text-gray-900 leading-[1.35] mb-3
                               group-hover:text-red-600 transition-colors duration-200">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-[2] whitespace-pre-line">
                  {job.summary}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTAバナー */}
        <FadeIn delay={0.2}>
          <div className="mt-12 md:mt-16 bg-red-700 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute bg-white" style={{ width: 60, height: "200%", top: "-50%", left: "28%", transform: "rotate(-19deg)", opacity: 0.04 }} />
              <div className="absolute bg-white" style={{ width: 24, height: "200%", top: "-50%", left: "34%", transform: "rotate(-19deg)", opacity: 0.03 }} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-red-200 text-[11px] font-bold tracking-[0.3em] mb-2">OPEN POSITION</p>
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                  まずは話を<br className="md:hidden" />聞いてみてください。
                </h3>
                <p className="text-red-100 text-sm mt-3 max-w-sm leading-[1.85]">
                  掲載のない職種でも、お気軽にご連絡ください。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a href="#what-we-do"
                   className="inline-flex items-center justify-center bg-white text-red-600
                              hover:bg-red-50 active:scale-95 font-black text-sm tracking-wide
                              px-8 py-4 transition-all duration-200 shadow-xl gap-3">
                  募集職種を見る
                  <span className="text-lg">→</span>
                </a>
                <a href="#contact"
                   className="inline-flex items-center justify-center bg-red-900 text-white border border-white/30
                              hover:bg-red-950 active:scale-95 font-black text-sm tracking-wide
                              px-8 py-4 transition-all duration-200 gap-3">
                  応募する
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
