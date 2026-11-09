import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absUrl } from "@/lib/content";
import { findRoute } from "@/lib/seo";

/** Keeps the document head in sync on client side navigation. The first load is already prerendered. */
export function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = findRoute(pathname);
    document.title = m.title;
    const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val);
    set('meta[name="description"]', "content", m.description);
    set('link[rel="canonical"]', "href", absUrl(m.path === "/404" ? "/" : m.path));
    set('meta[property="og:title"]', "content", m.title);
    set('meta[property="og:description"]', "content", m.description);
    set('meta[property="og:url"]', "content", absUrl(m.path));
    set('meta[name="twitter:title"]', "content", m.title);
    set('meta[name="twitter:description"]', "content", m.description);
    set('meta[name="robots"]', "content", m.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
    for (const ld of m.jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(ld);
      document.head.appendChild(s);
    }
  }, [pathname]);
  return null;
}
