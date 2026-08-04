import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getPosts, NEWS_REVALIDATE_SECONDS } from "@/lib/sanity/posts";
import { NewsCard } from "@/components/sections/NewsCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL } from "@/lib/seo/constants";

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

  return {
    title: dict.newsSection.title,
    description: dict.newsSection.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${lang}/news-updates`,
      languages: {
        en: `${SITE_URL}/en/news-updates`,
        ar: `${SITE_URL}/ar/news-updates`,
        "x-default": `${SITE_URL}/en/news-updates`,
      },
    },
  };
}

export default async function NewsUpdatesPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { page?: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const currentPage = Number(searchParams.page ?? "1") || 1;

  const { posts, totalPages } = await getPosts({ lang, page: currentPage, perPage: 9 });

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

        {posts.length === 0 ? (
          <p className="mt-14 rounded-institutional border border-dashed border-navy/20 p-10 text-center text-sm text-slate-mid dark:border-cream/20 dark:text-cream/60">
            {dict.newsSection.empty}
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
                    href={`/${lang}/news-updates?page=${pageNumber}`}
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
