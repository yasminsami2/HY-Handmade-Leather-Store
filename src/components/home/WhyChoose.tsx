import { PenLine, Scissors, ShieldCheck, Truck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const reasons = [
  { icon: ShieldCheck, title: "Genuine leather only", text: "Full-grain and vegetable-tanned hides. No bonded or faux leather." },
  { icon: Scissors, title: "Stitched by hand", text: "Waxed thread and hand-burnished edges that hold up to daily use." },
  { icon: PenLine, title: "Made your way", text: "Choose the color, size and initials with a custom order." },
  { icon: Truck, title: "Delivered across Egypt", text: "Pay on delivery, with WhatsApp support before and after you order." },
];

export function WhyChoose() {
  return (
    <section className="section-y bg-paper">
      <Container>
        <SectionHeading title="Why Choose HY" />
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="lg:border-l lg:border-sand lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <Icon className="h-7 w-7 text-leather" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-ink/70">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
