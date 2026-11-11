import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SmartImage } from "@/components/shared/SmartImage";
import type { Category } from "@/types";

export function CategoryGrid({ primary, more }: { primary: Category[]; more: Category[] }) {
  return (
    <section className="section-y">
      <Container>
        <div>
          <SectionHeading title="Shop by Category" intro="From everyday carry to statement bags, every piece is cut and finished by hand." href="/shop" hrefLabel="Shop all products" />
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {primary.map((c) => (
            <li key={c.slug}>
              <Link href={`/shop?category=${c.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand/50">
                  <SmartImage
                    src={c.image}
                    alt={c.name}
                    label={c.name}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="transition-transform duration-[900ms] ease-leather group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-4 text-xl group-hover:text-leather">{c.name}</h3>
                <p className="mt-1 text-sm text-ink/65">{c.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sand pt-6 text-sm">
          <span className="text-ink/60">Also explore</span>
          {more.map((c) => (
            <Link key={c.slug} href={`/shop?category=${c.slug}`} className="text-espresso underline-offset-4 hover:text-leather hover:underline">
              {c.name}
            </Link>
          ))}
        </p>
      </Container>
    </section>
  );
}
