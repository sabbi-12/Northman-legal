"use client";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { SERVICE_DETAIL_SLUGS } from "@/lib/data/serviceSlugs";
import { ServiceListRow } from "@/components/sections/ServiceListRow";

export function ServicesGrid({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const items: Array<{ id: string; title: string; subtext: string }> = dict.servicesPage.items;

  function learnMoreHref(id: string) {
    return SERVICE_DETAIL_SLUGS.has(id) ? `/${lang}/services/${id}` : `/${lang}/contact-us`;
  }

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional flex flex-col gap-5">
        {items.map((item, index) => (
          <ServiceListRow
            key={item.id}
            service={item}
            lang={lang}
            learnMoreLabel={dict.servicesPage.learnMore}
            href={learnMoreHref(item.id)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
