"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

const PAGE_NUMBERS = [1, 2, 3];
const EASE = [0.16, 1, 0.3, 1] as const;

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
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-24 dark:bg-navy/20">
      <div className="container-institutional">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
              {dict.latestInsights.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/news-updates`}
            className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-accent dark:text-cream"
          >
            {dict.newsSection.viewAll}
          </Link>
        </div>

        <div className="mt-12 divide-y divide-navy/10 border-t border-navy/10 dark:divide-cream/10 dark:border-cream/10">
          {dict.latestInsights.posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={entrance ?? { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-wide text-accent sm:w-40">
                {formatDate(post.date, lang)}
              </span>
              <Link href={`/${lang}/news-updates`} className="flex-1">
                <h3 className="text-lg font-medium leading-snug text-slate-dark transition-colors group-hover:text-navy dark:text-cream">
                  {post.title}
                </h3>
              </Link>
              <div className="flex shrink-0 items-center justify-between gap-6 sm:justify-end">
                <span className="text-xs text-slate-mid dark:text-cream/60">{dict.latestInsights.author}</span>
                <Link
                  href={`/${lang}/news-updates`}
                  aria-label={post.title}
                  className="flex h-8 w-8 items-center justify-center rounded-institutional border border-navy/15 text-navy transition-colors group-hover:border-accent group-hover:text-accent dark:border-cream/15 dark:text-cream"
                >
                  <ArrowIcon size={13} strokeWidth={2} />
                </Link>
              </div>
            </motion.article>
          ))}
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
