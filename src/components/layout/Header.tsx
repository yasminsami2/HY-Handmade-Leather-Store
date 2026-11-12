"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { NavigationLinks } from "./NavigationLinks";
import { SearchOverlay } from "./SearchOverlay";
import { countBadge, iconButton } from "./styles";

export function Header() {
  const pathname = usePathname();
  const { count: cartCount, hydrated: cartReady } = useCart();
  const { count: wishCount, hydrated: wishReady } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const locked = menuOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const showCart = cartReady && cartCount > 0;
  const showWish = wishReady && wishCount > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
      <div className="container-page grid h-[68px] grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(iconButton, "-ml-2 lg:hidden")}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <Logo />

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <button type="button" onClick={() => setSearchOpen(true)} className={iconButton} aria-label="Search">
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <Link href="/wishlist" className={iconButton} aria-label={showWish ? `Wishlist, ${wishCount} items` : "Wishlist"}>
            <Heart className="h-5 w-5" aria-hidden />
            {showWish ? <span className={countBadge} aria-hidden>{wishCount}</span> : null}
          </Link>
          <Link href="/cart" className={cn(iconButton, "-mr-2 sm:mr-0")} aria-label={showCart ? `Cart, ${cartCount} items` : "Cart"}>
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {showCart ? <span className={countBadge} aria-hidden>{cartCount}</span> : null}
          </Link>
        </div>
      </div>

      <nav aria-label="Main" className="hidden border-t border-sand/70 lg:block">
        <div className="container-page">
          <ul className="flex items-center justify-center gap-x-8 xl:gap-x-10">
            <NavigationLinks pathname={pathname} />
          </ul>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
