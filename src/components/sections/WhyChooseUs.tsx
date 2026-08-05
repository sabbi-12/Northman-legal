"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WhyChooseUs({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  const [lead, ...rest] = dict.whyChooseUs.paragraphs;

  return (
    <section className="border-y border-navy/10 bg-white py-24 dark:border-cream/10 dark:bg-navy/30">
      <div className="container-institutional grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <div>
          <motion.span
            initial={entrance ?? { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
            className="block h-px w-14 origin-left bg-accent rtl:origin-right"
            aria-hidden="true"
          />
          <motion.h2
            initial={entrance ?? { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream"
          >
            {dict.whyChooseUs.title}
          </motion.h2>

          <motion.div
            initial={entrance ?? { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="relative mt-10 w-full max-w-sm"
          >
            <div
              className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-institutional border border-navy/10 shadow-institutional dark:border-cream/10">
              <Image
                src="/images/about/why-choose-us.png"
                alt={dict.whyChooseUs.imageAlt}
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                quality={95}
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div>
          {lead && (
            <motion.p
              initial={entrance ?? { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-xl leading-relaxed text-slate-dark dark:text-cream"
            >
              {lead}
            </motion.p>
          )}

          <div className="mt-6 space-y-5 border-t border-navy/10 pt-6 dark:border-cream/10">
            {rest.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={entrance ?? { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="text-sm leading-relaxed text-slate-mid dark:text-cream/70"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <Link
            href={`/${lang}/about-us`}
            className="group mt-10 inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {dict.whyChooseUs.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
