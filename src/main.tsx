import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App, { pageFromPath } from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App initialPage={pageFromPath(window.location.pathname)} />
  </StrictMode>
);

// Production builds prerender each page into HTML; hydrate it instead of re-rendering from scratch
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
