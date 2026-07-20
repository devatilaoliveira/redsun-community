import type { PageSection } from "@/lib/content/schemas/blocks/page-section";

type PageSectionsProps = {
  sections: PageSection[];
};

export function PageSections({ sections }: PageSectionsProps) {
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
            <div className="rs-reading-flow mt-6 text-zinc-200">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {section.items.length > 0 ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => (
                <li
                  className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5"
                  key={item.title}
                >
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
