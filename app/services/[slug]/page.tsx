import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import ServiceHeroVisual from "@/components/ServiceHeroVisual";
import { services } from "@/data/services";
import { serviceDetails } from "@/data/serviceDetails";
import { resolveServiceImage } from "@/lib/publicImage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: `${svc.title} | Crazy株式会社`,
    description: svc.description.replace(/\n+/g, " "),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!svc || !detail) notFound();
  const imageSrc = resolveServiceImage(slug);

  return (
    <>
      <main className="pt-16">

        {/* ── HERO + OVERVIEW（左右2カラム）── */}
        <section className="relative bg-white overflow-hidden">
          {/* 背景：超巨大な英字（両カラムをまたぐブランドポスター調） */}
          <span
            aria-hidden="true"
            className="absolute top-0 inset-x-0 text-center font-black
                       text-red-600/[0.10] leading-[0.85] select-none pointer-events-none whitespace-nowrap tracking-tighter
                       text-[5rem] sm:text-[9rem] md:text-[13rem] lg:text-[17rem] xl:text-[20rem]"
          >
            {svc.titleEn}
          </span>

          {/* パンくず（最上段に控えめに） */}
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 pt-6 md:pt-10">
            <div className="flex items-center gap-2 text-gray-400 text-[11px] font-bold tracking-wide">
              <Link href="/" className="hover:text-red-600 transition-colors">TOP</Link>
              <span>›</span>
              <Link href="/#what-we-do" className="hover:text-red-600 transition-colors">WHAT WE DO</Link>
              <span>›</span>
              <span className="text-gray-700">{svc.titleEn}</span>
            </div>
          </div>

          <div className="relative max-w-screen-2xl mx-auto grid lg:grid-cols-2 lg:gap-0">
            {/* 左：テキスト */}
            <div className="order-2 lg:order-1 relative z-10
                            px-6 md:px-12 lg:px-16 xl:px-20
                            py-16 md:py-24 lg:py-28
                            flex flex-col justify-center">

              {/* "01 — WHAT WE DO" ラベル */}
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="w-10 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">
                  {svc.number} — WHAT WE DO
                </p>
              </div>

              {/* タイトル */}
              <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem]
                             font-black text-gray-900 leading-[1.04] tracking-tight mb-6 md:mb-8">
                {renderTitleWithRedAi(svc.title)}
              </h1>

              {/* サブコピー（tagline） */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-[1.7] font-medium max-w-xl mb-8 md:mb-10">
                {detail.tagline}
              </p>

              {/* 区切り赤バー */}
              <span className="block w-14 h-[3px] bg-red-600 mb-12 md:mb-16" />

              {/* OVERVIEW */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">OVERVIEW</p>
              </div>

              <div className="flex flex-col gap-7 max-w-xl">
                {detail.overview.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-600 text-[15px] md:text-base leading-[2.1] whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* 右：ビジュアル */}
            <div className="order-1 lg:order-2 relative">
              <ServiceHeroVisual
                imageSrc={imageSrc}
                number={svc.number}
                titleEn={svc.titleEn}
                alt={svc.title}
              />
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-14">
              <div className="w-8 h-[2px] bg-red-600" />
              <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">WHAT WE DO</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {detail.whatWeDo.map((f, i) => (
                <div
                  key={i}
                  className="bg-white p-8 xl:p-10 relative group hover:bg-gray-50 transition-colors"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600
                                   scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <span className="text-red-600 font-black text-[11px] tracking-[0.2em] font-mono block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-[15px] leading-[2] whitespace-pre-line">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MESSAGE ── */}
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          {/* 背景：薄い赤の巨大英字 */}
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] lg:text-[13rem] font-black
                       text-red-600/[0.08] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter"
          >
            MESSAGE
          </span>

          {/* 右上の細い赤コーナーマーク */}
          <div aria-hidden="true" className="absolute top-10 right-6 sm:right-12 pointer-events-none">
            <div className="flex flex-col items-end gap-2">
              <span className="block w-16 sm:w-20 h-[3px] bg-red-600" />
              <span className="block w-8 sm:w-10 h-[2px] bg-red-600/60" />
            </div>
          </div>

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-[2px] bg-red-600" />
                <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">MESSAGE</p>
              </div>

              <div className="border-l-4 border-red-600 pl-6 md:pl-10 py-2">
                {detail.message.map((para, i) => (
                  <p
                    key={i}
                    className="text-gray-700 text-base md:text-lg leading-[2.1] mb-7 last:mb-0 whitespace-pre-line font-medium"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
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
                まずはご相談ください。
              </h2>
              <p className="text-red-100 text-sm mt-4 max-w-sm">
                お気軽にお問い合わせください。2営業日以内にご返信いたします。
              </p>
            </div>
            <Link
              href="/#contact"
              className="flex-shrink-0 inline-flex items-center bg-white text-red-600
                         hover:bg-red-50 active:scale-95 font-black text-sm tracking-wide
                         px-10 py-5 transition-all duration-200 shadow-xl gap-3"
            >
              お問い合わせ
              <span className="text-lg">→</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/**
 * タイトル先頭の "AI" を赤で強調する（"AI戦略設計" → AIは赤）。
 * AI 始まりでなければそのまま返す。
 */
function renderTitleWithRedAi(title: string) {
  if (title.startsWith("AI")) {
    return (
      <>
        <span className="text-red-600">AI</span>
        {title.slice(2)}
      </>
    );
  }
  return title;
}
