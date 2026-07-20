"use client";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
} from "react";

export type RsRoundIconButtonVariant = "primary" | "default";

export type RsRoundIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-controls"
  | "aria-expanded"
  | "aria-label"
  | "children"
  | "disabled"
  | "onClick"
  | "type"
> & {
  ariaControls?: string | null;
  ariaExpanded?: boolean | null;
  ariaLabel: string;
  disabled?: boolean;
  iconSrc: `/${string}`;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPressed?: () => void;
  size?: number;
  variant?: RsRoundIconButtonVariant;
};

const buttonClasses =
  "inline-flex h-[calc(var(--rs-icon-size)+1rem)] w-[calc(var(--rs-icon-size)+1rem)] shrink-0 items-center justify-center rounded-full border p-0 transition-[background-color,border-color,color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent";

const variantClasses: Record<RsRoundIconButtonVariant, string> = {
  default:
    "border-transparent bg-transparent text-zinc-100 hover:bg-white/10 focus-visible:outline-amber-400",
  primary:
    "border-red-800 bg-red-800 text-white hover:bg-red-900 focus-visible:outline-red-700",
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getSafeMaskImage(iconSrc: string) {
  if (!iconSrc.startsWith("/") || iconSrc.startsWith("//")) {
    return undefined;
  }

  return `url("${iconSrc.replaceAll('"', "%22")}")`;
}

function getSafeSize(size: number) {
  if (!Number.isFinite(size)) {
    return 24;
  }

  return Math.min(Math.max(size, 12), 64);
}

export function RsRoundIconButton({
  ariaControls = null,
  ariaExpanded = null,
  ariaLabel,
  className,
  disabled = false,
  iconSrc,
  onClick,
  onPressed,
  size = 24,
  variant = "default",
  ...props
}: RsRoundIconButtonProps) {
  const safeSize = getSafeSize(size);
  const maskImage = getSafeMaskImage(iconSrc);
  const style = {
    ...props.style,
    "--rs-icon-size": `${safeSize}px`,
  } as CSSProperties & Record<"--rs-icon-size", string>;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
    onPressed?.();
  }

  return (
    <button
      {...props}
      aria-controls={ariaControls ?? undefined}
      aria-expanded={ariaExpanded ?? undefined}
      aria-label={ariaLabel}
      className={joinClasses(
        buttonClasses,
        variantClasses[variant],
        className,
      )}
      data-variant={variant}
      disabled={disabled}
      onClick={handleClick}
      style={style}
      type="button"
    >
      <span
        aria-hidden="true"
        className="block h-[var(--rs-icon-size)] w-[var(--rs-icon-size)] bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
    </button>
  );
}
