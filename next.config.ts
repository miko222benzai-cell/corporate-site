import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// microCMS の画像配信ホスト
const MICROCMS_IMG_HOST = "https://images.microcms-assets.io";

// development では Next.js / Turbopack の HMR が eval を使うため
// 'unsafe-eval' を許可する必要がある。production では入れない。
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
].join(" ");

// dev では HMR の WebSocket（ws://localhost:*）と Turbopack 通信のため
// connect-src を緩める。production は 'self' のみ。
const connectSrc = [
  "'self'",
  ...(isDev ? ["ws://localhost:*", "http://localhost:*"] : []),
].join(" ");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src 'self' data: blob: ${MICROCMS_IMG_HOST}`,
  `connect-src ${connectSrc}`,
  // ACCESSセクションのGoogleマップiframe埋め込みを許可
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${MICROCMS_IMG_HOST}/**`)],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
