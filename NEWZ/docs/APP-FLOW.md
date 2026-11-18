# App Flow

## Entry and language

1. A visitor enters `/`; bots and explicit language URLs are never redirected.
2. On the first human visit only, detector checks saved cookie/localStorage preference, browser language, timezone, then edge geo headers.
3. If no supported match exists, English is selected. The URL is the source of truth after redirect.
4. Header/footer switcher offers native language names. Manual selection stores preference and navigates to the matching clean URL; unavailable translations show a translated notice linking to the available version.

## Reading

Home → section → article → related article/category. Article pages expose source, date, author, breadcrumb, language availability, and stable canonical/hreflang links. No runtime DOM translation occurs.

## Checkout

CTA → checkout page → validate required fields locally → submit only to a configured endpoint → show explicit success/error state. If no endpoint is configured, the form remains a clearly labeled preview and does not claim payment completion.

## Navigation

Keyboard users can skip to content, open the language menu, move through links, and close the menu with Escape. Touch users receive persistent header/footer switching without modal popups.

Confirm to proceed to Backend Schema?
