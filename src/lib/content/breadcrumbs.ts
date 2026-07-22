import type { PublishedLocale } from "@/lib/constants/locales";
import type { PageContent } from "./pageContentSchema";
import { localizedPagePath, pathToSlugSegments } from "./routing";

export type BreadcrumbItem = {
  href: `/${string}`;
  name: string;
};

function getBreadcrumbCandidatePaths(pathname: string): string[] {
  const segments = pathToSlugSegments(pathname);

  return [
    "/",
    ...segments.map((_, index) => {
      return `/${segments.slice(0, index + 1).join("/")}/`;
    }),
  ];
}

export function getPageBreadcrumbs(
  page: PageContent,
  locale: PublishedLocale,
  pages: PageContent[],
): BreadcrumbItem[] {
  const pagesByPath = new Map(
    pages.map((candidate) => [candidate.path, candidate]),
  );

  return getBreadcrumbCandidatePaths(page.path).flatMap((pathname) => {
    const matchedPage =
      pathname === page.path ? page : pagesByPath.get(pathname);

    if (!matchedPage) {
      return [];
    }

    return [
      {
        href: localizedPagePath(locale, matchedPage.path),
        name: matchedPage.navigation.label || matchedPage.seo.title,
      },
    ];
  });
}
