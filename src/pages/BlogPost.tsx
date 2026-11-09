import { Link, useParams } from "react-router-dom";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { PostCard } from "@/components/blog/PostCard";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui";
import { blog, formatDate } from "@/lib/content";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blog.posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;
  const more = blog.posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <PageHero title={post.title} intro={post.description} crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}>
        <div className="meta" style={{ marginTop: 8 }}>
          <span>By {blog.author.name}</span><time dateTime={post.date}>{formatDate(post.date)}</time><span>{post.readMinutes} min read</span>
        </div>
      </PageHero>
      <article className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <img className="article-img" src={post.image} alt={post.imageAlt} width={1200} height={630} />
          <div className="prose"><ArticleBody blocks={post.blocks} />
            <p style={{ marginTop: 32 }}>{post.tags.map((t) => <span className="tag" key={t} style={{ marginRight: 8 }}>#{t}</span>)}</p>
            <p><Button href="/#download" arrow>Get Valam</Button></p>
          </div>
        </div>
      </article>
      <section className="section section--tint">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 32 }}>Keep reading</h2>
          <div className="grid grid--3">{more.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          <p style={{ textAlign: "center", marginTop: 28 }}><Link to="/blog">All articles</Link></p>
        </div>
      </section>
    </>
  );
}
