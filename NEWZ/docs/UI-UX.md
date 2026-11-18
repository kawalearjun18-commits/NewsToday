# UI/UX Specification

## Design system

- Colors: ink `#16202A`, paper `#F7F5F0`, white `#FFFFFF`, saffron `#E76F2E`, teal `#0B6B69`, muted `#63707A`, border `#D8D5CD`.
- Typography: system sans for English (`Inter`, `ui-sans-serif`); `Noto Sans Devanagari` fallback stack for Hindi and Indic scripts. Body 17px/1.65, display 48px/1.05 desktop, 32px/1.12 mobile, labels 12px uppercase with tracking.
- Spacing: 4px base, common steps 8/12/16/24/32/48/64.
- Grid: max-width 1180px, 12 columns desktop, 4 columns mobile, 20px mobile gutters and 32px desktop gutters.
- Shape: 2px borders, 10px cards, restrained shadows, no gradients.

## Layouts

- Header: utility date/time bar, masthead, compact language switcher, primary navigation.
- Homepage: lead Bhagalpur/Bihar story, supporting cards, section rails, latest stream, newsletter/checkout CTA.
- Category: title and description, featured local story, consistent three-column story grid.
- Article: breadcrumb, category, headline, dek, byline/date/source block, hero media, readable body, related links, language notice where needed.
- Checkout: single-column mobile / two-column desktop order summary and secure form, clear error states, no distracting motion.

## Responsive and accessibility rules

Design from 320px upward; no horizontal scrolling. Every interactive control has a 44px minimum target, visible `:focus-visible`, keyboard order, and accessible name. Use semantic landmarks, one H1, heading hierarchy, skip link, sufficient contrast, reduced-motion support, alt text, labels, and polite status messaging. Date/time remains visible at every width.

Confirm to proceed to App Flow?
