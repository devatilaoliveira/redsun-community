import Link from "next/link";

import { defaultLocaleHomePath } from "@/lib/content/routing";
import { DEFAULT_LOCALE, SITE_NAME } from "@/lib/constants";

export default function DefaultPage() {
  const href = defaultLocaleHomePath();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-black px-6 py-16 text-zinc-100">
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(href)});`,
        }}
      />
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase text-amber-400">
          {SITE_NAME}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-50">
          Continue to the {DEFAULT_LOCALE} rulebook.
        </h1>
        <p className="mt-5 text-zinc-300">
          <Link
            className="font-semibold text-red-300 underline-offset-4 hover:text-red-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            href={href}
          >
            Open RedSun Rulebook
          </Link>
        </p>
      </div>
    </main>
  );
}
