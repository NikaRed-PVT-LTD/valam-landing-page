import { CtaBand } from "@/components/blocks/CtaBand";
import { DataTable } from "@/components/blocks/DataTable";
import { PageHero } from "@/components/layout/PageHero";
import { Button, Card, Icon, Reveal, Section } from "@/components/ui";
import { dataSafety as d, site } from "@/lib/content";

export default function DataSafety() {
  return (
    <>
      <PageHero title={d.title} intro={d.intro} crumbs={[{ label: "Home", href: "/" }, { label: d.title }]} />
      <Section eyebrow="At a glance" title="The short version" subtitle={`Last updated ${site.lastUpdated}.`}>
        <div className="grid grid--3">
          {d.highlights.map((h, i) => <Reveal key={h.title} delay={(i % 3) * 0.08}><Card icon={h.icon} title={h.title}>{h.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section tone="tint" eyebrow="Collection" title={d.collected.title} subtitle={d.collected.subtitle}>
        <DataTable columns={d.collected.columns} rows={d.collected.rows} caption={d.collected.title} />
      </Section>
      <Section eyebrow="Sharing" title={d.sharing.title} subtitle={d.sharing.subtitle}>
        <div className="grid grid--2">
          {d.sharing.items.map((it, i) => <Reveal key={it.title} delay={(i % 2) * 0.08}><Card title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section tone="tint" eyebrow="Security" title={d.protect.title}>
        <div className="grid grid--3">
          {d.protect.items.map((it, i) => <Reveal key={it.title} delay={(i % 3) * 0.08}><Card title={it.title}>{it.body}</Card></Reveal>)}
        </div>
      </Section>
      <Section eyebrow="Permissions" title={d.permissions.title} subtitle={d.permissions.subtitle}>
        <DataTable columns={d.permissions.columns} rows={d.permissions.rows} caption={d.permissions.title} />
      </Section>
      <Section tone="tint" eyebrow="Control" title={d.retention.title}>
        <div className="prose">
          <ul className="ticks">{d.retention.items.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
          <h3 style={{ marginTop: 32 }}>{d.children.title}</h3>
          <p>{d.children.body}</p>
          <p style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href="/delete-account" arrow>{d.retention.cta}</Button>
            <Button href="/privacy-policy" variant="ghost">Read the Privacy Policy</Button>
          </p>
          <p>{d.contact}</p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
