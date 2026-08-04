import { SITE_URL, ORGANIZATION } from "@/lib/seo/constants";
import type { NewsPost } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n/config";

export function buildArticleSchema(post: NewsPost, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/${lang}/news-updates/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    ...(post.featuredImage ? { image: [post.featuredImage.url] } : {}),
    ...(post.authorName
      ? { author: { "@type": "Person", name: post.authorName } }
      : { author: { "@type": "Organization", name: ORGANIZATION.legalName } }),
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.legalName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/news-updates/${post.slug}`,
    },
  };
}
