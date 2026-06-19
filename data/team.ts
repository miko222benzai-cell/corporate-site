// TALENTセクションのメンバーデータ
// imageは後から実際の画像パスに差し替えてください（public/images/配下を推奨）

export interface TeamMember {
  id: number;
  name: string;
  nameEn: string;
  role: string;
  bio: string;
  image?: string; // 未設定の場合はイニシャルアバターを表示
  color: string;  // アバター背景色（imageがない場合に使用）
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "山田 太郎",
    nameEn: "Taro Yamada",
    role: "代表取締役 CEO",
    bio: "大手コンサルファームを経て独立。AI×コンテンツ領域での事業戦略を専門とする。「熱量が事業を動かす」を信念に、クライアントの成長を支援。",
    color: "#dc2626",
  },
  {
    id: 2,
    name: "佐藤 花子",
    nameEn: "Hanako Sato",
    role: "COO / プロデューサー",
    bio: "SNSマーケティング歴8年。YouTube・Instagramを中心に複数チャンネルの立ち上げ・グロースを手がける。再生数1億回以上のコンテンツを多数制作。",
    color: "#111111",
  },
  {
    id: 3,
    name: "田中 一郎",
    nameEn: "Ichiro Tanaka",
    role: "CTO / AIエンジニア",
    bio: "機械学習・LLM活用の専門家。大企業のAI導入から中小企業の業務自動化まで幅広く対応。わかりやすいAI実装が得意。",
    color: "#dc2626",
  },
  {
    id: 4,
    name: "鈴木 美咲",
    nameEn: "Misaki Suzuki",
    role: "クリエイティブディレクター",
    bio: "デザイン・映像制作のプロフェッショナル。ブランドの「熱量」を視覚化することを得意とし、数々の受賞歴を持つ。",
    color: "#111111",
  },
];
