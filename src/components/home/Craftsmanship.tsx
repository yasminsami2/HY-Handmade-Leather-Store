import { Container } from "@/components/shared/Container";
import { SmartImage } from "@/components/shared/SmartImage";

const steps = [
  { image: "/images/craft/step-1.jpg", title: "Choosing the hide", text: "We inspect each hide for grain and thickness and only cut from the best of it." },
  { image: "/images/craft/step-2.jpg", title: "Cutting and stitching", text: "Panels are cut by hand and sewn with waxed thread, one stitch at a time." },
  { image: "/images/craft/step-3.jpg", title: "Finishing the edges", text: "Edges are sanded, dyed and burnished until smooth, then the piece is hand-polished." },
];

export function Craftsmanship() {
  return (
    <section className="leather-texture section-y text-cream">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-display-lg text-cream">Handmade Craftsmanship</h2>
          <p className="mt-4 text-lg text-sand/85">Three stages, no machines doing the thinking.</p>
        </div>
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <div className="relative aspect-[3/4] overflow-hidden bg-espresso">
                <SmartImage src={s.image} alt={s.title} label={s.title} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <p className="mt-6 font-display text-3xl text-leather">{i + 1}</p>
              <h3 className="mt-1 text-xl text-cream">{s.title}</h3>
              <p className="mt-2 text-sand/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
