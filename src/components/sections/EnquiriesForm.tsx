"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ContactForm } from "@/components/sections/ContactForm";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function EnquiriesForm({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional max-w-2xl">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            {dict.contactPage.formSectionSubtitle}
          </p>
          <h2 className="mt-2 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.contactPage.title}
          </h2>
        </motion.div>

        <div className="mt-10">
          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
