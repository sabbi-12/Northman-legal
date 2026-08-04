"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { subscribeToConsent, type ConsentValue } from "@/lib/analytics/consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  if (!GTM_ID || consent !== "granted") return null;

  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

export function GoogleTagManagerNoscript() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  if (!GTM_ID || consent !== "granted") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
