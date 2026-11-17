import site from "@/content/site.json";
import home from "@/content/home.json";
import faq from "@/content/faq.json";
import blog from "@/content/blog.json";
import privacy from "@/content/privacy.json";
import terms from "@/content/terms.json";
import deleteAccount from "@/content/delete-account.json";
import dataSafety from "@/content/data-safety.json";

import pages from "@/content/pages.json";
import guides from "@/content/guides.json";

export { site, home, faq, blog, privacy, terms, deleteAccount, dataSafety, pages, guides };

export type Post = (typeof blog.posts)[number];
export type Block = Post["blocks"][number];
export type Guide = (typeof guides.guides)[number];
export const guideBySlug = (slug?: string) => guides.guides.find((g) => g.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const absUrl = (path: string) => (path.startsWith("http") ? path : site.url + path);
