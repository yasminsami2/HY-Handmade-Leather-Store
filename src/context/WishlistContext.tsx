"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface WishlistContextValue {
  ids: string[];
  count: number;
  hydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds, hydrated] = useLocalStorage<string[]>("hy-wishlist", []);

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  const toggle = useCallback(
    (productId: string) => {
      setIds((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
      );
    },
    [setIds],
  );

  const remove = useCallback(
    (productId: string) => setIds((prev) => prev.filter((id) => id !== productId)),
    [setIds],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, hydrated, has, toggle, remove }),
    [ids, hydrated, has, toggle, remove],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
