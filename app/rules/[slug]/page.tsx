import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { contentService } from "@/lib/content/content-service.server";

type RulePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const rules = await contentService.getAll("rules");

  return rules.map((rule) => ({
    slug: rule.slug,
  }));
}

export async function generateMetadata({
  params,
}: RulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const rule = await contentService.getBySlug("rules", slug);

  if (!rule) {
    return {
      title: "Rule Not Found",
    };
  }

  return {
    title: rule.title,
    description: rule.summary,
  };
}

export default async function RulePage({ params }: RulePageProps) {
  const { slug } = await params;
  const rule = await contentService.getBySlug("rules", slug);

  if (!rule) {
    notFound();
  }

  const related = await contentService.getRelated(rule.related);
  const paragraphs = rule.content
    ? rule.content.split(/\n{2,}/).map((paragraph) => paragraph.trim())
    : [];

  return (
    <main className="mx-auto w-full max-w-3xl bg-black px-6 py-12 text-zinc-100 sm:px-10">
      <article>
        <Link
          className="text-sm font-medium text-red-400 hover:text-red-300"
          href="/rules"
        >
          Back to rules
        </Link>

        <header className="mt-8 border-b border-zinc-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            {rule.category}
            {rule.subcategory ? ` / ${rule.subcategory}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
            {rule.title}
          </h1>
          {rule.summary ? (
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              {rule.summary}
            </p>
          ) : null}
          {rule.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
              {rule.tags.map((tag) => (
                <li
                  className="rounded-full bg-red-950 px-3 py-1 text-sm font-medium text-red-200 ring-1 ring-inset ring-red-900"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="mt-8 space-y-5 text-base leading-8 text-zinc-200">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-12 border-t border-zinc-800 pt-8">
          <h2 className="text-2xl font-semibold text-zinc-50">Related</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  className="font-medium text-red-400 hover:text-red-300"
                  href={`/${item.category}/${item.slug}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
