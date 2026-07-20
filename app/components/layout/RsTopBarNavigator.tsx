"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { RsRoundIconButton } from "@/app/components/ui/fragments/RsRoundIconButton";
import { communityNavigationItems } from "./community-navigation";
import { RsSideNav } from "./RsSideNav";

const sideNavId = "community-side-navigation";

export function RsTopBarNavigator() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 h-[var(--topbar-height)] border-b border-zinc-800 bg-black text-zinc-100 shadow-sm shadow-black/40">
        <div className="relative mx-auto grid h-full w-full max-w-[var(--content-max)] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6">
          <div className="flex items-center gap-1">
            <RsRoundIconButton
              ariaControls={sideNavId}
              ariaExpanded={menuOpen}
              ariaLabel="Toggle main navigation"
              iconSrc="/svgs/menu.svg"
              onPressed={() => setMenuOpen((current) => !current)}
            />
            <Link
              aria-label="RedSun Rulebook home"
              className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:hidden"
              href="/"
            >
              <img
                alt=""
                className="size-8"
                height="32"
                src="/svgs/rs.svg"
                width="32"
              />
            </Link>
          </div>

          <Link
            aria-label="RedSun Rulebook home"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full px-3 py-1 font-serif text-lg font-bold uppercase tracking-[0.16em] text-red-500 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:inline-flex"
            href="/"
          >
            RedSun
            <span className="ml-2 font-sans text-xs font-semibold tracking-[0.12em] text-zinc-400">
              Rulebook
            </span>
          </Link>

          <Link
            className="col-start-3 rounded-md px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-white/10 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            href="/rules"
          >
            Browse rules
          </Link>
        </div>
      </header>

      <RsSideNav
        id={sideNavId}
        items={communityNavigationItems}
        onClose={closeMenu}
        open={menuOpen}
      />
    </>
  );
}
