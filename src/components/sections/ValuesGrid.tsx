"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ValuesGrid({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="container-institutional grid gap-10 divide-y divide-cream/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {dict.aboutPage.values.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={entrance ?? { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
            className="px-2 pt-10 first:pt-0 sm:px-10 sm:pt-0 sm:first:px-0 sm:first:ps-0"
          >
            <h2 className="text-2xl font-medium text-accent">{item.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-cream/80">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
