"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Gavel, FileSignature } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS = {
  corporate: Building2,
  disputes: Gavel,
  notary: FileSignature,
} as const;

export function CorePillars({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark" id="core-pillars">
      <div className="container-institutional">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.pillars.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.pillars.subtitle}
          </p>
        </div>

        <div className="mt-12 divide-y divide-navy/10 border-t border-navy/10 dark:divide-cream/10 dark:border-cream/10">
          {dict.pillars.items.map((item, index) => {
            const Icon = ICONS[item.id as keyof typeof ICONS] ?? Building2;
            return (
              <motion.div
                key={item.id}
                id={
                  item.id === "corporate"
                    ? "corporate-advisory"
                    : item.id === "disputes"
                      ? "commercial-disputes"
                      : "notary-poa"
                }
                initial={entrance ?? { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="flex flex-col gap-5 py-8 first:pt-0 sm:flex-row sm:items-center"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-institutional bg-accent/10">
                  <Icon size={26} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-dark dark:text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
