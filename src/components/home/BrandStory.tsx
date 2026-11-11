import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SmartImage } from "@/components/shared/SmartImage";

export function BrandStory() {
  return (
    <section className="section-y bg-sand/40">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <SmartImage
              src="/images/story/workshop.jpg"
              alt="A craftsman stitching a leather wallet by hand"
              label="The HY workshop"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="text-display-lg">Made slowly, on purpose.</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            HY began with a simple idea: a bag or wallet should get better the longer you own it. We choose each hide by hand, cut it ourselves, and stitch every seam with waxed thread.
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">
            No shortcuts, no filler materials. Just honest leather, finished edge by edge, made to be carried for years and repaired rather than replaced.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">Read our story</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
