import { Icon, PhoneFrame, Reveal } from "@/components/ui";

export type DeepDiveItem = { icon: string; title: string; body: string; bullets: string[]; image?: string; alt?: string };

/** Alternating feature rows: text on one side, a phone screen (or a plain icon panel) on the other. */
export function DeepDive({ items }: { items: DeepDiveItem[] }) {
  return (
    <div className="dive">
      {items.map((it, i) => (
        <div className={`dive__row ${i % 2 ? "dive__row--flip" : ""}`} key={it.title}>
          <Reveal x={i % 2 ? 40 : -40} y={0} className="dive__text">
            <div className="icon-box"><Icon name={it.icon} /></div>
            <h2>{it.title}</h2>
            <p>{it.body}</p>
            <ul className="ticks">{it.bullets.map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}</ul>
          </Reveal>
          <Reveal x={i % 2 ? -40 : 40} y={0} className="dive__media">
            {it.image ? <PhoneFrame small src={it.image} alt={it.alt} /> : <div className="dive__panel" aria-hidden="true"><Icon name={it.icon} size={72} /></div>}
          </Reveal>
        </div>
      ))}
    </div>
  );
}
