import { SITE_URL, ORGANIZATION } from "@/lib/seo/constants";
import type { Locale } from "@/lib/i18n/config";

// NOTE: this uses schema.org's `Attorney` type to describe the FIRM as a
// legal practice — the brief and current site content don't name any
// individual lawyers, so no fabricated person data is included here. If
// the real site later adds attorney bio pages, give each one its own
// `Person`-based Attorney schema on that page instead of relying on this.
export function buildAttorneySchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "@id": `${SITE_URL}/${lang}#attorney`,
    name: ORGANIZATION.legalName,
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/images/logo.svg`,
    email: ORGANIZATION.email,
    ...(ORGANIZATION.telephone ? { telephone: ORGANIZATION.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      addressCountry: ORGANIZATION.addressCountry,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };
}
