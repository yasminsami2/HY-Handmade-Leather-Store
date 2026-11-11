"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { iconButton } from "./styles";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    onClose();
  }

  return (
    <div
      className={cn("fixed inset-0 z-[60] transition-[visibility] duration-300", open ? "visible" : "invisible")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn("absolute inset-0 bg-ink/50 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={cn(
          "absolute inset-x-0 top-0 bg-cream shadow-lift transition-transform duration-300 ease-leather",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container-page py-6 sm:py-8">
          <div className="flex items-center gap-3">
            <form onSubmit={handleSubmit} role="search" className="relative flex-1">
              <label htmlFor="site-search" className="sr-only">Search products</label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-leather" aria-hidden />
              <input
                ref={inputRef}
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bags, wallets, belts"
                className="field !rounded-control !py-3.5 !pl-12 !pr-28 text-base"
              />
              <button type="submit" className="btn btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !px-5 !py-2">
                Search
              </button>
            </form>
            <button type="button" onClick={onClose} className={iconButton} aria-label="Close search">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <p className="mt-6 text-sm text-ink/60">Browse by category</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  onClick={onClose}
                  className="inline-block rounded-control border border-sand px-4 py-2 text-sm text-espresso transition-colors hover:border-espresso"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
