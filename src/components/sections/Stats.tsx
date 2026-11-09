import { Container, Counter, Reveal } from "@/components/ui";
import { home } from "@/lib/content";

export function Stats() {
  return (
    <Container>
      <div className="stats">
        {home.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="stat"><Counter value={s.value} suffix={s.suffix} /><span>{s.label}</span></div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
