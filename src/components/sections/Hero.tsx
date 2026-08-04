"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-navy pb-24 pt-28 text-cream md:pb-32 md:pt-36">
      <Image
        src="/images/hero/london-eye.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/25 to-navy/55" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, transparent 39px, #C5A059 39px, #C5A059 40px, transparent 40px), linear-gradient(180deg, transparent 0, transparent 39px, #C5A059 39px, #C5A059 40px, transparent 40px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container-institutional relative">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-gold drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]"
        >
          {dict.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-4xl font-medium leading-tight drop-shadow-[0_2px_10px_rgba(8,18,32,0.7)] md:text-5xl lg:text-6xl"
        >
          {dict.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]"
        >
          {dict.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href={`/${lang}/about-us`}
            className="group inline-flex items-center gap-3 rounded-institutional bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
          >
            {dict.hero.cta}
            <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
