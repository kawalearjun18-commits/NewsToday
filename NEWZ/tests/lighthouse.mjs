import fs from 'node:fs';
import path from 'node:path';
const dir = path.join(process.cwd(), 'reports');
const reports = fs.readdirSync(dir).filter((file) => /^lighthouse-(home|article|category|checkout)-(mobile|desktop)\.json$/.test(file));
if (reports.length !== 8) throw new Error(`Expected 8 real Lighthouse reports, found ${reports.length}`);
for (const file of reports) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  console.log(`${file}: performance=${Math.round(report.categories.performance.score * 100)} accessibility=${Math.round(report.categories.accessibility.score * 100)} best-practices=${Math.round(report.categories['best-practices'].score * 100)} seo=${Math.round(report.categories.seo.score * 100)}`);
}
