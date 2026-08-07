import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ConnectBanner } from "@/components/sections/ConnectBanner";
import { GlobalOffices } from "@/components/sections/GlobalOffices";
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
    title: dict.contactPage.title,
    description: dict.contactPage.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/contact-us`,
      languages: {
        en: `${SITE_URL}/en/contact-us`,
        ar: `${SITE_URL}/ar/contact-us`,
        "x-default": `${SITE_URL}/en/contact-us`,
      },
    },
  };
}

export default async function ContactUsPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="text-4xl font-medium md:text-5xl">{dict.contactPage.title}</h1>
        </div>
      </section>

      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.contactPage.title, href: `/${lang}/contact-us` },
        ]}
      />

      <ConnectBanner dict={dict} />
      <GlobalOffices dict={dict} />
      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
