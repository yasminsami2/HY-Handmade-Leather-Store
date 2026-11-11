"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation";
import { newsletterService } from "@/services/newsletterService";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterValues) {
    await newsletterService.subscribe(values.email);
    setDone(true);
    reset();
  }

  if (done) {
    return (
      <div role="status" className="max-w-md">
        <p className="font-display text-2xl text-cream">Thank you.</p>
        <p className="mt-2 text-sand/85">We will write to you when new pieces are ready.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-4 text-sm text-sand underline underline-offset-4 hover:text-cream">
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className="field !rounded-control !border-sand/30 !bg-transparent !text-cream placeholder:!text-sand/60 focus:!border-sand"
          {...register("email")}
        />
        <button type="submit" disabled={isSubmitting} className="btn btn-light shrink-0">
          Subscribe
        </button>
      </div>
      {errors.email ? (
        <p id="newsletter-error" className="mt-2 text-sm text-red-300">{errors.email.message}</p>
      ) : null}
    </form>
  );
}
