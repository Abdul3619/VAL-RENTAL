# Val Car Rental

I built this bilingual (English / Arabic) website for Val Car Rental in Wadi ad-Dawasir, Saudi Arabia. Visitors browse the fleet and send reservation requests straight to the business on WhatsApp.

## Stack

React 19, Vite, Tailwind CSS 4, Motion.

Pages: `/` (home) and `/fleet` (full fleet). Both are prerendered at build time (`src/entry-server.tsx` + `scripts/prerender.mjs` → `dist/index.html`, `dist/fleet.html`), so the HTML contains the page content; the browser then hydrates it.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run lint     # type-check
```

## Deployment

Static site. Framework: Vite · Build command: `npm run build` · Output directory: `dist`.
`vercel.json` enables clean URLs (`/fleet` → `fleet.html`) and falls back to the home page for unknown paths.

No environment variables are required.

## Content

- Fleet, prices and images: `src/data/cars.ts` (images in `public/`)
- Text in both languages: `src/context/LanguageContext.tsx`
- WhatsApp number: `src/components/BookingModal.tsx`, `FloatingActions.tsx`, `VIPService.tsx`
