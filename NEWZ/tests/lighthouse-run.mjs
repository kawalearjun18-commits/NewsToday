// Generates the 8 Lighthouse JSON reports (4 pages x mobile/desktop).
// Needs: a running preview server (npm run preview) and Chrome installed.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const dir = path.join(process.cwd(), 'reports');
fs.mkdirSync(dir, { recursive: true });
const pages = { home: 'en/', category: 'en/category/economy/', article: 'en/article/verify-local-story/', checkout: 'en/checkout/' };
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

for (const [name, route] of Object.entries(pages)) {
  for (const factor of ['mobile', 'desktop']) {
    const output = path.join(dir, `lighthouse-${name}-${factor}.json`);
    const args = ['lighthouse', `${base}/${route}`, '--output=json', `--output-path=${output}`, `--form-factor=${factor}`, '--chrome-flags=--headless', '--quiet'];
    if (factor === 'desktop') args.push('--screenEmulation.disabled', '--preset=desktop');
    console.log(`Running Lighthouse: ${name} (${factor})`);
    const result = spawnSync(npx, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    if (result.status !== 0) { console.error(`Lighthouse failed for ${name} (${factor})`); process.exit(1); }
  }
}
console.log('Done. Run: npm run lighthouse   (prints the scores)');
