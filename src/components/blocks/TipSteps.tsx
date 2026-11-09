import { Icon, Reveal } from "@/components/ui";

export type TipStep = { title: string; body: string; tips?: string[] };

export function TipSteps({ items }: { items: TipStep[] }) {
  return (
    <div className="grid grid--2">
      {items.map((s, i) => (
        <Reveal key={s.title} delay={(i % 2) * 0.1}>
          <div className="card">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            {s.tips && <ul className="ticks" style={{ marginTop: 14 }}>{s.tips.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
