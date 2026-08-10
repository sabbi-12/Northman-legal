"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhatWeBelieve({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const belief = dict.aboutPage.belief;

  return (
    <section className="bg-white py-24 text-center dark:bg-navy/30">
      <div className="container-institutional mx-auto max-w-2xl">
        <motion.h2
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream"
        >
          {belief.heading}
        </motion.h2>
        <motion.p
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-6 text-base leading-relaxed text-slate-mid dark:text-cream/70"
        >
          {belief.body}
        </motion.p>
        <Link
          href={`/${lang}/contact-us`}
          className="group mt-8 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
        >
          {belief.cta}
          <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
