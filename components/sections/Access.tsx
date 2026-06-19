"use client";

import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/data/siteConfig";

const rows: { label: string; value: string }[] = [
  { label: "会社名",     value: siteConfig.nameJa },
  { label: "代表者",     value: siteConfig.info.ceo },
  {
    label: "所在地",
    value: `${siteConfig.info.address}\n\n${siteConfig.info.address2}`,
  },
  { label: "E-MAIL",     value: siteConfig.info.email },
  { label: "事業内容",   value: siteConfig.info.business },
];

export default function Access() {
  const mapUrl = siteConfig.info.mapEmbedUrl;

  return (
    <section
      id="access"
      className="py-24 md:py-36 bg-white relative overflow-hidden"
    >
      {/* 背景大文字 */}
      <span className="absolute top-0 right-0 text-[10rem] lg:text-[13rem] font-black text-red-600/[0.05] leading-none select-none pointer-events-none">
        ACCESS
      </span>

      {/* 上端赤ライン */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
        <FadeIn>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-red-600" />
              <p className="text-red-600 text-[11px] font-bold tracking-[0.3em]">
                ACCESS
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              会社概要・アクセス
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* 会社概要テーブル */}
          <FadeIn>
            <dl className="flex flex-col">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex gap-6 py-4 border-b border-gray-100 last:border-none group"
                >
                  <dt className="text-[11px] font-bold tracking-wide text-red-600 w-24 flex-shrink-0 pt-0.5 opacity-85">
                    {row.label}
                  </dt>
                  <dd className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors break-words min-w-0 whitespace-pre-line">
                    {row.value || <span className="text-gray-300">—</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          {/* マップ */}
          <FadeIn delay={0.15}>
            <MapBlock
              mapUrl={mapUrl}
              fallbackAddress={siteConfig.info.address}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────
// マップ表示：iframe URL があれば実マップ、無ければプレースホルダ
// ──────────────────────────────────────────────────────────
function MapBlock({
  mapUrl,
  fallbackAddress,
}: {
  mapUrl: string;
  fallbackAddress: string;
}) {
  if (mapUrl && mapUrl.length > 0) {
    return (
      <div className="relative w-full bg-white">
        <div className="absolute top-0 inset-x-0 h-[3px] bg-red-600 z-10" />
        <iframe
          src={mapUrl}
          title="アクセスマップ"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full h-[380px] md:h-[440px] lg:h-[480px] block border-0"
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] md:h-[440px] md:aspect-auto overflow-hidden bg-white flex items-center justify-center relative hover:shadow-[0_0_40px_rgba(220,38,38,0.12)] transition-shadow duration-500">
      <div className="absolute top-0 inset-x-0 h-[3px] bg-red-600" />
      <div className="text-center text-gray-300 px-8">
        <svg
          className="w-12 h-12 mx-auto mb-3 text-red-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <p className="text-xs tracking-wide text-gray-400 mb-2">
          MAP PLACEHOLDER
        </p>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {fallbackAddress}
        </p>
      </div>
    </div>
  );
}
