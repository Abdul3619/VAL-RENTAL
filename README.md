# Velocity Rentals

I built this bilingual (English / Arabic) website for Velocity Rentals, a demo luxury car rental brand. Visitors browse the fleet, swipe through photos of each car, and send reservation requests on WhatsApp.

Velocity Rentals is fictional. No WhatsApp number is set, so links open WhatsApp with the message ready and the visitor picks the chat; put a real client's number in `src/data/site.ts`. The reviews and rental terms are marked on the page as illustrative examples.

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

- Fleet and prices: `src/data/cars.ts`. Each car has an `images` array (any length) shown in a swipeable gallery; the current photos are demo stock photos plus detail crops in `src/assets/cars/`.
- Business details and WhatsApp number: `src/data/site.ts`
- Text in both languages: `src/context/LanguageContext.tsx`
- WhatsApp number: `src/components/BookingModal.tsx`, `FloatingActions.tsx`, `VIPService.tsx`
