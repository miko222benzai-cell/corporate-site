"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" className="relative bg-white overflow-hidden">
      <div
        className="relative flex"
        style={{ minHeight: "min(780px, calc(100dvh - 80px))", paddingTop: "40px" }}
      >
        {/* ── LEFT: Text ── */}
        <div className="relative z-10 w-full lg:w-[54%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-16 py-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-0.5 bg-red-600 flex-shrink-0" />
            <span className="text-red-600 text-[11px] sm:text-xs font-bold tracking-[0.3em] whitespace-nowrap">
              AI × SNS MARKETING COMPANY
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="font-black leading-[1.08] tracking-tight text-gray-900 mb-4 [text-wrap:balance]
                       text-[clamp(1.7rem,6vw,2.2rem)] sm:text-[2.8rem] lg:text-[2.7rem] xl:text-[3.4rem] 2xl:text-[3.9rem]"
          >
            <span className="text-red-600">AI</span>で、
            <br />
            SNSマーケティングの
            <br />
            勝ち筋をつくる。
          </motion.h1>

          {/* Red accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            style={{ transformOrigin: "left" }}
            className="w-16 h-[2px] bg-red-600 mb-4"
          />

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="text-gray-500 text-base lg:text-[1.05rem] leading-[1.8] mb-6 max-w-md font-normal"
          >
            発信を、集客・採用・ブランドづくりの仕組みへ。
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/#what-we-do"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold tracking-wide px-8 py-4 transition-all duration-200 shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
            >
              事業内容を見る →
            </Link>
            <Link
              href="/recruit"
              className="inline-flex items-center border border-gray-200 bg-white text-gray-800 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 text-sm font-bold tracking-wide px-8 py-4 transition-all duration-200"
            >
              採用情報を見る →
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden lg:flex flex-col items-center gap-2 absolute bottom-8 left-14 xl:left-16"
          >
            <span className="text-gray-300 text-[9px] tracking-[0.4em] font-semibold">
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-red-400 to-transparent"
            />
          </motion.div>
        </div>

        {/* ── RIGHT: Photo grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:block absolute right-0 top-0 w-[52%] h-full overflow-hidden"
          style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="flex flex-col h-full">
            {/* Panel 1: Red */}
            <div className="relative flex-[1.15] bg-gradient-to-br from-red-900 via-red-700 to-red-800 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_40%,rgba(255,90,90,0.45),transparent)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(180,0,0,0.5),transparent)]" />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Panel 2: B&W office + Red card */}
            <div className="flex flex-[1.5] min-h-0">
              <div className="relative flex-[1.4] overflow-hidden">
                <Image
                  src="/hero-office.png"
                  alt="office"
                  fill
                  className="object-cover object-center grayscale"
                  sizes="30vw"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              {/* Red info card */}
              <div className="relative flex-[1] bg-red-600 flex flex-col justify-end p-6 xl:p-8 overflow-hidden">
                <div className="absolute top-3 right-3 text-red-500 text-[80px] font-black leading-none opacity-25 select-none">
                  +
                </div>
                <p className="text-white font-black text-lg xl:text-xl leading-[1.55] mb-3 relative z-10">
                  関西から、
                  <br />
                  AI時代の
                  <br />
                  マーケターを。
                </p>
                <p className="text-red-200 text-[10px] tracking-[0.18em] font-bold relative z-10">
                  ACCELERATE THE FUTURE.
                </p>
              </div>
            </div>

            {/* Panel 3: Network / city */}
            <div className="relative flex-[1.05] overflow-hidden bg-gray-950">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(220,38,38,0.9) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_60%,rgba(220,38,38,0.25),transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* White diagonal speed lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bg-white" style={{ width: "14px", height: "160%", top: "-30%", left: "8%",   transform: "rotate(-19deg)", opacity: 0.8 }} />
            <div className="absolute bg-white" style={{ width: "6px",  height: "160%", top: "-30%", left: "13.5%", transform: "rotate(-19deg)", opacity: 0.4 }} />
            <div className="absolute bg-white" style={{ width: "3px",  height: "160%", top: "-30%", left: "16.5%", transform: "rotate(-19deg)", opacity: 0.2 }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
