"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/shared/Container";
import { InputField, TextAreaField } from "@/components/shared/FormField";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/utils/format";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export function CheckoutForm() {
  const { items, hydrated } = useCart();
  const [message, setMessage] = useState("");
  const lines = useMemo(() => items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ item, product }] : [];
  }), [items]);
  const subtotal = lines.reduce((sum, { item, product }) => sum + (product.discountPrice ?? product.price) * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.flatRate;

  function prepareRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const details = lines.map(({ item, product }) =>
      `- ${product.name} / ${item.color}${item.size && item.size !== "One size" ? ` / ${item.size}` : ""} x${item.quantity}: ${formatPrice((product.discountPrice ?? product.price) * item.quantity)}`,
    ).join("\n");
    const orderMessage = [
      "Hello HY, I would like to request this order (cash on delivery):",
      details,
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery: ${shipping ? formatPrice(shipping) : "Free"}`,
      `Estimated total: ${formatPrice(subtotal + shipping)}`,
      `Name: ${data.get("fullName")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Governorate: ${data.get("governorate")}`,
      `City: ${data.get("city")}`,
      `Address: ${data.get("address")}`,
      `Notes: ${data.get("notes") || "None"}`,
    ].join("\n");
    setMessage(orderMessage);
  }

  return <main id="main"><Container className="py-12 sm:py-16">
    <p className="text-sm text-leather">Cash on delivery</p><h1 className="mt-2 text-display-lg">Checkout</h1>
    {!hydrated ? <p className="mt-8 text-ink/70">Loading your cart…</p> : !lines.length ? (
      <div className="mt-10 border-y border-sand py-14 text-center"><h2 className="font-display text-2xl">Your cart is empty.</h2><Link href="/shop" className="btn btn-primary mt-6">Explore the collection</Link></div>
    ) : (
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="font-display text-2xl">Delivery details</h2>
          <p className="mt-2 text-sm text-ink/65">Your request will be sent to HY through WhatsApp for confirmation. No payment is taken on this website.</p>
          {message ? (
            <div className="mt-6 border border-sand bg-paper p-6" role="status">
              <h3 className="font-display text-xl">Your order request is ready</h3>
              <p className="mt-2 text-sm text-ink/70">Nothing has been sent or confirmed yet. Continue to WhatsApp to send your request.</p>
              <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">Send request on WhatsApp</a>
              <button type="button" className="ml-4 mt-5 text-sm underline underline-offset-4" onClick={() => setMessage("")}>Edit details</button>
            </div>
          ) : (
            <form onSubmit={prepareRequest} className="mt-6 space-y-5">
              <InputField label="Full name" name="fullName" autoComplete="name" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField label="Phone number" name="phone" type="tel" autoComplete="tel" required />
                <InputField label="Email address" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField label="Governorate" name="governorate" autoComplete="address-level1" required />
                <InputField label="City" name="city" autoComplete="address-level2" required />
              </div>
              <InputField label="Street address and building" name="address" autoComplete="street-address" required />
              <TextAreaField label="Delivery notes (optional)" name="notes" />
              <button type="submit" className="btn btn-primary">Prepare order request</button>
            </form>
          )}
        </section>
        <aside className="h-fit border border-sand bg-paper p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-5 space-y-3 border-b border-sand pb-5 text-sm">
            {lines.map(({ item, product }) => <li key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between gap-4">
              <span>{product.name} · {item.color} × {item.quantity}</span><span className="shrink-0">{formatPrice((product.discountPrice ?? product.price) * item.quantity)}</span>
            </li>)}
          </ul>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
            <p className="flex justify-between"><span>Delivery</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></p>
            <p className="flex justify-between border-t border-sand pt-4 text-base font-medium"><span>Estimated total</span><span>{formatPrice(subtotal + shipping)}</span></p>
          </div>
          <p className="mt-5 text-sm text-ink/60">Cash on delivery. The order is not confirmed until HY contacts you.</p>
        </aside>
      </div>
    )}
  </Container></main>;
}
