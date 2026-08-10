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
  { path: "terms-and-conditions", changeFrequency: "yearly", priority: 0.2 },
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
  // Each post is its own Sanity document per language, and there is
  // currently no cross-language slug mapping (no ar-language posts exist
  // yet at all) — so unlike the static routes above, a post's hreflang
  // alternate set must NOT claim every locale has a matching slug. Each
  // entry only advertises the locale it actually has, self-referencing
  // hreflang (its own URL) rather than a same-slug guess at other
  // locales, which would 404.
  const seenSlugs = new Set<string>();
  for (const locale of locales as readonly Locale[]) {
    const slugs = await getAllPostSlugs(locale);
    for (const slug of slugs) {
      const key = `${locale}/${slug}`;
      if (seenSlugs.has(key)) continue;
      seenSlugs.add(key);

      const url = `${SITE_URL}/${locale}/news-updates/${slug}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: { [locale]: url, "x-default": url } },
      });
    }
  }

  return entries;
}
