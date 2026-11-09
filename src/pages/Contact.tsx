import { PageHero } from "@/components/layout/PageHero";
import { Button, Card, Icon, Reveal, Section } from "@/components/ui";
import { pages, site } from "@/lib/content";

export default function Contact() {
  const x = pages.contact;
  const mail = (k: string) => `mailto:${k === "privacy" ? site.privacyEmail : site.supportEmail}`;
  return (
    <>
      <PageHero title={x.title} intro={x.intro} crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <Section>
        <div className="grid grid--3">
          {x.channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="card">
                <div className="icon-box"><Icon name={c.icon} /></div>
                <h3>{c.title}</h3>
                <p style={{ marginBottom: 18 }}>{c.body}</p>
                <Button href={mail(c.key)} size="sm">{c.action}</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="tint" title={x.before.title}>
        <div className="prose"><ul className="ticks">{x.before.items.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
          <p style={{ marginTop: 20 }}><Button href="/faq" variant="ghost" arrow>Browse the FAQ</Button></p></div>
      </Section>
    </>
  );
}
