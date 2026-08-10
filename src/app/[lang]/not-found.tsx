"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { isValidLocale, defaultLocale } from "@/lib/i18n/config";
import enDictionary from "@/lib/i18n/dictionaries/en.json";
import arDictionary from "@/lib/i18n/dictionaries/ar.json";

// not-found.tsx never receives a params prop directly (App Router can't
// guarantee the triggering segment), so the locale is read client-side via
// useParams() instead — same pattern every other locale-aware client
// component in this app would use if it needed the segment outside props.
export default function NotFound() {
  const params = useParams();
  const rawLang = typeof params?.lang === "string" ? params.lang : defaultLocale;
  const lang = isValidLocale(rawLang) ? rawLang : defaultLocale;
  const dict = lang === "ar" ? arDictionary : enDictionary;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section dir={dir} className="flex min-h-[60vh] items-center bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          {dict.notFound.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-medium text-slate-dark md:text-5xl dark:text-cream">
          {dict.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-mid dark:text-cream/70">
          {dict.notFound.body}
        </p>
        <Link
          href={`/${lang}`}
          className="mt-8 inline-flex items-center rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
        >
          {dict.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
