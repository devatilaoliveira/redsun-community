import type { ReactNode } from "react";

import { getFooterText, getHeaderText } from "@/lib/content/componentText";
import { getNavigationPages } from "@/lib/content/pages";
import { localizedPagePath } from "@/lib/content/routing";
import type { PublishedLocale } from "@/lib/constants/locales";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type AppShellProps = {
  children: ReactNode;
  locale: PublishedLocale;
};

export async function AppShell({ children, locale }: AppShellProps) {
  const [headerText, footerText, primaryPages, legalPages] = await Promise.all([
    getHeaderText(locale),
    getFooterText(locale),
    getNavigationPages("primary", locale),
    getNavigationPages("legal", locale),
  ]);

  const primaryNavigation = primaryPages.map((page) => ({
    href: localizedPagePath(locale, page.path),
    label: page.navigation.label,
  }));

  const legalNavigation = legalPages.map((page) => ({
    href: localizedPagePath(locale, page.path),
    label: page.navigation.label,
  }));

  return (
    <div className="flex min-h-dvh flex-col bg-black text-zinc-100">
      <a
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-amber-400 px-4 py-2 font-semibold text-zinc-950 transition focus:translate-y-0"
        href="#main-content"
      >
        {headerText.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        navigation={primaryNavigation}
        text={headerText}
      />
      <div className="flex flex-1 flex-col" id="main-content" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter navigation={legalNavigation} text={footerText} />
    </div>
  );
}
