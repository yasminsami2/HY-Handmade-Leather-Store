import { Instagram } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SmartImage } from "@/components/shared/SmartImage";
import { siteConfig } from "@/lib/site";

const tiles = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/images/gallery/gallery-${n}.jpg`,
  alt: `HY handmade leather, photo ${n} from our Instagram`,
}));

export function InstagramGallery() {
  return (
    <section className="section-y bg-paper">
      <Container>
        <SectionHeading
          title={`Follow ${siteConfig.social.instagramHandle}`}
          intro="Behind the bench, new pieces and how our customers carry them."
          href={siteConfig.social.instagram}
          hrefLabel="Open Instagram"
        />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {tiles.map((t, i) => (
            <li key={t.src}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-sand/50"
                aria-label={`View on Instagram: photo ${i + 1}`}
              >
                <SmartImage
                  src={t.src}
                  alt={t.alt}
                  label="HY"
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="transition-transform duration-[600ms] ease-leather group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-espresso/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Instagram className="h-7 w-7 text-cream" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
