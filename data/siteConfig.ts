// ──────────────────────────────────────────────────────────
// サイト全体の設定・テキストを一元管理するファイルです。
// ここを編集すれば各セクションに自動で反映されます。
// ──────────────────────────────────────────────────────────

export const siteConfig = {
  // 会社名（ナビゲーション・フッターなどに表示）
  name: "CRAZY",
  nameJa: "Crazy株式会社",

  // キャッチコピー・説明文
  tagline: "熱量ある挑戦を、AIで加速する。",
  description:
    "AI×SNS×コンテンツを活用し、事業成長を支援するクリエイティブカンパニー。",

  // 会社概要（Accessセクション）
  info: {
    ceo: "坂東大毅",
    address: "〒520-0044 滋賀県大津市京町3-4-2 MORITA BUILDING 2F",
    address2: "〒556-0005 大阪府大阪市浪速区日本橋3-4-9 エグゼレジデンスタワー301",
    email: "info@example.com",
    business: "AIコンサルティング、コンテンツ制作・運用、クリエイティブ制作",
    /**
     * Google Maps の埋め込みURL。
     * Googleマップ → 共有 → 地図を埋め込む → コピーした iframe の `src` の値だけを貼り付け。
     * 未設定（空文字）のままなら、ACCESSセクションでは MAP PLACEHOLDER を表示します。
     */
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.0500309285258!2d135.8677497!3d35.0054527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60010cf7ad54a29b%3A0xbfa4ff99808592e6!2zTU9SSVRBIEJVSUxESU5HLCDvvJPkuIHnm64t77yULe-8kiDkuqznlLog5aSn5rSl5biCIOa7i-izgOecjCA1MjAtMDA0NA!5e0!3m2!1sja!2sjp!4v1779539102321!5m2!1sja!2sjp",
  },

  // 代表メッセージ
  ceo: {
    name: "坂東大毅",
    nameEn: "Daiki Bando",
    role: "代表取締役 CEO",
    image: "/images/ceo.jpg",
    quote: "熱量こそが、最大の競争優位だ。",
    message:
      "私たちは「熱量」を何より大切にしています。テクノロジーが進化する時代に、人間の熱量こそが最大の競争優位だと信じています。AI×SNS×コンテンツという掛け算で、クライアントの挑戦を本気で加速させる。それがCrazyの存在意義です。肩書きではなく、本気の熱量でご連絡ください。一緒にやりましょう。",
  },

  // ソーシャルリンク（不要なものは空文字に）
  social: {
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    note: "",
  },
};
