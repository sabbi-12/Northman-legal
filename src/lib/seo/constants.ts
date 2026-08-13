export const SITE_URL = "https://northmansterling.legal";
export const SITE_NAME = "Northman Sterling Legal";

export const ORGANIZATION = {
  legalName: "Northman Sterling Legal",
  addressLocality: "Riyadh",
  addressCountry: "SA",
  streetAddress: "Level 18, Al Faisaliah Tower, King Fahad Road, Olaya District",
  telephone: "+966570011966",
  telephoneDisplay: "00966 57 0011 966",
  landline: "+966112978293",
  landlineDisplay: "00966 112 978 293",
  email: "ksa@northmansterling.legal",
  // General/global enquiries inbox — distinct from the KSA-specific address
  // above. Shown on the Contact Us page's "Let's Connect" section.
  generalEmail: "ksa@northmansterling.legal",
  // Social profile URLs — sourced from the live WordPress site's footer
  // (2026-08-07).
  facebookUrl: "https://www.facebook.com/northmansterling",
  twitterUrl: "https://twitter.com/northmansterlin",
  linkedinUrl: "https://www.linkedin.com/company/northman-sterling/",
  get sameAs(): string[] {
    return [this.facebookUrl, this.twitterUrl, this.linkedinUrl].filter(Boolean);
  },
};

export const TWITTER_HANDLE = "@northmansterling";
