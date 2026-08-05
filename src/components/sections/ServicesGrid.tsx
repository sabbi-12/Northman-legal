"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Stamp, UsersRound } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { SERVICE_DETAIL_SLUGS } from "@/lib/data/serviceSlugs";

// The two newer services in the client's brief (Consular Visa, Employee
// Outsourcing) don't have a real icon asset yet, unlike the other four —
// fall back to a lucide icon rather than leaving the tile empty or
// reusing an unrelated image.
const FALLBACK_ICONS: Record<string, typeof Stamp> = {
  "consular-visa": Stamp,
  "employee-outsourcing": UsersRound,
};

const EASE = [0.16, 1, 0.3, 1] as const;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function ServicesGrid({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const items = dict.servicesPage.items as ServiceItem[];

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const FallbackIcon = FALLBACK_ICONS[item.id];
          return (
            <motion.div
              key={item.id}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: EASE }}
              className="flex flex-col rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-institutional bg-accent/10 p-2.5">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.title}
                    width={36}
                    height={36}
                    className="h-full w-full object-contain"
                  />
                ) : FallbackIcon ? (
                  <FallbackIcon size={24} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                ) : null}
              </div>
              <h3 className="mt-6 text-lg font-medium text-slate-dark dark:text-cream">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                {item.description}
              </p>
              <Link
                href={
                  SERVICE_DETAIL_SLUGS.has(item.id)
                    ? `/${lang}/services/${item.id}`
                    : `/${lang}/contact-us`
                }
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-accent dark:text-cream"
              >
                {dict.servicesPage.learnMore}
                <ArrowIcon size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
