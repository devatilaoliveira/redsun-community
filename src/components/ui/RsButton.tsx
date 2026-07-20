"use client";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

export type RsButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "black"
  | "premium";

export type RsButtonSize = "s" | "m" | "l";

export type RsButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-busy"
> & {
  contentStyle?: CSSProperties;
  icon?: ReactNode;
  inProgress?: boolean;
  isActive?: boolean;
  loadingLabel?: string;
  size?: RsButtonSize;
  variant?: RsButtonVariant;
};

const sizeClasses: Record<RsButtonSize, string> = {
  s: "h-8",
  m: "h-[42px]",
  l: "h-12",
};

const variantClasses: Record<RsButtonVariant, string> = {
  primary: "border-transparent bg-primary text-white",
  secondary: "border-transparent bg-zinc-200 text-zinc-950",
  accent: "border-transparent bg-surface-muted text-foreground",
  success: "border-transparent bg-emerald-500 text-black",
  danger: "border-transparent bg-red-900 text-white",
  warning: "border-transparent bg-amber-600 text-black",
  black: "border-zinc-800 bg-black text-white",
  // The Angular fragment accepts this variant without giving it distinct styles.
  premium: "border-transparent bg-primary text-white",
};

export function RsButton({
  children,
  className,
  contentStyle,
  disabled = false,
  icon,
  inProgress = false,
  isActive = false,
  loadingLabel = "Loading",
  onClick,
  size = "m",
  type = "button",
  variant = "primary",
  ...buttonProps
}: RsButtonProps) {
  const isBlack = variant === "black";
  const interactionClasses = inProgress
    ? "cursor-progress"
    : isBlack
      ? "cursor-pointer enabled:hover:brightness-[1.18] enabled:active:brightness-[1.28]"
      : "cursor-pointer enabled:hover:brightness-[0.94] enabled:active:brightness-[0.88]";
  const activeClass = isActive
    ? isBlack
      ? "brightness-[1.28]"
      : "brightness-[0.88]"
    : "";

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || inProgress) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }

  return (
    <button
      {...buttonProps}
      aria-busy={inProgress || undefined}
      aria-disabled={inProgress || undefined}
      className={`inline-flex w-full items-center justify-center rounded-md border px-3.5 font-sans text-base font-normal whitespace-nowrap transition-[background-color,border-color,color,filter] duration-[120ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-muted disabled:text-muted disabled:filter-none ${sizeClasses[size]} ${variantClasses[variant]} ${interactionClasses} ${activeClass} ${className ?? ""}`}
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {inProgress ? (
        <span className="inline-flex size-full items-center justify-center">
          <span className="sr-only">{loadingLabel}</span>
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-[0.18em] border-white/35 border-t-white motion-reduce:animate-none"
          />
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-2"
          style={contentStyle}
        >
          {icon ? (
            <span className="inline-flex items-center [&_img]:size-4 [&_svg]:size-4">
              {icon}
            </span>
          ) : null}
          <span className="flex h-full items-center justify-center">
            {children}
          </span>
        </span>
      )}
    </button>
  );
}
