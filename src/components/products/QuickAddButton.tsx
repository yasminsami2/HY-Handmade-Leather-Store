"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

export function QuickAddButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items
    .filter((item) => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);
  const unavailable = !product.stock || inCart >= product.stock;

  function handleAdd() {
    if (unavailable) return;
    addItem({
      productId: product.id,
      color: product.colors[0]?.name ?? "",
      size: product.sizes[0] ?? "",
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={unavailable}
      aria-label={unavailable ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
      className={cn(
        "quick-add-button absolute inset-x-3 bottom-3 z-10 inline-flex min-h-11 items-center justify-center gap-2 bg-cream/95 px-3 text-sm font-medium text-espresso shadow-lift transition-[opacity,transform,color,background-color] duration-300 ease-leather hover:bg-espresso hover:text-cream disabled:cursor-not-allowed disabled:opacity-70",
        added && "bg-espresso text-cream",
      )}
    >
      {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingBag className="h-4 w-4" aria-hidden />}
      <span>{unavailable ? "Sold out" : added ? "Added to bag" : "Add to bag"}</span>
    </button>
  );
}
