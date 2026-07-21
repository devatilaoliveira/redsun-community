import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_LOCALE,
  OPEN_GRAPH_LOCALES,
  PUBLISHED_LOCALES,
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  isPublishedLocale,
} from "@/lib/constants";
import {
  getAllPages,
  getPageBySlugSegments,
  getPagesByStableSlug,
} from "@/lib/content/pages";
import {
  absoluteUrl,
  localizedPagePath,
  pathToSlugSegments,
} from "@/lib/content/routing";
import { getPageJsonLd } from "@/lib/content/structuredData";
import { CmsPageView } from "./_components/CmsPageView";

type CmsPageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const localizedParams = await Promise.all(
    PUBLISHED_LOCALES.map(async (locale) => {
      const pages = await getAllPages(locale);

    return pages.map((page) => {
      const slug = pathToSlugSegments(page.path);

      return {
        locale,
        slug: slug.length === 0 ? undefined : slug,
      };
    });
    }),
  );

  return localizedParams.flat();
}

async function getLanguageAlternates(pageSlug: string) {
  const relatedPages = await getPagesByStableSlug(pageSlug);
  const languages: Record<string, string> = {};

  for (const { locale, page } of relatedPages) {
    languages[locale] = localizedPagePath(locale, page.path);
  }

  const defaultPage = relatedPages.find(
    ({ locale }) => locale === DEFAULT_LOCALE,
  )?.page;

  if (defaultPage) {
    languages["x-default"] = localizedPagePath(DEFAULT_LOCALE, defaultPage.path);
  }

  return languages;
}

export async function generateMetadata({
  params,
}: CmsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isPublishedLocale(locale)) {
    return {};
  }

  const page = await getPageBySlugSegments(slug, locale);

  if (!page) {
    return {};
  }

  const canonicalPath = localizedPagePath(locale, page.path);

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: canonicalPath,
      languages: await getLanguageAlternates(page.slug),
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale],
      type: "website",
      images: [SITE_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary",
      title: page.seo.title,
      description: page.seo.description,
      images: [SITE_SOCIAL_IMAGE],
    },
  };
}

export default async function CmsPage({ params }: CmsPageProps) {
  const { locale, slug } = await params;

  if (!isPublishedLocale(locale)) {
    notFound();
  }

  const page = await getPageBySlugSegments(slug, locale);

  if (!page) {
    notFound();
  }

  const pages = await getAllPages(locale);

  return (
    <>
      <JsonLd data={getPageJsonLd(page, locale, pages)} />
      <CmsPageView locale={locale} page={page} />
    </>
  );
}
