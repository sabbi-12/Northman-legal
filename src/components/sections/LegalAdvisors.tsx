"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LegalAdvisors({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  const stats = [
    { value: dict.globalPresence.countriesValue, label: dict.globalPresence.countriesLabel },
    { value: dict.globalPresence.hqValue, label: dict.globalPresence.hqLabel },
    { value: "24/7", label: "Client support" },
  ];

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-header grid gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.legalAdvisors.title}
          </h2>
          <div className="mt-6 space-y-5">
            {dict.legalAdvisors.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-slate-mid dark:text-cream/70">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href={`/${lang}/about-us`}
            className="group mt-8 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {dict.legalAdvisors.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={entrance ?? { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="relative">
            <div
              className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
              aria-hidden="true"
            />
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-institutional border border-navy/10 shadow-institutional dark:border-cream/10">
              <ParallaxLayer strength={18} className="absolute inset-0">
                <Image
                  src="/images/about/legal-advisor-ksa.jpg"
                  alt={dict.legalAdvisors.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 560px, 90vw"
                  quality={95}
                  className="object-cover"
                />
              </ParallaxLayer>
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent backdrop-blur-sm [mask-image:linear-gradient(to_top,black,transparent)]"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 divide-x divide-white/20 px-4 pb-5 pt-8 sm:px-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0 px-2 text-center first:pl-0 last:pr-0">
                    <p className="text-xl font-medium text-white drop-shadow-sm sm:text-2xl md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-wide text-white/80 sm:text-[0.65rem]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
