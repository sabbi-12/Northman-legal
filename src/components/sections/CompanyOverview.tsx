"use client";

import Image from "next/image";
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
  const badges = dict.certifications.items;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-header grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <motion.p
            initial={entrance ?? { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-accent"
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

          <Link
            href={`/${lang}/contact-us`}
            className="group mt-10 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {overview.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="relative"
        >
          <div
            className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
            aria-hidden="true"
          />
          <div className="relative rounded-institutional border border-navy/10 bg-cream p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 md:p-10">
            <p className="text-base font-medium text-slate-dark dark:text-cream">{overview.featureListTitle}</p>

            <div className="mt-5 space-y-3 border-t border-navy/10 pt-5 dark:border-cream/10">
              {overview.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={entrance ?? { opacity: 0, y: 8 }}
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

            <div className="mt-7 flex items-center gap-5 border-t border-navy/10 pt-6 dark:border-cream/10">
              {badges.map((badge) => (
                <div key={badge.id} className="relative h-12 w-12 shrink-0 opacity-90">
                  <Image src={badge.imageSrc} alt={badge.name} fill sizes="48px" quality={100} className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
