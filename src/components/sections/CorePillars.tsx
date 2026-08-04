"use client";

import { motion } from "framer-motion";
import { Globe2, Gavel, FileSignature } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const ICONS = {
  immigration: Globe2,
  disputes: Gavel,
  notary: FileSignature,
} as const;

export function CorePillars({ dict }: { dict: Dictionary }) {
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

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {dict.pillars.items.map((item, index) => {
            const Icon = ICONS[item.id as keyof typeof ICONS] ?? Globe2;
            return (
              <motion.div
                key={item.id}
                id={
                  item.id === "immigration"
                    ? "global-immigration"
                    : item.id === "disputes"
                      ? "commercial-disputes"
                      : "notary-poa"
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-institutional bg-navy/5 text-navy dark:bg-cream/10 dark:text-accent">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-medium text-slate-dark dark:text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
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
