import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import {
  getAllNews,
  getNewsDetail,
  formatNewsDate,
  primaryCategory,
  type NewsCategory,
} from "@/lib/microcms";

// ISR：60秒ごとに再生成。未知の slug/id は初回アクセス時に SSG。
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const all = await getAllNews();
  // slug があれば slug、無ければ content ID をパラメータとして登録
  return all.map((item) => ({
    slug: item.slug && item.slug.length > 0 ? item.slug : item.id,
  }));
}

type PageParams = Promise<{ slug: string }>;
type PageSearchParams = Promise<{ draftKey?: string }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const { draftKey } = await searchParams;
  const item = await getNewsDetail(slug, draftKey);
  if (!item) return {};
  return {
    title: `${item.title} | Crazy株式会社`,
    description: item.excerpt,
    robots: draftKey ? { index: false, follow: false } : undefined,
  };
}

const categoryColor: Record<NewsCategory, string> = {
  お知らせ:       "text-gray-500 border border-gray-200 bg-white",
  プレスリリース: "bg-red-600 text-white",
  メディア掲載:   "text-blue-500 border border-blue-200 bg-white",
  イベント:       "text-amber-600 border border-amber-100 bg-white",
};

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: PageSearchParams;
}) {
  const { slug } = await params;
  const { draftKey } = await searchParams;
  const item = await getNewsDetail(slug, draftKey);
  if (!item) notFound();

  const cat = primaryCategory(item);
  const dateStr = formatNewsDate(item.publishedAt ?? item.createdAt);

  return (
    <>
      <main className="pt-16">

        {/* プレビューモード時のバー */}
        {draftKey && (
          <div className="bg-amber-400 text-amber-950 text-center text-xs font-bold tracking-wider py-2 px-4">
            PREVIEW MODE — この記事は下書き状態です（公開されていません）
          </div>
        )}

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
            <div className="flex items-center gap-2 text-white/50 text-xs font-bold tracking-wide mb-10 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">TOP</Link>
              <span>›</span>
              <Link href="/news" className="hover:text-white transition-colors">NEWS</Link>
              <span>›</span>
              <span className="text-white/80 truncate max-w-[60vw]">{item.title}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`text-[10px] font-bold tracking-[0.25em] px-3 py-1.5 leading-none ${categoryColor[cat]}`}>
                {cat}
              </span>
              <time className="text-white/70 text-[12px] font-mono tracking-wider">
                {dateStr}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {item.title}
            </h1>
          </div>
        </section>

        {/* ── アイキャッチ画像（タイトル下・本文上、microCMSの image フィールド） ── */}
        {item.image && (
          <div className="bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-12 md:-mt-16 relative z-10">
              <div
                className="relative overflow-hidden bg-gray-100 shadow-xl"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={item.image.url}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── 本文 ── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[2px] bg-red-600" />
              <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">DETAILS</p>
            </div>

            <article
              className="news-body text-gray-700 text-base md:text-[17px] leading-[2]"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />

            <div className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-4 sm:gap-3">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700
                           hover:bg-red-600 hover:text-white hover:border-red-600
                           text-[10px] font-bold tracking-[0.2em] px-5 py-2.5
                           transition-all duration-200 active:scale-95"
              >
                ← NEWS一覧へ
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white
                           text-[10px] font-bold tracking-[0.2em] px-5 py-2.5
                           transition-all duration-200 active:scale-95"
              >
                お問い合わせ →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
