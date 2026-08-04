"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Gavel, FileCheck2, FileSignature, ShieldCheck } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const BADGE_ICONS = [Gavel, FileCheck2, FileSignature];
const BADGE_ANCHORS = ["commercial-disputes", "commercial-disputes", "notary-poa"];

export function TrustBanner({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="border-y border-navy/10 bg-cream py-20 dark:border-cream/10 dark:bg-navy-dark">
      <div className="container-institutional text-center">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-3xl font-medium leading-snug text-slate-dark md:text-4xl dark:text-cream"
        >
          {dict.trustBanner.countriesTitle}
        </motion.h3>

        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-mid dark:text-cream/70">
          <MapPin size={15} strokeWidth={1.75} className="text-gold" aria-hidden="true" />
          {dict.trustBanner.hqNote}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {dict.trustBanner.badges.map((badge, index) => {
            const Icon = BADGE_ICONS[index] ?? ShieldCheck;
            return (
              <Link
                key={badge}
                href={`/${lang}/about-us#${BADGE_ANCHORS[index] ?? "core-pillars"}`}
                className="flex items-center gap-2 rounded-institutional border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream"
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
