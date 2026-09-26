import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App, { type Page } from './App';

// Used at build time (scripts/prerender.mjs) to put each page's real content into its HTML file
export function render(page: Page) {
  return renderToString(
    <StrictMode>
      <App initialPage={page} />
    </StrictMode>,
  );
}
