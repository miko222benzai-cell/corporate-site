"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { services } from "@/data/services";

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="py-14 md:py-20 bg-red-700 relative overflow-hidden noise"
    >
      {/* 背景大文字 */}
      <span className="absolute top-0 right-0 text-[14rem] lg:text-[20rem] font-black text-white/[0.07] leading-none select-none pointer-events-none whitespace-nowrap overflow-hidden">
        WE DO
      </span>

      {/* 左下斜めライン装飾 */}
      <div className="absolute left-0 bottom-0 pointer-events-none overflow-hidden w-64 h-64">
        <div className="absolute bg-white" style={{ width:40, height:400, bottom:-80, left:-8, transform:"rotate(-19deg)", opacity:0.04 }} />
        <div className="absolute bg-white" style={{ width:16, height:400, bottom:-80, left:44, transform:"rotate(-19deg)", opacity:0.025 }} />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/50" />
              <p className="text-white/50 text-[11px] font-bold tracking-[0.3em]">WHAT WE DO</p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              私たちが提供する価値
            </h2>
            <p className="text-white/70 text-sm md:text-base font-medium mt-4 max-w-xl leading-[1.9]">
              関西から、AI時代の事業を3本柱で展開しています。
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-red-900/80">
          {services.map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 0.13}>
              <Link
                href={`/services/${svc.slug}`}
                aria-label={`${svc.title} の詳細を見る`}
                className="group block bg-white relative overflow-hidden h-full cursor-pointer
                              hover:shadow-[0_32px_80px_rgba(0,0,0,0.22),0_0_0_1.5px_rgba(220,38,38,0.5)] hover:-translate-y-2 transition-all duration-300"
              >

                {/* ホバーで展開する赤い左ストライプ（装飾。クリック貫通させる） */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600
                                group-hover:w-[4px] transition-all duration-300 pointer-events-none z-0" />

                {/* ホバーで展開する赤いアンダーライン */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600
                                origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none z-0" />

                <div className="relative z-[1] flex flex-col h-full px-8 pt-8 pb-7">
                  {/* 番号 + 英字ラベル + 赤ライン */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-[3.5rem] md:text-[4rem] font-black text-red-600 font-mono leading-none opacity-80">
                      {svc.number}
                    </span>
                    <p className="text-red-600 text-[10px] font-bold tracking-[0.28em] pb-1">
                      {svc.titleEn}
                    </p>
                  </div>
                  <div className="w-10 h-[2px] bg-red-600 mb-5" />

                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3
                                 group-hover:text-red-600 transition-colors duration-200 leading-[1.35]">
                    {svc.title}
                  </h3>

                  {/* 一言 */}
                  <p className="text-gray-700 text-[13px] md:text-sm font-bold leading-[1.8] mb-4">
                    {svc.tagline}
                  </p>

                  {/* 説明文 */}
                  <p className="text-gray-500 text-[13px] leading-[1.95] mb-5 flex-1 font-normal whitespace-pre-line">
                    {svc.description}
                  </p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {svc.tags.map((tag) => (
                      <span key={tag}
                            className="text-[10px] font-medium text-red-600/80 border border-red-200/60 px-2.5 py-1
                                       group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600
                                       transition-all duration-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 詳細リンク（常時表示） */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-black text-gray-900 group-hover:text-red-600 transition-colors duration-200 tracking-wide">
                      詳しく見る
                    </span>
                    <span className="text-red-600 text-lg font-black inline-block group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
