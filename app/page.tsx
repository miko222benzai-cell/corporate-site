import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import CEOMessage from "@/components/sections/CEOMessage";
import Recruit from "@/components/sections/Recruit";
import Talent from "@/components/sections/Talent";
import News from "@/components/sections/News";
import Access from "@/components/sections/Access";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { getLatestNews } from "@/lib/microcms";
import { resolvePublicImage } from "@/lib/publicImage";

// ISR：60秒ごとに再生成
export const revalidate = 60;

export default async function Home() {
  const latestNews = await getLatestNews(3);
  const philosophyMissionImage = resolvePublicImage("images/philosophy-mission");

  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Marquee variant="light" />
      <About />
      <Marquee variant="light" />
      <Philosophy missionImage={philosophyMissionImage} />
      <CEOMessage />
      <Marquee variant="light" />
      <Recruit />
      <Marquee variant="dark" />
      <Talent />
      <Marquee variant="light" />
      <News items={latestNews} />
      <Marquee variant="red" />
      <Access />
      <Contact />
      <Footer />
    </main>
  );
}
