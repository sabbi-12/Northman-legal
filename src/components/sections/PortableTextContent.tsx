import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/lib/sanity/image";
import { locales, type Locale } from "@/lib/i18n/config";

// Editors can paste an internal link into Sanity Studio's rich text
// without the /en or /ar locale prefix (e.g. "/about-us" instead of
// "/en/about-us") — that would silently 404 since every route requires
// the locale segment. Normalize it here rather than relying on editors
// to remember the prefix every time.
function resolveHref(href: string | undefined, lang: Locale): string | undefined {
  if (!href) return href;
  if (/^https?:\/\//.test(href) || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  const startsWithLocale = locales.some((locale) => href === `/${locale}` || href.startsWith(`/${locale}/`));
  if (href.startsWith("/") && !startsWithLocale) {
    return `/${lang}${href}`;
  }
  return href;
}

function createComponents(lang: Locale): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const imageUrl = urlFor(value).width(1200).fit("max").url();
        return (
          <span className="relative my-8 block aspect-[16/9] w-full overflow-hidden rounded-institutional">
            <Image src={imageUrl} alt={value.alt ?? ""} fill className="object-cover" />
          </span>
        );
      },
    },
    marks: {
      link: ({ value, children }) => {
        const isExternal = /^https?:\/\//.test(value?.href ?? "");
        return (
          <a
            href={resolveHref(value?.href, lang)}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
    },
  };
}

export function PortableTextContent({ value, lang }: { value: PortableTextBlock[]; lang: Locale }) {
  return (
    <div className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-headings:font-medium prose-a:text-navy prose-a:no-underline hover:prose-a:text-accent dark:prose-a:text-accent">
      <PortableText value={value} components={createComponents(lang)} />
    </div>
  );
}
