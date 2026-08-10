import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getDictionary, type Dictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/constants";
import { ServiceHighlights } from "@/components/sections/ServiceHighlights";
import { ServiceCta } from "@/components/sections/ServiceCta";
import { SimpleServiceDetail } from "@/components/sections/SimpleServiceDetail";
import { ServiceQuoteIntro } from "@/components/sections/ServiceQuoteIntro";
import { ServiceVideoBanner } from "@/components/sections/ServiceVideoBanner";
import { ServiceWhySaudi } from "@/components/sections/ServiceWhySaudi";
import { ServiceOwnershipCallout } from "@/components/sections/ServiceOwnershipCallout";
import { ServiceEntityForms } from "@/components/sections/ServiceEntityForms";
import { ServiceEntityComparison } from "@/components/sections/ServiceEntityComparison";
import { ServiceProcessTimeline } from "@/components/sections/ServiceProcessTimeline";
import { ServiceSecondaryEntities } from "@/components/sections/ServiceSecondaryEntities";
import { ServiceFinalCallout } from "@/components/sections/ServiceFinalCallout";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";
import { OfficeContact } from "@/components/sections/OfficeContact";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import enDictionary from "@/lib/i18n/dictionaries/en.json";

type SimpleDetail = {
  layout: "simple";
  title: string;
  intro: string;
  sections: Array<{ heading: string; body: string; items?: string[] }>;
  highlights: Array<{ title: string; description: string }>;
  cta: string;
};

type KsaGuideDetail = {
  layout: "ksa-guide";
  title: string;
  intro: string;
  heroImageSrc: string;
  quoteIntro: { heading: string; body: string; cta: string; imageSrc: string; imageAlt: string };
  videoBanner: {
    heading: string;
    intro: string;
    servicesIntro: string;
    services: string[];
    embedUrl: string;
  };
  whySaudi: { heading: string; paragraphs: string[] };
  ownership: { heading: string; paragraphs: string[] };
  entityForms: { heading: string; subheading: string; items: string[]; footerNote: string };
  entityComparison: {
    heading: string;
    keyFeaturesLabel: string;
    recommendedPracticesLabel: string;
    entities: Array<{
      id: string;
      name: string;
      note?: string;
      rows: Array<{ label: string; value: string }>;
      keyFeatures?: string[];
      recommendedPractices?: string[];
    }>;
  };
  processTimeline: {
    heading: string;
    note: string;
    milestoneLabel: string;
    durationLabel: string;
    steps: Array<{ milestone: string; duration: string }>;
  };
  secondaryEntities: {
    items: Array<{
      title: string;
      description: string;
      keyFeaturesLabel?: string;
      keyFeatures?: string[];
    }>;
  };
  finalCallout: { heading: string; body: string; cta: string; imageSrc: string; imageAlt: string };
};

type ServiceDetail = KsaGuideDetail | SimpleDetail;

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

  if (detail.layout === "ksa-guide") {
    return (
      <KsaGuidePage detail={detail} lang={lang} slug={params.slug} dict={dict} />
    );
  }

  return <SimpleDetailPage detail={detail} lang={lang} slug={params.slug} dict={dict} />;
}

function SimpleDetailPage({
  detail,
  lang,
  slug,
  dict,
}: {
  detail: SimpleDetail;
  lang: Locale;
  slug: string;
  dict: Dictionary;
}) {
  return (
    <>
      <section className="-mt-24 bg-navy pb-16 pt-[calc(theme(spacing.4)+theme(spacing.24))] text-cream md:pb-20 md:pt-[calc(theme(spacing.4)+theme(spacing.24))]">
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
          <h1 className="text-3xl font-bold md:text-4xl">{detail.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-cream/80">{detail.intro}</p>
        </div>
      </section>

      <SimpleServiceDetail sections={detail.sections} />

      <ServiceHighlights items={detail.highlights} />

      <ServiceCta label={detail.cta} lang={lang} />

      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}

function KsaGuidePage({
  detail,
  lang,
  slug,
  dict,
}: {
  detail: KsaGuideDetail;
  lang: Locale;
  slug: string;
  dict: Dictionary;
}) {
  return (
    <>
      <section className="relative -mt-24 overflow-hidden bg-navy pb-16 pt-[calc(theme(spacing.4)+theme(spacing.24))] text-white md:pb-20 md:pt-[calc(theme(spacing.4)+theme(spacing.24))]">
        <Image src={detail.heroImageSrc} alt="" fill priority sizes="100vw" quality={90} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
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
        </div>
        <div className="container-institutional relative max-w-3xl">
          <h1 className="text-3xl font-bold md:text-4xl">{detail.title}</h1>
        </div>
      </section>

      <ServiceQuoteIntro
        heading={detail.quoteIntro.heading}
        body={detail.quoteIntro.body}
        cta={detail.quoteIntro.cta}
        imageSrc={detail.quoteIntro.imageSrc}
        imageAlt={detail.quoteIntro.imageAlt}
        lang={lang}
      />

      <ServiceVideoBanner
        heading={detail.videoBanner.heading}
        intro={detail.videoBanner.intro}
        servicesIntro={detail.videoBanner.servicesIntro}
        services={detail.videoBanner.services}
        embedUrl={detail.videoBanner.embedUrl}
      />

      <ServiceWhySaudi heading={detail.whySaudi.heading} paragraphs={detail.whySaudi.paragraphs} />

      <ServiceOwnershipCallout heading={detail.ownership.heading} paragraphs={detail.ownership.paragraphs} />

      <ServiceEntityForms
        heading={detail.entityForms.heading}
        subheading={detail.entityForms.subheading}
        items={detail.entityForms.items}
        footerNote={detail.entityForms.footerNote}
      />

      <ServiceEntityComparison
        heading={detail.entityComparison.heading}
        entities={detail.entityComparison.entities}
        keyFeaturesLabel={detail.entityComparison.keyFeaturesLabel}
        recommendedPracticesLabel={detail.entityComparison.recommendedPracticesLabel}
      />

      <ServiceProcessTimeline
        heading={detail.processTimeline.heading}
        note={detail.processTimeline.note}
        steps={detail.processTimeline.steps}
        milestoneLabel={detail.processTimeline.milestoneLabel}
        durationLabel={detail.processTimeline.durationLabel}
      />

      <ServiceSecondaryEntities items={detail.secondaryEntities.items} />

      <ServiceFinalCallout
        heading={detail.finalCallout.heading}
        body={detail.finalCallout.body}
        cta={detail.finalCallout.cta}
        imageSrc={detail.finalCallout.imageSrc}
        imageAlt={detail.finalCallout.imageAlt}
        lang={lang}
      />

      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
      <OfficeContact dict={dict} />
    </>
  );
}
