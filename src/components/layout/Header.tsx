import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "@/lib/content";
import { Button, Icon } from "@/components/ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__row">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <img src={site.logo} alt="" width={36} height={36} />
          {site.name}
        </Link>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "x" : "menu"} />
        </button>
        <nav id="main-nav" aria-label="Main" className={`nav ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
          {site.nav.map((n) => (
            <Link key={n.href} className="link" to={n.href}>{n.label}</Link>
          ))}
          <Button href={site.cta.href} size="sm">{site.cta.label}</Button>
        </nav>
      </div>
    </header>
  );
}
