export type CategorySlug =
  | "womens-bags"
  | "mens-wallets"
  | "womens-wallets"
  | "leather-belts"
  | "card-holders"
  | "laptop-sleeves"
  | "crossbody-bags"
  | "tote-bags"
  | "passport-holders"
  | "accessories"
  | "custom-products";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  description: string;
  leatherType: string;
  price: number;
  discountPrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  sku: string;
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  specifications: { label: string; value: string }[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type PaymentMethod = "cash_on_delivery";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: (CartItem & { name: string; unitPrice: number })[];
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}

export type CollectionSlug = "women" | "men" | "bags" | "wallets" | "accessories";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  description: string;
  categories: CategorySlug[];
  image: string;
}
