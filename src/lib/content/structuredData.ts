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
import type { PageContent } from "./pageContentSchema";
import {
  absoluteUrl,
  localizedPagePath,
  pathToSlugSegments,
} from "./routing";

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

function getBreadcrumbCandidatePaths(pathname: string): string[] {
  const segments = pathToSlugSegments(pathname);

  return [
    "/",
    ...segments.map((_, index) => {
      return `/${segments.slice(0, index + 1).join("/")}/`;
    }),
  ];
}

function breadcrumbData(
  page: PageContent,
  locale: PublishedLocale,
  pages: PageContent[],
) {
  const pagesByPath = new Map(
    pages.map((candidate) => [candidate.path, candidate]),
  );
  const breadcrumbPages = getBreadcrumbCandidatePaths(page.path).flatMap(
    (pathname) => {
      const matchedPage =
        pathname === page.path ? page : pagesByPath.get(pathname);

      return matchedPage ? [matchedPage] : [];
    },
  );

  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbPages.map((breadcrumbPage, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumbPage.navigation.label || breadcrumbPage.seo.title,
      item: absoluteUrl(localizedPagePath(locale, breadcrumbPage.path)),
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
  pages: PageContent[],
) {
  const isHome = page.path === "/";
  const graph = [
    ...(isHome && locale === DEFAULT_LOCALE ? homeData() : []),
    webPageData(page, locale),
    ...(!isHome ? [breadcrumbData(page, locale, pages)] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
