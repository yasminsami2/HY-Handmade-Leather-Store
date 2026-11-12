"use client";

import { usePathname } from "next/navigation";
import { Facebook, Instagram, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { iconButton } from "./styles";
import { NavigationLinks } from "./NavigationLinks";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div
      className={cn("fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn("absolute inset-0 bg-ink/50 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-cream transition-transform duration-300 ease-leather",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-sand px-5 py-4">
          <Logo />
          <button type="button" onClick={onClose} className={iconButton} aria-label="Close menu">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-5 py-6">
          <ul className="space-y-1">
            <NavigationLinks pathname={pathname} mobile onNavigate={onClose} />
          </ul>
        </nav>

        <div className="border-t border-sand px-5 py-6 text-sm">
          <p className="text-ink/70">{siteConfig.contact.hours}</p>
          <a href={`mailto:${siteConfig.contact.email}`} className="mt-1 block text-espresso underline-offset-4 hover:underline">
            {siteConfig.contact.email}
          </a>
          <div className="mt-4 flex items-center gap-1">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconButton}>
              <Instagram className="h-5 w-5" aria-hidden />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={iconButton}>
              <Facebook className="h-5 w-5" aria-hidden />
            </a>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconButton}>
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
