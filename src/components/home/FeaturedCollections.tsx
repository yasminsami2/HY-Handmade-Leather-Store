import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SmartImage } from "@/components/shared/SmartImage";
import type { Collection } from "@/types";

export function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading title="Featured Collections" intro="Three ways into the workshop." />
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {collections.map((c, i) => (
            <li key={c.slug} className={i === 1 ? "md:mt-14" : undefined}>
              <Link href={`/shop?collection=${c.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand/50">
                  <SmartImage
                    src={c.image}
                    alt={c.name}
                    label={c.name}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="transition-transform duration-[700ms] ease-leather group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 text-2xl group-hover:text-leather">{c.name}</h3>
                <p className="mt-2 max-w-sm text-ink/70">{c.description}</p>
                <span className="mt-4 inline-block border-b border-espresso pb-0.5 text-sm text-espresso group-hover:border-leather group-hover:text-leather">
                  View collection
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
