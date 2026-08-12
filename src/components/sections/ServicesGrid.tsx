"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { SERVICE_DETAIL_SLUGS } from "@/lib/data/serviceSlugs";
import { ServicePhotoCard, type ServiceCardData } from "@/components/sections/ServicePhotoCard";

export function ServicesGrid({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const items: ServiceCardData[] = dict.servicesPage.items;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  function learnMoreHref(id: string) {
    return SERVICE_DETAIL_SLUGS.has(id) ? `/${lang}/services/${id}` : `/${lang}/contact-us`;
  }

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-header">
        <motion.div
          initial={entrance ?? { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{
            opacity: { duration: 0.4, ease: "easeOut" },
            x: { type: "spring", stiffness: 120, damping: 16, mass: 0.7 },
          }}
          className="max-w-2xl"
        >
          <span className="block h-px w-12 bg-accent" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.servicesPage.gridHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.servicesPage.intro}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item, index) => (
            <ServicePhotoCard
              key={item.id}
              service={item}
              lang={lang}
              learnMoreLabel={dict.servicesPage.learnMore}
              href={learnMoreHref(item.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
