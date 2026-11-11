"use client";

import { useEffect, useState } from "react";

/**
 * State persisted to localStorage. Starts with `initial` on the server and first
 * client render (avoids hydration mismatches), then loads the stored value.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // Corrupt or unavailable storage: keep the initial value.
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable: ignore.
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
