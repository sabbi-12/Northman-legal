import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { Team } from "@/components/sections/Team";
import { WhatWeBelieve } from "@/components/sections/WhatWeBelieve";
import { Ownership } from "@/components/sections/Ownership";
import { AboutCtaBanner } from "@/components/sections/AboutCtaBanner";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
import { CorePillars } from "@/components/sections/CorePillars";
import { FAQ } from "@/components/sections/FAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

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
    title: dict.aboutPage.title,
    description: dict.aboutPage.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/about-us`,
      languages: {
        en: `${SITE_URL}/en/about-us`,
        ar: `${SITE_URL}/ar/about-us`,
        "x-default": `${SITE_URL}/en/about-us`,
      },
    },
  };
}

export default async function AboutUsPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="text-4xl font-medium md:text-5xl">{dict.aboutPage.title}</h1>
        </div>
      </section>

      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.aboutPage.title, href: `/${lang}/about-us` },
        ]}
      />

      <CompanyOverview dict={dict} lang={lang} />
      <ValuesGrid dict={dict} />
      <Team dict={dict} />
      <WhatWeBelieve dict={dict} lang={lang} />
      <Ownership dict={dict} />
      <AboutCtaBanner dict={dict} lang={lang} />
      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
      <CorePillars dict={dict} />
      <FAQ dict={dict} />
    </>
  );
}
