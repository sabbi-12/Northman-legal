"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { SearchBar } from "@/components/sections/SearchBar";
import { ParallaxHeroImage } from "@/components/ui/ParallaxHeroImage";

// Confident, non-elastic arrival — matches the institutional register.
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const isRtl = lang === "ar";
  const reduceMotion = useReducedMotion();
  // `initial={false}` (rather than per-motion conditionals) is what actually
  // honors prefers-reduced-motion here: it renders straight into the
  // "animate" target with no transform/clip-path pass at all.
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="relative -mt-24 overflow-hidden bg-navy pb-24 pt-[calc(theme(spacing.28)+theme(spacing.24))] text-cream md:pb-32 md:pt-[calc(theme(spacing.36)+theme(spacing.24))]">
      <ParallaxHeroImage src="/images/hero/kingdom-tower-riyadh.jpg" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/50 to-navy/80 dark:from-navy-dark/85 dark:via-navy-dark/60 dark:to-navy-dark/90" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, transparent 39px, #2E5B88 39px, #2E5B88 40px, transparent 40px), linear-gradient(180deg, transparent 0, transparent 39px, #2E5B88 39px, #2E5B88 40px, transparent 40px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container-institutional relative">
        <motion.p
          initial={entrance ?? { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_6px_rgba(8,18,32,0.75)]"
        >
          {dict.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={
            entrance ?? {
              clipPath: isRtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
              y: 8,
            }
          }
          animate={{ clipPath: "inset(0 0% 0 0%)", y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE }}
          className="mt-6 max-w-3xl text-4xl font-medium leading-tight drop-shadow-[0_2px_10px_rgba(8,18,32,0.7)] md:text-5xl lg:text-6xl"
        >
          {dict.hero.headline}
        </motion.h1>

        <motion.p
          initial={entrance ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.65, ease: EASE }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]"
        >
          {dict.hero.subheadline}
        </motion.p>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.8, ease: EASE }}
          className="mt-10"
        >
          <Link
            href={`/${lang}/contact-us`}
            className="group inline-flex items-center gap-3 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {dict.hero.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.9, ease: EASE }}
          className="mt-6"
        >
          <SearchBar
            lang={lang}
            placeholder={dict.newsSection.searchPlaceholder}
            buttonLabel={dict.newsSection.searchButton}
          />
        </motion.div>
      </div>
    </section>
  );
}
