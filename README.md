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

## Storefront routes

- `/` – home
- `/shop` – catalog search, category/collection filters and sorting
- `/products/[slug]` – product details, variants, stock-aware cart controls and wishlist
- `/cart`, `/wishlist`, `/checkout` – saved cart and wishlist, quantities, totals and order-request handoff
- `/about`, `/contact`, `/custom-orders` – brand information and inquiry forms

The catalog is local static data in `src/data`. Cart and wishlist are stored in the
visitor's browser. Checkout and inquiry forms prepare a WhatsApp message; they do
not process a payment, transmit an order, or confirm availability. Newsletter
signups are also stored only in localStorage. Connect a backend/provider before
using these flows as remote order or subscription systems.

Product and editorial photography can be added under `public/images`; see
`public/images/README.md` for the expected file names. Missing images use the
existing leather-textured fallback.

The contact details and social URLs in `src/lib/site.ts` are example values and
must be replaced with HY's real business accounts before launch. An admin route
was mentioned in earlier setup notes, but no admin page or management API exists.

## Structure

- `src/app` – App Router pages listed above
- `src/components` – layout, home, products, cart, forms, shared
- `src/data`, `src/services`, `src/types` – data layer kept separate from UI for a future API/Supabase swap
- `src/lib/site.ts` – brand, contact, shipping and WhatsApp settings
- `tailwind.config.ts` / `src/app/globals.css` – color tokens, type scale, buttons, inputs, cards
