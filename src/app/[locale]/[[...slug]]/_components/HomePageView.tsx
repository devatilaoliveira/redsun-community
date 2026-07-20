import Link from "next/link";

import type { PageContent } from "@/lib/content/pageContentSchema";
import { localizedPagePath } from "@/lib/content/routing";
import type { PublishedLocale } from "@/lib/constants/locales";
import { PageSections } from "./PageSections";

type HomePageViewProps = {
  locale: PublishedLocale;
  page: PageContent;
};

export function HomePageView({ locale, page }: HomePageViewProps) {
  const banner = page.homeBanner;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 bg-black px-6 py-16 text-zinc-100 sm:px-10 lg:px-12">
      {banner ? (
        <section className="max-w-3xl">
          {banner.kicker ? (
            <p className="mb-4 text-sm font-semibold uppercase text-amber-400">
              {banner.kicker}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold text-zinc-50 sm:text-5xl">
            {banner.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {banner.intro}
          </p>
          {banner.primaryLink ? (
            <Link
              className="mt-8 inline-flex min-h-11 items-center rounded-md bg-red-800 px-5 py-2 font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              href={localizedPagePath(locale, banner.primaryLink.href)}
            >
              {banner.primaryLink.label}
            </Link>
          ) : null}
        </section>
      ) : null}

      {page.featureCards.length > 0 ? (
        <section aria-labelledby="feature-heading">
          <h2 id="feature-heading" className="text-xl font-semibold text-zinc-50">
            {page.placeholder.message}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {page.featureCards.map((card) => {
              const content = (
                <>
                  <span className="block font-medium text-zinc-50">
                    {card.title}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-zinc-400">
                    {card.text}
                  </span>
                </>
              );

              if (!card.href) {
                return (
                  <article
                    className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5"
                    key={card.title}
                  >
                    {content}
                  </article>
                );
              }

              return (
                <Link
                  className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-red-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  href={localizedPagePath(locale, card.href)}
                  key={card.title}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <PageSections sections={page.sections} />
    </main>
  );
}
