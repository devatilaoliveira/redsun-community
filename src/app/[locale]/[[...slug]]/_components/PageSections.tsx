import Link from "next/link";

import { localizedPagePath } from "@/lib/content/routing";
import type { PageSection } from "@/lib/content/schemas/blocks/page-section";
import type { PublishedLocale } from "@/lib/constants/locales";

type PageSectionsProps = {
  locale: PublishedLocale;
  sections: PageSection[];
};

export function PageSections({ locale, sections }: PageSectionsProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-10">
      {sections.map((section) => (
        <section className="max-w-4xl pt-8" key={section.title}>
          {section.kicker ? (
            <p className="text-sm font-semibold uppercase text-amber-400">
              {section.kicker}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold text-zinc-50">
            {section.title}
          </h2>
          {section.intro ? (
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              {section.intro}
            </p>
          ) : null}
          {section.body.length > 0 ? (
            <div className="rs-reading-flow mt-6 space-y-4 text-zinc-200">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {section.subsections.length > 0 ? (
            <div className="mt-8 grid gap-8">
              {section.subsections.map((subsection) => (
                <section
                  className="border-l-2 border-zinc-800 pl-5"
                  key={subsection.title}
                >
                  <h3 className="text-xl font-semibold text-zinc-50">
                    {subsection.title}
                  </h3>
                  {subsection.body.length > 0 ? (
                    <div className="rs-reading-flow mt-3 space-y-3 text-zinc-300">
                      {subsection.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {subsection.bullets.length > 0 ? (
                    <ul className="rs-reading-flow mt-3 list-disc space-y-2 pl-6 text-zinc-300 marker:text-zinc-500">
                      {subsection.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          ) : null}
          {section.items.length > 0 ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => {
                const content = (
                  <>
                    <h3 className="text-lg font-semibold text-zinc-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.text}
                    </p>
                  </>
                );

                return (
                  <li key={item.title}>
                    {item.href ? (
                      <Link
                        className="block h-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600 hover:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        href={localizedPagePath(locale, item.href)}
                      >
                        {content}
                      </Link>
                    ) : (
                      <article className="h-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-5">
                        {content}
                      </article>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
