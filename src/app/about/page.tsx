import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SmartImage } from "@/components/shared/SmartImage";

export default function AboutPage() {
  return <main id="main"><Container className="py-12 sm:py-16">
    <p className="text-sm text-leather">Our story</p><h1 className="mt-2 text-display-lg">Made slowly, on purpose.</h1>
    <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <SmartImage src="/images/story/workshop.jpg" alt="A craftsman stitching a leather wallet by hand" label="The HY workshop" sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed text-ink/75">HY began with a simple idea: a bag or wallet should get better the longer you own it. We choose each hide by hand, cut it ourselves, and stitch every seam with waxed thread.</p>
        <p className="mt-5 leading-relaxed text-ink/70">No shortcuts, no filler materials. Just honest leather, finished edge by edge, made to be carried for years and repaired rather than replaced.</p>
        <h2 className="mt-10 font-display text-2xl">Crafted by hand in Egypt</h2>
        <p className="mt-3 leading-relaxed text-ink/70">From selecting full-grain and vegetable-tanned hides to burnishing the last edge, each piece is made with care in small batches.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/shop" className="btn btn-primary">Shop the collection</Link>
          <Link href="/custom-orders" className="btn btn-secondary">Request a custom piece</Link>
        </div>
      </div>
    </div>
  </Container></main>;
}
