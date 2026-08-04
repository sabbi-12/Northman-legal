import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Mail, Phone } from "lucide-react";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { SITE_URL, ORGANIZATION } from "@/lib/seo/constants";
import { ContactForm } from "@/components/sections/ContactForm";
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
    <section className="py-20">
      <Breadcrumbs
        lang={lang}
        items={[
          { name: dict.nav.home, href: `/${lang}` },
          { name: dict.contactPage.title, href: `/${lang}/contact-us` },
        ]}
      />
      <div className="container-institutional grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-4xl font-medium text-slate-dark md:text-5xl dark:text-cream">
            {dict.contactPage.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.contactPage.intro}
          </p>

          <div className="mt-10">
            <ContactForm dict={dict} />
          </div>
        </div>

        <div className="rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40">
          <h2 className="text-lg font-medium text-slate-dark dark:text-cream">
            {dict.contactPage.officeTitle}
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-mid dark:text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{dict.footer.officeAddress}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${ORGANIZATION.email}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                {ORGANIZATION.email}
              </a>
            </li>
            {ORGANIZATION.telephone && (
              <li className="flex items-start gap-3">
                <Phone size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${ORGANIZATION.telephone}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                  {ORGANIZATION.telephone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
