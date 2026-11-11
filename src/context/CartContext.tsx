"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  count: number;
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const same = (a: CartItem, productId: string, color: string, size: string) =>
  a.productId === productId && a.color === color && a.size === size;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, hydrated] = useLocalStorage<CartItem[]>("hy-cart", []);

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        const existing = prev.find((i) => same(i, item.productId, item.color, item.size));
        if (existing) {
          return prev.map((i) =>
            same(i, item.productId, item.color, item.size)
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          );
        }
        return [...prev, item];
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (productId: string, color: string, size: string) => {
      setItems((prev) => prev.filter((i) => !same(i, productId, color, size)));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: string, color: string, size: string, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => !same(i, productId, color, size))
          : prev.map((i) => (same(i, productId, color, size) ? { ...i, quantity } : i)),
      );
    },
    [setItems],
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      hydrated,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }),
    [items, hydrated, addItem, removeItem, updateQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
