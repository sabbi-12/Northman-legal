import Link from "next/link";

import { getLatestPosts } from "@/lib/sanity/posts";
import { NewsCard } from "@/components/sections/NewsCard";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export async function NewsUpdates({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const posts = await getLatestPosts(lang, 3);

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
              {dict.newsSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.newsSection.subtitle}
            </p>
          </div>
          {posts.length > 0 && (
            <Link
              href={`/${lang}/news-updates`}
              className="shrink-0 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-accent dark:text-cream"
            >
              {dict.newsSection.viewAll}
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 rounded-institutional border border-dashed border-navy/20 p-8 text-center text-sm text-slate-mid dark:border-cream/20 dark:text-cream/60">
            {dict.newsSection.empty}
          </p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} lang={lang} readMoreLabel={dict.newsSection.readMore} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
