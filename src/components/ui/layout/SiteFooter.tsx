import {
  SITE_CONTACT_NAME,
  SITE_CONTACT_PROFILE_URL,
  SITE_SHORT_NAME,
} from "@/lib/constants/site";
import type { FooterText } from "@/lib/content/componentText";
import { RsButtonText } from "../fragments/RsButtonText";
import type { NavigationItem } from "./TopBarNavigator";

type SiteFooterProps = {
  navigation: NavigationItem[];
  text: FooterText;
};

export function SiteFooter({ navigation, text }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-black px-6 py-6 text-sm text-muted">
      <div className="mx-auto flex w-full max-w-[45rem] flex-col items-center gap-4 text-center">
        <p className="max-w-2xl leading-6">{text.description}</p>

        {navigation.length > 0 ? (
          <nav className="w-full" aria-label={text.legalLabel}>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 min-[720px]:justify-between">
              {navigation.map((item) => (
                <li key={item.href}>
                  <RsButtonText
                    href={item.href}
                    kind="link"
                    size="s"
                    variant="muted"
                  >
                    {item.label}
                  </RsButtonText>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="flex w-full flex-col items-center gap-2 text-zinc-500 min-[720px]:flex-row min-[720px]:justify-between">
          <p>
            © {currentYear} {SITE_SHORT_NAME}. {text.rightsNotice}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span>{text.craftedWith}</span>
            <svg
              aria-hidden="true"
              className="size-4 shrink-0 fill-red"
              focusable="false"
            >
              <use href="/svgs/favorite.svg#favorite-heart" />
            </svg>
            <span>{text.craftedBy}</span>
            <RsButtonText
              href={SITE_CONTACT_PROFILE_URL}
              kind="link"
              rel="noopener noreferrer"
              size="s"
              target="_blank"
              variant="muted"
            >
              {SITE_CONTACT_NAME}
            </RsButtonText>
          </p>
        </div>
      </div>
    </footer>
  );
}
