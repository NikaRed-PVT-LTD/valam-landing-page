import { absUrl, blog, dataSafety, deleteAccount, faq, home, pages, privacy, site, terms } from "./content";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  published?: string;
  jsonLd: object[];
  priority: number;
};

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absUrl(site.logo),
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
});

export function getRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];

  routes.push({
    path: "/",
    title: home.seo.title,
    description: home.seo.description,
    priority: 1,
    jsonLd: [
      org,
      { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, inLanguage: "en-IN" },
      {
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: site.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "iOS, Android",
        description: home.seo.description,
        image: absUrl(home.hero.heroImage.src),
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
    ],
  });


  const crumb = (name: string, path: string) => breadcrumb([{ name: "Home", path: "/" }, { name, path }]);
  const simple = (path: string, seo: { title: string; description: string }, name: string, ld: object[] = [], priority = 0.8) =>
    routes.push({ path, title: seo.title, description: seo.description, priority, jsonLd: [crumb(name, path), ...ld] });
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: home.video.title,
    description: home.video.captions,
    thumbnailUrl: absUrl(home.video.poster),
    contentUrl: absUrl(home.video.src),
    uploadDate: home.video.uploadDate,
    duration: home.video.duration,
  };
  simple("/features", home.pages.features.seo, "Features", [], 0.9);
  simple("/how-it-works", home.pages.how.seo, "How it works", [videoLd], 0.9);
  simple("/mathi", home.pages.mathi.seo, "Mathi", [], 0.9);
  simple("/privacy", home.pages.privacy.seo, "Privacy and security", [], 0.8);
  simple("/pricing", home.pages.pricing.seo, "Plus", [], 0.8);
  simple("/faq", home.pages.faq.seo, "FAQ", [faqLd], 0.8);
  simple("/about", pages.about.seo, "About", [], 0.6);
  simple("/contact", pages.contact.seo, "Contact", [], 0.5);

  routes.push({
    path: "/blog",
    title: "Blog | Money guides from Valam",
    description: home.blogIntro.subtitle,
    priority: 0.8,
    jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])],
  });

  for (const p of blog.posts) {
    const path = `/blog/${p.slug}`;
    routes.push({
      path,
      title: `${p.title} | Valam`,
      description: p.description,
      image: p.image,
      type: "article",
      published: p.date,
      priority: 0.7,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          image: absUrl(p.image),
          datePublished: p.date,
          dateModified: p.date,
          author: { "@type": "Organization", name: blog.author.name },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absUrl(site.logo) } },
          mainEntityOfPage: absUrl(path),
          keywords: p.tags.join(", "),
        },
        breadcrumb([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path }]),
      ],
    });
  }

  routes.push({ path: "/privacy-policy", title: privacy.seo.title, description: privacy.seo.description, priority: 0.4, jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])] });
  routes.push({ path: "/terms-and-conditions", title: terms.seo.title, description: terms.seo.description, priority: 0.4, jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Terms and Conditions", path: "/terms-and-conditions" }])] });
  routes.push({ path: "/data-safety", title: dataSafety.seo.title, description: dataSafety.seo.description, priority: 0.5, jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Data safety", path: "/data-safety" }])] });
  routes.push({ path: "/delete-account", title: deleteAccount.seo.title, description: deleteAccount.seo.description, priority: 0.4, jsonLd: [breadcrumb([{ name: "Home", path: "/" }, { name: "Delete account", path: "/delete-account" }])] });

  return routes;
}

export const notFoundMeta: RouteMeta = { path: "/404", title: "Page not found | Valam", description: "This page could not be found.", noindex: true, priority: 0, jsonLd: [] };

export function findRoute(path: string): RouteMeta {
  const clean = path.length > 1 ? path.replace(/\/$/, "") : path;
  return getRoutes().find((r) => r.path === clean) ?? notFoundMeta;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Head tags for a route, as an HTML string (used by the prerender step). */
export function headHtml(m: RouteMeta): string {
  const url = absUrl(m.path === "/404" ? "/" : m.path);
  const img = absUrl(m.image && m.type === "article" ? m.image.replace(".svg", ".png") : site.ogImage);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"}" />`,
    `<meta name="theme-color" content="${site.themeColor}" />`,
    `<meta name="keywords" content="${esc(site.keywords.join(", "))}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:type" content="${m.type ?? "website"}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];
  if (m.published) tags.push(`<meta property="article:published_time" content="${m.published}" />`);
  for (const ld of m.jsonLd) tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`);
  return tags.join("\n    ");
}
