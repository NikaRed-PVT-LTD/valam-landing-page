import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Icon } from "./Icon";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="acc" key={it.q}>
            <h3 style={{ margin: 0 }}>
              <button type="button" aria-expanded={isOpen} aria-controls={`${base}-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{it.q}</span>
                <Icon name="plus" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`${base}-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                  <div className="acc__body"><p>{it.a}</p></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
