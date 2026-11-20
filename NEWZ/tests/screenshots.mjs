import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const out = path.join(process.cwd(), 'reports', 'screens');
fs.mkdirSync(out, { recursive: true });

const widths = [320, 375, 414, 768, 1024, 1440];
const pages = [
  ['home', ''],
  ['category', 'category/economy/'],
  ['article', 'article/verify-local-story/'],
  ['checkout', 'checkout/']
];

const browser = await chromium.launch();
const page = await browser.newPage();
const problems = [];

for (const lang of ['en', 'hi']) {
  for (const [name, route] of pages) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/${lang}/${route}`, { waitUntil: 'networkidle' });

      // Date bar must be visible and inside the viewport from 320px up.
      const date = page.locator('.utility time');
      const visible = await date.isVisible();
      const box = visible ? await date.boundingBox() : null;
      if (!visible || !box || box.x < 0 || box.x + box.width > width) problems.push(`${lang}/${name}@${width}: date bar not fully visible`);

      // No sideways scrolling.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) problems.push(`${lang}/${name}@${width}: horizontal overflow ${overflow}px`);

      await page.screenshot({ path: path.join(out, `${lang}-${name}-${width}.png`), fullPage: true });
    }
  }
}
await browser.close();

if (problems.length) {
  console.error(`Layout problems found:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Saved ${2 * pages.length * widths.length} screenshots to ${out}; date bar visible and no overflow at every width. Real-device testing remains pending-human.`);
