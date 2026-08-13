"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function FirmIdentity({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-center text-cream">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[110px]"
        aria-hidden="true"
      />

      <motion.div
        initial={entrance ?? { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container-institutional relative max-w-2xl"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-button">
          {dict.firmIdentity.heading}
        </h2>
        <p className="mt-4 text-sm uppercase leading-relaxed tracking-wide text-cream/90">
          {dict.firmIdentity.body}
        </p>
      </motion.div>
    </section>
  );
}
