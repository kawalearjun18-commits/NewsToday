import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const out = path.join(process.cwd(), 'reports', 'screens');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const width of [320, 375, 414, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${base}/en/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(out, `home-${width}.png`), fullPage: true });
}
await browser.close();
console.log(`Screenshots saved to ${out}. Real-device testing remains pending-human.`);
