import { Accordion, Button, Section } from "@/components/ui";
import { faq, home } from "@/lib/content";

export function Faq({ limit, bare }: { limit?: number; bare?: boolean }) {
  const f = home.faqIntro;
  return (
    <Section id={f.id} eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} bare={bare}>
      <Accordion items={limit ? faq.items.slice(0, limit) : faq.items} />
      {limit && <p style={{ textAlign: "center", marginTop: 32 }}><Button href="/faq" variant="ghost" arrow>Read all questions</Button></p>}
    </Section>
  );
}
