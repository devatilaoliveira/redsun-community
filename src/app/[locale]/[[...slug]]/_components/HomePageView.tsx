import Link from "next/link";
import Image from "next/image";

import { RsBoxClickable } from "@/components/ui/fragments/RsBoxClickable";
import type { PageContent } from "@/lib/content/pageContentSchema";
import { localizedPagePath } from "@/lib/content/routing";
import type { PublishedLocale } from "@/lib/constants/locales";

type HomePageViewProps = {
  locale: PublishedLocale;
  page: PageContent;
};

export function HomePageView({ locale, page }: HomePageViewProps) {
  const banner = page.homeBanner;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 bg-black px-6 py-16 text-zinc-100 sm:px-10 lg:px-12">
      {banner ? (
        <section className="w-full">
          {banner.kicker ? (
            <p className="mb-4 text-sm font-semibold uppercase text-amber-400">
              {banner.kicker}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold text-zinc-50 sm:text-5xl">
            {banner.title}
          </h1>
          <p className="mt-6 w-full text-lg leading-8 text-zinc-300">
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
          {banner.actions.length > 0 ? (
            <div className="mt-10 flex w-full flex-wrap justify-around gap-6">
              {banner.actions.map((action) => {
                const external = action.href.startsWith("http");

                return (
                  <RsBoxClickable
                    as="a"
                    className="group relative aspect-[2/3] w-full max-w-80 justify-self-center bg-surface text-foreground no-underline shadow-lg shadow-black/30"
                    disabled={action.disabled}
                    download={action.download || undefined}
                    href={action.href}
                    key={action.label}
                    rel={external ? "noopener noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    {action.image ? (
                      <Image
                        alt=""
                        className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.025] group-aria-disabled:scale-100"
                        fill
                        sizes="(max-width: 639px) 320px, 304px"
                        src={action.image}
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"
                    />
                    <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <span className="text-lg font-semibold text-white drop-shadow-sm">
                        {action.label}
                      </span>
                    </span>
                  </RsBoxClickable>
                );
              })}
            </div>
          ) : null}
        </section>
      ) : null}

    </main>
  );
}
