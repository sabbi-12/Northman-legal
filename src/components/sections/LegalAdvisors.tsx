"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, Globe2, Clock3 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function LegalAdvisors({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const stats = [
    { icon: Globe2, value: dict.globalPresence.countriesValue, label: dict.globalPresence.countriesLabel },
    { icon: Users, value: dict.globalPresence.hqValue, label: dict.globalPresence.hqLabel },
    { icon: Clock3, value: "24/7", label: "Client support" },
  ];

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-institutional border border-navy/10 shadow-institutional dark:border-cream/10">
            <Image
              src="/images/about/legal-advisor.png"
              alt={dict.legalAdvisors.imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              quality={95}
              className="object-cover"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-6 rounded-institutional border border-navy/10 bg-white p-6 shadow-institutional dark:border-cream/10 dark:bg-navy/40">
            {stats.map((stat) => (
              <div key={stat.label}>
                <stat.icon size={18} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                <p className="mt-3 text-xl font-medium text-slate-dark dark:text-cream">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-mid dark:text-cream/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
