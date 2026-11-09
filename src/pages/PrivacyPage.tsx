import { CtaBand } from "@/components/blocks/CtaBand";
import { DataTable } from "@/components/blocks/DataTable";
import { PageHero } from "@/components/layout/PageHero";
import { Compare } from "@/components/sections/Compare";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { Button, Card, Icon, Reveal, Section } from "@/components/ui";
import { home, pages } from "@/lib/content";

export default function PrivacyPage() {
  const p = home.pages.privacy;
  const x = pages.privacy;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]} />
      <Compare />
      <PrivacySection bare />
      <Section eyebrow="Data map" title={x.where.title}>
        <DataTable columns={x.where.columns} rows={x.where.rows} caption={x.where.title} />
      </Section>
      <Section tone="tint" eyebrow="Security" title={x.lock.title}>
        <div className="flow">
          {x.lock.items.map((it, i) => <Reveal key={it.title} delay={i * 0.08}><Card title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section eyebrow="Control" title={x.choices.title}>
        <div className="prose">
          <ul className="ticks">{x.choices.items.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
          <p style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href="/privacy-policy" arrow>Read the Privacy Policy</Button>
            <Button href="/delete-account" variant="ghost">{x.choices.cta}</Button>
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
