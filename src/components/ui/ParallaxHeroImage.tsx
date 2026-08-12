"use client";

import Image from "next/image";

import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

// Shared background-photo treatment for the navy page-header bands (About
// Us, Contact Us, Services detail, etc). Wraps next/image in the scroll
// parallax layer so the same drift behavior is one edit, not copy-pasted
// per page.
export function ParallaxHeroImage({
  src,
  alt = "",
  imageClassName = "object-cover",
}: {
  src: string;
  alt?: string;
  // Override when a page needs a distinct treatment (e.g. blurred + low
  // opacity) instead of the standard crisp full-opacity photo.
  imageClassName?: string;
}) {
  return (
    <ParallaxLayer strength={50} className="absolute inset-0">
      <Image src={src} alt={alt} fill priority sizes="100vw" quality={90} className={imageClassName} />
    </ParallaxLayer>
  );
}
