import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
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
      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.aboutPage.title, href: `/${lang}/about-us` },
        ]}
      />
      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="text-4xl font-medium md:text-5xl">{dict.aboutPage.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">{dict.aboutPage.intro}</p>
        </div>
      </section>

      <section className="bg-cream py-20 dark:bg-navy-dark">
        <div className="container-institutional max-w-3xl">
          <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">
            {dict.aboutPage.missionTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.aboutPage.mission}
          </p>
        </div>
      </section>

      <CorePillars dict={dict} />
      <FAQ dict={dict} />
    </>
  );
}
