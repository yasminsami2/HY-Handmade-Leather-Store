import Link from "next/link";
import { getCategoryName } from "@/data/categories";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types";
import { WishlistButton } from "./WishlistButton";
import { QuickAddButton } from "./QuickAddButton";

function badgeFor(product: Product): string | null {
  if (product.stock <= 0) return "Sold out";
  if (product.discountPrice) {
    return `${Math.round((1 - product.discountPrice / product.price) * 100)}% off`;
  }
  if (product.newArrival) return "New";
  return null;
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const badge = badgeFor(product);
  const href = `/products/${product.slug}`;
  const sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

  return (
    <article className="product-card group relative">
      <div className="relative">
        <Link href={href} className="block" aria-label={product.name}>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand/50">
            <SmartImage
              src={product.images[0]}
              alt={`${product.name}, ${product.leatherType} ${getCategoryName(product.category).toLowerCase()}`}
              label={product.name}
              sizes={sizes}
              priority={priority}
              className="transition-transform duration-[600ms] ease-leather group-hover:scale-[1.04]"
            />
            {product.images[1] ? (
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-leather group-hover:opacity-100">
                <SmartImage
                  src={product.images[1]}
                  alt={`${product.name}, alternate view`}
                  label={product.name}
                  sizes={sizes}
                />
              </div>
            ) : null}
          </div>
        </Link>
        <QuickAddButton product={product} />
      </div>

      {badge ? (
        <span className="pointer-events-none absolute left-3 top-3 bg-cream px-2.5 py-1 text-xs font-medium text-espresso">
          {badge}
        </span>
      ) : null}

      <WishlistButton productId={product.id} productName={product.name} className="absolute right-3 top-3" />

      <div className="mt-4">
        <p className="text-sm text-leather">{getCategoryName(product.category)}</p>
        <h3 className="mt-1 text-lg leading-snug">
          <Link href={href} className="hover:text-leather">{product.name}</Link>
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2 text-sm">
          {product.discountPrice ? (
            <>
              <span className="font-medium text-espresso">{formatPrice(product.discountPrice)}</span>
              <s className="text-ink/50">{formatPrice(product.price)}</s>
            </>
          ) : (
            <span className="font-medium text-espresso">{formatPrice(product.price)}</span>
          )}
        </p>
        {product.stock > 0 && product.stock <= 3 ? (
          <p className="mt-1 text-sm text-leather">Only {product.stock} left</p>
        ) : null}
      </div>
    </article>
  );
}
