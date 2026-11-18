import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const routes = ['/en/', '/hi/', '/en/article/verify-local-story/', '/hi/article/verify-local-story/', '/en/category/others/', '/hi/category/others/', '/en/checkout/', '/hi/checkout/'];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const failures = [];
for (const route of routes) {
  const errors = [];
  page.removeAllListeners('pageerror');
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => ({
    images: [...document.images].map((image) => ({ alt: image.alt, width: image.width, height: image.height })),
    switchers: [...document.querySelectorAll('.switcher')].map((root) => ({ button: root.querySelector('button')?.getBoundingClientRect().toJSON(), expanded: root.getAttribute('aria-expanded') })),
    dateBar: Boolean(document.querySelector('.utility time'))
  }));
  if (errors.length) failures.push(`${route}: console ${errors.join('; ')}`);
  if (!result.dateBar) failures.push(`${route}: missing date/time bar`);
  for (const image of result.images) {
    if (!image.alt || image.width <= 0 || image.height <= 0) failures.push(`${route}: invalid image dimensions or alt`);
  }
  for (const switcher of result.switchers) {
    if (!switcher.button || switcher.button.width < 44 || switcher.button.height < 44) failures.push(`${route}: language switcher below 44px target`);
  }
}
await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Browser quality checks passed: ${routes.length} routes, no console errors, images, date bars, and 44px switcher targets verified.`);
}
