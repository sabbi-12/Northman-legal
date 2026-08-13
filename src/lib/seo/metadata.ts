import type { Metadata } from "next";

import { locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";

// Builds the { en, ar, x-default } (or however many locales exist)
// hreflang map for a given path, all pointing at the same relative path
// under each locale. Use this only when every locale genuinely has an
// equivalent page at that path — the news article detail page does NOT
// use this (see buildPageMetadata's `languages` override), since Sanity
// posts don't have a same-slug counterpart in every locale.
export function languageAlternatesFor(path: string): Record<string, string> {
  const suffix = path ? `/${path}` : "";
  const alternates: Record<string, string> = {};

  for (const locale of locales) {
    alternates[localeHtmlLang[locale]] = `${SITE_URL}/${locale}${suffix}`;
  }
  alternates["x-default"] = `${SITE_URL}/en${suffix}`;

  return alternates;
}

// Shared canonical + hreflang + title/description builder for every
// marketing/legal page's generateMetadata. Pages with non-standard
// hreflang needs (e.g. a page that only exists in one locale) should pass
// their own `languages` map instead of relying on the `path` default.
export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  robots,
  languages,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  robots?: Metadata["robots"];
  languages?: Record<string, string>;
}): Metadata {
  return {
    title,
    description,
    ...(robots ? { robots } : {}),
    alternates: {
      canonical: `${SITE_URL}/${lang}/${path}`,
      languages: languages ?? languageAlternatesFor(path),
    },
  };
}
