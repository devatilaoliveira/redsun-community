"use client";

import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
} from "react";

export type RsRoundIconButtonVariant =
  | "primary"
  | "secondary"
  | "premium"
  | "default";

export type RsRoundIconButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    ariaControls?: string | null;
    ariaExpanded?: boolean | null;
    ariaLabel?: string;
    iconSrc: string;
    size?: number;
    variant?: RsRoundIconButtonVariant;
  };

const variantClasses: Record<RsRoundIconButtonVariant, string> = {
  default:
    "border-transparent bg-transparent text-foreground enabled:hover:bg-hover",
  primary:
    "border-primary bg-primary text-black enabled:hover:brightness-[0.88]",
  secondary:
    "border-secondary bg-secondary text-black enabled:hover:brightness-[0.88]",
  premium:
    "border-yellow bg-yellow text-black enabled:hover:brightness-[0.88]",
};

type IconButtonStyle = CSSProperties & {
  "--rs-icon-size": string;
};

export function RsRoundIconButton({
  "aria-controls": nativeAriaControls,
  "aria-expanded": nativeAriaExpanded,
  "aria-label": nativeAriaLabel,
  ariaControls = null,
  ariaExpanded = null,
  ariaLabel = "Icon button",
  className,
  disabled = false,
  iconSrc,
  onClick,
  size = 24,
  style,
  type = "button",
  variant = "default",
  ...buttonProps
}: RsRoundIconButtonProps) {
  const buttonStyle: IconButtonStyle = {
    "--rs-icon-size": `${size}px`,
    ...style,
  };
  const maskImage = `url(${JSON.stringify(iconSrc)})`;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }

  return (
    <button
      {...buttonProps}
      aria-controls={nativeAriaControls ?? ariaControls ?? undefined}
      aria-expanded={nativeAriaExpanded ?? ariaExpanded ?? undefined}
      aria-label={nativeAriaLabel ?? ariaLabel}
      className={`inline-flex size-[calc(var(--rs-icon-size)_+_1rem)] shrink-0 cursor-pointer items-center justify-center rounded-full border p-0 transition-[color,background-color,filter] duration-[120ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-[0.45] disabled:filter-none ${variantClasses[variant]} ${className ?? ""}`}
      data-variant={variant}
      disabled={disabled}
      onClick={handleClick}
      style={buttonStyle}
      type={type}
    >
      <span
        aria-hidden="true"
        className="size-[var(--rs-icon-size)] bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
    </button>
  );
}
