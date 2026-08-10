// Service ids that have a real detail page under /services/[slug]. Ids not
// in this list still appear on the Services grid and Home's Core Services,
// but their "Learn More" links fall back to Contact Us until their detail
// content is written.
export const SERVICE_DETAIL_SLUGS = new Set<string>([
  "company-incorporation",
  "dispute-resolution",
  "real-estate-construction",
  "employment-law",
  "intellectual-property",
  "technology-media-telecom",
  "regulatory-compliance",
  "tax",
  "restructuring-insolvency",
  "white-collar-crime",
  "competition-antitrust",
  "family-business",
  "corporate-commercial-ma",
  "banking-finance",
  "capital-markets",
]);
