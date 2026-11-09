import { Badge, Icon, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function Plus({ bare }: { bare?: boolean }) {
  const p = home.plus;
  return (
    <Section id={p.id} eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} bare={bare}>
      <div className="grid grid--2" style={{ maxWidth: 900, margin: "0 auto" }}>
        {p.tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <div className={`card tier ${t.highlight ? "tier--hl" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 26, margin: 0 }}>{t.name}</h3><Badge highlight={t.highlight}>{t.tag}</Badge></div>
              <p style={{ marginTop: 10 }}>{t.description}</p>
              <ul>{t.features.map((f) => <li key={f}><Icon name="check" size={18} />{f}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="note">{p.note}</p>
    </Section>
  );
}
