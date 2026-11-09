import { Button, Card, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function Features({ limit, bare }: { limit?: number; bare?: boolean }) {
  const f = home.features;
  const items = limit ? f.items.slice(0, limit) : f.items;
  return (
    <Section id="features" tone="tint" eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} bare={bare}>
      <div className="grid grid--4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 4) * 0.08}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>
        ))}
      </div>
    {limit && <p style={{ textAlign: "center", marginTop: 36 }}><Button href="/features" variant="ghost" arrow>See all features</Button></p>}
    </Section>
  );
}
