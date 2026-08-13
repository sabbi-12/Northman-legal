import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
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

  return buildPageMetadata({
    lang,
    path: "privacy-policy",
    title: dict.legalPages.privacyPolicy.title,
    description: dict.legalPages.privacyPolicy.intro,
    robots: { index: true, follow: true },
  });
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
