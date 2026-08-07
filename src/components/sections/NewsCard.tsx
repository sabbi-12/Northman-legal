import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CalendarDays } from "lucide-react";

import type { NewsPost } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n/config";

function formatDate(dateString: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function NewsCard({
  post,
  lang,
  readMoreLabel,
}: {
  post: NewsPost;
  lang: Locale;
  readMoreLabel: string;
}) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="group flex flex-col overflow-hidden rounded-institutional border border-navy/10 bg-white transition-shadow hover:shadow-institutional dark:border-cream/10 dark:bg-navy/40">
      <Link href={`/${lang}/news-updates/${post.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-navy/5 dark:bg-cream/5">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-navy/40 dark:text-cream/40">
            {post.title}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {post.categories.length > 0 && (
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            {post.categories[0]}
          </span>
        )}

        <Link href={`/${lang}/news-updates/${post.slug}`}>
          <h3 className="mt-2 text-lg font-medium leading-snug text-slate-dark transition-colors group-hover:text-navy dark:text-cream dark:group-hover:text-accent">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4 text-xs text-slate-mid dark:border-cream/10 dark:text-cream/60">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} strokeWidth={1.75} aria-hidden="true" />
            {formatDate(post.date, lang)}
          </span>
          <Link
            href={`/${lang}/news-updates/${post.slug}`}
            className="flex items-center gap-1 font-medium text-navy transition-colors hover:text-accent dark:text-cream dark:hover:text-accent"
          >
            {readMoreLabel}
            <ArrowIcon size={13} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </article>
  );
}
