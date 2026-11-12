import { Container } from "@/components/shared/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteConfig } from "@/lib/site";
import { buildTelLink, buildWhatsAppLink } from "@/utils/whatsapp";

export default function ContactPage() {
  const { contact } = siteConfig;
  return <main id="main"><Container className="py-12 sm:py-16">
    <p className="text-sm text-leather">We are here to help</p><h1 className="mt-2 text-display-lg">Contact HY</h1>
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
      <section><h2 className="mb-6 font-display text-2xl">Send us a message</h2><InquiryForm /></section>
      <aside className="h-fit border border-sand bg-paper p-6">
        <h2 className="font-display text-2xl">Get in touch</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">For questions about an order, a product or delivery, contact us directly.</p>
        <ul className="mt-6 space-y-4 text-sm">
          <li><span className="block text-ink/60">Email</span><a className="mt-1 inline-block break-all underline" href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><span className="block text-ink/60">Phone</span><a className="mt-1 inline-block underline" href={buildTelLink(contact.phone)}>{contact.phone}</a></li>
          <li><span className="block text-ink/60">Hours</span><span className="mt-1 inline-block">{contact.hours}</span></li>
        </ul>
        <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-7 w-full">Message us on WhatsApp</a>
      </aside>
    </div>
  </Container></main>;
}
