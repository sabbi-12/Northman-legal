"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { SERVICE_DETAIL_SLUGS } from "@/lib/data/serviceSlugs";
import { ServicePhotoCard } from "@/components/sections/ServicePhotoCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CoreServices({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  // Home shows only the first 6 practice areas, in the firm's stated
  // priority order — the full 15 live on /services.
  const items: Array<{ id: string; title: string; subtext: string }> = dict.coreServices.items.slice(0, 6);

  function learnMoreHref(id: string) {
    return SERVICE_DETAIL_SLUGS.has(id) ? `/${lang}/services/${id}` : `/${lang}/contact-us`;
  }

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-header">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
              {dict.coreServices.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.coreServices.description}
            </p>
          </div>
          <Link
            href={`/${lang}/services`}
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-accent dark:text-cream"
          >
            {dict.coreServices.exploreAll}
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <ServicePhotoCard
              key={item.id}
              service={item}
              lang={lang}
              learnMoreLabel={dict.coreServices.learnMore}
              href={learnMoreHref(item.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
