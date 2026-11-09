import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function PageHero({ title, intro, crumbs, children }: { title: string; intro?: string; crumbs: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <div className="page-hero">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label}>{c.href ? <Link to={c.href}>{c.label}</Link> : c.label}{i < crumbs.length - 1 && " / "}</span>
          ))}
        </nav>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {children}
      </div>
    </div>
  );
}
