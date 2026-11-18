import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://newstoday.example',
  build: { format: 'directory' }
});
