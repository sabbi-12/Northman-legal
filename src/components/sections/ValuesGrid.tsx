"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ValuesGrid({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const [vision, ...rest] = dict.aboutPage.values.items;

  return (
    <section className="bg-navy py-24 text-cream">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        {vision && (
          <motion.div
            initial={entrance ?? { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-button">{vision.title}</span>
            <p className="mt-5 text-2xl font-medium leading-snug text-cream md:text-3xl">{vision.description}</p>
          </motion.div>
        )}

        <div className="grid gap-8 border-t border-cream/10 pt-10 sm:grid-cols-2 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-12 rtl:lg:border-s-0 rtl:lg:border-e rtl:lg:pe-12 rtl:lg:ps-0">
          {rest.map((item, index) => (
            <motion.div
              key={item.id}
              initial={entrance ?? { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: EASE }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-button">{item.title}</span>
              <p className="mt-3 text-base leading-relaxed text-cream/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
