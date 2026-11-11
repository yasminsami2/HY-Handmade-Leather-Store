import Link from "next/link";
import { Facebook, Instagram, MapPin, MessageCircle, Clock, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { footerCompanyLinks, footerShopLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { buildTelLink, buildWhatsAppLink } from "@/utils/whatsapp";

const socialLink =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand/30 text-sand transition-colors duration-200 hover:bg-sand hover:text-espresso";

export function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="leather-texture text-sand">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/80">{siteConfig.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="HY on Instagram" className={socialLink}>
              <Instagram className="h-5 w-5" aria-hidden />
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="HY on Facebook" className={socialLink}>
              <Facebook className="h-5 w-5" aria-hidden />
            </a>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with HY on WhatsApp" className={socialLink}>
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Shop">
          <h2 className="font-display text-lg text-cream">Shop</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {footerShopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sand/80 transition-colors hover:text-cream">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-display text-lg text-cream">HY</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {footerCompanyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sand/80 transition-colors hover:text-cream">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg text-cream">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-sand/80">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-cream">{contact.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={buildTelLink(contact.phone)} className="hover:text-cream">{contact.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                Message us on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{contact.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>{contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-sand/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Prices in Egyptian pounds. Pay on delivery.</p>
        </div>
      </div>
    </footer>
  );
}
