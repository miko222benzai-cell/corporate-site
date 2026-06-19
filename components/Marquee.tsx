"use client";

const words = [
  "AI", "×", "SNS", "×", "コンテンツ",
  "CRAZY.", "熱量", "挑戦", "誠実",
  "DATA DRIVEN", "CREATIVE", "DIGITAL", "GROW",
  "ACCELERATE", "AI", "×", "SNS", "×", "コンテンツ",
  "CRAZY.", "熱量", "挑戦", "誠実",
  "DATA DRIVEN", "CREATIVE", "DIGITAL", "GROW", "ACCELERATE",
];

type Variant = "dark" | "red" | "light";

const cfg: Record<Variant, { bg: string; text: string; accent: string }> = {
  dark:  { bg: "bg-gray-900",  text: "text-white/25",  accent: "text-red-500"  },
  red:   { bg: "bg-red-700",   text: "text-white/30",  accent: "text-white"    },
  light: { bg: "bg-gray-100",  text: "text-gray-400",  accent: "text-red-600"  },
};

export default function Marquee({ variant = "dark" }: { variant?: Variant }) {
  const { bg, text, accent } = cfg[variant];
  const items = [...words, ...words]; // 2× for seamless 50% loop

  return (
    <div className={`overflow-hidden py-2.5 ${bg}`} aria-hidden>
      <div className={`flex whitespace-nowrap animate-marquee`}>
        {items.map((w, i) => (
          <span
            key={i}
            className={`mx-6 text-[10px] font-black tracking-[0.3em] flex-shrink-0 ${
              w === "×" || w === "CRAZY." ? accent : text
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
