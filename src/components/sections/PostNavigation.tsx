import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

type AdjacentPost = { slug: string; title: string } | null;

export function PostNavigation({
  lang,
  older,
  newer,
  previousLabel,
  nextLabel,
}: {
  lang: Locale;
  older: AdjacentPost;
  newer: AdjacentPost;
  previousLabel: string;
  nextLabel: string;
}) {
  if (!older && !newer) return null;

  const isRtl = lang === "ar";
  const PrevIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-14 grid gap-4 border-t border-navy/10 pt-8 dark:border-cream/10 sm:grid-cols-2"
    >
      {older ? (
        <Link
          href={`/${lang}/news-updates/${older.slug}`}
          className="group flex flex-col gap-1.5 rounded-institutional border border-navy/10 p-5 transition-colors hover:border-accent dark:border-cream/10"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <PrevIcon size={13} strokeWidth={2} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {previousLabel}
          </span>
          <span className="text-sm font-medium leading-snug text-slate-dark dark:text-cream">
            {older.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {newer && (
        <Link
          href={`/${lang}/news-updates/${newer.slug}`}
          className="group flex flex-col gap-1.5 rounded-institutional border border-navy/10 p-5 text-end transition-colors hover:border-accent dark:border-cream/10 sm:items-end"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            {nextLabel}
            <NextIcon size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </span>
          <span className="text-sm font-medium leading-snug text-slate-dark dark:text-cream">
            {newer.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
