import { Icon, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function Compare({ bare }: { bare?: boolean }) {
  const p = home.problem;
  return (
    <Section id="why" eyebrow={p.eyebrow} title={p.title} subtitle={p.body} bare={bare}>
      <div className="compare">
        {p.points.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12} x={i ? 30 : -30} y={0}>
            <div className={`card ${c.tone}`}>
              <h3>{c.title}</h3>
              <ul>{c.items.map((it) => <li key={it}><Icon name={c.tone === "good" ? "check" : "x"} size={18} />{it}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
