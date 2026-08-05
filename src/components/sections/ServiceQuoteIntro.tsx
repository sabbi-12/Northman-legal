"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceQuoteIntro({
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
    <section className="bg-white py-20 dark:bg-navy/30">
      <div className="container-institutional grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">{heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-slate-mid dark:text-cream/70">{body}</p>
          <Link
            href={`/${lang}/contact-us`}
            className="group mt-7 inline-flex w-fit items-center gap-3 rounded-institutional bg-button px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={entrance ?? { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-institutional border border-navy/10 shadow-institutional dark:border-cream/10"
        >
          <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={95} className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
