"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { subscribeToConsent, type ConsentValue } from "@/lib/analytics/consent";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export function GA4() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  if (!GA4_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        id="ga4-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>
    </>
  );
}
