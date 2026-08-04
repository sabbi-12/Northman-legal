import { SITE_URL, ORGANIZATION } from "@/lib/seo/constants";
import type { Locale } from "@/lib/i18n/config";

export function buildOrganizationSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/${lang}#organization`,
    name: ORGANIZATION.legalName,
    url: `${SITE_URL}/${lang}`,
    logo: `${SITE_URL}/images/logo-real.png`,
    email: ORGANIZATION.email,
    ...(ORGANIZATION.telephone ? { telephone: ORGANIZATION.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      addressCountry: ORGANIZATION.addressCountry,
    },
    ...(ORGANIZATION.sameAs.length > 0 ? { sameAs: ORGANIZATION.sameAs } : {}),
  };
}
