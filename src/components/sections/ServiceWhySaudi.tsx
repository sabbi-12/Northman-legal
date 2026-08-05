"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceWhySaudi({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional max-w-3xl">
        <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">{heading}</h2>
        <div className="mt-6 space-y-5">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={entrance ?? { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className="text-base leading-relaxed text-slate-mid dark:text-cream/70"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
