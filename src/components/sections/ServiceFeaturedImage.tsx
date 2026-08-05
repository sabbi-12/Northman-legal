"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plane, IdCard } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Falls back to a navy/accent icon panel when no real featured photo has
// been supplied yet for this service — same placeholder convention used
// everywhere else on the site (see CLAUDE.md), rather than inventing a
// stock photo that doesn't exist.
export function ServiceFeaturedImage({
  imageSrc,
  imageAlt,
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <div className="container-institutional my-10">
      <motion.div
        initial={entrance ?? { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative h-[220px] w-full overflow-hidden rounded-institutional shadow-institutional sm:h-[320px] md:h-[420px]"
      >
        {imageSrc ? (
          <Image src={imageSrc} alt={imageAlt ?? ""} fill className="object-cover" priority />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-6 bg-gradient-to-br from-navy via-navy to-accent">
            <IdCard size={56} strokeWidth={1.25} className="text-cream/70" aria-hidden="true" />
            <Plane size={56} strokeWidth={1.25} className="text-cream/70" aria-hidden="true" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
