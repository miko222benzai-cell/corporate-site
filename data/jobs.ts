// RECRUITセクションの求人データ
// data/jobs.ts を編集するだけでページに反映されます。

export interface Job {
  id: number;
  number: string;   // "01" "02" "03" "04"
  title: string;    // 募集職種名
  summary: string;  // 募集内容（1〜2行）
  location: string; // 勤務地
}

export const jobs: Job[] = [
  {
    id: 1,
    number: "01",
    title: "AI/SNSマーケティングスタッフ",
    summary:
      "SNSリサーチ、投稿企画、アカウント運用、数値分析、改善提案。",
    location: "滋賀",
  },
  {
    id: 2,
    number: "02",
    title: "AI動画クリエイター",
    summary:
      "AIツールを活用した台本制作、動画編集、サムネイル制作、動画構成の改善。",
    location: "滋賀",
  },
  {
    id: 3,
    number: "03",
    title: "自社メディア運用スタッフ",
    summary:
      "YouTube、SNS、LINE導線、自社メディアの運用補助。企画から改善まで担当。",
    location: "滋賀",
  },
  {
    id: 4,
    number: "04",
    title: "AI活用・制作アシスタント",
    summary:
      "AIを活用した資料作成、LP・HP制作補助、バナー制作、業務効率化サポート。",
    location: "滋賀",
  },
];

// ── 求める人物像 ──
export interface IdealTrait {
  number: string;       // "01"
  title: string;
  description: string;
}

export const idealTraits: IdealTrait[] = [
  {
    number: "01",
    title: "変化を面白がれる人",
    description: "AIやSNSの変化を前向きに学び、新しいことを試すのが好きな人。",
  },
  {
    number: "02",
    title: "まず動いてみる人",
    description: "完璧を待たず、まずやってみて改善を重ねられる人。",
  },
  {
    number: "03",
    title: "素直に吸収し続けられる人",
    description: "経験の有無よりも、学び続ける姿勢を大切にできる人。",
  },
  {
    number: "04",
    title: "結果から学べる人",
    description:
      "再生数、クリック率、登録数、応募数などを見ながら改善できる人。",
  },
  {
    number: "05",
    title: "関西から新しい仕事をつくりたい人",
    description: "地方・関西から、AI時代の新しい仕事とキャリアをつくっていきたい人。",
  },
];
