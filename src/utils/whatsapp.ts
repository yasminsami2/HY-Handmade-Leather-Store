import { siteConfig } from "@/lib/site";

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildTelLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}
