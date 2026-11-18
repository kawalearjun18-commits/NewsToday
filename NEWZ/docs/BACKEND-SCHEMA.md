# Backend Schema

## Content entities

- `Article`: `slug`, `language`, `title`, `dek`, `body[]`, `byline`, `dateline`, `publishedAt`, `modifiedAt`, `sourceName`, `sourceUrl`, `category`, `image`, `alt`, `translation`.
- `translation`: `sourceLanguage`, `mt` boolean, `reviewer`, `status`.
- `Author`: `id`, `name`, `bio`.
- `Source`: `name`, `url`, `verifiedAt`.
- `Category`: stable `slug`, localized label, description.
- `Language`: code, nativeName, tier, availability.

Article files are one file per slug/language. Build-time validation rejects missing source/date/alt/body fields, duplicate bodies, and unsafe titles. Unverified editorial records use visible `TODO_VERIFY` fields.

## Generated surfaces

Astro routes generate `/en/`, `/hi/`, category routes, and article routes. Each page emits localized title/description, canonical, hreflang variants plus `x-default`, Open Graph/Twitter tags, BreadcrumbList, Organization, LocalBusiness, and NewsArticle JSON-LD where applicable. Build output includes sitemap index, per-language sitemaps, Google News sitemap (only eligible last-two-day records), and robots.txt.

## Forms/API

Checkout is a static form boundary with an explicit configurable action. No credentials or payment data are stored in the repository. A production deployment must connect a reviewed provider endpoint and add server-side validation/rate limits.

Confirm to proceed to Implementation Plan?
