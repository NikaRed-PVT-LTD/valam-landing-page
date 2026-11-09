import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Faq } from "@/components/sections/Faq";
import { Button } from "@/components/ui";
import { home } from "@/lib/content";

export default function FaqPage() {
  const p = home.pages.faq;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]}>
        <p><Button href="/contact" variant="ghost">Contact us</Button></p>
      </PageHero>
      <Faq bare />
      <CtaBand />
    </>
  );
}
