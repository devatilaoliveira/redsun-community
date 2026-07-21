import {
  DEFAULT_LOCALE,
  type PublishedLocale,
} from "@/lib/constants/locales";
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_NAME,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants/site";
import type { BreadcrumbItem } from "./breadcrumbs";
import type { PageContent } from "./pageContentSchema";
import { absoluteUrl, localizedPagePath } from "./routing";

const structuredDataLanguages = {
  en: "en",
  pt: "pt-BR",
  de: "de",
} satisfies Record<PublishedLocale, string>;

function webPageData(page: PageContent, locale: PublishedLocale) {
  const pageUrl = absoluteUrl(localizedPagePath(locale, page.path));

  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: structuredDataLanguages[locale],
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
  };
}

function breadcrumbData(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: absoluteUrl(breadcrumb.href),
    })),
  };
}

function homeData() {
  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl(SITE_LOGO),
      contactPoint: {
        "@type": "ContactPoint",
        name: SITE_CONTACT_NAME,
        email: SITE_CONTACT_EMAIL,
        contactType: "owner",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: Object.values(structuredDataLanguages),
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
    },
  ];
}

export function getPageJsonLd(
  page: PageContent,
  locale: PublishedLocale,
  breadcrumbs: BreadcrumbItem[],
) {
  const isHome = page.path === "/";
  const graph = [
    ...(isHome && locale === DEFAULT_LOCALE ? homeData() : []),
    webPageData(page, locale),
    ...(!isHome ? [breadcrumbData(breadcrumbs)] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
