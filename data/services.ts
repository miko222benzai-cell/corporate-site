// WHAT WE DO セクションのサービス一覧
// ここにサービスを追加・編集すると自動で画面に反映されます。
// description は \n 改行を含み、カード側で whitespace-pre-line により段落表示されます。

export interface Service {
  id: number;
  number: string;
  slug: string;
  title: string;
  titleEn: string;
  tagline: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    id: 1,
    number: "01",
    slug: "ai-strategy",
    title: "AI × SNSマーケティング事業",
    titleEn: "AI × SNS Marketing",
    tagline:
      "AIとSNSを活用し、発信を集客・採用・ブランドづくりにつなげる事業。",
    description:
      "SNS・動画・LINEを組み合わせ、\n発信を一過性のバズで終わらせず、\n集客・採用・ブランドづくりにつながる仕組みへ変えていきます。\n\n自社メディアで実践と検証を重ねながら、\nAI時代のSNSマーケティングの勝ち筋をつくっています。",
    tags: [
      "SNSマーケティング",
      "自社メディア",
      "LINE導線",
      "YouTube運用",
      "ブランディング",
    ],
  },
  {
    id: 2,
    number: "02",
    slug: "sns-content",
    title: "AI人材・マーケター育成",
    titleEn: "AI Human Development",
    tagline:
      "AI時代に必要なマーケティング人材を育てる事業。",
    description:
      "AI、SNS、動画、LINEを実践の中で学び、\n集客・採用・ブランドづくりを担えるマーケターを育成します。\n\n未経験からでも、\n制作・運用・分析を経験しながら、\nAI時代に必要とされる人材を関西から増やしていきます。",
    tags: [
      "AI人材育成",
      "SNSマーケター",
      "未経験育成",
      "動画制作",
      "実践型教育",
    ],
  },
  {
    id: 3,
    number: "03",
    slug: "creative",
    title: "AI活用支援・クリエイティブ制作",
    titleEn: "AI Creative Solution",
    tagline:
      "AIを活用し、企業の業務改善やクリエイティブ制作を支援する事業。",
    description:
      "AIを活用した業務効率化、\n資料作成、\nLP・ホームページ制作、\nバナーや動画などのクリエイティブ制作を支援します。\n\n社内で育成したAI人材の力を活かし、\n企業の現場に合わせた実践的なAI活用を広げていきます。",
    tags: [
      "AI業務効率化",
      "LP制作",
      "HP制作",
      "クリエイティブ制作",
      "法人支援",
    ],
  },
];
