"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhatWeBelieve({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const belief = dict.aboutPage.belief;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-16">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {belief.heading}
          </span>

          <div className="relative mt-6 w-full max-w-xs">
            <div
              className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-institutional shadow-institutional">
              <ParallaxLayer strength={16} className="absolute inset-0">
                <Image
                  src="/images/about/scales-of-justice.jpg"
                  alt={belief.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 90vw"
                  quality={90}
                  className="object-cover"
                />
              </ParallaxLayer>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.p
            initial={entrance ?? { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="font-heading-en text-2xl leading-snug text-slate-dark md:text-[1.75rem] dark:text-cream"
          >
            {belief.body}
          </motion.p>
          <Link
            href={`/${lang}/contact-us`}
            className="group mt-8 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {belief.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
