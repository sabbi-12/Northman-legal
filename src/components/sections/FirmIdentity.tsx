"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function FirmIdentity({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="relative overflow-hidden bg-navy py-16 text-center text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, transparent 39px, #F8F9FA 39px, #F8F9FA 40px, transparent 40px), linear-gradient(180deg, transparent 0, transparent 39px, #F8F9FA 39px, #F8F9FA 40px, transparent 40px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 text-accent/15"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 text-accent/15"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="160" height="160" rx="24" stroke="currentColor" strokeWidth="1" />
        <rect x="45" y="45" width="110" height="110" rx="16" stroke="currentColor" strokeWidth="1" />
      </svg>

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
