import { Container } from "@/components/shared/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="leather-texture text-cream">
      <Container className="grid items-center gap-8 py-16 md:grid-cols-2 md:gap-12 md:py-20">
        <div>
          <h2 className="text-display-md text-cream">New pieces, first.</h2>
          <p className="mt-3 max-w-md text-sand/85">Join the list for new arrivals and small-batch releases. No spam, only leather.</p>
        </div>
        <div className="md:justify-self-end md:w-full md:max-w-md">
          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
