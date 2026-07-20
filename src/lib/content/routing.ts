import { DEFAULT_LOCALE, type PublishedLocale } from "@/lib/constants/locales";
import { SITE_URL } from "@/lib/constants/site";

export function normalizePagePath(pathname: string): `/${string}` {
  const trimmed = pathname.trim();

  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withoutEdges = trimmed.replace(/^\/+|\/+$/g, "");
  return `/${withoutEdges}/`;
}

export function slugSegmentsToPath(slug?: string[]): `/${string}` {
  if (!slug || slug.length === 0) {
    return "/";
  }

  return normalizePagePath(slug.join("/"));
}

export function pathToSlugSegments(pathname: string): string[] {
  const normalized = normalizePagePath(pathname);

  if (normalized === "/") {
    return [];
  }

  return normalized.replace(/^\/|\/$/g, "").split("/");
}

export function localizedPagePath(
  locale: PublishedLocale | string,
  pathname: string,
): `/${string}` {
  const normalized = normalizePagePath(pathname);

  if (normalized === "/") {
    return `/${locale}/`;
  }

  return `/${locale}${normalized}`;
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function defaultLocaleHomePath(): `/${string}` {
  return localizedPagePath(DEFAULT_LOCALE, "/");
}
