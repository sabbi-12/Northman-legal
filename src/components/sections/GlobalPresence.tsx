"use client";

import { motion } from "framer-motion";
import { Building2, Globe } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function GlobalPresence({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-navy py-20 text-cream">
      <div className="container-institutional flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            {dict.globalPresence.eyebrow}
          </p>
          <p className="mt-4 text-2xl font-medium leading-relaxed md:text-3xl">
            {dict.globalPresence.tagline}
          </p>
        </div>

        <div className="flex gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Globe size={28} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <div>
              <p className="text-2xl font-medium">{dict.globalPresence.countriesValue}</p>
              <p className="text-xs uppercase tracking-wide text-cream/60">
                {dict.globalPresence.countriesLabel}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Building2 size={28} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <div>
              <p className="text-2xl font-medium">{dict.globalPresence.hqValue}</p>
              <p className="text-xs uppercase tracking-wide text-cream/60">{dict.globalPresence.hqLabel}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
