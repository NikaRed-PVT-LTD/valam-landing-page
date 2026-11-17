import { CtaBand } from "@/components/blocks/CtaBand";
import { GuideCard } from "@/components/guides/GuideCard";
import { PageHero } from "@/components/layout/PageHero";
import { Button, Reveal, Section } from "@/components/ui";
import { guides } from "@/lib/content";

export default function GuidesIndex() {
  const h = guides.hub;
  return (
    <>
      <PageHero title={h.title} intro={h.intro} crumbs={[{ label: "Home", href: "/" }, { label: h.crumb }]} />
      <Section>
        <Reveal className="guide-start">
          <div>
            <h2>{h.startHere.title}</h2>
            <p>{h.startHere.body}</p>
          </div>
          <Button href="/guides/getting-started" arrow>{h.startHere.cta}</Button>
        </Reveal>
      </Section>
      {h.categories.map((c, i) => (
        <Section key={c.id} id={`guides-${c.id}`} tone={i % 2 === 0 ? "tint" : "light"} title={c.title} subtitle={c.body}>
          <div className="grid grid--3">
            {guides.guides.filter((g) => g.category === c.id).map((g, j) => (
              <Reveal key={g.slug} delay={(j % 3) * 0.08}><GuideCard guide={g} /></Reveal>
            ))}
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
