"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Text shown on the leather placeholder if the photo file is missing. */
  label?: string;
}

/**
 * next/image wrapper that fills its (relatively positioned) parent.
 * If the photo file is missing, it shows a leather-textured placeholder instead of a broken image.
 */
export function SmartImage({ src, alt, sizes, priority, className, label }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="leather-texture absolute inset-0 flex items-center justify-center p-6"
      >
        <div className="pointer-events-none absolute inset-3 border border-dashed border-sand/35" />
        <p className="text-center font-display text-lg leading-snug text-sand/90">{label ?? alt}</p>
      </div>
    );
  }

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
