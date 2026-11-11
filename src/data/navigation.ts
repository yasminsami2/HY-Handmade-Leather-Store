export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Women's Collection", href: "/shop?collection=women" },
  { label: "Men's Collection", href: "/shop?collection=men" },
  { label: "Bags", href: "/shop?collection=bags" },
  { label: "Wallets", href: "/shop?collection=wallets" },
  { label: "Accessories", href: "/shop?collection=accessories" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerShopLinks: NavLink[] = mainNav.slice(0, 6);

export const footerCompanyLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Contact", href: "/contact" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
];
