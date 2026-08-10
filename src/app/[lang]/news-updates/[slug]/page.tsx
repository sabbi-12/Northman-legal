import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CalendarDays } from "lucide-react";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getAdjacentPosts, getAllPostSlugs, getPostBySlug, NEWS_REVALIDATE_SECONDS } from "@/lib/sanity/posts";
import { SITE_URL } from "@/lib/seo/constants";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildArticleSchema } from "@/components/seo/schemas/article";
import { PortableTextContent } from "@/components/sections/PortableTextContent";
import { PostNavigation } from "@/components/sections/PostNavigation";

export const revalidate = NEWS_REVALIDATE_SECONDS;
// New Sanity posts published after the last build render on first request
// (ISR fallback) instead of 404ing until the next full deploy. The
// /api/revalidate webhook can also refresh a specific post immediately.
export const dynamicParams = true;

export async function generateStaticParams() {
  const params: Array<{ lang: Locale; slug: string }> = [];
  for (const lang of locales) {
    const slugs = await getAllPostSlugs(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) return {};
  const lang = params.lang as Locale;
  const post = await getPostBySlug(params.slug, lang);

  if (!post) return {};

  // Every post is currently English-only in Sanity (no ar-language posts
  // exist yet — see getLatestPosts' fallback in lib/sanity/posts.ts) —
  // hreflang must point only at post.language's own URL, never assume an
  // /ar counterpart at the same slug exists when it doesn't.
  const postUrl = `${SITE_URL}/${post.language}/news-updates/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/${lang}/news-updates/${post.slug}`,
      languages: {
        [post.language]: postUrl,
        "x-default": postUrl,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      images: post.featuredImage ? [{ url: post.featuredImage.url }] : undefined,
    },
  };
}

function formatDate(dateString: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default async function NewsArticlePage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const post = await getPostBySlug(params.slug, lang);

  if (!post) {
    notFound();
  }

  const { newer, older } = await getAdjacentPosts(post.date, lang);

  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className="py-16">
      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.newsSection.title, href: `/${lang}/news-updates` },
          { name: post.title, href: `/${lang}/news-updates/${post.slug}` },
        ]}
      />
      <JsonLd data={buildArticleSchema(post, lang)} />
      <div className="container-institutional max-w-3xl">
        <Link
          href={`/${lang}/news-updates`}
          className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-accent dark:text-cream"
        >
          <BackIcon size={15} strokeWidth={2} />
          {dict.newsSection.backToNews}
        </Link>

        <div className="mt-8">
          {post.categories.length > 0 && (
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              {post.categories[0]}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-medium leading-tight text-slate-dark md:text-4xl dark:text-cream">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-mid dark:text-cream/60">
            <CalendarDays size={15} strokeWidth={1.75} aria-hidden="true" />
            <span>
              {dict.newsSection.publishedOn} {formatDate(post.date, lang)}
            </span>
            {post.authorName && <span>· {post.authorName}</span>}
          </div>
        </div>

        {post.featuredImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-institutional">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <PortableTextContent value={post.content} lang={lang} />

        <PostNavigation
          lang={lang}
          older={older}
          newer={newer}
          previousLabel={dict.newsSection.previousPost}
          nextLabel={dict.newsSection.nextPost}
        />
      </div>
    </article>
  );
}
