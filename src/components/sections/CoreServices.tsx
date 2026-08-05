"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const ANCHORS: Record<string, string> = {
  "corporate-immigration": "global-immigration",
  "company-incorporation": "core-pillars",
  "outbound-visas": "global-immigration",
  "document-attestation": "notary-poa",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function CoreServices({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  const [featured, ...rest] = dict.coreServices.items;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.span
              initial={entrance ?? { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
              className="block h-px w-14 origin-left bg-accent rtl:origin-right"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
              {dict.coreServices.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.coreServices.description}
            </p>
          </div>
          <Link
            href={`/${lang}/about-us`}
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-accent dark:text-cream"
          >
            {dict.coreServices.exploreAll}
          </Link>
        </div>

        {featured && (
          <motion.div
            initial={entrance ?? { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-14 grid gap-8 rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:items-center md:p-12"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-institutional bg-accent/10 p-6 md:h-40 md:w-40">
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                width={72}
                height={72}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-slate-dark dark:text-cream">{featured.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-mid dark:text-cream/70">
                {featured.description}
              </p>
              <Link
                href={`/${lang}/about-us#${ANCHORS[featured.id] ?? "core-pillars"}`}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent dark:text-cream"
              >
                {dict.coreServices.learnMore}
                <ArrowIcon size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </motion.div>
        )}

        <div className="mt-4 divide-y divide-navy/10 dark:divide-cream/10">
          {rest.map((item, index) => (
            <motion.div
              key={item.id}
              initial={entrance ?? { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-institutional bg-accent/10 p-2.5">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-dark dark:text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                  {item.description}
                </p>
              </div>
              <Link
                href={`/${lang}/about-us#${ANCHORS[item.id] ?? "core-pillars"}`}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent dark:text-cream sm:self-center"
              >
                {dict.coreServices.learnMore}
                <ArrowIcon size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
