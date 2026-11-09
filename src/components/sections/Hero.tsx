import { motion, useReducedMotion } from "framer-motion";
import { Blobs } from "@/components/media/Blobs";
import { GrowthLine } from "@/components/media/GrowthLine";
import { Button, Icon, PhoneFrame } from "@/components/ui";
import { home } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();
  const h = home.hero;
  const [before, after] = h.title.split(h.highlight);
  const float = (d: number) => (reduce ? {} : { animate: { y: [0, -12, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: d } });
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Blobs />
      <GrowthLine className="hero__line" />
      <div className="container hero__grid">
        <div>
          <motion.div className="eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{h.eyebrow}</motion.div>
          <motion.h1 id="hero-title" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            {before}<span className="grad">{h.highlight}</span>{after}
          </motion.h1>
          <motion.p className="lead" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>{h.subtitle}</motion.p>
          <motion.div className="hero__cta" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Button href={`/${h.primaryCta.href}`} arrow>{h.primaryCta.label}</Button>
            <Button href={`/${h.secondaryCta.href}`} variant="ghost"><Icon name="play" size={16} />{h.secondaryCta.label}</Button>
          </motion.div>
          <motion.ul className="chips" aria-label="Highlights" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {h.trust.map((t) => <li className="chip" key={t}><Icon name="check" size={16} />{t}</li>)}
          </motion.ul>
        </div>
        <motion.div className="hero__phone" initial={reduce ? false : { opacity: 0, y: 60, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div {...float(0)}><PhoneFrame src={h.heroImage.src} alt={h.heroImage.alt} priority /></motion.div>
          {h.floating.map((f, i) => (
            <motion.div key={f.label} className={`float-card float-card--${f.position}`} {...float(i + 1)}>
              <span className="ico"><Icon name={f.icon} /></span>
              <div><strong>{f.label}</strong>{f.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
