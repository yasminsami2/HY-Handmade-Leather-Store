"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinksProps {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

function NavigationLinkList({
  pathname,
  collection,
  mobile,
  onNavigate,
}: NavigationLinksProps & { collection: string | null }) {
  return (
    <>
      {mainNav.map((link) => {
        const [hrefPath, hrefQuery] = link.href.split("?");
        const linkCollection = new URLSearchParams(hrefQuery ?? "").get("collection");
        const active =
          hrefPath === "/shop"
            ? pathname === "/shop" &&
              (linkCollection ? collection === linkCollection : collection === "")
            : pathname === hrefPath;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={
                mobile
                  ? cn(
                      "block border-b border-sand/70 py-3.5 font-display text-xl text-espresso transition-colors hover:text-leather hover:underline hover:underline-offset-4",
                      active && "text-leather",
                    )
                  : cn(
                      "block border-b border-transparent py-3 text-sm text-espresso transition-colors hover:text-leather",
                      active && "border-leather text-leather",
                    )
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

function SearchAwareNavigationLinks(props: NavigationLinksProps) {
  const searchParams = useSearchParams();
  return (
    <NavigationLinkList
      {...props}
      collection={searchParams.get("collection") ?? ""}
    />
  );
}

export function NavigationLinks(props: NavigationLinksProps) {
  return (
    <Suspense
      fallback={<NavigationLinkList {...props} collection={null} />}
    >
      <SearchAwareNavigationLinks {...props} />
    </Suspense>
  );
}
