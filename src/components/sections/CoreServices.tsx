"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const ANCHORS: Record<string, string> = {
  "corporate-immigration": "global-immigration",
  "company-incorporation": "core-pillars",
  "outbound-visas": "global-immigration",
  "document-attestation": "notary-poa",
};

export function CoreServices({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
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
            href={`/${lang}/about-us`}
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-gold dark:text-cream"
          >
            {dict.coreServices.exploreAll}
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.coreServices.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col rounded-institutional border border-navy/10 bg-white p-7 shadow-institutional transition-shadow hover:shadow-lg dark:border-cream/10 dark:bg-navy/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-institutional bg-gold-gradient p-2.5">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg font-medium text-slate-dark dark:text-cream">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                {item.description}
              </p>
              <Link
                href={`/${lang}/about-us#${ANCHORS[item.id] ?? "core-pillars"}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-gold dark:text-cream"
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
