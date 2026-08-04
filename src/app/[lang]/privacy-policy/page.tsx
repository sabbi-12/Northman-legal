import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { LegalPageContent } from "@/components/sections/LegalPageContent";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) return {};
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.legalPages.privacyPolicy.title,
    description: dict.legalPages.privacyPolicy.intro,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${lang}/privacy-policy`,
      languages: {
        en: `${SITE_URL}/en/privacy-policy`,
        ar: `${SITE_URL}/ar/privacy-policy`,
        "x-default": `${SITE_URL}/en/privacy-policy`,
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <LegalPageContent
      title={dict.legalPages.privacyPolicy.title}
      intro={dict.legalPages.privacyPolicy.intro}
      sections={dict.legalPages.privacyPolicy.sections}
      lastUpdatedLabel={dict.legalPages.lastUpdated}
    />
  );
}
