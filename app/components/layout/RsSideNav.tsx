"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import type { CommunityNavigationItem } from "./community-navigation";

type RsSideNavProps = {
  id: string;
  items: readonly CommunityNavigationItem[];
  onClose: () => void;
  open: boolean;
};

function isCurrentRoute(
  pathname: string,
  item: CommunityNavigationItem,
) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavigationIcon({ src }: { src: `/${string}` }) {
  return (
    <span
      aria-hidden="true"
      className="size-5 shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
    />
  );
}

export function RsSideNav({ id, items, onClose, open }: RsSideNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const drawer = drawerRef.current;
    const mainContent = document.getElementById("main-content");

    document.body.style.overflow = "hidden";
    mainContent?.setAttribute("aria-hidden", "true");
    mainContent?.setAttribute("inert", "");
    drawer?.querySelector<HTMLElement>("a[href]")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawer) {
        return;
      }

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        drawer.focus();
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
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-label="Site navigation"
      aria-modal="true"
      className="fixed inset-0 z-40"
      role="dialog"
    >
      <button
        aria-label="Close navigation"
        className="absolute inset-0 cursor-default bg-zinc-950/55 backdrop-blur-[1px] motion-safe:animate-[rs-fade-in_160ms_ease-out]"
        onClick={onClose}
        type="button"
      />
      <nav
        aria-label="Main navigation"
        className="absolute inset-y-0 left-0 flex w-[min(19rem,calc(100%-2rem))] flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950 px-4 pb-5 pt-[calc(var(--topbar-height)+0.75rem)] text-zinc-100 shadow-2xl overscroll-contain motion-safe:animate-[rs-drawer-in_220ms_ease-out]"
        id={id}
        ref={drawerRef}
        tabIndex={-1}
      >
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          RedSun Rulebook
        </p>
        <ul className="grid gap-1">
          <li>
            <Link
              aria-current={pathname === "/" ? "page" : undefined}
              className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 aria-[current=page]:bg-red-900 aria-[current=page]:text-white"
              href="/"
              onClick={onClose}
            >
              <NavigationIcon src="/svgs/rs.svg" />
              Home
            </Link>
          </li>
          {items.map((item) => {
            const current = isCurrentRoute(pathname, item);

            return (
              <li key={item.href}>
                <Link
                  aria-current={current ? "page" : undefined}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 aria-[current=page]:bg-red-900 aria-[current=page]:text-white"
                  href={item.href}
                  onClick={onClose}
                >
                  <NavigationIcon src={item.iconSrc} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-auto border-t border-zinc-800 px-3 pt-5 text-sm leading-6 text-zinc-500">
          Public rules and lore for the RedSun tabletop RPG.
        </p>
      </nav>
    </div>
  );
}
