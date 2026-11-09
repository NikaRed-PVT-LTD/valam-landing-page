import { CtaBand } from "@/components/blocks/CtaBand";
import { PageHero } from "@/components/layout/PageHero";
import { Card, Icon, Reveal, Section } from "@/components/ui";
import { pages } from "@/lib/content";

export default function About() {
  const x = pages.about;
  return (
    <>
      <PageHero title={x.title} intro={x.intro} crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <Section title={x.story.title} eyebrow="Our story">
        <div className="prose">{x.story.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
      </Section>
      <Section tone="tint" eyebrow="Names" title={x.names.title}>
        <div className="grid grid--2" style={{ maxWidth: 860, margin: "0 auto" }}>
          {x.names.items.map((n, i) => <Reveal key={n.name} delay={i * 0.1}><Card title={n.name}>{n.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section eyebrow="Values" title={x.principles.title}>
        <div className="grid grid--4">
          {x.principles.items.map((it, i) => <Reveal key={it.title} delay={i * 0.08}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section tone="tint" eyebrow="Roadmap" title={x.next.title}>
        <div className="prose">
          <ul className="ticks">{x.next.items.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
          <p className="band-note" style={{ textAlign: "left", marginLeft: 0 }}>{x.next.note}</p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
