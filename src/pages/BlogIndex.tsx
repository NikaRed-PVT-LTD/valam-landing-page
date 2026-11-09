import { PostCard } from "@/components/blog/PostCard";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui";
import { blog, home } from "@/lib/content";

export default function BlogIndex() {
  return (
    <>
      <PageHero title={home.blogIntro.title} intro={home.blogIntro.subtitle} crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container grid grid--3">
          {blog.posts.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.08}><PostCard post={p} /></Reveal>)}
        </div>
      </section>
    </>
  );
}
