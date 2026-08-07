import { getDictionary } from "@/lib/i18n/getDictionary";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import { getLatestPosts } from "@/lib/sanity/posts";

import { Hero } from "@/components/sections/Hero";
import { ComplianceHighlights } from "@/components/sections/ComplianceHighlights";
import { Certifications } from "@/components/sections/Certifications";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { CoreServices } from "@/components/sections/CoreServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { LegalAdvisors } from "@/components/sections/LegalAdvisors";
import { EventGallery } from "@/components/sections/EventGallery";
import { LatestInsights } from "@/components/sections/LatestInsights";
import { LetsConnect } from "@/components/sections/LetsConnect";
import { FirmIdentity } from "@/components/sections/FirmIdentity";
import { Newsletter } from "@/components/sections/Newsletter";

export default async function HomePage({ params }: { params: { lang: string } }) {
  if (!isValidLocale(params.lang)) {
    notFound();
  }

  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const latestPosts = await getLatestPosts(lang, 4);

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <ComplianceHighlights dict={dict} />
      <Certifications dict={dict} />
      <TrustBanner dict={dict} lang={lang} />
      <CoreServices dict={dict} lang={lang} />
      <WhyChooseUs dict={dict} lang={lang} />
      <LegalAdvisors dict={dict} lang={lang} />
      <EventGallery dict={dict} />
      <LatestInsights dict={dict} lang={lang} posts={latestPosts} />
      <LetsConnect dict={dict} />
      <FirmIdentity dict={dict} />
      <Newsletter dict={dict} />
    </>
  );
}
