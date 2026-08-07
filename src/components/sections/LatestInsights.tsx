"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import type { NewsPost } from "@/lib/sanity/types";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(dateString: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function LatestInsights({
  dict,
  lang,
  posts,
}: {
  dict: Dictionary;
  lang: Locale;
  posts: NewsPost[];
}) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  if (posts.length === 0) return null;

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
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={entrance ?? { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-wide text-accent sm:w-40">
                {formatDate(post.date, lang)}
              </span>
              <Link href={`/${lang}/news-updates/${post.slug}`} className="flex-1">
                <h3 className="text-lg font-medium leading-snug text-slate-dark transition-colors group-hover:text-navy dark:text-cream dark:group-hover:text-accent">
                  {post.title}
                </h3>
              </Link>
              <div className="flex shrink-0 items-center justify-between gap-6 sm:justify-end">
                {post.authorName && (
                  <span className="text-xs text-slate-mid dark:text-cream/60">{post.authorName}</span>
                )}
                <Link
                  href={`/${lang}/news-updates/${post.slug}`}
                  aria-label={post.title}
                  className="flex h-8 w-8 items-center justify-center rounded-institutional border border-navy/15 text-navy transition-colors group-hover:border-accent group-hover:text-accent dark:border-cream/15 dark:text-cream"
                >
                  <ArrowIcon size={13} strokeWidth={2} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
