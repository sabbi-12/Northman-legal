"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CompanyOverview({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const overview = dict.aboutPage.companyOverview;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional max-w-3xl">
        <motion.span
          initial={entrance ?? { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="block h-px w-14 origin-left bg-accent rtl:origin-right"
          aria-hidden="true"
        />
        <motion.p
          initial={entrance ?? { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
          className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-accent"
        >
          {overview.subheading}
        </motion.p>
        <motion.h2
          initial={entrance ?? { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          className="mt-4 text-3xl font-medium leading-snug text-slate-dark md:text-4xl dark:text-cream"
        >
          {overview.heading}
        </motion.h2>

        <div className="mt-8 space-y-5">
          {overview.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate-mid dark:text-cream/70">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-10 text-base font-medium text-slate-dark dark:text-cream">
          {overview.featureListTitle}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {overview.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={entrance ?? { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: EASE }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 size={18} strokeWidth={1.75} className="shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-dark dark:text-cream">{feature}</span>
            </motion.div>
          ))}
        </div>

        <Link
          href={`/${lang}/contact-us`}
          className="group mt-10 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
        >
          {overview.cta}
          <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
