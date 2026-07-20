"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { NavigationItem } from "./SiteHeader";

const sideNavId = "site-side-navigation";

type NavigationDrawerProps = {
  closeLabel: string;
  homeHref: `/${string}`;
  homeLabel: string;
  menuLabel: string;
  navigation: NavigationItem[];
  navigationLabel: string;
};

function isCurrentRoute(pathname: string, item: NavigationItem) {
  return pathname === item.href || pathname.startsWith(`${item.href}`);
}

function MenuIcon() {
  return (
    <span
      aria-hidden="true"
      className="size-5 bg-current [mask-image:url('/svgs/menu.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/svgs/menu.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
    />
  );
}

export function NavigationDrawer({
  closeLabel,
  homeHref,
  homeLabel,
  menuLabel,
  navigation,
  navigationLabel,
}: NavigationDrawerProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) {
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
        closeMenu();
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
  }, [closeMenu, menuOpen]);

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          aria-controls={sideNavId}
          aria-expanded={menuOpen}
          aria-label={menuLabel}
          className="inline-flex size-10 items-center justify-center rounded-full text-zinc-100 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <MenuIcon />
        </button>
        <Link
          aria-label={homeLabel}
          className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:hidden"
          href={homeHref}
        >
          <img alt="" className="size-8" height="32" src="/svgs/rs.svg" width="32" />
        </Link>
      </div>

      {menuOpen ? (
        <div
          aria-label={navigationLabel}
          aria-modal="true"
          className="fixed inset-0 z-40"
          role="dialog"
        >
          <button
            aria-label={closeLabel}
            className="absolute inset-0 cursor-default bg-zinc-950/55 backdrop-blur-[1px] motion-safe:animate-[rs-fade-in_160ms_ease-out]"
            onClick={closeMenu}
            type="button"
          />
          <nav
            aria-label={navigationLabel}
            className="absolute inset-y-0 left-0 flex w-[min(19rem,calc(100%-2rem))] flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950 px-4 pb-5 pt-[calc(var(--topbar-height)+0.75rem)] text-zinc-100 shadow-2xl overscroll-contain motion-safe:animate-[rs-drawer-in_220ms_ease-out]"
            id={sideNavId}
            ref={drawerRef}
            tabIndex={-1}
          >
            <ul className="grid gap-1">
              {navigation.map((item) => {
                const current = isCurrentRoute(pathname, item);

                return (
                  <li key={item.href}>
                    <Link
                      aria-current={current ? "page" : undefined}
                      className="flex min-h-11 items-center rounded-md px-3 py-2 font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 aria-[current=page]:bg-red-900 aria-[current=page]:text-white"
                      href={item.href}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
