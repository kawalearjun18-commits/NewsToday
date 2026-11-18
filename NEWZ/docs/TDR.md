# Technical Decisions Record (TDR)

## Decision

Use Astro with TypeScript and static output. Content is authored as typed data files and rendered at build time into language-specific HTML. CSS is component-scoped/global with no UI framework; only the language detector and switcher use small deferred scripts.

## Reasons

- Astro ships near-zero JavaScript by default and produces stable HTML for SEO and slow networks.
- Static generation makes language purity, canonical URLs, hreflang, metadata, and content validation deterministic.
- TypeScript content schemas catch missing article fields before publishing.
- Alternatives considered: Next.js (strong but more runtime surface than needed), Eleventy (excellent static option but less integrated component ergonomics), and a client-rendered SPA (rejected for SEO, translation purity, and performance).

## Hosting and delivery

Deploy the generated `dist/` directory to any CDN/static host such as Cloudflare Pages, Netlify, or GitHub Pages. Production headers should enable long-lived immutable asset caching, compression, and HTTPS. Edge geo headers may be consumed only by the first-visit detector; no third-party IP lookup is used.

## Media and fonts

Use local, licensed WOFF2 fonts with `font-display: swap`, preload only the primary font, and subset Devanagari separately. Store editorial images as AVIF/WebP with intrinsic dimensions and responsive `srcset`; never publish an image without descriptive alt text and a verifiable reference.

## Verification

Vitest/Node scripts validate source content and generated HTML. Playwright captures responsive screenshots and checks browser errors. Lighthouse runs are real artifacts when the local production server and Lighthouse CLI are available; unavailable external tools remain pending-human rather than being fabricated.

Confirm to proceed to UI/UX?
