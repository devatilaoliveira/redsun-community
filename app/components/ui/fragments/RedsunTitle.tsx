import type { CSSProperties, HTMLAttributes } from "react";

export type RedsunTitleProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "children"
> & {
  fontSize?: CSSProperties["fontSize"] | null;
};

type RedsunTitleStyle = CSSProperties & {
  "--rs-title-font-size"?: CSSProperties["fontSize"];
};

const letters = ["R", "E", "D", "S", "U", "N"] as const;

const containerClasses = "flex w-full justify-center";

const titleClasses =
  "flex justify-between font-serif text-[var(--rs-title-font-size,clamp(2.4rem,4vw,6rem))] font-bold uppercase text-amber-500 max-sm:w-full";

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function RedsunTitle({
  className,
  fontSize = null,
  style,
  ...props
}: RedsunTitleProps) {
  const titleStyle: RedsunTitleStyle = {
    ...style,
    ...(fontSize == null ? {} : { "--rs-title-font-size": fontSize }),
  };

  return (
    <div {...props} className={joinClasses(containerClasses, className)}>
      <div
        aria-label="Red Sun"
        className={titleClasses}
        role="img"
        style={titleStyle}
      >
        {letters.map((letter) => (
          <span aria-hidden="true" key={letter}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
