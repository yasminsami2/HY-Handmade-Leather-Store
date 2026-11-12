/**
 * Single source of truth for brand and contact settings.
 * A future admin "Settings" screen can replace this with values from a database.
 */
export const siteConfig = {
  name: "HY Handmade Leather Products",
  shortName: "HY",
  tagline: "Crafted by Hand. Made to Last.",
  description:
    "Handmade genuine leather bags, wallets, belts and accessories, crafted in Egypt with attention to every detail.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://hy-handmade-leather-store-5zh0k06bs-yasminsami2.vercel.app",
  currency: "EGP",
  locale: "en-EG",
  contact: {
    email: "hello@hyleather.example",
    phone: "+20 100 000 0000",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201000000000",
    address: "Egypt",
    hours: "Daily, 10:00 – 20:00",
  },
  social: {
    instagram: "https://instagram.com/",
    instagramHandle: "@hyleather",
    facebook: "https://facebook.com/",
  },
  shipping: {
    flatRate: 60,
    freeShippingThreshold: 2500,
  },
} as const;

export type SiteConfig = typeof siteConfig;
