type PlaceholderViewProps = {
  message: string;
};

export function PlaceholderView({ message }: PlaceholderViewProps) {
  return (
    <section className="flex flex-1 items-center py-16">
      <section>
        <p className="text-sm font-semibold uppercase text-amber-400">
          RedSun Rulebook
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-50">{message}</h1>
      </section>
    </section>
  );
}
