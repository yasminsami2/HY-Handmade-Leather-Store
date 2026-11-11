import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/utils/format";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export function AnnouncementBar() {
  return (
    <div className="bg-espresso text-cream">
      <div className="container-page flex min-h-10 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-center text-sm">
        <p>Free delivery across Egypt on orders over {formatPrice(siteConfig.shipping.freeShippingThreshold)}</p>
        <a
          href={buildWhatsAppLink("Hello HY, I have a question about your leather products.")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-sand"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
