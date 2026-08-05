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
