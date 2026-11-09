import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type Props = { id?: string; tone?: "light" | "tint" | "dark"; eyebrow?: string; title?: string; subtitle?: string; children: ReactNode; headingLevel?: 1 | 2; bare?: boolean };

export function Section({ id, tone = "light", eyebrow, title, subtitle, children, bare }: Props) {
  const cls = tone === "dark" ? "section section--dark" : tone === "tint" ? "section section--tint" : "section";
  return (
    <section id={id} className={cls} aria-labelledby={id && title && !bare ? `${id}-title` : undefined} aria-label={bare && title ? title : undefined}>
      <Container>
        {title && !bare && (
          <Reveal className="section-head">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
