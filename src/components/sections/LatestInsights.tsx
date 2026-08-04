"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Building2, Landmark, CalendarDays, ArrowRight } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const POST_ICONS = [ShieldCheck, Users, Building2, Landmark];
const PAGE_NUMBERS = [1, 2, 3];

function formatDate(dateString: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

// Static placeholder posts for the home page insights strip, sourced from
// the content brief. The full News & Updates listing (src/app/[lang]/news-updates)
// stays Sanity-driven — swap these for real posts once the equivalent
// articles are published there and this can pull the latest 4 dynamically.
export function LatestInsights({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="bg-white py-24 dark:bg-navy/20">
      <div className="container-institutional">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.latestInsights.title}
          </h2>
          <Link
            href={`/${lang}/news-updates`}
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-accent dark:text-cream"
          >
            {dict.newsSection.viewAll}
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.latestInsights.posts.map((post, index) => {
            const Icon = POST_ICONS[index] ?? ShieldCheck;
            return (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-institutional border border-navy/10 bg-cream transition-shadow hover:shadow-institutional dark:border-cream/10 dark:bg-navy/40"
              >
                <Link
                  href={`/${lang}/news-updates`}
                  className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-accent/10"
                >
                  <Icon size={34} strokeWidth={1.25} className="text-navy transition-transform duration-500 group-hover:scale-110" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <Link href={`/${lang}/news-updates`}>
                    <h3 className="text-base font-medium leading-snug text-slate-dark transition-colors group-hover:text-navy dark:text-cream">
                      {post.title}
                    </h3>
                  </Link>
                  <div className="mt-4 flex flex-1 items-end justify-between border-t border-navy/10 pt-4 text-xs text-slate-mid dark:border-cream/10 dark:text-cream/60">
                    <span>{dict.latestInsights.author}</span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} strokeWidth={1.75} aria-hidden="true" />
                      {formatDate(post.date, lang)}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <nav aria-label="Insights pagination" className="mt-12 flex items-center justify-center gap-2 text-sm">
          {PAGE_NUMBERS.map((page) => (
            <Link
              key={page}
              href={`/${lang}/news-updates`}
              aria-current={page === 1 ? "page" : undefined}
              className={
                page === 1
                  ? "flex h-9 w-9 items-center justify-center rounded-institutional bg-navy font-medium text-cream dark:bg-accent dark:text-navy"
                  : "flex h-9 w-9 items-center justify-center rounded-institutional text-slate-mid transition-colors hover:text-navy dark:text-cream/60 dark:hover:text-cream"
              }
            >
              {page}
            </Link>
          ))}
          <span className="px-1 text-slate-mid dark:text-cream/40">…</span>
          <Link
            href={`/${lang}/news-updates`}
            className="flex h-9 w-9 items-center justify-center rounded-institutional text-slate-mid transition-colors hover:text-navy dark:text-cream/60 dark:hover:text-cream"
          >
            14
          </Link>
          <Link
            href={`/${lang}/news-updates`}
            className="ms-2 flex items-center gap-1 font-medium text-navy transition-colors hover:text-accent dark:text-cream"
          >
            {dict.latestInsights.next}
            <ArrowRight size={14} strokeWidth={2} className="rtl:hidden" />
          </Link>
        </nav>
      </div>
    </section>
  );
}
