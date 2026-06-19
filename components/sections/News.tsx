"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import {
  type NewsItem,
  type NewsCategory,
  formatNewsDate,
  primaryCategory,
  newsHref,
} from "@/lib/microcms";

const categoryColor: Record<NewsCategory, string> = {
  お知らせ:       "text-gray-400 border border-gray-200",
  プレスリリース: "bg-red-600 text-white",
  メディア掲載:   "text-blue-500 border border-blue-200",
  イベント:       "text-amber-600 border border-amber-100",
};

const categoryHover: Record<NewsCategory, string> = {
  お知らせ:       "group-hover:border-white/30 group-hover:text-white/70",
  プレスリリース: "group-hover:bg-white group-hover:text-red-600",
  メディア掲載:   "group-hover:border-white/30 group-hover:text-white/70",
  イベント:       "group-hover:border-white/30 group-hover:text-white/70",
};

const ease = [0.22, 0.61, 0.36, 1] as const;

interface NewsProps {
  /** TOPに表示する最新ニュース（最大3件想定。サーバーコンポーネントから渡す） */
  items: NewsItem[];
}

export default function News({ items }: NewsProps) {
  const [featured, ...rest] = items;

  return (
    <section
      id="news"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* 背景大文字 */}
      <span className="absolute -top-4 left-0 text-[13rem] lg:text-[22rem] font-black
                        text-red-600/[0.06] leading-none select-none pointer-events-none whitespace-nowrap">
        NEWS
      </span>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">

        {/* ヘッダー */}
        <FadeIn>
          <div className="mb-12 md:mb-16 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                  style={{ transformOrigin: "left" }}
                  className="w-8 h-[2px] bg-red-600"
                />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">NEWS</p>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                最新情報
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700
                         hover:bg-red-600 hover:text-white hover:border-red-600
                         text-[10px] font-bold tracking-[0.2em] px-5 py-2.5
                         transition-all duration-200 active:scale-95 flex-shrink-0 mb-2"
            >
              VIEW ALL →
            </Link>
          </div>
        </FadeIn>

        {items.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-300 font-black text-sm tracking-[0.3em] mb-2">COMING SOON</p>
            <p className="text-gray-400 text-sm">現在公開中のニュースはありません。</p>
          </div>
        ) : (
          <>
            {/* ── FEATURED 最新記事 ── */}
            {featured && (
              <FadeIn>
                <Link
                  href={newsHref(featured)}
                  className="group block relative overflow-hidden bg-gray-50 border-l-[4px] border-red-600
                             hover:bg-red-600 transition-all duration-300 cursor-pointer"
                >
                  <FeaturedContent item={featured} />
                </Link>
              </FadeIn>
            )}

            {/* ── 残りのニュースリスト ── */}
            {rest.length > 0 && (
              <div className="relative pl-5 mt-px">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease }}
                  style={{ transformOrigin: "top" }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600"
                />
                <div className="flex flex-col">
                  {rest.map((item, i) => (
                    <FadeIn key={item.id} delay={i * 0.07} direction="right" distance={24}>
                      <Link
                        href={newsHref(item)}
                        className="group py-8 md:py-9 border-b border-gray-100 last:border-none
                                   flex flex-col gap-2.5
                                   hover:bg-gray-50 -ml-5 pl-5 -mr-6 pr-6 md:-mr-12 md:pr-12
                                   transition-colors duration-200"
                      >
                        <NewsContent item={item} />
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* モバイル VIEW ALL */}
        <FadeIn delay={0.2}>
          <div className="mt-10 sm:hidden">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700
                         hover:bg-red-600 hover:text-white hover:border-red-600
                         text-[10px] font-bold tracking-[0.2em] px-5 py-2.5
                         transition-all duration-200 active:scale-95"
            >
              VIEW ALL NEWS →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturedContent({ item }: { item: NewsItem }) {
  const cat = primaryCategory(item);
  const catHover = categoryHover[cat];
  const catColor = categoryColor[cat];

  return (
    <div className="p-8 md:p-10 xl:p-12 relative">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="bg-red-600 text-white text-[9px] font-black tracking-[0.25em] px-3 py-1.5
                     group-hover:bg-white group-hover:text-red-600 transition-colors duration-300 flex-shrink-0">
          FEATURED
        </span>
        <span className={`text-[9px] font-bold tracking-wider px-2.5 py-1 flex-shrink-0 leading-none
                      ${catColor} ${catHover} transition-colors duration-300`}>
          {cat}
        </span>
        <time className="text-[11px] text-gray-400 font-mono tracking-wider
                     group-hover:text-white/50 transition-colors duration-300">
          {formatNewsDate(item.publishedAt ?? item.createdAt)}
        </time>
      </div>

      <div className="flex items-start justify-between gap-6">
        <h3 className="text-2xl md:text-3xl xl:text-[2.5rem] font-black text-gray-900 leading-snug
                     group-hover:text-white transition-colors duration-300 max-w-3xl">
          {item.title}
        </h3>
        <span className="text-red-600 font-black text-xl flex-shrink-0 mt-1
                     group-hover:text-white group-hover:translate-x-1
                     transition-all duration-300 hidden sm:block">
          →
        </span>
      </div>
    </div>
  );
}

function NewsContent({ item }: { item: NewsItem }) {
  const cat = primaryCategory(item);
  return (
    <>
      <div className="flex items-center gap-3">
        <time className="text-[11px] text-gray-300 font-mono tracking-wider flex-shrink-0">
          {formatNewsDate(item.publishedAt ?? item.createdAt)}
        </time>
        <span className={`text-[9px] font-bold tracking-wider px-2.5 py-0.5 flex-shrink-0 leading-none py-1 ${categoryColor[cat]}`}>
          {cat}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <p className="text-gray-900 text-xl md:text-2xl font-black leading-snug flex-1 group-hover:text-red-600 transition-colors duration-200">
          {item.title}
        </p>
        <span className="text-red-600 font-black text-base flex-shrink-0 mt-0.5
                      opacity-0 group-hover:opacity-100
                      -translate-x-3 group-hover:translate-x-0
                      transition-all duration-200">
          →
        </span>
      </div>
    </>
  );
}
