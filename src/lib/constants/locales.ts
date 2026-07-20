export const SUPPORTED_LOCALES = ["en", "pt", "de"] as const;
export const PUBLISHED_LOCALES = ["en", "pt", "de"] as const;
export const DEFAULT_LOCALE = "pt";

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type PublishedLocale = (typeof PUBLISHED_LOCALES)[number];

export const LOCALE_LABELS: Record<PublishedLocale, string> = {
  en: "English",
  pt: "Português",
  de: "Deutsch",
};

export const OPEN_GRAPH_LOCALES: Record<PublishedLocale, string> = {
  en: "en_US",
  pt: "pt_BR",
  de: "de_DE",
};

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function isPublishedLocale(locale: string): locale is PublishedLocale {
  return PUBLISHED_LOCALES.includes(locale as PublishedLocale);
}
