import Link from "next/link";

import type { FooterText } from "@/lib/content/componentText";
import type { NavigationItem } from "./TopBarNavigator";

type SiteFooterProps = {
  navigation: NavigationItem[];
  text: FooterText;
};

export function SiteFooter({ navigation, text }: SiteFooterProps) {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 px-6 py-8 text-sm text-zinc-500">
      <div className="mx-auto flex w-full max-w-[var(--content-max)] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>{text.description}</p>
        {navigation.length > 0 ? (
          <nav aria-label={text.legalLabel}>
            <ul className="flex flex-wrap gap-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-zinc-400 transition hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </footer>
  );
}
