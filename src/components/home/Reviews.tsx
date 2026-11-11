import { Star } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Review } from "@/data/reviews";

export function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading title="Customer Reviews" />
        <ul className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {reviews.map((r) => (
            <li key={r.id} className="card flex flex-col p-7">
              <div className="flex gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={i < r.rating ? "h-4 w-4 fill-leather text-leather" : "h-4 w-4 text-sand"}
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-espresso">
                {r.text}
              </blockquote>
              <p className="mt-6 text-sm text-ink/70">
                <span className="font-medium text-espresso">{r.name}</span>, {r.city}
                <br />
                Bought the {r.product}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
