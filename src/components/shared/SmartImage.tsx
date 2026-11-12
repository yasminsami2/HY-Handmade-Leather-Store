"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getImageManifest } from "@/lib/imageManifest";

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
  const [status, setStatus] = useState<"checking" | "available" | "missing">("checking");

  useEffect(() => {
    let active = true;
    getImageManifest()
      .then((images) => {
        if (active) setStatus(images.has(src) ? "available" : "missing");
      })
      .catch(() => {
        if (active) setStatus("missing");
      });
    return () => {
      active = false;
    };
  }, [src]);

  if (status !== "available") {
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
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setStatus("missing")}
      className={cn("object-cover", className)}
    />
  );
}
