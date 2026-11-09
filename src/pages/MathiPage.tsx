import { CtaBand } from "@/components/blocks/CtaBand";
import { QuestionGroups } from "@/components/blocks/QuestionGroups";
import { PageHero } from "@/components/layout/PageHero";
import { MathiSection } from "@/components/sections/MathiSection";
import { Showcase } from "@/components/sections/Showcase";
import { Card, Icon, Reveal, Section } from "@/components/ui";
import { home, pages } from "@/lib/content";

export default function MathiPage() {
  const p = home.pages.mathi;
  const x = pages.mathi;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]} />
      <Showcase />
      <Section tone="tint" eyebrow="Ask" title={x.ask.title}>
        <QuestionGroups groups={x.ask.groups} />
      </Section>
      <Section eyebrow="Trust" title={x.pipeline.title}>
        <div className="flow">
          {x.pipeline.items.map((it, i) => <Reveal key={it.title} delay={i * 0.1}><Card title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <MathiSection bare />
      <Section tone="tint" eyebrow="Modes" title={x.modes.title}>
        <div className="grid grid--3">
          {x.modes.items.map((it, i) => <Reveal key={it.title} delay={i * 0.1}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section eyebrow="Limits" title={x.limits.title}>
        <div className="prose">
          <ul className="ticks">{x.limits.items.map((t) => <li key={t}><Icon name="x" size={18} style={{ color: "var(--danger)" }} />{t}</li>)}</ul>
          <div className="callout"><p>{x.limits.note}</p></div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
