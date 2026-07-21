"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { RsRoundIconButton } from "@/components/ui/fragments/RsRoundIconButton";
import type { HeaderText } from "@/lib/content/componentText";
import { localizedPagePath } from "@/lib/content/routing";
import type { PublishedLocale } from "@/lib/constants/locales";
import { SideNav } from "./SideNav";

export type NavigationItem = {
  href: `/${string}`;
  iconSrc?: `/${string}`;
  label: string;
};

export type TopBarNavigatorProps = {
  locale: PublishedLocale;
  navigation: NavigationItem[];
  text: HeaderText;
};

function MenuIcon() {
  return (
    <span
      aria-hidden="true"
      className="size-6 bg-current [mask-image:url('/svgs/menu.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/svgs/menu.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
    />
  );
}

export function TopBarNavigator({
  locale,
  navigation,
  text,
}: TopBarNavigatorProps) {
  const homeHref = localizedPagePath(locale, "/");
  const pathname = usePathname();
  const router = useRouter();
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [sideNavClosing, setSideNavClosing] = useState(false);
  const showBackButton =
    pathname.replace(/\/+$/, "") !== homeHref.replace(/\/+$/, "");

  const closeSideNav = useCallback(() => {
    setSideNavClosing(true);
  }, []);

  const finishClosingSideNav = useCallback(() => {
    setSideNavVisible(false);
    setSideNavClosing(false);
  }, []);

  function toggleSideNav() {
    if (sideNavVisible) {
      closeSideNav();
      return;
    }

    setSideNavClosing(false);
    setSideNavVisible(true);
  }

  function goBack() {
    setSideNavVisible(false);
    setSideNavClosing(false);
    router.back();
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--topbar-height)] border-b border-zinc-800 bg-black text-zinc-100 shadow-sm shadow-black/40">
        <div className="relative mx-auto flex h-full w-full max-w-[var(--content-max)] items-center px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              aria-controls="site-side-navigation"
              aria-expanded={sideNavVisible && !sideNavClosing}
              aria-label={text.menuLabel}
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-100 transition hover:bg-white/10 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              onClick={toggleSideNav}
              type="button"
            >
              <MenuIcon />
            </button>
            <Link
              aria-label={text.homeLabel}
              className="inline-flex size-[47px] items-center justify-center rounded-full transition hover:bg-white/10 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 min-[1281px]:hidden"
              href={homeHref}
              onClick={sideNavVisible ? closeSideNav : undefined}
            >
              <img
                alt=""
                className="size-full"
                height="32"
                src="/svgs/rs.svg"
                width="32"
              />
            </Link>
          </div>

          <Link
            aria-label={text.homeLabel}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full px-3 py-1 font-serif text-[1.4rem] leading-none font-bold uppercase text-accent transition hover:bg-white/10 active:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 min-[1281px]:inline-flex"
            href={homeHref}
            onClick={sideNavVisible ? closeSideNav : undefined}
          >
            {text.brand}
            <span className="ml-2 font-sans text-xs font-semibold text-zinc-400">
              {text.brandSuffix}
            </span>
          </Link>

          {showBackButton ? (
            <div className="ml-auto flex items-center">
              <RsRoundIconButton
                ariaLabel={text.backLabel}
                iconSrc="/svgs/arrow.svg"
                onClick={goBack}
              />
            </div>
          ) : null}
        </div>
      </header>

      <div aria-hidden="true" className="h-[var(--topbar-height)] shrink-0" />

      <SideNav
        closeLabel={text.closeMenuLabel}
        isClosing={sideNavClosing}
        isVisible={sideNavVisible}
        navigation={navigation}
        navigationLabel={text.navigationLabel}
        onClose={closeSideNav}
        onClosed={finishClosingSideNav}
      />
    </>
  );
}
