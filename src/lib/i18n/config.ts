export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const localeLabel: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

// BCP 47 tags used for hreflang / html lang attribute.
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  ar: "ar",
};

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
