"use client";

import { useState } from "react";
import { InputField, TextAreaField } from "@/components/shared/FormField";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export function InquiryForm({ customOrder = false }: { customOrder?: boolean }) {
  const [message, setMessage] = useState("");

  function prepareMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const body = [
      customOrder ? "Custom order request" : "Contact request",
      `Name: ${values.get("name")}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone") || "Not provided"}`,
      ...(customOrder ? [`Piece or product: ${values.get("piece")}`, `Preferred color or details: ${values.get("preferences")}`] : []),
      `Message: ${values.get("message")}`,
    ].join("\n");
    setMessage(body);
  }

  if (message) return <div className="border border-sand bg-paper p-6" role="status">
    <h2 className="font-display text-2xl">{customOrder ? "Your request is ready" : "Your message is ready"}</h2>
    <p className="mt-2 text-sm text-ink/70">It has not been sent yet. Continue to WhatsApp to send it to HY.</p>
    <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">Continue to WhatsApp</a>
    <button type="button" onClick={() => setMessage("")} className="ml-4 mt-5 text-sm underline underline-offset-4">Edit message</button>
  </div>;

  return <form onSubmit={prepareMessage} className="space-y-5">
    <InputField label="Full name" name="name" autoComplete="name" required />
    <div className="grid gap-5 sm:grid-cols-2">
      <InputField label="Email address" name="email" type="email" autoComplete="email" required />
      <InputField label="Phone number (optional)" name="phone" type="tel" autoComplete="tel" />
    </div>
    {customOrder ? <>
      <InputField label="Piece or product" name="piece" placeholder="For example, a crossbody bag" required />
      <InputField label="Preferred color or personalization" name="preferences" placeholder="Color, size or initials" required />
    </> : null}
    <TextAreaField label={customOrder ? "Tell us what you have in mind" : "How can we help?"} name="message" required minLength={10} />
    <button type="submit" className="btn btn-primary">{customOrder ? "Prepare custom order request" : "Prepare message"}</button>
  </form>;
}
