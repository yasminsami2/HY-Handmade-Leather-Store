"use client";

import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export function WishlistPageContent() {
  const { ids, hydrated } = useWishlist();
  const saved = products.filter((product) => ids.includes(product.id));

  return <main id="main"><Container className="py-12 sm:py-16">
    <p className="text-sm text-leather">Saved for later</p><h1 className="mt-2 text-display-lg">Your wishlist</h1>
    {!hydrated ? <p className="mt-8 text-ink/70">Loading your wishlist…</p> : saved.length ? <div className="mt-10"><ProductGrid products={saved} /></div> : (
      <div className="mt-10 border-y border-sand py-14 text-center">
        <h2 className="font-display text-2xl">Your wishlist is empty.</h2><p className="mt-2 text-ink/70">Save pieces you love and find them here.</p>
        <Link href="/shop" className="btn btn-primary mt-6">Explore the collection</Link>
      </div>
    )}
  </Container></main>;
}
