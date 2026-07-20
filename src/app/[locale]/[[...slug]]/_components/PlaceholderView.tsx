type PlaceholderViewProps = {
  message: string;
};

export function PlaceholderView({ message }: PlaceholderViewProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center bg-black px-6 py-16 text-zinc-100 sm:px-10">
      <section>
        <p className="text-sm font-semibold uppercase text-amber-400">
          RedSun Rulebook
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-50">{message}</h1>
      </section>
    </main>
  );
}
