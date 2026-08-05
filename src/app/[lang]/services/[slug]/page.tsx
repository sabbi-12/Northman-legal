import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ServiceFeaturedImage } from "@/components/sections/ServiceFeaturedImage";
import { ServiceSolutions } from "@/components/sections/ServiceSolutions";
import { ServiceDistinctApproach } from "@/components/sections/ServiceDistinctApproach";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { ServiceCta } from "@/components/sections/ServiceCta";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import enDictionary from "@/lib/i18n/dictionaries/en.json";

type ServiceDetail = {
  title: string;
  intro: string;
  imageSrc?: string;
  imageAlt?: string;
  solutions: {
    heading: string;
    pillars: Array<{
      id: string;
      title: string;
      description: string;
      items?: string[];
      cards?: string[];
    }>;
  };
  distinctApproach: { heading: string; body: string };
  highlights: Array<{ title: string; description: string }>;
  cta: string;
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

  return (
    <>
      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: detail.title, href: `/${lang}/services/${params.slug}` },
        ]}
      />

      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="container-institutional max-w-3xl">
          <h1 className="inline-block border-b-2 border-accent pb-2 text-3xl font-bold md:text-4xl">
            {detail.title}
          </h1>
        </div>
      </section>

      <ServiceFeaturedImage imageSrc={detail.imageSrc} imageAlt={detail.imageAlt ?? detail.title} />

      <ServiceSolutions heading={detail.solutions.heading} pillars={detail.solutions.pillars} />

      <ServiceDistinctApproach
        heading={detail.distinctApproach.heading}
        body={detail.distinctApproach.body}
      />

      <ServiceHighlights items={detail.highlights} />

      <ServiceCta label={detail.cta} lang={lang} />

      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
