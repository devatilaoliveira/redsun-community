import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import "server-only";
import { load } from "js-yaml";

import {
  isPublishedLocale,
  PUBLISHED_LOCALES,
  type PublishedLocale,
} from "@/lib/constants/locales";
import { normalizePagePath, slugSegmentsToPath } from "./routing";
import { PageContentSchema, type PageContent } from "./pageContentSchema";
import type { NavigationGroup } from "./schemas/navigation";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

async function readYamlFile(filePath: string): Promise<unknown> {
  const raw = await fs.readFile(filePath, "utf8");
  return load(raw);
}

function assertPageIntegrity(
  page: PageContent,
  fileSlug: string,
  locale: PublishedLocale,
) {
  if (page.slug !== fileSlug) {
    throw new Error(
      `Page slug mismatch in ${locale}/${fileSlug}.yaml: expected "${fileSlug}", found "${page.slug}".`,
    );
  }
}

function assertLocaleIntegrity(pages: PageContent[], locale: PublishedLocale) {
  const slugs = new Set<string>();
  const paths = new Set<string>();
  let hasHome = false;

  for (const page of pages) {
    if (slugs.has(page.slug)) {
      throw new Error(`Duplicate page slug "${page.slug}" in locale "${locale}".`);
    }

    if (paths.has(page.path)) {
      throw new Error(`Duplicate page path "${page.path}" in locale "${locale}".`);
    }

    slugs.add(page.slug);
    paths.add(page.path);

    if (page.path === "/" && page.slug === "home") {
      hasHome = true;
    }
  }

  if (!hasHome) {
    throw new Error(`Locale "${locale}" must include home.yaml with path "/".`);
  }
}

export const getAllPages = cache(
  async (locale: PublishedLocale | string): Promise<PageContent[]> => {
    if (!isPublishedLocale(locale)) {
      return [];
    }

    const pagesDir = path.join(CONTENT_DIR, locale, "pages");
    const files = (await fs.readdir(pagesDir))
      .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
      .sort();

    const pages = await Promise.all(
      files.map(async (file) => {
        const fileSlug = file.replace(/\.(ya?ml)$/i, "");
        const parsed = PageContentSchema.parse(
          await readYamlFile(path.join(pagesDir, file)),
        );

        assertPageIntegrity(parsed, fileSlug, locale);
        return parsed;
      }),
    );

    assertLocaleIntegrity(pages, locale);
    return pages.sort((a, b) => a.path.localeCompare(b.path));
  },
);

export const getAllPublishedPages = cache(async () => {
  const pagesByLocale = await Promise.all(
    PUBLISHED_LOCALES.map(async (locale) => ({
      locale,
      pages: await getAllPages(locale),
    })),
  );

  return pagesByLocale;
});

export const getNavigationPages = cache(
  async (group: NavigationGroup, locale: PublishedLocale | string) => {
    const pages = await getAllPages(locale);

    return pages
      .filter((page) => page.navigation.group === group)
      .sort(
        (a, b) =>
          a.navigation.order - b.navigation.order ||
          a.path.localeCompare(b.path),
      );
  },
);

export const getPageByPath = cache(
  async (pathname: string, locale: PublishedLocale | string) => {
    const pages = await getAllPages(locale);
    const normalizedPath = normalizePagePath(pathname);

    return pages.find((page) => page.path === normalizedPath) ?? null;
  },
);

export const getPageBySlugSegments = cache(
  async (slug: string[] | undefined, locale: PublishedLocale | string) => {
    return getPageByPath(slugSegmentsToPath(slug), locale);
  },
);

export const getPagesByStableSlug = cache(async (slug: string) => {
  const pagesByLocale = await getAllPublishedPages();

  return pagesByLocale
    .map(({ locale, pages }) => ({
      locale,
      page: pages.find((page) => page.slug === slug) ?? null,
    }))
    .filter(
      (entry): entry is { locale: PublishedLocale; page: PageContent } =>
        entry.page !== null,
    );
});
