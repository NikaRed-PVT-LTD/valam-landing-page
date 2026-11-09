import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui";
import { site } from "@/lib/content";

type Section = { id: string; heading: string; body: string[]; list?: string[] };
type Doc = { title: string; intro: string; summary: string[]; sections: Section[] };

export function LegalDocument({ doc }: { doc: Doc }) {
  return (
    <>
      <PageHero title={doc.title} intro={doc.intro} crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]}>
        <p style={{ fontSize: 14 }}>Last updated: <time dateTime={site.lastUpdatedIso}>{site.lastUpdated}</time></p>
      </PageHero>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container legal-layout">
          <nav className="toc" aria-label="On this page">
            <ul>{doc.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>)}</ul>
          </nav>
          <article className="prose" style={{ margin: 0 }}>
            <div className="summary"><h2>In short</h2><ul>{doc.summary.map((t) => <li key={t}>{t}</li>)}</ul></div>
            {doc.sections.map((s) => (
              <Reveal key={s.id}>
                <h2 id={s.id}>{s.heading}</h2>
                {s.body.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </Reveal>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
