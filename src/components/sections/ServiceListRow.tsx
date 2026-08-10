"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export type ServiceListItem = {
  id: string;
  title: string;
  subtext: string;
};

// Full-width row card for the Services listing — one service per row,
// name + excerpt + a persistent Learn More button. Deliberately static
// (no hover-reveal/blur): the brief asked for that effect removed here so
// every service's excerpt is readable at rest, not gated behind a hover.
export function ServiceListRow({
  service,
  lang,
  learnMoreLabel,
  href,
  index,
}: {
  service: ServiceListItem;
  lang: Locale;
  learnMoreLabel: string;
  href: string;
  index: number;
}) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <motion.div
      initial={entrance ?? { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: EASE }}
    >
      <Link
        href={href}
        className="group flex flex-col gap-5 rounded-institutional border border-navy/10 bg-white p-7 shadow-institutional transition-colors hover:border-accent/40 dark:border-cream/10 dark:bg-navy/40 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="max-w-3xl">
          <h3 className="text-xl font-medium text-slate-dark transition-colors group-hover:text-accent dark:text-cream md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2.5 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {service.subtext}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 rounded-institutional border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white dark:border-cream/20 dark:text-cream">
          {learnMoreLabel}
          <ArrowIcon
            size={15}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
