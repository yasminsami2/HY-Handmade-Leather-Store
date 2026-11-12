"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId, productName, className }: { productId: string; productName: string; className?: string }) {
  const { has, toggle, hydrated } = useWishlist();
  const active = hydrated && has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        "wishlist-button inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-espresso transition-[color,background-color,transform] duration-300 hover:bg-cream active:scale-90",
        className,
      )}
    >
      <Heart className={cn("h-[18px] w-[18px] transition-[fill,stroke] duration-300", active && "fill-leather text-leather")} aria-hidden />
    </button>
  );
}
