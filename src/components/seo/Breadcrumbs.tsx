import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import type { Locale } from "@/lib/i18n/config";

export type BreadcrumbItem = {
  name: string;
  href: string; // absolute path, e.g. "/en/news-updates/some-slug"
};

export function Breadcrumbs({ items, lang }: { items: BreadcrumbItem[]; lang: Locale }) {
  const Separator = lang === "ar" ? ChevronLeft : ChevronRight;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="container-institutional flex flex-wrap items-center gap-1.5 text-xs text-slate-mid dark:text-cream/60">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && <Separator size={12} strokeWidth={2} aria-hidden="true" />}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-slate-dark dark:text-cream">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-gold">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}
