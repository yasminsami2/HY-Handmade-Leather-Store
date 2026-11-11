import { BrandStory } from "@/components/home/BrandStory";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { Hero } from "@/components/home/Hero";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProductShelf } from "@/components/home/ProductShelf";
import { Reviews } from "@/components/home/Reviews";
import { WhyChoose } from "@/components/home/WhyChoose";
import { reviews } from "@/data/reviews";
import { productService } from "@/services/productService";
import type { CategorySlug } from "@/types";

const primaryCategorySlugs: CategorySlug[] = [
  "womens-bags",
  "tote-bags",
  "crossbody-bags",
  "mens-wallets",
  "womens-wallets",
  "leather-belts",
  "card-holders",
  "laptop-sleeves",
];

export default async function HomePage() {
  const [featured, bestSellers, newArrivals, categories, collections] = await Promise.all([
    productService.getFeatured(),
    productService.getBestSellers(),
    productService.getNewArrivals(),
    productService.getCategories(),
    productService.getCollections(),
  ]);

  const heroProduct = featured[0];
  const primary = primaryCategorySlugs.flatMap((slug) => categories.filter((c) => c.slug === slug));
  const more = categories.filter((c) => !primaryCategorySlugs.includes(c.slug));
  const featuredCollections = ["women", "men", "wallets"].flatMap((slug) =>
    collections.filter((c) => c.slug === slug),
  );

  return (
    <main id="main">
      {heroProduct ? <Hero product={heroProduct} /> : null}
      <CategoryGrid primary={primary} more={more} />
      <ProductShelf
        title="Best Sellers"
        intro="The pieces our customers reorder and gift most."
        products={bestSellers}
        href="/shop?sort=best-selling"
        hrefLabel="Shop best sellers"
        tinted
      />
      <ProductShelf
        title="New Arrivals"
        intro="Fresh from the bench this season."
        products={newArrivals}
        href="/shop?sort=newest"
        hrefLabel="Shop new arrivals"
      />
      <FeaturedCollections collections={featuredCollections} />
      <BrandStory />
      <WhyChoose />
      <Craftsmanship />
      <Reviews reviews={reviews} />
      <InstagramGallery />
      <NewsletterSection />
    </main>
  );
}
