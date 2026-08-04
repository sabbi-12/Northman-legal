import "server-only";
import { sanityClient, NEWS_REVALIDATE_SECONDS } from "./client";
import { urlFor } from "./image";
import type { Locale } from "@/lib/i18n/config";
import type { SanityPostDoc, NewsPost } from "./types";

export { NEWS_REVALIDATE_SECONDS };

function normalizePost(doc: SanityPostDoc): NewsPost {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.body,
    date: doc.publishedAt,
    modifiedDate: doc._updatedAt,
    featuredImage: doc.mainImage
      ? { url: urlFor(doc.mainImage).width(1200).height(750).fit("crop").url(), alt: doc.mainImage.alt || doc.title }
      : null,
    categories: doc.category ? [doc.category] : [],
    authorName: doc.author ?? null,
  };
}

const POST_PROJECTION = `{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  body,
  publishedAt,
  category,
  author,
  language
}`;

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!sanityClient) {
    // NEXT_PUBLIC_SANITY_PROJECT_ID isn't set yet — degrade to the
    // fallback instead of throwing, so the site still builds/serves
    // before Sanity is wired up.
    console.warn("Sanity is not configured (missing NEXT_PUBLIC_SANITY_PROJECT_ID) — returning fallback.");
    return fallback;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: NEWS_REVALIDATE_SECONDS, tags: ["post"] },
    });
  } catch (error) {
    // Sanity unreachable/misconfigured (e.g. wrong project ID/dataset) —
    // degrade to an empty result instead of failing the build/request.
    console.warn(`Sanity query failed, returning fallback. Query: ${query}`, error);
    return fallback;
  }
}

export async function getPosts({
  lang,
  page = 1,
  perPage = 9,
}: {
  lang: Locale;
  page?: number;
  perPage?: number;
}): Promise<{ posts: NewsPost[]; totalPages: number }> {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const [docs, total] = await Promise.all([
    safeFetch<SanityPostDoc[]>(
      `*[_type == "post" && language == $lang] | order(publishedAt desc) [$start...$end] ${POST_PROJECTION}`,
      { lang, start, end },
      []
    ),
    safeFetch<number>(`count(*[_type == "post" && language == $lang])`, { lang }, 0),
  ]);

  return {
    posts: docs.map(normalizePost),
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getPostBySlug(slug: string, lang: Locale): Promise<NewsPost | null> {
  const doc = await safeFetch<SanityPostDoc | null>(
    `*[_type == "post" && language == $lang && slug.current == $slug][0] ${POST_PROJECTION}`,
    { lang, slug },
    null
  );
  return doc ? normalizePost(doc) : null;
}

export async function getAllPostSlugs(lang: Locale): Promise<string[]> {
  const slugs = await safeFetch<string[]>(
    `*[_type == "post" && language == $lang].slug.current`,
    { lang },
    []
  );
  return slugs;
}

export async function getLatestPosts(lang: Locale, count = 3): Promise<NewsPost[]> {
  const { posts } = await getPosts({ lang, page: 1, perPage: count });
  return posts;
}
