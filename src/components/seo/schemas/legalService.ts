import { SITE_URL, ORGANIZATION } from "@/lib/seo/constants";
import type { Locale } from "@/lib/i18n/config";

export function buildLegalServiceSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/${lang}#legalservice`,
    name: ORGANIZATION.legalName,
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/images/logo-real.png`,
    email: ORGANIZATION.email,
    ...(ORGANIZATION.telephone ? { telephone: ORGANIZATION.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      addressCountry: ORGANIZATION.addressCountry,
    },
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "AdministrativeArea", name: "Global — clients served from 35+ countries" },
    ],
    serviceType: [
      "Global Immigration Solutions",
      "Commercial Disputes & Court Enforcement",
      "Authorized Notary & Power of Attorney Issuance",
    ],
  };
}
