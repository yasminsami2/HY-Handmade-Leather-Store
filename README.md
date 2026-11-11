# HY Handmade Leather Products

Premium e-commerce storefront for a handmade leather brand (Egypt, EGP).
Next.js (App Router) + React + TypeScript + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

Copy `.env.example` to `.env.local` and set your WhatsApp number.

## Status

- Stage 1 (setup, folder architecture, design system): done
- Stages 2–7: pending

## Structure

- `src/app` – routes (shop, products/[slug], cart, wishlist, checkout, about, contact, custom-orders, admin)
- `src/components` – layout, home, products, cart, forms, shared
- `src/data`, `src/services`, `src/types` – data layer kept separate from UI for a future API/Supabase swap
- `src/lib/site.ts` – brand, contact, shipping and WhatsApp settings
- `tailwind.config.ts` / `src/app/globals.css` – color tokens, type scale, buttons, inputs, cards
