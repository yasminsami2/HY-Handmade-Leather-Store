import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types";

const facts = [
  { title: "Full-grain leather", text: "Cut from whole hides" },
  { title: "Hand-stitched", text: "Waxed thread, one pair of hands" },
  { title: "Delivered in Egypt", text: "Pay on delivery" },
];

export function Hero({ product }: { product: Product }) {
  return (
    <section className="border-b border-sand">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="hero-rise lg:col-span-6 xl:col-span-5">
          <h1 className="text-display-xl">Crafted by Hand. Made to Last.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            Discover timeless handmade leather pieces, carefully crafted with genuine leather and attention to every detail.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/shop">Shop Collection</Button>
            <Button href="/custom-orders" variant="secondary">Request a custom piece</Button>
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-5 border-t border-sand pt-6 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.title}>
                <p className="font-display text-base text-espresso">{f.title}</p>
                <p className="mt-1 text-sm text-ink/65">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-rise-delay relative lg:col-span-6 xl:col-span-7">
          <div aria-hidden className="absolute -right-3 -top-3 hidden h-full w-full border border-dashed border-leather/60 sm:block" />
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[5/6]">
            <SmartImage
              src="/images/hero/hero.jpg"
              alt="A handmade full-grain leather tote bag on a wooden workbench"
              label="HY Handmade Leather"
              sizes="(min-width: 1280px) 700px, (min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="absolute bottom-5 left-5 right-5 bg-cream p-4 shadow-lift transition-colors hover:bg-paper sm:right-auto sm:min-w-[260px]"
          >
            <span className="block text-sm text-leather">Featured</span>
            <span className="mt-0.5 block font-display text-xl text-espresso">{product.name}</span>
            <span className="mt-0.5 block text-sm text-ink/70">
              {product.leatherType}, {formatPrice(product.discountPrice ?? product.price)}
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
