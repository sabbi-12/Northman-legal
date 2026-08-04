"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function WhyChooseUs({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="border-y border-navy/10 bg-white py-24 dark:border-cream/10 dark:bg-navy/30">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream"
          >
            {dict.whyChooseUs.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mt-8 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-institutional border border-navy/10 shadow-institutional dark:border-cream/10"
          >
            <Image
              src="/images/about/why-choose-us.png"
              alt={dict.whyChooseUs.imageAlt}
              fill
              sizes="(min-width: 1024px) 384px, 90vw"
              quality={95}
              className="object-cover"
            />
          </motion.div>
        </div>

        <div>
          <div className="grid gap-6 sm:grid-cols-2">
            {dict.whyChooseUs.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
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
