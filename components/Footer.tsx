"use client";

import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "WHAT WE DO", href: "/#what-we-do" },
  { label: "PHILOSOPHY", href: "/#philosophy" },
  { label: "TALENT",     href: "/#talent" },
  { label: "RECRUIT",    href: "/#recruit" },
  { label: "NEWS",       href: "/#news" },
  { label: "ACCESS",     href: "/#access" },
  { label: "CONTACT",    href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-0 pb-8">
      {/* 赤いトップアクセントライン */}
      <div className="h-1 bg-red-600" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
          {/* ブランド */}
          <div>
            <p className="text-3xl font-black tracking-tight mb-1">
              {siteConfig.name}
              <span className="text-red-600">.</span>
            </p>
            <p className="text-gray-500 text-xs mb-5">{siteConfig.nameJa}</p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* ナビ */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-red-400 text-[11px] font-semibold tracking-[0.2em] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ソーシャル */}
        {Object.values(siteConfig.social).some(Boolean) && (
          <div className="flex gap-4 mb-12">
            {siteConfig.social.twitter && (
              <SocialLink href={siteConfig.social.twitter} label="X / Twitter">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </SocialLink>
            )}
            {siteConfig.social.instagram && (
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </SocialLink>
            )}
            {siteConfig.social.youtube && (
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </SocialLink>
            )}
            {siteConfig.social.note && (
              <SocialLink href={siteConfig.social.note} label="note">
                <path d="M14.4 3H4.8A1.8 1.8 0 003 4.8v14.4A1.8 1.8 0 004.8 21h14.4a1.8 1.8 0 001.8-1.8V9.6L14.4 3zm0 1.8l3.6 3.6H14.4V4.8zM7.2 16.2V14.4h9.6v1.8H7.2zm0-3.6V10.8h9.6v1.8H7.2z" />
              </SocialLink>
            )}
          </div>
        )}

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-gray-600 text-[11px]">
            &copy; {new Date().getFullYear()} {siteConfig.nameJa}. All rights
            reserved.
          </p>
          <p className="text-gray-700 text-[10px] tracking-widest">
            {siteConfig.info.address}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-200"
    >
      <svg
        className="w-4 h-4 fill-gray-400 group-hover:fill-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </a>
  );
}
