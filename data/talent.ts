// 所属タレントデータ
// image: public/images/talent/ 配下に画像を置いてパスを設定してください

export interface Talent {
  id: number;
  name: string;
  nameEn: string;
  genres: string[];
  bio: string;
  image?: string;
  sns: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export const talents: Talent[] = [
  {
    id: 1,
    name: "10人ニキ",
    nameEn: "JUNIN NIKI",
    genres: ["不良", "格闘系YouTuber", "TikTok"],
    bio: "「1対10の喧嘩に勝った不良」としてSNSを中心に話題沸騰。その圧倒的な存在感とアウトローな生き様で数十万フォロワーを獲得。YouTube・TikTokでは喧嘩・格闘・素顔のドキュメントを発信し、既存のインフルエンサー像を覆す異端のクリエイター。",
    image: "/images/talent/junin-niki.png",
    sns: {
      youtube:   "https://youtube.com/@juninniki?si=RttGhSNCGflrRFQa",
      instagram: "https://www.instagram.com/daisuke_skwat?igsh=N3YyajNrcm9ubGh1",
      twitter:   "https://x.com/daisuke_sdsk",
      tiktok:    "https://www.tiktok.com/@daisuke_sdsk?_r=1&_t=ZS-96bLjUbgEK2",
    },
  },
];
