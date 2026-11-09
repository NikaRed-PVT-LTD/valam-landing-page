import { Button, Reveal, Section } from "@/components/ui";
import { PostCard } from "@/components/blog/PostCard";
import { blog, home } from "@/lib/content";

export function BlogPreview() {
  const b = home.blogIntro;
  return (
    <Section id="blog" tone="tint" eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle}>
      <div className="grid grid--3">
        {blog.posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 0.1}><PostCard post={p} /></Reveal>)}
      </div>
      <p style={{ textAlign: "center", marginTop: 36 }}><Button href="/blog" variant="ghost" arrow>See all articles</Button></p>
    </Section>
  );
}
