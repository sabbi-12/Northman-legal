"use client";

import Image from "next/image";

import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

// Shared background-photo treatment for the navy page-header bands (About
// Us, Contact Us, Services detail, etc). Wraps next/image in the scroll
// parallax layer so the same drift behavior is one edit, not copy-pasted
// per page.
export function ParallaxHeroImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <ParallaxLayer strength={50} className="absolute inset-0">
      <Image src={src} alt={alt} fill priority sizes="100vw" quality={90} className="object-cover" />
    </ParallaxLayer>
  );
}
