import { Link } from "react-router-dom";
import { Badge, IconBox } from "@/components/ui";
import type { Guide } from "@/lib/content";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link to={`/guides/${guide.slug}`} className="card guide-card">
      <IconBox name={guide.icon} />
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="meta guide-card__meta">
        <Badge>{guide.plan}</Badge>
        <span>{guide.minutes} min</span>
      </div>
    </Link>
  );
}
