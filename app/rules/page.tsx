import type { Metadata } from "next";
import Link from "next/link";

import { contentService } from "@/lib/content/content-service.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rules",
  description: "Browse RedSun rules loaded through the content service.",
};

export default async function RulesPage() {
  const rules = await contentService.getAll("rules");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Rulebook
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
          Rules
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-700">
          Local YAML entries rendered through the repository-backed content
          service.
        </p>
      </header>

      <ul className="mt-10 grid gap-4">
        {rules.map((rule) => (
          <li key={rule.id}>
            <Link
              className="block rounded-lg border border-zinc-200 bg-white p-5 transition hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700"
              href={`/rules/${rule.slug}`}
            >
              <h2 className="text-xl font-semibold text-zinc-950">
                {rule.title}
              </h2>
              {rule.summary ? (
                <p className="mt-2 text-sm leading-6 text-zinc-600">
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
