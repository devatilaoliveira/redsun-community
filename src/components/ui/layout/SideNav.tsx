"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { NavigationItem } from "./TopBarNavigator";

const sideNavId = "site-side-navigation";
const closingDurationMs = 220;

export type SideNavProps = {
  closeLabel: string;
  isClosing: boolean;
  isVisible: boolean;
  navigation: NavigationItem[];
  navigationLabel: string;
  onClose: () => void;
  onClosed: () => void;
};

function comparablePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function isCurrentRoute(pathname: string, item: NavigationItem) {
  const currentPath = comparablePath(pathname);
  const itemPath = comparablePath(item.href);
  const isLocaleHome = itemPath.split("/").filter(Boolean).length === 1;

  return (
    currentPath === itemPath ||
    (!isLocaleHome && currentPath.startsWith(`${itemPath}/`))
  );
}

export function SideNav({
  closeLabel,
  isClosing,
  isVisible,
  navigation,
  navigationLabel,
  onClose,
  onClosed,
}: SideNavProps) {
  const pathname = usePathname();
  const sideNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const sideNav = sideNavRef.current;
    const mainContent = document.getElementById("main-content");

    document.body.style.overflow = "hidden";
    mainContent?.setAttribute("aria-hidden", "true");
    mainContent?.setAttribute("inert", "");
    sideNav?.querySelector<HTMLElement>("a[href]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !sideNav) {
        return;
      }

      const focusable = Array.from(
        sideNav.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        sideNav.focus();
      } else if (!sideNav.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      mainContent?.removeAttribute("aria-hidden");
      mainContent?.removeAttribute("inert");

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!isVisible || !isClosing) {
      return;
    }

    const closingTimer = window.setTimeout(onClosed, closingDurationMs);

    return () => window.clearTimeout(closingTimer);
  }, [isClosing, isVisible, onClosed]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 top-[var(--topbar-height)] z-40">
      <button
        aria-label={closeLabel}
        className={`absolute inset-0 cursor-default bg-black/70 ${
          isClosing
            ? "motion-safe:animate-[rs-fade-out_160ms_ease-in_forwards]"
            : "motion-safe:animate-[rs-fade-in_160ms_ease-out]"
        }`}
        onClick={onClose}
        type="button"
      />
      <nav
        aria-label={navigationLabel}
        className={`absolute inset-y-0 left-0 flex w-[min(17.5rem,calc(100%-2rem))] flex-col overflow-y-auto border-r border-zinc-800 bg-black px-4 py-3 text-zinc-100 shadow-2xl overscroll-contain ${
          isClosing
            ? "motion-safe:animate-[rs-drawer-out_220ms_ease-in_forwards]"
            : "motion-safe:animate-[rs-drawer-in_220ms_ease-out]"
        }`}
        id={sideNavId}
        ref={sideNavRef}
        tabIndex={-1}
      >
        <ul className="grid gap-1">
          {navigation.map((item) => {
            const current = isCurrentRoute(pathname, item);

            return (
              <li key={item.href}>
                <Link
                  aria-current={current ? "page" : undefined}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 aria-[current=page]:bg-white/20 aria-[current=page]:text-white aria-[current=page]:hover:bg-white/20"
                  href={item.href}
                  onClick={onClose}
                >
                  {item.iconSrc ? (
                    <span
                      aria-hidden="true"
                      className="size-6 shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                      style={{
                        maskImage: `url('${item.iconSrc}')`,
                        WebkitMaskImage: `url('${item.iconSrc}')`,
                      }}
                    />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
