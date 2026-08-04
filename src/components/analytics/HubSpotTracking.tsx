"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { subscribeToConsent, type ConsentValue } from "@/lib/analytics/consent";

const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

export function HubSpotTracking() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  if (!HUBSPOT_PORTAL_ID || consent !== "granted") return null;

  return (
    <Script
      id="hs-script-loader"
      src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      strategy="lazyOnload"
    />
  );
}
