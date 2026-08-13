"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { isValidLocale, defaultLocale } from "@/lib/i18n/config";
import enDictionary from "@/lib/i18n/dictionaries/en.json";
import arDictionary from "@/lib/i18n/dictionaries/ar.json";

// Like not-found.tsx, error.tsx boundaries can't rely on a params prop
// being populated reliably, so the locale is read client-side via
// useParams() — same pattern used sitewide for this exact limitation.
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const rawLang = typeof params?.lang === "string" ? params.lang : defaultLocale;
  const lang = isValidLocale(rawLang) ? rawLang : defaultLocale;
  const dict = lang === "ar" ? arDictionary : enDictionary;
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <section dir={dir} className="flex min-h-[60vh] items-center bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          {dict.errorPage.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-medium text-slate-dark md:text-5xl dark:text-cream">
          {dict.errorPage.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-mid dark:text-cream/70">
          {dict.errorPage.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            {dict.errorPage.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center rounded-institutional border border-navy/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-slate-dark transition-colors hover:bg-navy/5 dark:border-cream/20 dark:text-cream dark:hover:bg-cream/5"
          >
            {dict.errorPage.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
