"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/shared/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Category, Collection, Product } from "@/types";

interface ShopCatalogProps {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  initialQuery: string;
  initialCategory: string;
  initialCollection: string;
  initialSort: string;
}

export function ShopCatalog({
  products,
  categories,
  collections,
  initialQuery,
  initialCategory,
  initialCollection,
  initialSort,
}: ShopCatalogProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [collection, setCollection] = useState(initialCollection);
  const [sort, setSort] = useState(initialSort);

  const visibleProducts = useMemo(() => {
    const collectionCategories = collections.find((item) => item.slug === collection)?.categories;
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesCollection = !collectionCategories || collectionCategories.includes(product.category);
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.description} ${product.leatherType} ${product.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesCollection && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "price-low") return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
      if (sort === "price-high") return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
      if (sort === "newest") return b.createdAt.localeCompare(a.createdAt);
      if (sort === "best-selling") return Number(b.bestSeller) - Number(a.bestSeller);
      return Number(b.featured) - Number(a.featured);
    });
  }, [products, categories, collections, query, category, collection, sort]);

  return (
    <main id="main">
      <Container className="py-12 sm:py-16">
        <p className="text-sm text-leather">The HY collection</p>
        <h1 className="mt-2 text-display-lg">Shop all</h1>
        <p className="mt-4 max-w-2xl text-ink/70">
          Handmade leather bags, wallets and everyday pieces, crafted in Egypt.
        </p>

        <div className="mt-8 grid gap-4 border-y border-sand py-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm text-espresso">
            <span className="field-label">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bags, wallets, belts"
              className="field"
            />
          </label>
          <label className="text-sm text-espresso">
            <span className="field-label">Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="field">
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-espresso">
            <span className="field-label">Collection</span>
            <select value={collection} onChange={(event) => setCollection(event.target.value)} className="field">
              <option value="">All collections</option>
              {collections.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-espresso">
            <span className="field-label">Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="field">
              <option value="featured">Featured</option>
              <option value="best-selling">Best sellers</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        <p className="my-6 text-sm text-ink/65" role="status">
          {visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"}
        </p>
        {visibleProducts.length ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <div className="border-y border-sand py-14 text-center">
            <h2 className="font-display text-2xl text-espresso">No pieces found</h2>
            <p className="mt-2 text-ink/70">Try another search or choose a different category.</p>
            <button
              type="button"
              onClick={() => { setQuery(""); setCategory(""); setCollection(""); setSort("featured"); }}
              className="btn btn-secondary mt-6"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </main>
  );
}
