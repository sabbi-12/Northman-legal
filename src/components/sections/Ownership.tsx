"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Ownership({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const ownership = dict.aboutPage.ownership;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-start">
        <div>
          <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-medium leading-tight text-slate-dark md:text-4xl dark:text-cream">
            {ownership.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-mid dark:text-cream/70">{ownership.body}</p>
        </div>

        <div className="divide-y divide-navy/10 border-t border-navy/10 dark:divide-cream/10 dark:border-cream/10">
          {ownership.items.map((item, index) => (
            <motion.div
              key={item}
              initial={entrance ?? { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className="flex items-start gap-4 py-5 first:pt-0"
            >
              <CheckCircle2 size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
