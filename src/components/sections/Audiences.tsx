import { Card, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function Audiences({ bare }: { bare?: boolean }) {
  const a = home.audiences;
  return (
    <Section tone="tint" eyebrow={a.eyebrow} title={a.title} bare={bare}>
      <div className="grid grid--4">
        {a.items.map((it, i) => <Reveal key={it.title} delay={i * 0.08}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>)}
      </div>
    </Section>
  );
}
