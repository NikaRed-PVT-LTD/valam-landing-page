import { CtaBand } from "@/components/blocks/CtaBand";
import { TipSteps } from "@/components/blocks/TipSteps";
import { PageHero } from "@/components/layout/PageHero";
import { Steps } from "@/components/sections/Steps";
import { VideoSection } from "@/components/sections/VideoSection";
import { Card, Reveal, Section } from "@/components/ui";
import { home, pages } from "@/lib/content";

export default function HowItWorks() {
  const p = home.pages.how;
  const x = pages.how;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]} />
      <Steps bare />
      <VideoSection />
      <Section id="steps-detail" eyebrow="Walkthrough" title={x.stepDetails.title}>
        <TipSteps items={x.stepDetails.items} />
      </Section>
      <Section tone="tint" eyebrow="Import" title={x.import.title}>
        <div className="grid grid--3">
          {x.import.items.map((it, i) => <Reveal key={it.title} delay={i * 0.1}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section eyebrow="Habit" title={x.habit.title}>
        <div className="flow">
          {x.habit.items.map((it, i) => <Reveal key={it.title} delay={i * 0.1}><Card title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section tone="tint" title={x.newPhone.title}>
        <p className="band-note" style={{ marginTop: 0, fontSize: 18 }}>{x.newPhone.body}</p>
      </Section>
      <CtaBand />
    </>
  );
}
