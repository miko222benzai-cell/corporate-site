// ──────────────────────────────────────────────────────────
// 会社の進化を視覚的に伝える HISTORY タイムラインデータ。
//
// 画像差し替え:
//   /public/images/history/ 配下のファイルを上書きするだけ。
//   image パスは下記のとおり固定（拡張子は jpg/jpeg/png/webp/avif どれでもOK）。
// ──────────────────────────────────────────────────────────

export interface HistoryItem {
  number: string;       // "01" 〜 "05"
  phase: string;        // 章タイトル（例: "創業期"）
  title: string;        // 見出し
  body: string;         // 説明文
  image: string;        // 画像パス（/public 起点）
}

export const historyData: HistoryItem[] = [
  {
    number: "01",
    phase: "創業期",
    title: "エンターテイメント事業からスタート",
    body:
      "インフルエンサー、ライバー、クリエイター領域を中心に、タレントマネジメントや発信支援を行う会社としてスタート。人が何に惹かれ、どんな発信で動くのかを現場で学び続けてきました。",
    image: "/images/history/history-01.png",
  },
  {
    number: "02",
    phase: "SNS運用期",
    title: "発信力とコンテンツ制作のノウハウを蓄積",
    body:
      "SNS運用、動画制作、クリエイティブ制作などを通じて、発信を伸ばすための企画・制作・分析の知見を蓄積。一過性のバズではなく、成果につながる発信の在り方を追求してきました。",
    image: "/images/history/history-02.png",
  },
  {
    number: "03",
    phase: "AI転換期",
    title: "AI活用により、事業モデルが進化",
    body:
      "AIの進化により、リサーチ、企画、台本制作、動画編集、分析改善の在り方が大きく変化。Crazy株式会社はその変化を取り入れ、AI×SNSマーケティングを軸にした事業へと転換しました。",
    image: "/images/history/history-03.png",
  },
  {
    number: "04",
    phase: "現在",
    title: "AI×SNSマーケティングの勝ち筋を構築",
    body:
      "SNS・動画・LINEを組み合わせ、自社メディアで実践と検証を重ねながら、集客・採用・ブランドづくりにつながる仕組みを構築。AI時代のSNSマーケティングの勝ち筋をつくっています。",
    image: "/images/history/history-04.png",
  },
  {
    number: "05",
    phase: "これから",
    title: "関西から、AI時代のマーケターを育てる",
    body:
      "AIを使いこなすマーケターの育成に力を入れ、関西からAI時代に必要とされる人材と新しい仕事を増やしていきます。",
    image: "/images/history/history-05.png",
  },
];
