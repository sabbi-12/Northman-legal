"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceEntityForms({
  heading,
  subheading,
  items,
  footerNote,
}: {
  heading: string;
  subheading: string;
  items: string[];
  footerNote: string;
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional">
        <h2 className="text-2xl font-medium uppercase tracking-wide text-slate-dark md:text-3xl dark:text-cream">
          {heading}
        </h2>
        <p className="mt-3 text-sm font-medium uppercase tracking-wide text-accent">{subheading}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item}
              initial={entrance ?? { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
              className="flex items-center gap-3 rounded-institutional border border-navy/10 bg-white p-5 dark:border-cream/10 dark:bg-navy/40"
            >
              <CheckCircle2 size={18} strokeWidth={1.75} className="shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-dark dark:text-cream">{item}</span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-mid dark:text-cream/70">{footerNote}</p>
      </div>
    </section>
  );
}
