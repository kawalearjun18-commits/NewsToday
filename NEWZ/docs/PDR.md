# Product Requirements Document (PDR)

## Product

**News Today** is a fast, trustworthy, multilingual news publication focused on Bhagalpur and Bihar. It serves readers first on mid-range Android phones over 4G, while remaining polished on desktop.

## Goals

- Make verified Bhagalpur and Bihar reporting easy to discover and read.
- Publish English and Hindi as first-class, source-correct experiences with stable language URLs.
- Establish a scalable foundation for Angika, Bhojpuri, Maithili, Marathi, Bengali, Urdu, and later languages.
- Deliver a premium, accessible experience with minimal client-side JavaScript and strong search visibility.
- Make source, publication date, byline, translation status, and related coverage transparent on every story.

## Audience

- Primary: Bhagalpur and Bihar readers using 320px–414px Android devices on 4G.
- Secondary: Hindi- and English-speaking readers across India and the diaspora seeking local coverage.
- Editorial: Reporters and editors who need clear source attribution, language isolation, and review status.
- Commercial: Readers who may later use a paid checkout flow, without interruptive behavior on the news experience.

## Editorial sections

1. Economy
2. Technology
3. Science & Health
4. Lifestyle & Culture
5. Sports
6. Others

Bhagalpur and Bihar stories lead the homepage and each section. No story may be published without a real, dated, verifiable source URL; unverifiable items remain visibly marked `TODO_VERIFY`.

## Core features

- Static-first homepage, category pages, article pages, and checkout page.
- Separate `/en/`, `/hi/`, and future language URL trees; no runtime translation or silent English fallback.
- Automatic first-visit language detection using saved preference, browser language, timezone, then edge geo headers; explicit URLs and manual choices always win.
- Persistent compact language switcher in header and footer with native language names, keyboard support, focus states, Esc handling, and 44px touch targets.
- Article metadata: slug, title, dek, body, byline, dateline, publication and modification dates, category, source name/URL, image, and alt text.
- Visible source attribution, breadcrumbs, related articles, language availability, and translated-content notices.
- Responsive layout from 320px through 1440px with a visible date/time bar at every width.
- Optimized responsive WebP/AVIF imagery, accessible typography, deferred non-critical scripts, and minimal JavaScript.
- SEO-ready titles, descriptions, canonicals, hreflang, Open Graph/Twitter metadata, JSON-LD, language sitemaps, Google News sitemap, robots.txt, and internal linking.
- Automated quality gates for language purity, unique article bodies, title safety, metadata, structured data, links, images, and HTML validity.
- Review artifacts for machine-translated strings and pending human checks.

## Success metrics

- Lighthouse mobile score ≥90 for homepage, article, category, and checkout; desktop reports captured separately.
- LCP <2.5 seconds and CLS <0.1 on representative mid-range Android/4G testing.
- 100% of rendered page text passes language-purity tests for its URL.
- 100% of article pages expose valid source, date, canonical, hreflang, and required structured data.
- 0 broken internal links, missing image references, duplicate article bodies, or unreviewed placeholder claims outside allowed `TODO_VERIFY`.
- Responsive screenshots pass at 320, 375, 414, 768, 1024, and 1440px; real-device testing remains explicitly tracked as pending-human.
- Human review is required before claiming native-speaker approval, Search Console/Bing submission, or final language scope approval.

## Non-goals for the initial release

- A live editorial CMS or user-generated publishing.
- Runtime translation, DOM text patching, or third-party IP lookup calls.
- Unverified breaking-news aggregation.
- Claims of native-speaker review, search-engine submission, or real-device validation without evidence.

Confirm to proceed to TDR?
