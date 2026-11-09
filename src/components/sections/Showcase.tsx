import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhoneFrame, Section } from "@/components/ui";
import { home } from "@/lib/content";

const AUTO_MS = 5500;

export function Showcase({ bare, more }: { bare?: boolean; more?: boolean }) {
  const s = home.showcase;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % s.screens.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused, reduce, s.screens.length]);
  const cur = s.screens[i];
  return (
    <Section id="screens" eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} bare={bare}>
      <div className="showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="tabs" role="tablist" aria-label="App screens">
          {s.screens.map((sc, idx) => (
            <button key={sc.id} role="tab" className="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
              <h3>{sc.label}<span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-soft)" }}>{sc.title}</span></h3>
              <p>{sc.body}</p>
              <div className="bar">{idx === i && !paused && !reduce && <motion.i key={`${i}-${paused}`} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: AUTO_MS / 1000, ease: "linear" }} />}</div>
            </button>
          ))}
        </div>
        <PhoneFrame>
          <AnimatePresence mode="wait">
            <motion.img key={cur.id} src={cur.src} alt={cur.alt} width={900} height={1957} loading="lazy" decoding="async" initial={reduce ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} style={{ position: "absolute", inset: 0 }} />
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </Section>
  );
}
