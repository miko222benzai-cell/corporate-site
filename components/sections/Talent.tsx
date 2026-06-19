"use client";

import FadeIn from "@/components/FadeIn";
import { talents } from "@/data/talent";

function YouTubeIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.181 8.181 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

const snsIcon: Record<string, React.ReactNode> = {
  youtube:   <YouTubeIcon />,
  instagram: <InstagramIcon />,
  twitter:   <TwitterIcon />,
  tiktok:    <TikTokIcon />,
};

export default function Talent() {
  return (
    <section id="talent" className="bg-gray-950 relative overflow-hidden">

      {/* グリッド背景テクスチャ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,1) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(220,38,38,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* 上端赤ライン（太め） */}
      <div className="absolute top-0 inset-x-0 h-[4px] bg-red-600" />

      {/* 背景大文字 */}
      <span className="absolute top-0 right-0 text-[10rem] lg:text-[16rem] font-black
                        text-red-600/[0.08] leading-none select-none pointer-events-none">
        ROSTER
      </span>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-24 md:py-36 relative z-10">

        {/* ヘッダー */}
        <FadeIn>
          <div className="mb-16 md:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">TALENT</p>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                所属タレント
              </h2>
            </div>
            {/* ロスター件数 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span className="text-gray-500 text-xs font-bold tracking-[0.2em]">
                {talents.length} TALENT{talents.length > 1 ? "S" : ""} ON ROSTER
              </span>
            </div>
          </div>
        </FadeIn>

        {/* タレントカード */}
        <div className="flex flex-col gap-px">
          {talents.map((talent, i) => (
            <FadeIn key={talent.id} delay={i * 0.15}>
              <div className="group relative overflow-hidden border border-gray-800
                              hover:border-red-600/60 transition-all duration-500">

                <div className="flex flex-col lg:flex-row">

                  {/* ── 写真エリア ── */}
                  <div className="relative lg:w-[44%] xl:w-[42%] flex-shrink-0
                                  aspect-[4/3] lg:aspect-auto overflow-hidden"
                       style={{ minHeight: 400 }}>

                    {talent.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={talent.image}
                        alt={talent.name}
                        className="w-full h-full object-cover object-top
                                   grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950
                                      flex items-center justify-center">
                        <span className="text-[9rem] font-black text-gray-700 select-none">
                          {talent.name[0]}
                        </span>
                      </div>
                    )}

                    {/* 暗グラデーション（下） */}
                    <div className="absolute inset-x-0 bottom-0 h-24
                                     bg-gradient-to-t from-gray-950/70 to-transparent
                                     lg:from-gray-950/40" />

                    {/* ホバー赤グロー */}
                    <div className="absolute inset-0 bg-red-600/8
                                     opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 番号オーバーレイ */}
                    <div className="absolute top-5 left-5 font-black leading-none select-none
                                     text-white/[0.07] text-[7rem] group-hover:text-red-600/10
                                     transition-colors duration-500">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* TALENT タグ（写真左下） */}
                    <div className="absolute bottom-5 left-5 flex items-center gap-2">
                      <span className="bg-red-600 text-white text-[9px] font-black tracking-[0.2em] px-2.5 py-1">
                        TALENT
                      </span>
                      <span className="text-white/40 text-[9px] font-bold tracking-widest">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* ── 情報エリア ── */}
                  <div className="flex-1 bg-gray-950 flex flex-col justify-between
                                  p-8 xl:p-12 border-t border-gray-800 lg:border-t-0 lg:border-l border-gray-800">

                    <div>
                      {/* ジャンルタグ */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {talent.genres.map((g) => (
                          <span
                            key={g}
                            className="text-[10px] font-black tracking-wide
                                       border border-red-600/30 text-red-500 px-3 py-1
                                       group-hover:border-red-500 group-hover:text-red-400
                                       transition-colors duration-300"
                          >
                            {g}
                          </span>
                        ))}
                      </div>

                      {/* 名前 */}
                      <h3 className="text-[3rem] md:text-5xl xl:text-[3.5rem] font-black text-white
                                     leading-none tracking-tight mb-1.5
                                     group-hover:text-red-400 transition-colors duration-300">
                        {talent.name}
                      </h3>
                      <p className="text-gray-600 text-sm font-bold tracking-[0.15em] mb-8">
                        {talent.nameEn}
                      </p>

                      {/* プロフィール */}
                      <p className="text-gray-400 text-sm leading-[1.9] max-w-md mb-10">
                        {talent.bio}
                      </p>
                    </div>

                    {/* SNS のみ（数値統計は廃止） */}
                    <div className="pt-2 mt-2 border-t border-gray-800/60">
                      <div className="flex items-center gap-3 mt-6">
                        <span className="text-gray-700 text-[9px] font-bold tracking-[0.2em] mr-1">
                          FOLLOW
                        </span>
                        {(Object.entries(talent.sns) as [string, string | undefined][])
                          .filter(([, url]) => !!url)
                          .map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${talent.name} の ${platform}`}
                              className="relative w-9 h-9 border border-gray-700
                                         hover:border-red-500 hover:bg-red-600
                                         flex items-center justify-center
                                         text-gray-500 hover:text-white
                                         transition-all duration-300
                                         hover:scale-105
                                         hover:shadow-[0_0_22px_rgba(220,38,38,0.55),0_0_2px_rgba(220,38,38,0.8)]
                                         active:scale-95"
                            >
                              {snsIcon[platform]}
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ホバー左赤ストライプ */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600
                                 scale-y-0 group-hover:scale-y-100
                                 transition-transform duration-500 origin-top" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* お仕事依頼 CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-14 border-t border-gray-800 pt-10
                           flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-red-600 text-[11px] font-bold tracking-[0.3em] mb-1">
                TALENT INQUIRY
              </p>
              <p className="text-white font-black text-xl">
                タレントへのお仕事依頼はこちら
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700
                         text-white px-8 py-4 font-bold text-sm tracking-wide
                         transition-all duration-200 active:scale-95"
            >
              お問い合わせ →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
