"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
} from "react";

export type RsBoxClickableProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "role" | "tabIndex"
> & {
  minHeight?: CSSProperties["minHeight"] | null;
};

export function RsBoxClickable({
  children,
  className,
  minHeight = null,
  onKeyDown,
  style,
  ...boxProps
}: RsBoxClickableProps) {
  const boxStyle = minHeight == null ? style : { ...style, minHeight };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (event.defaultPrevented) return;

    if (event.key === "Enter") {
      event.currentTarget.click();
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <div
      {...boxProps}
      className={`flex h-full cursor-pointer flex-col overflow-hidden rounded-md border border-border transition-[transform,box-shadow,border-color] duration-[160ms] ease-[ease] hover:border-primary focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-px ${className ?? ""}`}
      onKeyDown={handleKeyDown}
      role="button"
      style={boxStyle}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
