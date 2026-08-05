"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesValueProp({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const valueProp = dict.servicesPage.valueProp;

  return (
    <section className="bg-white py-20 text-center dark:bg-navy/30">
      <div className="container-institutional mx-auto max-w-2xl">
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
          className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream"
        >
          {valueProp.heading}
        </motion.h2>
        <motion.p
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-5 text-base leading-relaxed text-slate-mid dark:text-cream/70"
        >
          {valueProp.subtext}
        </motion.p>
      </div>
    </section>
  );
}
