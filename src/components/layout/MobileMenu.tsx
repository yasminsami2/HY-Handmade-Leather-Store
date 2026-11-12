"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { iconButton } from "./styles";
import { NavigationLinks } from "./NavigationLinks";

export function MobileMenu({
  open,
  onClose,
  triggerRef,
  closeButtonRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  if (!portalRoot) return null;

  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className={cn("fixed inset-x-0 top-0 z-50 h-screen transition-[visibility] duration-300 lg:hidden", open ? "visible" : "invisible")}
      style={{ height: "100dvh" }}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        className={cn("absolute inset-0 border-0 p-0 transition-opacity duration-300", open ? "bg-ink/50 opacity-100" : "pointer-events-none bg-ink/50 opacity-0")}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={trapFocus}
        className={cn(
          "absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-hidden bg-cream pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-leather will-change-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-sand px-5 py-4">
          <Logo />
          <button
            key={open ? "open" : "closed"}
            ref={closeButtonRef}
            autoFocus={open}
            type="button"
            onClick={onClose}
            className={iconButton}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <ul className="space-y-1">
            <NavigationLinks pathname={pathname} mobile onNavigate={onClose} />
          </ul>
        </nav>

        <div className="shrink-0 border-t border-sand px-5 py-4 text-sm">
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
    </div>,
    portalRoot,
  );
}
