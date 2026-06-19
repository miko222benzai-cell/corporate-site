"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

// ──────────────────────────────────────────────────────────
// ナビ定義
//   id          : home上のセクションID（URLハッシュにもなる）
//   matchPaths  : このURLパターンならactive扱いにする（pathnameと照合）
// ──────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  id: string;
  matchPaths?: RegExp[];
};

const navItems: NavItem[] = [
  { label: "HOME",       id: "top",        matchPaths: [/^\/$/] },
  { label: "WE DO",      id: "what-we-do", matchPaths: [/^\/services(\/|$)/] },
  { label: "PHILOSOPHY", id: "philosophy" },
  { label: "TALENT",     id: "talent" },
  { label: "RECRUIT",    id: "recruit",    matchPaths: [/^\/recruit(\/|$)/] },
  { label: "NEWS",       id: "news",       matchPaths: [/^\/news(\/|$)/] },
  { label: "ACCESS",     id: "access" },
  { label: "CONTACT",    id: "contact" },
];

/** id → 遷移URL。HOMEは "/"、それ以外はホームのアンカー。 */
function hrefFor(id: string) {
  return id === "top" ? "/" : `/#${id}`;
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // スクロール検出（全ページ）
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // セクションscrollspy（home限定）
  useEffect(() => {
    if (!isHome) return;
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-64px 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  /** active判定：home上は scrollspy、それ以外は matchPaths で URL マッチ */
  const isActive = (item: NavItem) => {
    if (!isHome) {
      return item.matchPaths?.some((re) => re.test(pathname)) ?? false;
    }
    return activeId === item.id;
  };

  /** クリック挙動：homeなら preventDefault してスムーズスクロール、それ以外は Link 任せで遷移 */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    setMenuOpen(false);
    if (!isHome) return; // /news/xxx 等からは Link でホームへ普通に遷移
    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.07)]"
            : "bg-white border-b border-gray-100/60"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "top")}
            className="font-black text-lg tracking-tight text-gray-900 select-none
                       hover:text-red-600 transition-colors duration-200 group flex items-end gap-0"
          >
            <span className="group-hover:tracking-widest transition-[letter-spacing] duration-300">
              {siteConfig.name}
            </span>
            <motion.span
              className="text-red-600"
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              .
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.id}
                  href={hrefFor(item.id)}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative group px-3 py-5 text-[10.5px] font-bold tracking-[0.16em] transition-all duration-200 ${
                    active ? "text-red-600" : "text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {item.label}

                  {/* Active underline */}
                  <span
                    className={`absolute bottom-3 left-3 right-3 h-[1.5px] bg-red-600 transition-all duration-300 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } origin-left`}
                  />

                  {/* Hover underline (inactive only) */}
                  {!active && (
                    <span className="absolute bottom-3 left-3 right-3 h-px bg-gray-300
                                     scale-x-0 group-hover:scale-x-100
                                     transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="ml-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-[10.5px] font-bold tracking-[0.16em]
                         transition-all duration-200 active:scale-95
                         hover:shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
            >
              CONTACT
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center gap-[5px] items-center"
            aria-label="メニュー"
          >
            <span
              className="block w-5 h-[1.5px] bg-gray-900 transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3.5px)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-gray-900 transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-gray-900 transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3.5px)" : "none" }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-350 ${
            menuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
          }`}
        >
          <nav className="px-6 py-2 flex flex-col bg-white">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.id}
                  href={hrefFor(item.id)}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-left text-[12px] font-bold tracking-[0.16em] py-4 border-b border-gray-50 transition-colors last:border-none flex items-center justify-between ${
                    active ? "text-red-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="mt-3 mb-4 w-full py-3 bg-red-600 text-white text-[11px] font-bold tracking-[0.2em] transition-colors hover:bg-red-700 text-center"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
