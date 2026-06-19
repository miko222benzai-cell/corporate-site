"use client";

import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/data/siteConfig";

const paragraphs = [
  "Crazy株式会社は、もともとエンターテイメント領域から始まった会社です。インフルエンサー、ライバー、クリエイターと向き合う中で、私たちは発信が人を動かし、仕事を生み、人生を変える力を持っていることを見てきました。",
  "一方で、時代は大きく変わりました。AIによって、SNSマーケティング、動画制作、情報発信の可能性は一気に広がっています。私は、AIは不可能を可能にする魔法ではなく、本気で挑戦する人の可能性を突き抜けさせる武器だと考えています。",
  "だからこそ、Crazy株式会社はAI×SNSマーケティングの勝ち筋をつくり、その実践を通じて、関西からAI時代のマーケターを育てていきます。",
  "変わりたい人が、変われる環境をつくる。挑戦する人の可能性を、AIで突き抜けさせる。それが、これからのCrazy株式会社の使命です。",
];

export default function CEOMessage() {
  const ceo = siteConfig.ceo;

  return (
    <section
      id="ceo-message"
      className="py-28 md:py-44 bg-gray-50 overflow-hidden relative"
    >
      {/* 背景大文字 */}
      <span className="absolute -top-2 left-0 text-[5.5rem] sm:text-[9rem] lg:text-[13rem] font-black
                        text-red-600/[0.05] leading-none select-none pointer-events-none whitespace-nowrap">
        MESSAGE
      </span>

      {/* 斜め赤ライン装飾 */}
      <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none overflow-hidden">
        <div className="absolute bg-red-600" style={{ width:3, height:"160%", top:"-30%", right:"22%", transform:"rotate(-19deg)", opacity:0.10 }} />
        <div className="absolute bg-red-600" style={{ width:1, height:"160%", top:"-30%", right:"14%", transform:"rotate(-19deg)", opacity:0.06 }} />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        {/* ラベル */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <div className="w-8 h-[2px] bg-red-600" />
            <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">MESSAGE FROM CEO</p>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* 左：写真エリア */}
          <FadeIn>
            <div className="w-full lg:w-[380px] xl:w-[440px] flex-shrink-0">
              <div
                className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                style={{ minHeight: 320 }}
              >
                {ceo.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ceo.image}
                    alt={ceo.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-3xl font-black">
                        {ceo.name[0]}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs tracking-widest">PHOTO</p>
                  </div>
                )}
                {/* 赤下線 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
              </div>

              {/* 名前カード（写真下） */}
              <div className="bg-white p-6 border-l-4 border-red-600 mt-px">
                <p className="text-red-600 text-[10px] font-bold tracking-[0.3em] mb-2">
                  CEO
                </p>
                <p className="text-gray-900 font-black text-2xl leading-tight mb-1">
                  {ceo.name}
                </p>
                <p className="text-gray-400 text-xs tracking-wide">{ceo.role}</p>
              </div>
            </div>
          </FadeIn>

          {/* 右：メッセージ */}
          <FadeIn delay={0.15}>
            <div className="flex-1 max-w-3xl">
              {/* 見出し */}
              <div className="relative mb-12 md:mb-16">
                <span className="absolute -top-10 -left-2 text-[8rem] md:text-[10rem] font-black text-red-600/10 leading-none select-none pointer-events-none">
                  &ldquo;
                </span>
                <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.35] tracking-tight">
                  変化の時代に、
                  <br className="hidden sm:block" />
                  <span className="text-red-600">挑戦する人</span>
                  の可能性を広げたい。
                </h2>
              </div>

              {/* 本文：4段落 */}
              <div className="flex flex-col gap-7 md:gap-8">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-gray-600 text-[15px] md:text-base leading-[2.1]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* サイン */}
              <div className="mt-12 md:mt-16 border-t border-gray-200 pt-6 flex items-center gap-4">
                <div>
                  <p className="text-gray-400 text-[10px] tracking-[0.25em] mb-1 font-bold">代表取締役</p>
                  <p className="text-gray-900 font-black text-lg leading-none">
                    坂東 大毅
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="text-red-600 text-[10px] font-bold tracking-[0.3em]">
                    {siteConfig.name}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
