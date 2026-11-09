# Valam website

React 18 + TypeScript + Vite, prerendered to static HTML for SEO.

```sh
npm install
npm run dev       # local dev
npm run build     # typecheck, build, prerender every route, write sitemap.xml / robots.txt / llms.txt
npm run preview   # serve dist (open routes with a trailing slash, e.g. /blog/)
```

## Edit content without touching code

All copy lives in `src/content/*.json`:

| File | Controls |
| --- | --- |
| `site.json` | name, URL, support emails, nav, footer, keywords, store links |
| `home.json` | every landing page section, video chapters, Plus tiers, launch form |
| `faq.json` | FAQ items (also emitted as FAQPage structured data) |
| `blog.json` | blog posts (blocks: `h2`, `p`, `ul`, `callout`) |
| `privacy.json`, `terms.json` | legal pages |
| `delete-account.json` | delete account steps and form |

Set `site.url` to the real domain before deploying (canonical URLs, sitemap and social cards use it). Set `home.download.endpoint` to a form or email service URL to collect launch emails; with it empty the form opens a pre filled email instead.

## Structure

- `src/components/ui`: reusable primitives (Button, Card, Section, Accordion, Reveal, Counter, PhoneFrame, Icon)
- `src/components/sections`: landing page sections built from the primitives
- `src/lib/seo.ts`: per page title, description, Open Graph and JSON-LD
- `scripts/prerender.mjs`: static HTML per route; `scripts/make-art.mjs`: blog art generator

App screenshots in `public/images/screens` and the tour video in `public/video` were captured from the app in demo mode.
