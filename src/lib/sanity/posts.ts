import "server-only";
import Fuse from "fuse.js";
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

type SearchIndexEntry = {
  _id: string;
  title: string;
  excerpt: string;
  category?: string;
  bodyText: string;
};

// The full searchable text for every post, in one cached fetch — 56 posts'
// worth of title/excerpt/body-as-plain-text is small enough to pull whole
// and search in memory, which is what actually enables fuzzy/typo-tolerant
// matching. Sanity's own `match` operator only does prefix/wildcard token
// matching, not approximate ("saudia" ≈ "saudi") matching — Fuse.js runs
// a real fuzzy-distance search over this index instead.
async function getSearchIndex(lang: Locale): Promise<SearchIndexEntry[]> {
  return safeFetch<SearchIndexEntry[]>(
    `*[_type == "post" && language == $lang]{ _id, title, excerpt, category, "bodyText": pt::text(body) }`,
    { lang },
    []
  );
}

// Relevance-ranked, typo-tolerant search: matches on words anywhere in
// title/excerpt/category/body, tolerates spelling mistakes, and doesn't
// require every search word to be present — a post that's clearly related
// to the query still surfaces even without an exact phrase match.
export async function searchPosts({
  query,
  lang,
  page = 1,
  perPage = 9,
}: {
  query: string;
  lang: Locale;
  page?: number;
  perPage?: number;
}): Promise<{ posts: NewsPost[]; totalPages: number }> {
  const trimmed = query.trim();
  if (!trimmed) return { posts: [], totalPages: 1 };

  const index = await getSearchIndex(lang);
  if (index.length === 0) return { posts: [], totalPages: 1 };

  const fuse = new Fuse(index, {
    keys: [
      { name: "title", weight: 0.45 },
      { name: "excerpt", weight: 0.25 },
      { name: "category", weight: 0.1 },
      { name: "bodyText", weight: 0.2 },
    ],
    includeScore: true,
    ignoreLocation: true, // a match deep in the body counts the same as one near the start
    threshold: 0.4, // higher = more forgiving of typos/partial words; 0.4 is a solid middle ground
    minMatchCharLength: 2,
  });

  const ranked = fuse.search(trimmed);
  const total = ranked.length;
  const start = (page - 1) * perPage;
  const pageIds = ranked.slice(start, start + perPage).map((result) => result.item._id);

  if (pageIds.length === 0) {
    return { posts: [], totalPages: Math.max(1, Math.ceil(total / perPage)) };
  }

  const docs = await safeFetch<SanityPostDoc[]>(
    `*[_type == "post" && _id in $ids] ${POST_PROJECTION}`,
    { ids: pageIds },
    []
  );

  // Sanity's `in` filter doesn't preserve the array order — re-sort the
  // fetched docs back into Fuse's relevance ranking.
  const docsById = new Map(docs.map((doc) => [doc._id, doc]));
  const orderedDocs = pageIds.map((id) => docsById.get(id)).filter((doc): doc is SanityPostDoc => Boolean(doc));

  return {
    posts: orderedDocs.map(normalizePost),
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

type AdjacentPost = { slug: string; title: string } | null;

// "Newer" is the post published just after this one (appears above it in
// the newest-first listing); "older" is the one published just before it.
export async function getAdjacentPosts(
  publishedAt: string,
  lang: Locale
): Promise<{ newer: AdjacentPost; older: AdjacentPost }> {
  const [newer, older] = await Promise.all([
    safeFetch<AdjacentPost>(
      `*[_type == "post" && language == $lang && publishedAt > $publishedAt] | order(publishedAt asc) [0] { title, "slug": slug.current }`,
      { lang, publishedAt },
      null
    ),
    safeFetch<AdjacentPost>(
      `*[_type == "post" && language == $lang && publishedAt < $publishedAt] | order(publishedAt desc) [0] { title, "slug": slug.current }`,
      { lang, publishedAt },
      null
    ),
  ]);

  return { newer, older };
}
