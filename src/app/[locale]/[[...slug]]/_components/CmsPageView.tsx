import type { PageContent } from "@/lib/content/pageContentSchema";
import type { PublishedLocale } from "@/lib/constants/locales";
import { HomePageView } from "./HomePageView";
import { PageSections } from "./PageSections";
import { PlaceholderView } from "./PlaceholderView";

type CmsPageViewProps = {
  locale: PublishedLocale;
  page: PageContent;
};

export function CmsPageView({ locale, page }: CmsPageViewProps) {
  if (page.slug === "home") {
    return <HomePageView locale={locale} page={page} />;
  }

  if (page.sections.length > 0) {
    return (
      <main className="mx-auto w-full max-w-5xl bg-black px-6 py-12 text-zinc-100 sm:px-10">
        <header className="max-w-3xl border-b border-zinc-800 pb-8">
          {page.navigation.label !== page.seo.title ? (
            <p className="text-sm font-semibold uppercase text-amber-400">
              {page.navigation.label}
            </p>
          ) : null}
          <h1
            className={`${
              page.navigation.label !== page.seo.title ? "mt-3 " : ""
            }text-4xl font-semibold text-zinc-50`}
          >
            {page.seo.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            {page.seo.description}
          </p>
        </header>
        <PageSections locale={locale} sections={page.sections} />
      </main>
    );
  }

  return <PlaceholderView message={page.placeholder.message} />;
}
