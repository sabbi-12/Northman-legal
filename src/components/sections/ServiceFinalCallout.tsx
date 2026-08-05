"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceFinalCallout({
  heading,
  body,
  cta,
  imageSrc,
  imageAlt,
  lang,
}: {
  heading: string;
  body: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  lang: Locale;
}) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-16 dark:bg-navy-dark">
      <div className="container-institutional">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-center gap-8 rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 md:flex-row md:justify-between md:p-10"
        >
          <div className="max-w-lg">
            <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">{heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">{body}</p>
            <Link
              href={`/${lang}/contact-us`}
              className="group mt-6 inline-flex w-fit items-center gap-3 rounded-institutional bg-button px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
            >
              {cta}
              <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="relative h-48 w-full max-w-xs shrink-0 overflow-hidden rounded-institutional sm:h-56">
            <Image src={imageSrc} alt={imageAlt} fill sizes="320px" quality={95} className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
