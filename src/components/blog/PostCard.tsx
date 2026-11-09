import { Link } from "react-router-dom";
import { Icon } from "@/components/ui";
import { formatDate, type Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card post-card">
      <img src={post.image} alt={post.imageAlt} width={800} height={450} loading="lazy" decoding="async" />
      <div className="post-card__body">
        <div className="meta"><span className="tag">{post.category}</span><time dateTime={post.date}>{formatDate(post.date)}</time><span>{post.readMinutes} min read</span></div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <span className="readmore">Read article <Icon name="arrow" size={16} /></span>
      </div>
    </Link>
  );
}
