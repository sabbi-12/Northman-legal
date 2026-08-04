"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { subscribeToConsent, type ConsentValue } from "@/lib/analytics/consent";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function MicrosoftClarity() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => subscribeToConsent(setConsent), []);

  if (!CLARITY_ID || consent !== "granted") return null;

  return (
    <Script id="ms-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}
