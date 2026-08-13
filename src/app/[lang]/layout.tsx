import type { Metadata, Viewport } from "next";
import { Cinzel, Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

import { locales, localeDirection, localeHtmlLang, isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { SITE_URL, SITE_NAME } from "@/lib/seo/constants";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ManageConsentButton } from "@/components/ui/ManageConsentButton";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import { GA4 } from "@/components/analytics/GA4";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { HubSpotTracking } from "@/components/analytics/HubSpotTracking";
import { EventTracking } from "@/components/analytics/EventTracking";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema } from "@/components/seo/schemas/organization";
import { buildLegalServiceSchema } from "@/components/seo/schemas/legalService";
import { buildAttorneySchema } from "@/components/seo/schemas/attorney";
import { getLatestPosts } from "@/lib/sanity/posts";

import "../globals.css";

// --- Fonts -------------------------------------------------------------
// English headings: Cinzel (restrained, high-contrast serif suited to an
// institutional legal brand). English body: Inter.
const headingEn = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading-en",
  display: "swap",
});

const bodyEn = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-en",
  display: "swap",
});

// Arabic headings + body: Cairo (replaces Amiri/Readex Pro).
const headingAr = Cairo({
  subsets: ["arabic"],
  weight: ["600", "700"],
  variable: "--font-heading-ar",
  display: "swap",
});

const bodyAr = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-ar",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) {
    return {};
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  const languageAlternates: Record<string, string> = {};
  for (const locale of locales) {
    languageAlternates[localeHtmlLang[locale]] = `${SITE_URL}/${locale}`;
  }
  languageAlternates["x-default"] = `${SITE_URL}/en`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      url: `${SITE_URL}/${lang}`,
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
      images: [
        {
          url: `${SITE_URL}/images/og-default-${lang}.jpg`,
          width: 1200,
          height: 630,
          alt: dict.meta.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.defaultTitle,
      description: dict.meta.defaultDescription,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#04080F" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dir = localeDirection[lang];
  const dict = await getDictionary(lang);
  const topBarPosts = await getLatestPosts(lang, 6);

  return (
    <html
      lang={localeHtmlLang[lang]}
      dir={dir}
      className={`${headingEn.variable} ${bodyEn.variable} ${headingAr.variable} ${bodyAr.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking, dependency-free theme script: reads the stored
            preference and applies the `dark` class before first paint so
            there is no light->dark flash. Light remains the default when
            no preference (or an invalid one) is stored. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=window.localStorage.getItem('ns-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <GoogleTagManager />
      </head>
      <body className={dir === "rtl" ? "font-body-ar" : "font-body-en"}>
        <GoogleTagManagerNoscript />
        <JsonLd data={buildOrganizationSchema(lang)} />
        <JsonLd data={buildLegalServiceSchema(lang, dict.serviceDetails)} />
        <JsonLd data={buildAttorneySchema(lang)} />
        <ThemeProvider>
          <TopBar dict={dict} lang={lang} posts={topBarPosts} />
          <Navbar dict={dict} lang={lang} />
          <main>{children}</main>
          <Footer dict={dict} lang={lang} />
        </ThemeProvider>
        <CookieConsent dict={dict} lang={lang} />
        <ManageConsentButton label={dict.footer.manageConsent} />
        <EventTracking />
        <GA4 />
        <MicrosoftClarity />
        <HubSpotTracking />
        <Analytics />
      </body>
    </html>
  );
}
