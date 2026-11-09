import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; y?: number; x?: number; className?: string; as?: "div" | "li" | "section" | "article" };

/** Fades and slides content in as it enters the viewport. Honors reduced motion. */
export function Reveal({ children, delay = 0, y = 28, x = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
