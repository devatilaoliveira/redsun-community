"use client";

import Link from "next/link";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
} from "react";

type RsBoxClickableBaseProps = {
  disabled?: boolean;
  minHeight?: CSSProperties["minHeight"] | null;
};

type RsBoxClickableDivProps = RsBoxClickableBaseProps &
  Omit<ComponentPropsWithoutRef<"div">, "aria-disabled" | "role" | "tabIndex"> & {
    as?: "div";
  };

type RsBoxClickableAnchorProps = RsBoxClickableBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "aria-disabled"> & {
    as: "a";
  };

type RsBoxClickableLinkProps = RsBoxClickableBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "aria-disabled" | "as"> & {
    as: "link";
  };

export type RsBoxClickableProps =
  | RsBoxClickableDivProps
  | RsBoxClickableAnchorProps
  | RsBoxClickableLinkProps;

const baseClassName =
  "flex h-full flex-col overflow-hidden rounded-md border border-border transition-[transform,box-shadow,border-color] duration-[160ms] ease-[ease] focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function RsBoxClickable(props: RsBoxClickableProps) {
  const {
    children,
    className,
    disabled = false,
    minHeight = null,
    style,
  } = props;
  const boxStyle = minHeight == null ? style : { ...style, minHeight };
  const stateClassName = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer hover:border-primary active:translate-y-px";
  const sharedClassName = `${baseClassName} ${stateClassName} ${className ?? ""}`;

  if (props.as === "link") {
    /* eslint-disable @typescript-eslint/no-unused-vars -- Shared props are removed before forwarding link attributes. */
    const {
      as: _as,
      children: _children,
      className: _className,
      disabled: _disabled,
      href,
      minHeight: _minHeight,
      onClick,
      style: _style,
      tabIndex,
      ...linkProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    }

    return (
      <Link
        {...linkProps}
        aria-disabled={disabled || undefined}
        className={sharedClassName}
        href={href}
        onClick={handleLinkClick}
        style={boxStyle}
        tabIndex={disabled ? -1 : tabIndex}
      >
        {children}
      </Link>
    );
  }

  if (props.as === "a") {
    /* eslint-disable @typescript-eslint/no-unused-vars -- Shared props are removed before forwarding anchor attributes. */
    const {
      as: _as,
      children: _children,
      className: _className,
      disabled: _disabled,
      href,
      minHeight: _minHeight,
      onClick,
      style: _style,
      tabIndex,
      ...linkProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    }

    return (
      <a
        {...linkProps}
        aria-disabled={disabled || undefined}
        className={sharedClassName}
        href={disabled ? undefined : href}
        onClick={handleLinkClick}
        style={boxStyle}
        tabIndex={disabled ? -1 : tabIndex}
      >
        {children}
      </a>
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars -- Shared props are removed before forwarding div attributes. */
  const {
    as: _as,
    children: _children,
    className: _className,
    disabled: _disabled,
    minHeight: _minHeight,
    onClick,
    onKeyDown,
    style: _style,
    ...boxProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (disabled || event.defaultPrevented) return;

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
      aria-disabled={disabled || undefined}
      className={sharedClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      style={boxStyle}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
}
