import { motion, useReducedMotion } from "framer-motion";

/** Decorative growth line that draws itself, echoing the Valam logo arrow. */
export function GrowthLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const d = "M0 180 C 80 170, 120 120, 200 130 S 320 60, 400 80 S 520 20, 600 10";
  return (
    <svg className={className} viewBox="0 0 600 200" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gl" x1="0" x2="1"><stop offset="0" stopColor="#16c172" stopOpacity=".1" /><stop offset="1" stopColor="#b6f35a" /></linearGradient>
      </defs>
      <motion.path d={d} stroke="url(#gl)" strokeWidth="4" strokeLinecap="round" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4 }} />
      <motion.circle cx="600" cy="10" r="7" fill="#b6f35a" initial={reduce ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.6 }} />
    </svg>
  );
}
