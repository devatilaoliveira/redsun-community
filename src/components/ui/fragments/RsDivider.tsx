import type { ComponentPropsWithoutRef } from "react";

export type RsDividerType = "gradient" | "solid";
export type RsDividerTheme = "dark" | "light";

export type RsDividerProps = Omit<
  ComponentPropsWithoutRef<"hr">,
  "children"
> & {
  theme?: RsDividerTheme;
  type?: RsDividerType | null;
};

const typeClasses: Record<RsDividerType, Record<RsDividerTheme, string>> = {
  gradient: {
    dark: "bg-[linear-gradient(90deg,var(--color-primary),rgba(58,56,63,0.72)_58%,rgba(58,56,63,0.18))]",
    light:
      "bg-[linear-gradient(90deg,var(--color-primary),rgba(208,213,221,0.72)_58%,rgba(208,213,221,0.18))]",
  },
  solid: {
    dark: "bg-primary",
    light: "bg-primary",
  },
};

export function RsDivider({
  className,
  theme = "dark",
  type = null,
  ...dividerProps
}: RsDividerProps) {
  const backgroundClass = type ? typeClasses[type][theme] : "bg-border";

  return (
    <hr
      {...dividerProps}
      className={`m-0 h-px w-full border-0 ${backgroundClass} ${className ?? ""}`}
      data-theme={theme}
      data-type={type ?? undefined}
    />
  );
}
