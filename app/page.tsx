import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 bg-black px-6 py-16 text-zinc-100 sm:px-10 lg:px-12">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-400">
          RedSun Rulebook
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          A server-rendered reference for the RedSun tabletop RPG.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Browse rules, lore, callings, powers, races, monsters, equipment, and
          glossary content from local validated files while the MVP content
          model settles.
        </p>
      </section>

      <section aria-labelledby="start-heading">
        <h2 id="start-heading" className="text-xl font-semibold text-zinc-50">
          First Content Slice
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-red-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            href="/rules"
          >
            <span className="block font-medium text-zinc-50">Rules index</span>
            <span className="mt-2 block text-sm leading-6 text-zinc-400">
              List local rule entries through the content service.
            </span>
          </Link>
          <Link
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-red-800 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            href="/rules/aggravated-damage"
          >
            <span className="block font-medium text-zinc-50">
              Aggravated Damage
            </span>
            <span className="mt-2 block text-sm leading-6 text-zinc-400">
              Render one YAML-backed rule detail page on the server.
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
