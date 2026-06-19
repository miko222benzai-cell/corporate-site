import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import {
  getNewsList,
  newsHref,
  formatNewsDate,
  primaryCategory,
  type NewsCategory,
} from "@/lib/microcms";

export const metadata: Metadata = {
  title: "NEWS | Crazy株式会社",
  description:
    "Crazy株式会社の最新ニュース・プレスリリース・メディア掲載・イベント情報の一覧。",
};

// ISR：60秒ごとに再生成
export const revalidate = 60;

const categoryColor: Record<NewsCategory, string> = {
  お知らせ:       "text-gray-400 border border-gray-200",
  プレスリリース: "bg-red-600 text-white",
  メディア掲載:   "text-blue-500 border border-blue-200",
  イベント:       "text-amber-600 border border-amber-100",
};

export default async function NewsListPage() {
  const { contents: items } = await getNewsList({ limit: 100 });

  return (
    <>
      <main className="pt-16">

        {/* ── ヒーロー ── */}
        <section className="bg-red-700 relative overflow-hidden" style={{ minHeight: 360 }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bg-white" style={{ width: 56, height: "200%", top: "-50%", left: "58%", transform: "rotate(-19deg)", opacity: 0.04 }} />
            <div className="absolute bg-white" style={{ width: 22, height: "200%", top: "-50%", left: "63%", transform: "rotate(-19deg)", opacity: 0.03 }} />
            <div className="absolute bg-white" style={{ width: 5,  height: "200%", top: "-50%", left: "68%", transform: "rotate(-19deg)", opacity: 0.2 }} />
          </div>
          <span className="absolute top-0 right-0 text-[8rem] lg:text-[13rem] font-black
                            text-white/[0.05] leading-none select-none pointer-events-none whitespace-nowrap">
            NEWS
          </span>

          <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-24">
            <div className="flex items-center gap-2 text-white/50 text-xs font-bold tracking-wide mb-10">
              <Link href="/" className="hover:text-white transition-colors">TOP</Link>
              <span>›</span>
              <span className="text-white/80">NEWS</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-white/50" />
              <p className="text-white/50 text-[11px] font-bold tracking-[0.3em]">
                NEWS
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-3">
              最新情報
            </h1>
            <p className="text-red-200 text-base md:text-lg font-bold">
              プレスリリース・メディア掲載・イベント情報など
            </p>
          </div>
        </section>

        {/* ── 一覧 ── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">

            {items.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 p-12 text-center">
                <p className="text-gray-300 font-black text-sm tracking-[0.3em] mb-2">COMING SOON</p>
                <p className="text-gray-400 text-sm">現在公開中のニュースはありません。</p>
              </div>
            ) : (
              <div className="relative pl-5">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600" />
                <div className="flex flex-col">
                  {items.map((item) => {
                    const cat = primaryCategory(item);
                    return (
                      <Link
                        key={item.id}
                        href={newsHref(item)}
                        className="group py-8 md:py-9 border-b border-gray-100 last:border-none
                                   flex flex-col gap-2.5
                                   hover:bg-gray-50 -ml-5 pl-5 -mr-6 pr-6 md:-mr-12 md:pr-12
                                   transition-colors duration-200"
                      >
                        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <time className="text-[11px] text-gray-300 font-mono tracking-wider flex-shrink-0">
                              {formatNewsDate(item.publishedAt ?? item.createdAt)}
                            </time>
                            <span className={`text-[9px] font-bold tracking-wider px-2.5 py-1 flex-shrink-0 leading-none ${categoryColor[cat]}`}>
                              {cat}
                            </span>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-gray-900 text-xl md:text-2xl font-black leading-snug flex-1 group-hover:text-red-600 transition-colors duration-200">
                              {item.title}
                            </p>
                            <span
                              className="text-red-600 font-black text-base flex-shrink-0 mt-0.5
                                          opacity-0 group-hover:opacity-100
                                          -translate-x-3 group-hover:translate-x-0
                                          transition-all duration-200"
                            >
                              →
                            </span>
                          </div>
                          {item.excerpt && (
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mt-1 max-w-3xl">
                              {item.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-16 md:mt-20">
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700
                           hover:bg-red-600 hover:text-white hover:border-red-600
                           text-[10px] font-bold tracking-[0.2em] px-5 py-2.5
                           transition-all duration-200 active:scale-95"
              >
                ← BACK TO TOP
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
