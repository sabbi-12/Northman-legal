"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function ComplianceHighlights({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream"
        >
          {dict.complianceHighlights.title}
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {dict.complianceHighlights.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-institutional border border-navy/10 bg-white p-7 shadow-institutional dark:border-cream/10 dark:bg-navy/40"
            >
              <CheckCircle2 size={20} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-base font-medium text-slate-dark dark:text-cream">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
