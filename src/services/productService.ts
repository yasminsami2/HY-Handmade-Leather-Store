import { categories, collections } from "@/data/categories";
import { products } from "@/data/products";
import type { Category, Collection, Product } from "@/types";

/**
 * Repository contract. The local implementation reads static data.
 * Swap it for a Supabase/PostgreSQL or REST implementation without touching the UI.
 */
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | undefined>;
  getById(id: string): Promise<Product | undefined>;
  getCategories(): Promise<Category[]>;
  getCollections(): Promise<Collection[]>;
}

const localRepository: ProductRepository = {
  async getAll() {
    return products;
  },
  async getBySlug(slug) {
    return products.find((p) => p.slug === slug);
  },
  async getById(id) {
    return products.find((p) => p.id === id);
  },
  async getCategories() {
    return categories;
  },
  async getCollections() {
    return collections;
  },
};

const repository: ProductRepository = localRepository;

export const productService = {
  getAll: () => repository.getAll(),
  getBySlug: (slug: string) => repository.getBySlug(slug),
  getById: (id: string) => repository.getById(id),
  getCategories: () => repository.getCategories(),
  getCollections: () => repository.getCollections(),

  async getFeatured(limit = 4) {
    return (await repository.getAll()).filter((p) => p.featured).slice(0, limit);
  },
  async getBestSellers(limit = 4) {
    return (await repository.getAll()).filter((p) => p.bestSeller).slice(0, limit);
  },
  async getNewArrivals(limit = 4) {
    return (await repository.getAll())
      .filter((p) => p.newArrival)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  },
};
