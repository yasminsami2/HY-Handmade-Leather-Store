import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";

export default function CustomOrdersPage() {
  return <main id="main"><Container className="py-12 sm:py-16">
    <p className="text-sm text-leather">Made your way</p><h1 className="mt-2 text-display-lg">Custom orders</h1>
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_420px]">
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl">A piece made for you</h2>
        <p className="mt-4 leading-relaxed text-ink/70">Choose a style, leather color, size or initials and tell us what you have in mind. We will discuss the details and timing with you before confirming anything.</p>
        <p className="mt-4 text-sm text-ink/60">Submitting this form prepares a WhatsApp message; it does not place or confirm an order.</p>
        <Link href="/shop" className="mt-6 inline-block text-sm underline underline-offset-4">Browse existing pieces</Link>
      </div>
      <div className="border border-sand bg-paper p-6 sm:p-8"><InquiryForm customOrder /></div>
    </div>
  </Container></main>;
}
