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
    <section className="bg-cream py-24 text-center dark:bg-navy-dark">
      <div className="container-institutional mx-auto max-w-3xl">
        <motion.span
          initial={entrance ?? { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
        >
          {belief.heading}
        </motion.span>
        <motion.p
          initial={entrance ?? { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="mt-5 font-heading-en text-2xl leading-snug text-slate-dark md:text-[1.75rem] dark:text-cream"
        >
          {belief.body}
        </motion.p>
        <Link
          href={`/${lang}/contact-us`}
          className="group mt-9 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
        >
          {belief.cta}
          <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
