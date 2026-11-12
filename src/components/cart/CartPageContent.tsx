"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/utils/format";

export function CartPageContent() {
  const { items, hydrated, updateQuantity, removeItem } = useCart();
  const lines = useMemo(() => items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ item, product }] : [];
  }), [items]);
  const subtotal = lines.reduce((sum, { item, product }) => sum + (product.discountPrice ?? product.price) * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.flatRate;

  return (
    <main id="main"><Container className="py-12 sm:py-16">
      <p className="text-sm text-leather">Your selection</p><h1 className="mt-2 text-display-lg">Shopping cart</h1>
      {!hydrated ? <p className="mt-8 text-ink/70">Loading your cart…</p> : !lines.length ? (
        <div className="mt-10 border-y border-sand py-14 text-center">
          <h2 className="font-display text-2xl">Your cart is waiting for something special.</h2>
          <Link href="/shop" className="btn btn-primary mt-6">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-sand">
            {lines.map(({ item, product }) => {
              const unitPrice = product.discountPrice ?? product.price;
              return <li key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 py-6 first:pt-0 sm:gap-6">
                <Link href={`/products/${product.slug}`} className="leather-texture flex h-28 w-24 shrink-0 items-center justify-center p-2 text-center font-display text-sm text-sand sm:h-36 sm:w-28">{product.name}</Link>
                <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between sm:gap-6">
                  <div><Link href={`/products/${product.slug}`} className="font-display text-xl hover:text-leather">{product.name}</Link>
                    <p className="mt-1 text-sm text-ink/60">{item.color}{item.size && item.size !== "One size" ? ` · ${item.size}` : ""}</p>
                    <p className="mt-2 text-sm text-espresso">{formatPrice(unitPrice)} each</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end">
                    <div className="flex items-center border border-sand">
                      <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)} className="h-9 w-9"><Minus className="mx-auto h-4 w-4" /></button>
                      <span className="w-8 text-center" aria-live="polite">{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={items.filter((cartItem) => cartItem.productId === item.productId).reduce((sum, cartItem) => sum + cartItem.quantity, 0) >= product.stock} onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)} className="h-9 w-9"><Plus className="mx-auto h-4 w-4" /></button>
                    </div>
                    <div className="flex items-center gap-3"><span className="font-medium">{formatPrice(unitPrice * item.quantity)}</span>
                      <button type="button" aria-label={`Remove ${product.name} from cart`} onClick={() => removeItem(item.productId, item.color, item.size)} className="p-2 text-ink/60 hover:text-leather"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </li>;
            })}
          </ul>
          <aside className="h-fit border border-sand bg-paper p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
              <p className="flex justify-between"><span>Delivery</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></p>
              <p className="flex justify-between border-t border-sand pt-4 text-base font-medium"><span>Total</span><span>{formatPrice(subtotal + shipping)}</span></p>
            </div>
            {subtotal > 0 && subtotal < siteConfig.shipping.freeShippingThreshold ? <p className="mt-4 text-sm text-ink/60">Free delivery from {formatPrice(siteConfig.shipping.freeShippingThreshold)}.</p> : null}
            <Link href="/checkout" className="btn btn-primary mt-6 w-full">Continue to checkout</Link>
            <Link href="/shop" className="mt-4 block text-center text-sm underline underline-offset-4">Continue shopping</Link>
          </aside>
        </div>
      )}
    </Container></main>
  );
}
