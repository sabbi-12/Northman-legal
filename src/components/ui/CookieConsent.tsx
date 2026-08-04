"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

import { getStoredConsent, setStoredConsent, CONSENT_REOPEN_EVENT } from "@/lib/analytics/consent";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function CookieConsent({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  // Renders nothing until the client-side effect confirms no decision has
  // been stored yet. This banner only ever gates analytics scripts (see
  // lib/analytics/consent.ts) — it never withholds, delays, or hides page
  // content, so it has no effect on what search engines can index.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      setVisible(true);
    }

    function handleReopen() {
      setVisible(true);
    }

    window.addEventListener(CONSENT_REOPEN_EVENT, handleReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, handleReopen);
  }, []);

  function decide(value: "granted" | "denied") {
    setStoredConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-cream/95 backdrop-blur-md dark:border-cream/10 dark:bg-navy-dark/95"
    >
      <div className="container-institutional flex flex-col items-center gap-4 py-5 sm:flex-row sm:justify-between">
        <p className="flex items-start gap-2.5 text-sm text-slate-mid dark:text-cream/70">
          <Cookie size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
          <span>
            {dict.cookieConsent.message}{" "}
            <Link href={`/${lang}/privacy-policy`} className="font-medium text-navy underline dark:text-cream">
              {dict.cookieConsent.privacyLink}
            </Link>
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-institutional border border-navy/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy transition-colors hover:border-navy dark:border-cream/20 dark:text-cream"
          >
            {dict.cookieConsent.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-institutional bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
          >
            {dict.cookieConsent.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
