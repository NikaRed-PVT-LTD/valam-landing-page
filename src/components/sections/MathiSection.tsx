import { motion, useReducedMotion } from "framer-motion";
import { Card, PhoneFrame, Reveal, Section } from "@/components/ui";
import { home } from "@/lib/content";

export function MathiSection({ bare }: { bare?: boolean }) {
  const m = home.mathi;
  const reduce = useReducedMotion();
  return (
    <Section id={m.id} tone="dark" eyebrow={m.eyebrow} title={m.title} subtitle={m.body} bare={bare}>
      <div className="mathi">
        <Reveal><div style={{ display: "flex", justifyContent: "center" }}><PhoneFrame src={m.image.src} alt={m.image.alt} /></div></Reveal>
        <div>
          <div className="chat" aria-label="Example conversation with Mathi">
            {m.sampleChat.map((c, i) => (
              <motion.div key={i} className={`bubble bubble--${c.from}`} initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.5, duration: 0.5 }}>
                <b>{c.from === "mathi" ? "Mathi" : "You"}</b>{c.text}
              </motion.div>
            ))}
          </div>
          <div className="grid grid--2">
            {m.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}><Card title={p.title}>{p.body}</Card></Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
