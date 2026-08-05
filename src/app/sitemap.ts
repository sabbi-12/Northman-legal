import type { MetadataRoute } from "next";

import { locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { getAllPostSlugs } from "@/lib/sanity/posts";
import enDictionary from "@/lib/i18n/dictionaries/en.json";

const SERVICE_DETAIL_SLUGS = Object.keys(enDictionary.serviceDetails);

type StaticRoute = {
  path: string; // e.g. "" for home, "about-us" for /about-us
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: StaticRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "services", changeFrequency: "monthly", priority: 0.8 },
  { path: "news-updates", changeFrequency: "daily", priority: 0.8 },
  { path: "contact-us", changeFrequency: "monthly", priority: 0.6 },
  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "disclaimer", changeFrequency: "yearly", priority: 0.2 },
];

function languageAlternatesFor(path: string): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) {
    entries[locale] = `${SITE_URL}/${locale}${path ? `/${path}` : ""}`;
  }
  entries["x-default"] = `${SITE_URL}/en${path ? `/${path}` : ""}`;
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static marketing + section-index pages, one entry per locale, each
  // carrying the full hreflang alternate set.
  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path ? `/${route.path}` : ""}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languageAlternatesFor(route.path) },
      });
    }
  }

  // Service detail pages under /services/[slug] — one entry per locale,
  // sourced from the same dictionary keys the [slug] route itself reads.
  for (const slug of SERVICE_DETAIL_SLUGS) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: languageAlternatesFor(`services/${slug}`) },
      });
    }
  }

  // Dynamic News & Updates article URLs, sourced from Sanity. If Sanity
  // is unreachable/misconfigured, getAllPostSlugs resolves to an empty
  // array rather than throwing, so the sitemap build never fails on that
  // account.
  //
  // ASSUMPTION: this treats a post's EN and AR slugs as interchangeable
  // for the hreflang alternate set. Since each language is its own Sanity
  // document, an EN post and its AR translation could have different
  // slugs — if editors give them different slugs, replace this with a
  // lookup that maps each post to its translation's slug per locale
  // (e.g. a shared `translationKey` field on the post schema) before
  // building `languageAlternatesFor`.
  const seenSlugs = new Set<string>();
  for (const locale of locales as readonly Locale[]) {
    const slugs = await getAllPostSlugs(locale);
    for (const slug of slugs) {
      const key = `${locale}/${slug}`;
      if (seenSlugs.has(key)) continue;
      seenSlugs.add(key);

      entries.push({
        url: `${SITE_URL}/${locale}/news-updates/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languageAlternatesFor(`news-updates/${slug}`) },
      });
    }
  }

  return entries;
}
