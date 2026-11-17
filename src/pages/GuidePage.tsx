import { Link, useParams } from "react-router-dom";
import { CtaBand } from "@/components/blocks/CtaBand";
import { GuideCard } from "@/components/guides/GuideCard";
import { PageHero } from "@/components/layout/PageHero";
import { Badge, Icon, Section } from "@/components/ui";
import { formatDate, guideBySlug, guides } from "@/lib/content";
import NotFound from "./NotFound";

export default function GuidePage() {
  const { slug } = useParams();
  const g = guideBySlug(slug);
  if (!g) return <NotFound />;
  const cat = guides.hub.categories.find((c) => c.id === g.category);
  const related = g.related.map(guideBySlug).filter((x) => x !== undefined);
  const order = guides.guides.findIndex((x) => x.slug === g.slug);
  const next = guides.guides[order + 1];
  return (
    <>
      <PageHero title={g.title} intro={g.intro} crumbs={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: cat?.title ?? "Guide" }]}>
        <div className="meta" style={{ marginTop: 8 }}>
          <Badge>{g.plan}</Badge>
          <span>{g.minutes} min</span>
          <span>{g.steps.length} steps</span>
          <span>Updated <time dateTime={guides.updated}>{formatDate(guides.updated)}</time></span>
        </div>
      </PageHero>
      <article className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="prose">
            {"needs" in g && g.needs && (
              <div className="guide-needs">
                <h2>What you need</h2>
                <ul className="ticks">{g.needs.map((n) => <li key={n}><Icon name="check" size={18} />{n}</li>)}</ul>
              </div>
            )}
            <h2>Step by step</h2>
            <ol className="guide-steps">
              {g.steps.map((s, i) => (
                <li key={s.title} id={`step-${i + 1}`}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  {"tips" in s && s.tips && <ul>{s.tips.map((t) => <li key={t}>{t}</li>)}</ul>}
                </li>
              ))}
            </ol>
            {"callout" in g && g.callout && <div className="callout"><b>{g.callout.title}</b><p>{g.callout.text}</p></div>}
            {next && (
              <p className="guide-next">Next guide: <Link to={`/guides/${next.slug}`}>{next.title}</Link></p>
            )}
          </div>
        </div>
      </article>
      <Section tone="tint" id="guide-faq" eyebrow="Questions" title={`${g.title}: common questions`}>
        <div className="prose guide-faq">
          {g.faq.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="guide-related" title="Related guides">
        <div className="grid grid--3">{related.map((r) => <GuideCard key={r.slug} guide={r} />)}</div>
        <p style={{ textAlign: "center", marginTop: 28 }}><Link to="/guides">All guides</Link></p>
      </Section>
      <CtaBand />
    </>
  );
}
