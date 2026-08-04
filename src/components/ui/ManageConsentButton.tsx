"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

import { subscribeToConsent, requestConsentReopen, type ConsentValue } from "@/lib/analytics/consent";

export function ManageConsentButton({ label }: { label: string }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  // Only shown once a decision exists — before that, the full banner is
  // already on screen and a second entry point would just be clutter.
  if (consent === null) return null;

  return (
    <button
      type="button"
      onClick={requestConsentReopen}
      aria-label={label}
      title={label}
      className="fixed bottom-5 start-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-cream shadow-institutional transition-colors hover:bg-navy/90 dark:bg-accent dark:text-navy dark:hover:bg-accent/90"
    >
      <Cookie size={18} strokeWidth={1.75} />
    </button>
  );
}
