import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function Steps({ bare }: { bare?: boolean }) {
  const s = home.steps;
  const reduce = useReducedMotion();
  return (
    <Section id="how-it-works" eyebrow={s.eyebrow} title={s.title} bare={bare}>
      <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <div className="line" aria-hidden="true">
          <motion.i initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
        </div>
        {s.items.map((it, i) => (
          <Reveal as="li" key={it.title} delay={i * 0.15} className="step">
            <div className="step__n">{i + 1}</div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
