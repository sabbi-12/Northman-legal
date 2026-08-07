/** @type {import('next').NextConfig} */

// NOTE: next.config.js is CommonJS and cannot import the TS redirect map
// directly without a build step, so we mirror the same rules here.
// `src/data/redirects.ts` is the source of truth for documentation and for
// any tooling (e.g. a redirect-audit script) that wants typed access to the
// same data — keep both in sync when the list grows.
const staticRedirects = [
  { source: "/home", destination: "/en", permanent: true },
  { source: "/home/", destination: "/en", permanent: true },
  { source: "/about", destination: "/en/about-us", permanent: true },
  { source: "/about/", destination: "/en/about-us", permanent: true },
  { source: "/about-us", destination: "/en/about-us", permanent: true },
  { source: "/about-us/", destination: "/en/about-us", permanent: true },
  { source: "/who-we-are", destination: "/en/about-us", permanent: true },
  { source: "/regions", destination: "/en/services", permanent: true },
  { source: "/regions/", destination: "/en/services", permanent: true },
  { source: "/global-presence", destination: "/en/services", permanent: true },
  { source: "/company-incorporation-saudi-arabia", destination: "/en/services/company-incorporation", permanent: true },
  { source: "/company-incorporation-saudi-arabia/", destination: "/en/services/company-incorporation", permanent: true },
  { source: "/company-incorporation", destination: "/en/services/company-incorporation", permanent: true },
  { source: "/company-incorporation/", destination: "/en/services/company-incorporation", permanent: true },
  { source: "/corporate-immigration", destination: "/en/services/corporate-immigration", permanent: true },
  { source: "/corporate-immigration/", destination: "/en/services/corporate-immigration", permanent: true },
  { source: "/corporate-immigration-2", destination: "/en/services/corporate-immigration", permanent: true },
  { source: "/corporate-immigration-2/", destination: "/en/services/corporate-immigration", permanent: true },
  { source: "/news", destination: "/en/news-updates", permanent: true },
  { source: "/news/", destination: "/en/news-updates", permanent: true },
  { source: "/blog", destination: "/en/news-updates", permanent: true },
  { source: "/blog/", destination: "/en/news-updates", permanent: true },
  { source: "/news-updates", destination: "/en/news-updates", permanent: true },
  { source: "/news-updates/", destination: "/en/news-updates", permanent: true },
  { source: "/contact", destination: "/en/contact-us", permanent: true },
  { source: "/contact/", destination: "/en/contact-us", permanent: true },
  { source: "/contact-us", destination: "/en/contact-us", permanent: true },
  { source: "/contact-us/", destination: "/en/contact-us", permanent: true },
  { source: "/get-in-touch", destination: "/en/contact-us", permanent: true },
  { source: "/services", destination: "/en/services", permanent: true },
  { source: "/services/", destination: "/en/services", permanent: true },
  { source: "/immigration", destination: "/en/about-us#global-immigration", permanent: true },
  { source: "/notary", destination: "/en/about-us#notary-poa", permanent: true },
  { source: "/commercial-disputes", destination: "/en/about-us#commercial-disputes", permanent: true },
  { source: "/privacy-policy", destination: "/en/privacy-policy", permanent: true },
  { source: "/privacy-policy/", destination: "/en/privacy-policy", permanent: true },
  { source: "/disclaimer", destination: "/en/disclaimer", permanent: true },
  { source: "/disclaimer/", destination: "/en/disclaimer", permanent: true },
  { source: "/terms-and-conditions", destination: "/en/terms-and-conditions", permanent: true },
  { source: "/terms-and-conditions/", destination: "/en/terms-and-conditions", permanent: true },
];

// All 56 live WordPress blog posts, explicit 1:1 redirects. Mirrors
// `blogPostRedirects` in src/data/redirects.ts — verified against the real
// WP site (root-level "Post name" permalinks) and Sanity slugs (2026-08-07).
const blogPostRedirects = [
  { source: "/5-business-risks-companies-avoid-by-outsourcing-document-legalization-and-attestation-services", destination: "/en/news-updates/5-business-risks-companies-avoid-by-outsourcing-document-legalization-and-attestation-services", permanent: true },
  { source: "/5-business-travel-challenges-the-saudi-package-visa-aims-to-address", destination: "/en/news-updates/5-business-travel-challenges-the-saudi-package-visa-aims-to-address", permanent: true },
  { source: "/6-legal-mistakes-foreign-companies-make-in-saudi-arabia", destination: "/en/news-updates/6-legal-mistakes-foreign-companies-make-in-saudi-arabia", permanent: true },
  { source: "/acro-police-certificate-premium-service-now-restored", destination: "/en/news-updates/acro-police-certificate-premium-service-now-restored", permanent: true },
  { source: "/benefits-of-outsourcing-in-saudi-arabia", destination: "/en/news-updates/benefits-of-outsourcing-in-saudi-arabia", permanent: true },
  { source: "/branch-office-or-regional-headquarters-which-structure-better-supports-growth-for-foreign-companies-in-saudi-arabia", destination: "/en/news-updates/branch-office-or-regional-headquarters-which-structure-better-supports-growth-for-foreign-companies-in-saudi-arabia", permanent: true },
  { source: "/compliance-considerations-for-foreign-companies-expanding-into-saudi-arabia", destination: "/en/news-updates/compliance-considerations-for-foreign-companies-expanding-into-saudi-arabia", permanent: true },
  { source: "/discovering-global-opportunities-the-role-of-business-setup-services-in-international-expansion", destination: "/en/news-updates/discovering-global-opportunities-the-role-of-business-setup-services-in-international-expansion", permanent: true },
  { source: "/empowering-saudi-nationals-to-shape-the-future-of-workforce-localization", destination: "/en/news-updates/empowering-saudi-nationals-to-shape-the-future-of-workforce-localization", permanent: true },
  { source: "/entering-saudi-market-for-businesses", destination: "/en/news-updates/entering-saudi-market-for-businesses", permanent: true },
  { source: "/establishing-a-regional-headquarters-rhq-in-saudi-arabia-your-guide-to-the-rhq-license", destination: "/en/news-updates/establishing-a-regional-headquarters-rhq-in-saudi-arabia-your-guide-to-the-rhq-license", permanent: true },
  { source: "/eu-introduces-new-visa-rules-for-saudi-omani-and-bahraini-citizens", destination: "/en/news-updates/eu-introduces-new-visa-rules-for-saudi-omani-and-bahraini-citizens", permanent: true },
  { source: "/five-instant-visas-a-new-workforce-planning-consideration-for-businesses-in-saudi-arabia", destination: "/en/news-updates/five-instant-visas-a-new-workforce-planning-consideration-for-businesses-in-saudi-arabia", permanent: true },
  { source: "/frances-2024-immigration-reform-key-highlights-and-impacts", destination: "/en/news-updates/frances-2024-immigration-reform-key-highlights-and-impacts", permanent: true },
  { source: "/gcc-tourism-officials-plan-for-major-event-coordination-ahead-of-new-visa-system", destination: "/en/news-updates/gcc-tourism-officials-plan-for-major-event-coordination-ahead-of-new-visa-system", permanent: true },
  { source: "/how-are-digital-government-services-changing-the-way-businesses-operate-in-saudi-arabia", destination: "/en/news-updates/how-are-digital-government-services-changing-the-way-businesses-operate-in-saudi-arabia", permanent: true },
  { source: "/how-government-relations-services-support-iqama-processing-and-workforce-mobility-in-saudi-arabia", destination: "/en/news-updates/how-government-relations-services-support-iqama-processing-and-workforce-mobility-in-saudi-arabia", permanent: true },
  { source: "/how-to-setup-a-business-in-saudi-arabia-q1-2026-sector-insights-legal-setup", destination: "/en/news-updates/how-to-setup-a-business-in-saudi-arabia-q1-2026-sector-insights-legal-setup", permanent: true },
  { source: "/how-transport-and-logistics-sector-is-evolving-in-saudi-arabia", destination: "/en/news-updates/how-transport-and-logistics-sector-is-evolving-in-saudi-arabia", permanent: true },
  { source: "/hr-services-in-saudi-arabia", destination: "/en/news-updates/hr-services-in-saudi-arabia", permanent: true },
  { source: "/industrial-licensing-in-saudi-arabia-what-you-need-to-know-before-applying", destination: "/en/news-updates/industrial-licensing-in-saudi-arabia-what-you-need-to-know-before-applying", permanent: true },
  { source: "/latest-updates-on-uae-temporary-visit-visas", destination: "/en/news-updates/latest-updates-on-uae-temporary-visit-visas", permanent: true },
  { source: "/new-japan-e-visa-system-is-now-available-for-saudi-arabia-and-11-other-nations", destination: "/en/news-updates/new-japan-e-visa-system-is-now-available-for-saudi-arabia-and-11-other-nations", permanent: true },
  { source: "/qatar-announced-new-residence-permit-for-skilled-individuals-and-entrepreneurs", destination: "/en/news-updates/qatar-announced-new-residence-permit-for-skilled-individuals-and-entrepreneurs", permanent: true },
  { source: "/qatar-announced-new-residence-permit-for-skilled-individuals-and-entrepreneurs-2", destination: "/en/news-updates/qatar-announced-new-residence-permit-for-skilled-individuals-and-entrepreneurs-2", permanent: true },
  { source: "/riyadh-metro-the-largest-public-transport-network-in-the-world-set-to-open-soon", destination: "/en/news-updates/riyadh-metro-the-largest-public-transport-network-in-the-world-set-to-open-soon", permanent: true },
  { source: "/riyadh-to-design-worlds-tallest-sports-tower", destination: "/en/news-updates/riyadh-to-design-worlds-tallest-sports-tower", permanent: true },
  { source: "/saudi-arabia-emerges-as-a-regional-talent-magnet-opportunities-and-attractions-for-skilled-professionals", destination: "/en/news-updates/saudi-arabia-emerges-as-a-regional-talent-magnet-opportunities-and-attractions-for-skilled-professionals", permanent: true },
  { source: "/saudi-arabia-enhances-foreign-investor-status-under-nitaqat-saudization-program", destination: "/en/news-updates/saudi-arabia-enhances-foreign-investor-status-under-nitaqat-saudization-program", permanent: true },
  { source: "/saudi-arabia-expands-100-saudization-to-administrative-roles", destination: "/en/news-updates/saudi-arabia-expands-100-saudization-to-administrative-roles", permanent: true },
  { source: "/saudi-arabia-foreign-investment-laws-2026", destination: "/en/news-updates/saudi-arabia-foreign-investment-laws-2026", permanent: true },
  { source: "/saudi-arabia-introduces-electronic-travel-authorisation-eta-for-uk-citizens-what-businesses-need-to-know", destination: "/en/news-updates/saudi-arabia-introduces-electronic-travel-authorisation-eta-for-uk-citizens-what-businesses-need-to-know", permanent: true },
  { source: "/saudi-arabia-modifies-foreign-worker-classifications-in-nitaqat-program", destination: "/en/news-updates/saudi-arabia-modifies-foreign-worker-classifications-in-nitaqat-program", permanent: true },
  { source: "/saudi-arabia-offers-investors-a-100-billion-opportunity-in-aviation", destination: "/en/news-updates/saudi-arabia-offers-investors-a-100-billion-opportunity-in-aviation", permanent: true },
  { source: "/saudi-arabia-ranks-2nd-best-country-for-expats-a-transformational-journey", destination: "/en/news-updates/saudi-arabia-ranks-2nd-best-country-for-expats-a-transformational-journey", permanent: true },
  { source: "/saudi-arabia-receives-approved-destination-status-from-china", destination: "/en/news-updates/saudi-arabia-receives-approved-destination-status-from-china", permanent: true },
  { source: "/saudi-arabias-economy-hits-eight-year-high-as-output-growth-strengthens", destination: "/en/news-updates/saudi-arabias-economy-hits-eight-year-high-as-output-growth-strengthens", permanent: true },
  { source: "/saudi-business-visa-dos-donts", destination: "/en/news-updates/saudi-business-visa-dos-donts", permanent: true },
  { source: "/saudis-reform-investment-law-in-bid-to-attract-foreigners", destination: "/en/news-updates/saudis-reform-investment-law-in-bid-to-attract-foreigners", permanent: true },
  { source: "/services-investment-licenses-in-saudi-arabia-a-guide-for-foreign-investors", destination: "/en/news-updates/services-investment-licenses-in-saudi-arabia-a-guide-for-foreign-investors", permanent: true },
  { source: "/solar-energy-projects-in-saudi-arabia", destination: "/en/news-updates/solar-energy-projects-in-saudi-arabia", permanent: true },
  { source: "/strategic-regional-headquarters-establishment-in-saudi-arabia-rhq-setup-simplified-with-northman-sterling", destination: "/en/news-updates/strategic-regional-headquarters-establishment-in-saudi-arabia-rhq-setup-simplified-with-northman-sterling", permanent: true },
  { source: "/strategic-tips-for-incorporating-your-business-in-saudi-arabia", destination: "/en/news-updates/strategic-tips-for-incorporating-your-business-in-saudi-arabia", permanent: true },
  { source: "/temporary-work-visa-vs-business-visa-saudi-arabia", destination: "/en/news-updates/temporary-work-visa-vs-business-visa-saudi-arabia", permanent: true },
  { source: "/the-first-five-strategic-hires-for-companies-expanding-into-saudi-arabia", destination: "/en/news-updates/the-first-five-strategic-hires-for-companies-expanding-into-saudi-arabia", permanent: true },
  { source: "/the-role-of-legal-advisors-in-protecting-corporate-interests", destination: "/en/news-updates/the-role-of-legal-advisors-in-protecting-corporate-interests", permanent: true },
  { source: "/the-wrong-legal-structure-can-limit-business-expansion-in-saudi-arabia", destination: "/en/news-updates/the-wrong-legal-structure-can-limit-business-expansion-in-saudi-arabia", permanent: true },
  { source: "/top-legal-considerations-for-foreign-companies-expanding-into-saudi-arabia", destination: "/en/news-updates/top-legal-considerations-for-foreign-companies-expanding-into-saudi-arabia", permanent: true },
  { source: "/uae-golden-visa-policy-change-removes-minimum-down-payment-requirement-for-property-owners", destination: "/en/news-updates/uae-golden-visa-policy-change-removes-minimum-down-payment-requirement-for-property-owners", permanent: true },
  { source: "/uae-launches-10-year-passport-for-citizens-aged-21-and-above", destination: "/en/news-updates/uae-launches-10-year-passport-for-citizens-aged-21-and-above", permanent: true },
  { source: "/visa-free-travel-to-sri-lanka-for-uae-saudi-arabia-and-33-other-countries", destination: "/en/news-updates/visa-free-travel-to-sri-lanka-for-uae-saudi-arabia-and-33-other-countries", permanent: true },
  { source: "/what-business-support-services-are-required-after-company-registration-in-saudi-arabia", destination: "/en/news-updates/what-business-support-services-are-required-after-company-registration-in-saudi-arabia", permanent: true },
  { source: "/what-happens-when-an-iqama-job-title-no-longer-reflects-an-employees-actual-role", destination: "/en/news-updates/what-happens-when-an-iqama-job-title-no-longer-reflects-an-employees-actual-role", permanent: true },
  { source: "/what-is-a-schengen-visa-a-comprehensive-guide", destination: "/en/news-updates/what-is-a-schengen-visa-a-comprehensive-guide", permanent: true },
  { source: "/what-keeps-business-operations-moving-in-saudi-arabia", destination: "/en/news-updates/what-keeps-business-operations-moving-in-saudi-arabia", permanent: true },
  { source: "/why-degree-attestation-is-critical-for-gcc-work-visas", destination: "/en/news-updates/why-degree-attestation-is-critical-for-gcc-work-visas", permanent: true },
];

const patternRedirects = [
  { source: "/category/:slug", destination: "/en/news-updates", permanent: true },
  { source: "/tag/:slug", destination: "/en/news-updates", permanent: true },
  { source: "/author/:slug", destination: "/en/news-updates", permanent: true },
  { source: "/wp-content/uploads/:path*", destination: "/images/:path*", permanent: true },
  { source: "/index.php", destination: "/en", permanent: true },
];

const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        // Sanity's asset CDN, used for News & Updates featured images and
        // inline Portable Text images.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  async redirects() {
    return [
      // Root path is handled as a locale redirect at the middleware level
      // (so it can respect Accept-Language), NOT as a blanket 301 here.
      ...staticRedirects,
      ...blogPostRedirects,
      ...patternRedirects,
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
