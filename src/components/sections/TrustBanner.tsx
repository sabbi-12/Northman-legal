"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Building2, Gavel, ShieldCheck } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const BADGE_ICONS = [Building2, Gavel, ShieldCheck];
const EASE = [0.16, 1, 0.3, 1] as const;

export function TrustBanner({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="border-y border-navy/10 bg-cream py-24 dark:border-cream/10 dark:bg-navy-dark">
      <div className="container-header grid gap-8 px-6 md:px-10 lg:grid-cols-[28rem_minmax(0,1fr)] lg:items-center lg:gap-6 lg:px-16">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="group relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-institutional lg:mx-0 lg:w-full lg:max-w-none"
        >
          <Image
            src="/images/home/globe-countries-served.jpg"
            alt={dict.globalPresence.countriesLabel}
            fill
            sizes="(min-width: 1024px) 448px, 100vw"
            quality={90}
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent transition-opacity duration-500 group-hover:from-navy/85 group-hover:via-navy/40" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-90 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-3xl font-bold text-white md:text-4xl">{dict.globalPresence.countriesValue}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
              {dict.globalPresence.countriesLabel}
            </p>
          </div>
        </motion.div>

        <div className="text-center lg:text-start">
          <motion.h2
            initial={entrance ?? { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="text-2xl font-medium leading-snug text-slate-dark md:text-3xl dark:text-cream"
          >
            {dict.trustBanner.countriesTitle}
          </motion.h2>

          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-mid lg:justify-start dark:text-cream/70">
            <MapPin size={15} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
            {dict.trustBanner.hqNote}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {dict.trustBanner.badges.map((badge, index) => {
              const Icon = BADGE_ICONS[index] ?? ShieldCheck;
              return (
                <Link
                  key={badge}
                  href={`/${lang}/services`}
                  className="flex items-center gap-2.5 rounded-institutional border border-navy/15 px-6 py-3.5 text-base font-medium text-navy transition-colors hover:border-accent hover:text-accent dark:border-cream/15 dark:text-cream"
                >
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  {badge}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
