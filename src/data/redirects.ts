/**
 * Legacy WordPress → New Next.js 301 redirect map.
 *
 * IMPORTANT: This file currently maps the pages explicitly named in the
 * project brief (Home, About, Regions, News & Updates, Contact) plus the
 * common WordPress URL conventions (trailing-slash pages, /category/,
 * /tag/, /author/, /?p=123 legacy permalinks, and default WP asset paths).
 *
 * Before going live, replace/extend this list with the FULL crawl of
 * https://northmansterling.legal/ (export via the WP sitemap.xml or a
 * Screaming Frog crawl) so every indexed URL — including individual blog
 * posts under whatever slug structure WordPress used — gets an explicit
 * one-to-one 301. Do not rely on wildcard-only rules for anything that
 * currently ranks; give ranking pages their own explicit entry.
 */

export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
  locale?: false;
};

// Static, hand-mapped high-value pages (exact matches take priority).
export const staticRedirects: RedirectRule[] = [
  { source: "/", destination: "/en", permanent: true, locale: false },
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

// Pattern-based fallbacks for WordPress URL conventions not covered above.
// These run AFTER staticRedirects in next.config.js, so explicit matches win.
export const patternRedirects: RedirectRule[] = [
  {
    source: "/category/:slug",
    destination: "/en/news-updates?category=:slug",
    permanent: true,
  },
  {
    source: "/tag/:slug",
    destination: "/en/news-updates?tag=:slug",
    permanent: true,
  },
  {
    source: "/author/:slug",
    destination: "/en/news-updates",
    permanent: true,
  },
  {
    source: "/wp-content/uploads/:path*",
    destination: "/images/:path*",
    permanent: true,
  },
  {
    // Legacy `/?p=123` style permalinks. Requires an explicit ID→slug map
    // once the real post IDs are known — placeholder pattern shown here.
    source: "/index.php",
    destination: "/en",
    permanent: true,
  },
];

export const allRedirects: RedirectRule[] = [...staticRedirects, ...patternRedirects];
