"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { getCategoryName } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { WishlistButton } from "@/components/products/WishlistButton";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SmartImage } from "@/components/shared/SmartImage";
import { Container } from "@/components/shared/Container";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types";

export function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  const { addItem, items } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [addedQuantity, setAddedQuantity] = useState(0);
  const inCart = items
    .filter((item) => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);
  const remaining = Math.max(0, product.stock - inCart);

  function addToCart() {
    const addQuantity = Math.min(quantity, remaining);
    if (addQuantity <= 0) return;
    addItem({ productId: product.id, color, size, quantity: addQuantity });
    setAddedQuantity(addQuantity);
    setAdded(true);
  }

  return (
    <main id="main">
      <Container className="py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink/60">
          <Link href="/shop" className="hover:text-leather">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-leather">
            {getCategoryName(product.category)}
          </Link>
          <span className="mx-2">/</span><span>{product.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.map((image, index) => (
              <div key={image} className="relative aspect-[4/5] overflow-hidden bg-sand/50">
                <SmartImage src={image} alt={`${product.name}${index ? ", alternate view" : ""}`} label={product.name} sizes="(min-width: 1024px) 25vw, 50vw" priority={index === 0} />
              </div>
            ))}
          </div>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm text-leather">{getCategoryName(product.category)}</p>
            <h1 className="mt-2 text-display-lg">{product.name}</h1>
            <p className="mt-4 flex items-baseline gap-3 text-lg">
              <span className="font-medium text-espresso">{formatPrice(product.discountPrice ?? product.price)}</span>
              {product.discountPrice ? <s className="text-sm text-ink/50">{formatPrice(product.price)}</s> : null}
            </p>
            <p className="mt-6 leading-relaxed text-ink/75">{product.description}</p>
            <p className="mt-4 text-sm text-ink/65">{product.leatherType}</p>

            <fieldset className="mt-8">
              <legend className="field-label">Color: {color}</legend>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setColor(item.name)}
                    aria-label={item.name}
                    aria-pressed={color === item.name}
                    className={`h-9 w-9 rounded-full border-2 ${color === item.name ? "border-leather ring-2 ring-leather ring-offset-2" : "border-sand"}`}
                    style={{ backgroundColor: item.hex }}
                  />
                ))}
              </div>
            </fieldset>

            {product.sizes.length > 1 ? (
              <label className="mt-6 block max-w-xs">
                <span className="field-label">Size</span>
                <select value={size} onChange={(event) => setSize(event.target.value)} className="field">
                  {product.sizes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center border border-sand">
                <button type="button" className="h-11 w-11" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus className="mx-auto h-4 w-4" /></button>
                <span className="w-8 text-center" aria-live="polite">{quantity}</span>
                <button type="button" className="h-11 w-11" aria-label="Increase quantity" disabled={quantity >= remaining} onClick={() => setQuantity((value) => Math.min(remaining, value + 1))}><Plus className="mx-auto h-4 w-4" /></button>
              </div>
              <button type="button" disabled={remaining <= 0} onClick={addToCart} className="btn btn-primary flex-1 sm:flex-none">
                <ShoppingBag className="h-4 w-4" aria-hidden />{remaining ? "Add to cart" : "Stock limit reached"}
              </button>
              <WishlistButton productId={product.id} productName={product.name} className="border border-sand" />
            </div>
            {added ? <p role="status" className="mt-4 text-sm text-leather">{addedQuantity} added to your cart. <Link href="/cart" className="underline">View cart</Link></p> : null}
            {product.stock > 0 && product.stock <= 3 && remaining > 0 ? <p className="mt-4 text-sm text-leather">Only {remaining} left to add</p> : null}
            <dl className="mt-8 border-t border-sand">
              {product.specifications.map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-sand py-3 text-sm">
                  <dt className="text-ink/60">{item.label}</dt><dd className="text-right text-espresso">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-ink/60">Delivered across Egypt. Pay on delivery.</p>
          </div>
        </div>
        {related.length ? (
          <section className="mt-20 border-t border-sand pt-12">
            <h2 className="mb-8 text-display-md">You may also like</h2>
            <ProductGrid products={related} />
          </section>
        ) : null}
      </Container>
    </main>
  );
}
