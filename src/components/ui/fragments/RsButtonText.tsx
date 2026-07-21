"use client";

import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

export type RsButtonTextVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "black"
  | "premium"
  | "muted";

export type RsButtonTextSize = "s" | "m" | "l";

type RsButtonTextBaseProps = {
  children: ReactNode;
  className?: string;
  contentStyle?: CSSProperties;
  disabled?: boolean;
  icon?: ReactNode;
  inProgress?: boolean;
  loadingLabel?: string;
  size?: RsButtonTextSize;
  variant?: RsButtonTextVariant;
};

export type RsButtonTextButtonProps = RsButtonTextBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof RsButtonTextBaseProps | "aria-busy"
  > & {
    kind?: "button";
  };

export type RsButtonTextLinkProps = RsButtonTextBaseProps &
  Omit<
    ComponentPropsWithoutRef<typeof Link>,
    keyof RsButtonTextBaseProps | "aria-busy" | "aria-disabled" | "href"
  > & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
    kind: "link";
  };

export type RsButtonTextProps =
  | RsButtonTextButtonProps
  | RsButtonTextLinkProps;

const sizeClasses: Record<RsButtonTextSize, string> = {
  s: "text-sm",
  m: "text-base",
  l: "text-base",
};

const variantClasses: Record<RsButtonTextVariant, string> = {
  primary: "text-primary",
  secondary: "text-zinc-200",
  accent: "text-accent",
  success: "text-emerald-400",
  danger: "text-red-700",
  warning: "text-amber-500",
  black:
    "text-muted [&:not([aria-disabled=true]):hover]:text-foreground [&:not([aria-disabled=true]):focus-visible]:text-foreground",
  // The Angular fragment accepts this variant without distinct styling.
  premium: "text-primary",
  muted:
    "text-muted [&:not([aria-disabled=true]):hover]:text-primary [&:not([aria-disabled=true]):focus-visible]:text-primary",
};

function ButtonTextContent({
  children,
  contentStyle,
  icon,
  inProgress,
  loadingLabel,
}: Pick<
  RsButtonTextBaseProps,
  "children" | "contentStyle" | "icon" | "inProgress" | "loadingLabel"
>) {
  if (inProgress) {
    return (
      <span className="inline-flex size-4 items-center justify-center">
        <span className="sr-only">{loadingLabel}</span>
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-[0.18em] border-white/35 border-t-white motion-reduce:animate-none"
        />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2" style={contentStyle}>
      {icon ? (
        <span className="inline-flex items-center [&_img]:size-4 [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}

export function RsButtonText(props: RsButtonTextProps) {
  const {
    children,
    className,
    contentStyle,
    disabled = false,
    icon,
    inProgress = false,
    loadingLabel = "Loading",
    size = "m",
    variant = "primary",
  } = props;
  const stateClasses = disabled
    ? "cursor-not-allowed text-muted opacity-60"
    : inProgress
      ? "cursor-progress"
      : "cursor-pointer";
  const sharedClassName = `inline-flex items-center justify-center gap-2 border-0 bg-transparent p-0 font-sans font-normal no-underline transition-[color,opacity] duration-[120ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses} ${className ?? ""}`;
  const content = (
    <ButtonTextContent
      contentStyle={contentStyle}
      icon={icon}
      inProgress={inProgress}
      loadingLabel={loadingLabel}
    >
      {children}
    </ButtonTextContent>
  );

  if (props.kind === "link") {
    /* eslint-disable @typescript-eslint/no-unused-vars -- Common props are removed before forwarding link attributes. */
    const {
      children: _children,
      className: _className,
      contentStyle: _contentStyle,
      disabled: _disabled,
      icon: _icon,
      inProgress: _inProgress,
      kind: _kind,
      loadingLabel: _loadingLabel,
      onClick,
      prefetch,
      size: _size,
      variant: _variant,
      ...linkProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
      if (disabled || inProgress) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    }

    return (
      <Link
        {...linkProps}
        aria-busy={inProgress || undefined}
        aria-disabled={disabled || undefined}
        className={sharedClassName}
        data-size={size}
        data-variant={variant}
        onClick={handleLinkClick}
        prefetch={disabled || inProgress ? false : prefetch}
      >
        {content}
      </Link>
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars -- Common props are removed before forwarding button attributes. */
  const {
    children: _children,
    className: _className,
    contentStyle: _contentStyle,
    disabled: _disabled,
    icon: _icon,
    inProgress: _inProgress,
    kind: _kind,
    loadingLabel: _loadingLabel,
    onClick,
    size: _size,
    type = "button",
    variant: _variant,
    ...buttonProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || inProgress) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  }

  return (
    <button
      {...buttonProps}
      aria-busy={inProgress || undefined}
      aria-disabled={disabled || undefined}
      className={sharedClassName}
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      onClick={handleButtonClick}
      type={type}
    >
      {content}
    </button>
  );
}
