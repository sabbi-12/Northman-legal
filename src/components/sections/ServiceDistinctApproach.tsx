"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceDistinctApproach({ heading, body }: { heading: string; body: string }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-20 text-center dark:bg-navy-dark">
      <div className="container-institutional mx-auto max-w-3xl">
        <motion.span
          initial={entrance ?? { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto block h-px w-14 bg-accent"
          aria-hidden="true"
        />
        <motion.h2
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-5 text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-6 text-lg leading-relaxed text-slate-mid dark:text-cream/70"
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
