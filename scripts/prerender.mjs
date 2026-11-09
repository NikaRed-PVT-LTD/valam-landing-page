// Prerenders every route to static HTML (with full SEO head), and writes sitemap, robots and llms.txt.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const site = JSON.parse(fs.readFileSync(path.join(root, "src/content/site.json"), "utf8"));
const blog = JSON.parse(fs.readFileSync(path.join(root, "src/content/blog.json"), "utf8"));

const routes = ssr.routes();
for (const r of routes) {
  const { html, head } = ssr.render(r.path);
  const page = template.replace("<!--head-tags-->", head).replace("<!--app-html-->", html);
  const out = r.path === "/" ? path.join(dist, "index.html") : path.join(dist, r.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log("prerendered", r.path);
}

// 404 page for static hosts
const nf = ssr.render("/does-not-exist");
fs.writeFileSync(path.join(dist, "404.html"), template.replace("<!--head-tags-->", nf.head).replace("<!--app-html-->", nf.html));

const lastmod = (r) => r.published ?? site.lastUpdatedIso;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((r) => `  <url><loc>${site.url}${r.path === "/" ? "/" : r.path}</loc><lastmod>${lastmod(r)}</lastmod><priority>${r.priority}</priority></url>`)
  .join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

const llms = `# ${site.name}\n\n> ${site.footer.blurb}\n\n## Pages\n${routes.map((r) => `- [${r.title}](${site.url}${r.path}): ${r.description}`).join("\n")}\n`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`done: ${routes.length} routes, ${blog.posts.length} posts`);
