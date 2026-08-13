import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
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

  return buildPageMetadata({
    lang,
    path: "services",
    title: dict.servicesPage.title,
    description: dict.servicesPage.intro,
  });
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="relative flex min-h-[34rem] items-center overflow-hidden bg-navy text-cream md:min-h-[40rem]">
        <ParallaxHeroImage
          src="/images/services/services-hero.jpg"
          imageClassName="object-cover blur-md scale-110"
        />
        <div className="absolute inset-0 bg-navy/65 dark:bg-navy-dark/75" />

        <div className="container-header relative grid gap-10 py-20 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16 md:py-28">
          <div>
            <span className="block h-px w-12 bg-accent-300" aria-hidden="true" />
            <h1 className="mt-5 text-4xl font-medium leading-tight drop-shadow-[0_2px_10px_rgba(8,18,32,0.7)] md:text-5xl lg:text-6xl">
              {dict.servicesPage.valueProp.heading}
            </h1>
          </div>

          <div className="border-t border-cream/15 pt-6 md:border-t-0 md:border-s md:ps-10 md:pt-0 rtl:md:border-s-0 rtl:md:border-e rtl:md:pe-10 rtl:md:ps-0">
            <p className="text-base leading-relaxed text-cream/85 drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]">
              {dict.servicesPage.valueProp.subtext}
            </p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-5xl font-medium leading-none text-accent-300">
                {dict.servicesPage.items.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/70">
                {dict.servicesPage.practiceAreasLabel}
              </span>
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.servicesPage.title, href: `/${lang}/services` },
        ]}
      />

      <ServicesGrid dict={dict} lang={lang} />
      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
