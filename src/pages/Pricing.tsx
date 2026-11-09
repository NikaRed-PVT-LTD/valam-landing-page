import { CtaBand } from "@/components/blocks/CtaBand";
import { DataTable } from "@/components/blocks/DataTable";
import { PageHero } from "@/components/layout/PageHero";
import { Plus } from "@/components/sections/Plus";
import { Accordion, Section } from "@/components/ui";
import { home, pages } from "@/lib/content";

export default function Pricing() {
  const p = home.pages.pricing;
  const x = pages.pricing;
  return (
    <>
      <PageHero title={p.title} intro={p.intro} crumbs={[{ label: "Home", href: "/" }, { label: p.crumb }]}>
        <p><strong>{x.freeMonth}</strong></p>
      </PageHero>
      <Plus bare />
      <Section tone="tint" eyebrow="Compare" title={x.compare.title}>
        <DataTable columns={x.compare.columns} rows={x.compare.rows} caption={x.compare.title} />
      </Section>
      <Section eyebrow="FAQ" title={x.faq.title}>
        <Accordion items={x.faq.items} />
      </Section>
      <CtaBand />
    </>
  );
}
