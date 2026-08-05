import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ServicesValueProp } from "@/components/sections/ServicesValueProp";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
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
    title: dict.servicesPage.title,
    description: dict.servicesPage.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/services`,
      languages: {
        en: `${SITE_URL}/en/services`,
        ar: `${SITE_URL}/ar/services`,
        "x-default": `${SITE_URL}/en/services`,
      },
    },
  };
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
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
          { name: dict.servicesPage.title, href: `/${lang}/services` },
        ]}
      />

      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="text-4xl font-medium md:text-5xl">{dict.servicesPage.title}</h1>
        </div>
      </section>

      <ServicesValueProp dict={dict} />
      <ServicesGrid dict={dict} lang={lang} />
      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
