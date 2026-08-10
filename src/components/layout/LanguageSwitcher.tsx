"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

import { locales, localeLabel, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash), segments[1] is the current locale.
  if (segments.length > 1) {
    segments[1] = nextLocale;
  }
  return segments.join("/") || `/${nextLocale}`;
}

export function LanguageSwitcher({
  currentLang,
  onDark = false,
}: {
  currentLang: Locale;
  onDark?: boolean;
}) {
  const pathname = usePathname() ?? `/${currentLang}`;

  return (
    <div className="flex items-center gap-1 text-sm">
      <Globe
        size={16}
        strokeWidth={1.75}
        className={cn("me-1", onDark ? "text-cream/70" : "text-navy/60 dark:text-cream/60")}
        aria-hidden="true"
      />
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span className={cn("mx-1", onDark ? "text-cream/30" : "text-navy/30 dark:text-cream/30")}>/</span>
          )}
          <Link
            href={swapLocaleInPath(pathname, locale)}
            hrefLang={locale}
            className={cn(
              "px-1 py-0.5 font-medium uppercase tracking-wide transition-colors",
              locale === currentLang
                ? onDark
                  ? "text-button"
                  : "text-accent"
                : onDark
                  ? "text-cream/70 hover:text-cream"
                  : "text-navy/60 hover:text-navy dark:text-cream/60 dark:hover:text-cream"
            )}
            aria-current={locale === currentLang ? "true" : undefined}
          >
            {localeLabel[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
