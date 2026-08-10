"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Gavel, ShieldCheck } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

// Fixed order matching complianceHighlights.items (corporate, disputes,
// regulatory) — icons are practice-specific, not a repeated generic mark.
const ICONS = [Building2, Gavel, ShieldCheck];

export function ComplianceHighlights({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-header">
        <motion.h2
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="max-w-2xl text-3xl font-medium leading-tight text-slate-dark md:text-4xl dark:text-cream"
        >
          {dict.complianceHighlights.title}
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.complianceHighlights.items.map((item, index) => {
            const Icon = ICONS[index] ?? Building2;
            return (
              <motion.div
                key={item.id}
                initial={entrance ?? { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
                className="relative overflow-hidden rounded-institutional border-2 border-navy bg-accent/10 p-8 shadow-institutional transition-colors duration-300 hover:border-accent dark:border-accent dark:bg-navy/40 lg:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/60 blur-[100px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-14 -left-14 h-44 w-44 rounded-full bg-button/50 blur-[100px]"
                  aria-hidden="true"
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-institutional bg-accent/10">
                  <Icon size={26} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="relative mt-6 text-lg font-medium text-black dark:text-cream">{item.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
