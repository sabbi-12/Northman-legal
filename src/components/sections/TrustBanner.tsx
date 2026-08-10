"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Gavel, FileCheck2, FileSignature, ShieldCheck } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const BADGE_ICONS = [Gavel, FileCheck2, FileSignature];
const BADGE_ANCHORS = ["commercial-disputes", "commercial-disputes", "notary-poa"];
const EASE = [0.16, 1, 0.3, 1] as const;

export function TrustBanner({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="border-y border-navy/10 bg-cream py-24 dark:border-cream/10 dark:bg-navy-dark">
      <div className="container-header text-center">
        <motion.p
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-6xl font-medium text-accent md:text-7xl"
        >
          {dict.globalPresence.countriesValue}
        </motion.p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-mid dark:text-cream/60">
          {dict.globalPresence.countriesLabel}
        </p>

        <motion.h2
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-2xl font-medium leading-snug text-slate-dark md:text-3xl dark:text-cream"
        >
          {dict.trustBanner.countriesTitle}
        </motion.h2>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-mid dark:text-cream/70">
          <MapPin size={15} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
          {dict.trustBanner.hqNote}
        </p>

        <div className="mx-auto mt-10 h-px w-14 bg-navy/15 dark:bg-cream/15" aria-hidden="true" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {dict.trustBanner.badges.map((badge, index) => {
            const Icon = BADGE_ICONS[index] ?? ShieldCheck;
            return (
              <Link
                key={badge}
                href={`/${lang}/about-us#${BADGE_ANCHORS[index] ?? "core-pillars"}`}
                className="flex items-center gap-2 rounded-institutional border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-accent hover:text-accent dark:border-cream/15 dark:text-cream"
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {badge}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
