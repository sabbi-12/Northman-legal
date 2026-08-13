import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getPosts, searchPosts, NEWS_REVALIDATE_SECONDS } from "@/lib/sanity/posts";
import { NewsCard } from "@/components/sections/NewsCard";
import { SearchBar } from "@/components/sections/SearchBar";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = NEWS_REVALIDATE_SECONDS;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) return {};
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return buildPageMetadata({
    lang,
    path: "news-updates",
    title: dict.newsSection.title,
    description: dict.newsSection.subtitle,
  });
}

export default async function NewsUpdatesPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { page?: string; q?: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const currentPage = Number(searchParams.page ?? "1") || 1;
  const query = searchParams.q?.trim() ?? "";
  const isSearching = query.length > 0;

  const { posts, totalPages } = isSearching
    ? await searchPosts({ query, lang, page: currentPage, perPage: 9 })
    : await getPosts({ lang, page: currentPage, perPage: 9 });

  const pageHref = (pageNumber: number) =>
    isSearching
      ? `/${lang}/news-updates?q=${encodeURIComponent(query)}&page=${pageNumber}`
      : `/${lang}/news-updates?page=${pageNumber}`;

  return (
    <section className="py-20">
      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.newsSection.title, href: `/${lang}/news-updates` },
        ]}
      />
      <div className="container-institutional">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium text-slate-dark md:text-5xl dark:text-cream">
            {dict.newsSection.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.newsSection.subtitle}
          </p>
        </div>

        <div className="mt-8 max-w-md">
          <SearchBar
            lang={lang}
            placeholder={dict.newsSection.searchPlaceholder}
            buttonLabel={dict.newsSection.searchButton}
            defaultValue={query}
          />
        </div>

        {isSearching && (
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-mid dark:text-cream/70">
            <span>
              {dict.newsSection.searchResultsFor} <strong className="text-slate-dark dark:text-cream">&ldquo;{query}&rdquo;</strong>
            </span>
            <Link href={`/${lang}/news-updates`} className="font-medium text-accent hover:underline">
              {dict.newsSection.clearSearch}
            </Link>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="mt-14 rounded-institutional border border-dashed border-navy/20 p-10 text-center text-sm text-slate-mid dark:border-cream/20 dark:text-cream/60">
            {isSearching ? dict.newsSection.searchEmpty : dict.newsSection.empty}
          </p>
        ) : (
          <>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} lang={lang} readMoreLabel={dict.newsSection.readMore} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-14 flex items-center justify-center gap-2"
              >
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <a
                    key={pageNumber}
                    href={pageHref(pageNumber)}
                    aria-current={pageNumber === currentPage ? "page" : undefined}
                    className={`flex h-9 w-9 items-center justify-center rounded-institutional border text-sm font-medium transition-colors ${
                      pageNumber === currentPage
                        ? "border-accent bg-accent text-navy"
                        : "border-navy/15 text-navy hover:border-accent dark:border-cream/15 dark:text-cream"
                    }`}
                  >
                    {pageNumber}
                  </a>
                ))}
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
