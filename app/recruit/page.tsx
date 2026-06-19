import Link from "next/link";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { jobs, idealTraits } from "@/data/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用情報 | Crazy株式会社",
  description:
    "Crazy株式会社の採用情報。関西から、AI時代のマーケターをつくる仲間を募集しています。",
};

export default function RecruitPage() {
  return (
    <>
      <main className="pt-16">

        {/* ── ヒーロー ── */}
        <section className="bg-red-700 relative overflow-hidden" style={{ minHeight: 420 }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bg-white" style={{ width: 56,  height: "200%", top: "-50%", left: "58%", transform: "rotate(-19deg)", opacity: 0.04 }} />
            <div className="absolute bg-white" style={{ width: 22,  height: "200%", top: "-50%", left: "63%", transform: "rotate(-19deg)", opacity: 0.03 }} />
            <div className="absolute bg-white" style={{ width: 5,   height: "200%", top: "-50%", left: "68%", transform: "rotate(-19deg)", opacity: 0.2 }} />
          </div>
          <span className="absolute top-0 right-0 text-[8rem] lg:text-[13rem] font-black
                            text-white/[0.05] leading-none select-none pointer-events-none">
            RECRUIT
          </span>

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-28">
            {/* パンくず */}
            <div className="flex items-center gap-2 text-white/50 text-xs font-bold tracking-wide mb-10">
              <Link href="/" className="hover:text-white transition-colors">TOP</Link>
              <span>›</span>
              <span className="text-white/80">採用情報</span>
            </div>

            {/* ライブインジケーター */}
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-[11px] font-black text-white/80 tracking-[0.2em]">
                現在 {jobs.length} 件 募集中
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-white/50" />
              <p className="text-white/50 text-[11px] font-bold tracking-[0.3em]">RECRUIT</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8 [text-wrap:balance]">
              関西から、<br />AI時代の<br className="md:hidden" />マーケターへ。
            </h1>
            <p className="text-red-100 text-base md:text-[17px] max-w-2xl leading-[2.1] mb-10">
              未経験でも、AI・SNS・動画・LINEを実践の中で学び、集客・採用・ブランドづくりを担うマーケターへ。Crazy株式会社は、関西からAI時代の新しい仕事をつくる仲間を募集しています。
            </p>

            {/* デュアル CTA */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a
                href="#open-positions"
                className="inline-flex items-center justify-center gap-3 bg-white text-red-600
                           hover:bg-red-50 active:scale-95 font-black text-sm tracking-wide
                           px-8 py-4 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
              >
                募集職種を見る
                <span className="text-lg">↓</span>
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white
                           hover:bg-white hover:text-red-600 active:scale-95 font-black text-sm tracking-wide
                           px-8 py-4 transition-all duration-200"
              >
                応募する
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 求める人物像 ── */}
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          {/* 背景の薄い赤巨大英字 */}
          <span
            aria-hidden="true"
            className="absolute -top-2 right-0 text-[6rem] sm:text-[10rem] lg:text-[14rem] font-black
                       text-red-600/[0.07] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
          >
            IDEAL
          </span>

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[3px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">IDEAL CANDIDATE</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-16 md:mb-20">
                求める人物像
              </h2>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {idealTraits.map((t, i) => (
                <FadeIn key={t.number} delay={i * 0.08}>
                  <div className="bg-white p-8 xl:p-10 h-full relative group hover:bg-gray-50 transition-colors duration-300">
                    {/* hover左赤ストライプ */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600
                                     scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    <span className="text-red-600 font-mono font-black text-[11px] tracking-[0.25em] block mb-5">
                      {t.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight mb-4
                                   group-hover:text-red-600 transition-colors duration-200">
                      {t.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-[15px] leading-[2]">
                      {t.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 募集職種 ── */}
        <section id="open-positions" className="py-20 md:py-28 bg-gray-50 scroll-mt-16 relative overflow-hidden">
          {/* 背景の薄い赤巨大英字 */}
          <span
            aria-hidden="true"
            className="absolute -top-2 left-0 text-[6rem] sm:text-[10rem] lg:text-[14rem] font-black
                       text-red-600/[0.07] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
          >
            POSITIONS
          </span>

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[3px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">OPEN POSITIONS</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-16 md:mb-20">
                募集職種
              </h2>
            </FadeIn>

            <div className="flex flex-col border-t border-gray-200">
              {jobs.map((job, i) => (
                <FadeIn key={job.id} delay={i * 0.08}>
                  <Link
                    href="/#contact"
                    className="group relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8
                               py-10 md:py-12 border-b border-gray-200
                               hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)]
                               -mx-5 px-5 md:-mx-8 md:px-8 transition-all duration-300"
                  >
                    {/* hover左赤ストライプ */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600
                                     scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                    {/* 番号 */}
                    <span className="text-red-600 font-mono font-black text-[2.4rem] md:text-[3rem] leading-none flex-shrink-0 opacity-80">
                      {job.number}
                    </span>

                    {/* 本文 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em]">
                          {job.location}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-black text-gray-900 leading-snug mb-2
                                     group-hover:text-red-600 transition-colors duration-200">
                        {job.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-[15px] leading-[2] max-w-3xl">
                        {job.summary}
                      </p>
                    </div>

                    {/* 矢印 */}
                    <span className="text-red-600 font-black text-xl flex-shrink-0
                                     opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0
                                     transition-all duration-300 self-end md:self-center">
                      →
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <p className="text-gray-400 text-sm mt-10 text-center leading-relaxed">
              掲載のない職種でもご相談ください。<br />
              熱量があれば、ポジションは一緒に考えます。
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-red-700 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bg-white" style={{ width: 60, height: "200%", top: "-50%", left: "30%", transform: "rotate(-19deg)", opacity: 0.04 }} />
            <div className="absolute bg-white" style={{ width: 24, height: "200%", top: "-50%", left: "36%", transform: "rotate(-19deg)", opacity: 0.03 }} />
          </div>
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-red-200 text-[11px] font-bold tracking-[0.3em] mb-3">CONTACT</p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                まずは話を<br />聞いてみてください。
              </h2>
              <p className="text-red-100 text-sm mt-4 max-w-sm">
                掲載のない職種でも、お気軽にご連絡ください。
              </p>
            </div>
            <Link
              href="/#contact"
              className="flex-shrink-0 inline-flex items-center bg-white text-red-600
                         hover:bg-red-50 active:scale-95 font-black text-sm tracking-wide
                         px-10 py-5 transition-all duration-200 shadow-xl gap-3"
            >
              応募する
              <span className="text-lg">→</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
