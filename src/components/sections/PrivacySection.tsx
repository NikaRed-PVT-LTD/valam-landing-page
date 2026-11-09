import { Card, Reveal, Section } from "@/components/ui";
import { Button } from "@/components/ui";
import { home } from "@/lib/content";

export function PrivacySection({ bare, limit }: { bare?: boolean; limit?: number }) {
  const p = home.privacy;
  return (
    <Section id={p.id} tone="tint" eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} bare={bare}>
      <div className="grid grid--3">
        {(limit ? p.items.slice(0, limit) : p.items).map((it, i) => (
          <Reveal key={it.title} delay={(i % 3) * 0.08}><Card icon={it.icon} title={it.title}>{it.body}</Card></Reveal>
        ))}
      </div>
      <Reveal><p style={{ textAlign: "center", marginTop: 36 }}><Button href={limit ? "/privacy" : "/privacy-policy"} variant="ghost" arrow>{limit ? "More on privacy and security" : "Read the full Privacy Policy"}</Button></p></Reveal>
    </Section>
  );
}
