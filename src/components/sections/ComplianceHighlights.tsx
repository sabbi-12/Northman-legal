"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ComplianceHighlights({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:items-start">
        <div>
          <motion.span
            initial={entrance ?? { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="block h-px w-14 origin-left bg-accent rtl:origin-right"
            aria-hidden="true"
          />
          <motion.h2
            initial={entrance ?? { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-sm text-3xl font-medium leading-tight text-slate-dark md:text-4xl dark:text-cream"
          >
            {dict.complianceHighlights.title}
          </motion.h2>
        </div>

        <div className="divide-y divide-navy/10 border-t border-navy/10 dark:divide-cream/10 dark:border-cream/10">
          {dict.complianceHighlights.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={entrance ?? { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
              className="flex items-start gap-4 py-7 first:pt-0"
            >
              <CheckCircle2
                size={22}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-lg font-medium text-slate-dark dark:text-cream">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
