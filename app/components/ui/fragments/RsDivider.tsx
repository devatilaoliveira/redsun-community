import type { HTMLAttributes } from "react";

export type RsDividerType = "gradient" | "solid";
export type RsDividerTheme = "dark" | "light";

export type RsDividerProps = Omit<
  HTMLAttributes<HTMLHRElement>,
  "aria-hidden" | "aria-label" | "children" | "role"
> & {
  decorative?: boolean;
  label?: string;
  testId?: string;
  theme?: RsDividerTheme;
  type?: RsDividerType | null;
};

const baseClasses = "m-0 block h-px w-full flex-none border-0";

const typeClasses: Record<RsDividerType | "default", string> = {
  default: "bg-zinc-700",
  gradient: "",
  solid: "bg-red-800",
};

const gradientClasses: Record<RsDividerTheme, string> = {
  dark: "bg-[linear-gradient(90deg,var(--color-red-800),rgba(58,56,63,0.72)_58%,rgba(58,56,63,0.18))]",
  light:
    "bg-[linear-gradient(90deg,var(--color-red-800),rgba(212,212,216,0.72)_58%,rgba(212,212,216,0.18))]",
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function RsDivider({
  className,
  decorative = false,
  label,
  testId,
  theme = "dark",
  type = null,
  ...props
}: RsDividerProps) {
  const normalizedLabel = label?.trim();

  return (
    <hr
      {...props}
      aria-hidden={decorative || undefined}
      aria-label={!decorative ? normalizedLabel || undefined : undefined}
      className={joinClasses(
        baseClasses,
        typeClasses[type ?? "default"],
        type === "gradient" && gradientClasses[theme],
        className,
      )}
      data-theme={theme}
      data-testid={testId}
      data-type={type ?? undefined}
    />
  );
}
