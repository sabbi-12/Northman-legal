// Service ids that have a real detail page under /services/[slug]. Ids not
// in this list still appear on the Services grid and Home's Core Services,
// but their "Learn More" links fall back to Contact Us until their detail
// content is written.
export const SERVICE_DETAIL_SLUGS = new Set<string>(["corporate-immigration", "company-incorporation"]);
