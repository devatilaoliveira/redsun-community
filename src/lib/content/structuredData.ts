import {
  DEFAULT_LOCALE,
  PUBLISHED_LOCALES,
  type PublishedLocale,
} from "@/lib/constants/locales";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants/site";
import type { PageContent } from "./pageContentSchema";
import { absoluteUrl, localizedPagePath } from "./routing";

function webPageData(page: PageContent, locale: PublishedLocale) {
  const pageUrl = absoluteUrl(localizedPagePath(locale, page.path));

  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
  };
}

function breadcrumbData(page: PageContent, locale: PublishedLocale) {
  const homeUrl = absoluteUrl(localizedPagePath(locale, "/"));
  const pageUrl = absoluteUrl(localizedPagePath(locale, page.path));

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: homeUrl,
    },
  ];

  if (page.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.navigation.label,
      item: pageUrl,
    });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function homeData() {
  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: PUBLISHED_LOCALES,
    },
  ];
}

export function getPageJsonLd(page: PageContent, locale: PublishedLocale) {
  const graph = [webPageData(page, locale), breadcrumbData(page, locale)];

  if (page.slug === "home" && locale === DEFAULT_LOCALE) {
    graph.unshift(...homeData());
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
