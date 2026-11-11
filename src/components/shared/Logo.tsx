import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="HY Handmade Leather Products, home" className={cn("inline-flex items-center gap-3", className)}>
      <Image src="/logo/hy-mark.svg" alt="" width={40} height={40} priority className={light ? "invert brightness-200" : ""} />
      <span className="leading-tight">
        <span className={cn("block font-display text-xl", light ? "text-cream" : "text-espresso")}>HY</span>
        <span className={cn("block text-[11px] tracking-[0.18em]", light ? "text-sand" : "text-leather")}>Handmade Leather</span>
      </span>
    </Link>
  );
}
