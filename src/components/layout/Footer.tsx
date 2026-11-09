import { Link } from "react-router-dom";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link to="/" className="brand"><img src={site.logo} alt="" width={36} height={36} loading="lazy" />{site.name}</Link>
            <p style={{ marginTop: 14, maxWidth: 340 }}>{site.footer.blurb}</p>
            <p><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></p>
          </div>
          {site.footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h4>{c.title}</h4>
              <ul>{c.links.map((l) => <li key={l.href}><Link to={l.href}>{l.label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {site.footer.copyright}</span>
          <span>வளம் · மதி</span>
        </div>
      </div>
    </footer>
  );
}
