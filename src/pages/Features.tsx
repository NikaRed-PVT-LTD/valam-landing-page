import { CtaBand } from "@/components/blocks/CtaBand";
import { DeepDive } from "@/components/blocks/DeepDive";
import { PageHero } from "@/components/layout/PageHero";
import { Audiences } from "@/components/sections/Audiences";
import { Card, Reveal, Section } from "@/components/ui";
import { home, pages } from "@/lib/content";

export default function Features() {
  const p = home.pages.features;
  const x = pages.features;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]} />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container"><DeepDive items={x.deepDives} /></div>
      </section>
      <Section tone="tint" eyebrow="More" title={x.extras.title}>
        <div className="grid grid--3">
          {x.extras.items.map((it, i) => <Reveal key={it.title} delay={(i % 3) * 0.08}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Audiences />
      <CtaBand />
    </>
  );
}
