import type { Metadata } from "next";
import Link from "next/link";

import { contentService } from "@/lib/content/content-service.server";

export const metadata: Metadata = {
  title: "Rules",
  description: "Browse RedSun rules loaded through the content service.",
};

export default async function RulesPage() {
  const rules = await contentService.getAll("rules");

  return (
    <main className="mx-auto w-full max-w-4xl bg-black px-6 py-12 text-zinc-100 sm:px-10">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
          Rulebook
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
          Rules
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Local YAML entries rendered through the repository-backed content
          service.
        </p>
      </header>

      <ul className="mt-10 grid gap-4">
        {rules.map((rule) => (
          <li key={rule.id}>
            <Link
              className="block rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-red-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              href={`/rules/${rule.slug}`}
            >
              <h2 className="text-xl font-semibold text-zinc-50">
                {rule.title}
              </h2>
              {rule.summary ? (
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {rule.summary}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
