import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Globe2 } from "lucide-react";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
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
    title: dict.regionsPage.title,
    description: dict.regionsPage.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/regions`,
      languages: {
        en: `${SITE_URL}/en/regions`,
        ar: `${SITE_URL}/ar/regions`,
        "x-default": `${SITE_URL}/en/regions`,
      },
    },
  };
}

export default async function RegionsPage({ params }: { params: { lang: string } }) {
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
          { name: dict.regionsPage.title, href: `/${lang}/regions` },
        ]}
      />
      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="text-4xl font-medium md:text-5xl">{dict.regionsPage.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">{dict.regionsPage.intro}</p>
        </div>
      </section>

      <section className="bg-cream py-20 dark:bg-navy-dark">
        <div className="container-institutional grid gap-8 md:grid-cols-2">
          <div className="rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-institutional bg-navy/5 text-navy dark:bg-cream/10 dark:text-gold">
              <Building2 size={22} strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 text-xl font-medium text-slate-dark dark:text-cream">
              {dict.regionsPage.hqTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.regionsPage.hqDescription}
            </p>
          </div>

          <div className="rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-institutional bg-navy/5 text-navy dark:bg-cream/10 dark:text-gold">
              <Globe2 size={22} strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 text-xl font-medium text-slate-dark dark:text-cream">
              {dict.regionsPage.reachTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.regionsPage.reachDescription}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
