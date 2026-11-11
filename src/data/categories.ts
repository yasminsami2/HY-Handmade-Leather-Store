import type { Category, CategorySlug, Collection } from "@/types";

const categoryImage = (slug: CategorySlug) => `/images/categories/${slug}.jpg`;

export const categories: Category[] = [
  { slug: "womens-bags", name: "Women's Bags", description: "Structured shoulder and top-handle bags.", image: categoryImage("womens-bags") },
  { slug: "tote-bags", name: "Tote Bags", description: "Roomy everyday totes in full-grain leather.", image: categoryImage("tote-bags") },
  { slug: "crossbody-bags", name: "Crossbody Bags", description: "Compact bags for hands-free days.", image: categoryImage("crossbody-bags") },
  { slug: "mens-wallets", name: "Men's Wallets", description: "Slim bifolds and long wallets.", image: categoryImage("mens-wallets") },
  { slug: "womens-wallets", name: "Women's Wallets", description: "Zip-around and clutch wallets.", image: categoryImage("womens-wallets") },
  { slug: "leather-belts", name: "Leather Belts", description: "Single-piece belts with solid hardware.", image: categoryImage("leather-belts") },
  { slug: "card-holders", name: "Card Holders", description: "Minimal holders for cards and notes.", image: categoryImage("card-holders") },
  { slug: "laptop-sleeves", name: "Laptop Sleeves", description: "Padded sleeves for 13 to 15 inch laptops.", image: categoryImage("laptop-sleeves") },
  { slug: "passport-holders", name: "Passport Holders", description: "Travel covers with card slots.", image: categoryImage("passport-holders") },
  { slug: "accessories", name: "Handmade Accessories", description: "Key rings, pouches and small pieces.", image: categoryImage("accessories") },
  { slug: "custom-products", name: "Custom Products", description: "Made to your size, color and initials.", image: categoryImage("custom-products") },
];

export const collections: Collection[] = [
  {
    slug: "women",
    name: "Women's Collection",
    description: "Bags and wallets cut for daily use and kept for years.",
    categories: ["womens-bags", "womens-wallets", "crossbody-bags", "tote-bags"],
    image: "/images/collections/women.jpg",
  },
  {
    slug: "men",
    name: "Men's Collection",
    description: "Wallets, belts and sleeves that wear in rather than wear out.",
    categories: ["mens-wallets", "leather-belts", "laptop-sleeves", "card-holders", "passport-holders"],
    image: "/images/collections/men.jpg",
  },
  {
    slug: "bags",
    name: "Bags",
    description: "Totes, crossbody bags and sleeves for work and travel.",
    categories: ["womens-bags", "crossbody-bags", "tote-bags", "laptop-sleeves"],
    image: "/images/collections/bags.jpg",
  },
  {
    slug: "wallets",
    name: "Wallets and Cardholders",
    description: "Small leather goods you will reach for every day.",
    categories: ["mens-wallets", "womens-wallets", "card-holders", "passport-holders"],
    image: "/images/collections/wallets.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Belts, key rings and finishing touches.",
    categories: ["accessories", "leather-belts", "card-holders"],
    image: "/images/collections/accessories.jpg",
  },
];

export function getCategoryName(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
