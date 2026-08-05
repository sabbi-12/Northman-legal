"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Highlight = { title: string; description: string };

export function ServiceHighlights({ items }: { items: Highlight[] }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional grid gap-10 divide-y divide-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-cream/10">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={entrance ?? { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
            className="pt-8 first:pt-0 sm:px-8 sm:pt-0 sm:first:ps-0"
          >
            <span className="block h-px w-10 bg-accent" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-medium text-slate-dark dark:text-cream">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
