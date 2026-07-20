import type { MetadataRoute } from "next";

import { DEFAULT_LOCALE, type PublishedLocale } from "@/lib/constants/locales";
import { getAllPublishedPages, getPagesByStableSlug } from "@/lib/content/pages";
import { absoluteUrl, localizedPagePath } from "@/lib/content/routing";

export const dynamic = "force-static";

async function languageAlternates(slug: string) {
  const localizedPages = await getPagesByStableSlug(slug);
  const languages: Record<string, string> = {};

  for (const { locale, page } of localizedPages) {
    languages[locale] = absoluteUrl(localizedPagePath(locale, page.path));
  }

  const defaultPage = localizedPages.find(
    ({ locale }) => locale === DEFAULT_LOCALE,
  )?.page;

  if (defaultPage) {
    languages["x-default"] = absoluteUrl(
      localizedPagePath(DEFAULT_LOCALE, defaultPage.path),
    );
  }

  return languages;
}

function changeFrequencyForPath(
  path: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  return path === "/" ? "weekly" : "monthly";
}

function priorityForPath(path: string) {
  return path === "/" ? 1 : 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesByLocale = await getAllPublishedPages();
  const entries: MetadataRoute.Sitemap = [];

  for (const { locale, pages } of pagesByLocale) {
    for (const page of pages) {
      const url = localizedPagePath(locale as PublishedLocale, page.path);

      entries.push({
        url: absoluteUrl(url),
        lastModified: page.lastModified,
        changeFrequency: changeFrequencyForPath(page.path),
        priority: priorityForPath(page.path),
        alternates: {
          languages: await languageAlternates(page.slug),
        },
      });
    }
  }

  return entries;
}
