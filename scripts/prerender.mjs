// Renders each page to HTML at build time (dist/index.html and dist/fleet.html), so the content is in
// the initial HTML for search engines, link previews and no-JS visitors. The browser then hydrates it.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const distDir = path.resolve('dist');
const ssrDir = path.resolve('dist-ssr');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

if (!template.includes('<!--app-html-->')) {
  console.error('prerender: <!--app-html--> placeholder not found in dist/index.html');
  process.exit(1);
}

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const pages = [
  { page: 'home', file: 'index.html' },
  { page: 'fleet', file: 'fleet.html' },
];

for (const { page, file } of pages) {
  const html = render(page);
  const out = path.join(distDir, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, template.replace('<!--app-html-->', () => html));
  console.log(`prerender: ${file} (${html.length} characters)`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
