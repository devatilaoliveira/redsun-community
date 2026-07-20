import Link from "next/link";

import type { HeaderText } from "@/lib/content/componentText";
import { localizedPagePath } from "@/lib/content/routing";
import type { PublishedLocale } from "@/lib/constants/locales";
import { NavigationDrawer } from "./NavigationDrawer";

export type NavigationItem = {
  href: `/${string}`;
  label: string;
};

type SiteHeaderProps = {
  locale: PublishedLocale;
  navigation: NavigationItem[];
  text: HeaderText;
};

export function SiteHeader({ locale, navigation, text }: SiteHeaderProps) {
  const homeHref = localizedPagePath(locale, "/");

  return (
    <header className="sticky top-0 z-50 h-[var(--topbar-height)] border-b border-zinc-800 bg-black text-zinc-100 shadow-sm shadow-black/40">
      <div className="relative mx-auto grid h-full w-full max-w-[var(--content-max)] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6">
        <NavigationDrawer
          closeLabel={text.closeMenuLabel}
          homeHref={homeHref}
          homeLabel={text.homeLabel}
          menuLabel={text.menuLabel}
          navigation={navigation}
          navigationLabel={text.navigationLabel}
        />

        <Link
          aria-label={text.homeLabel}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full px-3 py-1 font-serif text-lg font-bold uppercase text-accent transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:inline-flex"
          href={homeHref}
        >
          {text.brand}
          <span className="ml-2 font-sans text-xs font-semibold text-zinc-400">
            {text.brandSuffix}
          </span>
        </Link>

        <nav
          aria-label={text.navigationLabel}
          className="col-start-3 hidden items-center gap-1 sm:flex"
        >
          {navigation
            .filter((item) => item.href !== homeHref)
            .map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-white/10 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
