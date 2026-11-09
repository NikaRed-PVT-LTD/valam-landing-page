import { Audiences } from "@/components/sections/Audiences";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Compare } from "@/components/sections/Compare";
import { DownloadCta } from "@/components/sections/DownloadCta";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Plus } from "@/components/sections/Plus";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { Showcase } from "@/components/sections/Showcase";
import { Stats } from "@/components/sections/Stats";
import { Steps } from "@/components/sections/Steps";
import { VideoSection } from "@/components/sections/VideoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Compare />
      <Marquee />
      <Features limit={4} />
      <Showcase />
      <VideoSection />
      <Steps />
      <PrivacySection limit={3} />
      <Audiences />
      <Plus />
      <Faq limit={5} />
      <BlogPreview />
      <DownloadCta />
    </>
  );
}
