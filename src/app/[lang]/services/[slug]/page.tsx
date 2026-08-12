import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary, type Dictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { ServiceCta } from "@/components/sections/ServiceCta";
import { SimpleServiceDetail } from "@/components/sections/SimpleServiceDetail";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ParallaxHeroImage } from "@/components/ui/ParallaxHeroImage";
import { getServicePhoto } from "@/lib/data/servicePhotos";
import enDictionary from "@/lib/i18n/dictionaries/en.json";

type ServiceDetail = {
  layout: "simple";
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string; items?: string[] }>;
  highlights: Array<{ title: string; description: string }>;
  cta: string;
  // Optional content photo placed beside the first section (not the
  // hero) — supplied per service as real photos arrive; falls back to
  // the plain text-only layout when absent.
  imageSrc?: string;
  imageAlt?: string;
};

const SERVICE_SLUGS = Object.keys(enDictionary.serviceDetails);

export function generateStaticParams() {
  return locales.flatMap((lang) => SERVICE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) return {};
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const details = dict.serviceDetails as Record<string, ServiceDetail>;
  const detail = details[params.slug];
  if (!detail) return {};

  return {
    title: detail.title,
    description: detail.intro,
    alternates: {
      canonical: `${SITE_URL}/${lang}/services/${params.slug}`,
      languages: {
        en: `${SITE_URL}/en/services/${params.slug}`,
        ar: `${SITE_URL}/ar/services/${params.slug}`,
        "x-default": `${SITE_URL}/en/services/${params.slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const details = dict.serviceDetails as Record<string, ServiceDetail>;
  const detail = details[params.slug];

  if (!detail) {
    notFound();
  }

  return <ServiceDetailContent detail={detail} lang={lang} slug={params.slug} dict={dict} />;
}

function ServiceDetailContent({
  detail,
  lang,
  slug,
  dict,
}: {
  detail: ServiceDetail;
  lang: Locale;
  slug: string;
  dict: Dictionary;
}) {
  const photo = getServicePhoto(slug, SERVICE_SLUGS.indexOf(slug));

  return (
    <>
      <section className="relative overflow-hidden bg-navy pb-16 pt-8 text-cream md:pb-24 md:pt-10">
        <ParallaxHeroImage src={photo} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90 dark:from-navy-dark/90 dark:via-navy-dark/75 dark:to-navy-dark/95" />

        <div className="relative">
          <Breadcrumbs
            lang={lang}
            onDark
            items={[
              { name: dict.nav.home, href: `/${lang}` },
              { name: dict.servicesPage.title, href: `/${lang}/services` },
              { name: detail.title, href: `/${lang}/services/${slug}` },
            ]}
          />
          <div className="container-institutional max-w-3xl">
            <h1 className="text-3xl font-bold drop-shadow-[0_2px_10px_rgba(8,18,32,0.7)] md:text-4xl">
              {detail.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cream/90 drop-shadow-[0_1px_6px_rgba(8,18,32,0.65)]">
              {detail.intro}
            </p>
          </div>
        </div>
      </section>

      <SimpleServiceDetail
        sections={detail.sections}
        imageSrc={detail.imageSrc}
        imageAlt={detail.imageAlt}
        imageSide={SERVICE_SLUGS.indexOf(slug) % 2 === 0 ? "right" : "left"}
      />

      <ServiceHighlights items={detail.highlights} />

      <ServiceCta label={detail.cta} lang={lang} />

      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
