import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductShelfProps {
  title: string;
  intro?: string;
  products: Product[];
  href: string;
  hrefLabel: string;
  tinted?: boolean;
}

export function ProductShelf({ title, intro, products, href, hrefLabel, tinted }: ProductShelfProps) {
  if (products.length === 0) return null;
  return (
    <section className={cn("section-y", tinted && "bg-paper")}>
      <Container>
        <SectionHeading title={title} intro={intro} href={href} hrefLabel={hrefLabel} />
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
