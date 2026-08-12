import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ConnectBanner } from "@/components/sections/ConnectBanner";
import { GlobalOffices } from "@/components/sections/GlobalOffices";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ParallaxHeroImage } from "@/components/ui/ParallaxHeroImage";

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
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy py-28 text-cream md:min-h-[80vh] md:py-36">
        <ParallaxHeroImage src="/images/contact/contact-hero.jpg" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/85 dark:from-navy-dark/85 dark:via-navy-dark/65 dark:to-navy-dark/90" />

        <div className="container-institutional relative max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white drop-shadow-[0_1px_6px_rgba(8,18,32,0.75)]">
            {dict.contactPage.heroEyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-medium leading-tight drop-shadow-[0_2px_10px_rgba(8,18,32,0.7)] md:text-5xl lg:text-6xl">
            {dict.contactPage.heroHeadline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]">
            {dict.contactPage.intro}
          </p>
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
    </>
  );
}
