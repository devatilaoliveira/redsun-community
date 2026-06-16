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
  | "black";

export type RsButtonSize = "s" | "m" | "l";

export type RsButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "disabled" | "onClick" | "type"
> & {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  inProgress?: boolean;
  isActive?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPressed?: () => void;
  size?: RsButtonSize;
  testId?: string;
  variant?: RsButtonVariant;
  contentStyle?: CSSProperties;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md border px-3.5 font-sans text-base font-normal transition-[background-color,border-color,color,filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-500 disabled:hover:brightness-100 disabled:active:brightness-100";

const sizeClasses: Record<RsButtonSize, string> = {
  s: "h-8",
  m: "h-[42px]",
  l: "h-12",
};

const variantClasses: Record<RsButtonVariant, string> = {
  primary:
    "border-transparent bg-red-800 text-white hover:brightness-95 active:brightness-90 focus-visible:outline-red-700",
  secondary:
    "border-transparent bg-zinc-800 text-white hover:brightness-110 active:brightness-95 focus-visible:outline-zinc-700",
  accent:
    "border-amber-300 bg-amber-200 text-zinc-950 hover:brightness-95 active:brightness-90 focus-visible:outline-amber-500",
  success:
    "border-transparent bg-emerald-700 text-white hover:brightness-95 active:brightness-90 focus-visible:outline-emerald-700",
  danger:
    "border-transparent bg-red-950 text-white hover:brightness-110 active:brightness-95 focus-visible:outline-red-900",
  warning:
    "border-transparent bg-amber-500 text-zinc-950 hover:brightness-95 active:brightness-90 focus-visible:outline-amber-500",
  black:
    "border-transparent bg-zinc-950 text-zinc-50 hover:brightness-125 active:brightness-150 focus-visible:outline-zinc-800",
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function RsButton({
  children,
  className,
  contentStyle,
  disabled = false,
  fullWidth = true,
  icon,
  inProgress = false,
  isActive = false,
  onClick,
  onPressed,
  size = "m",
  testId,
  type = "button",
  variant = "primary",
  ...props
}: RsButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || inProgress) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
    onPressed?.();
  }

  return (
    <button
      {...props}
      aria-busy={inProgress || undefined}
      className={joinClasses(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        inProgress && "cursor-progress hover:filter-none",
        isActive && "brightness-90",
        className,
      )}
      data-size={size}
      data-testid={testId}
      data-variant={variant}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {inProgress ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
      ) : (
        <span
          className="inline-flex h-full items-center justify-center gap-2 whitespace-nowrap"
          style={contentStyle}
        >
          {icon ? (
            <span
              aria-hidden="true"
              className="inline-flex size-4 shrink-0 items-center justify-center [&_img]:block [&_img]:size-4 [&_svg]:block [&_svg]:size-4"
            >
              {icon}
            </span>
          ) : null}
          <span className="inline-flex h-full items-center justify-center">
            {children}
          </span>
        </span>
      )}
    </button>
  );
}
