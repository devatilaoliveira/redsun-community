import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/content/breadcrumbs";
import type { PublishedLocale } from "@/lib/constants/locales";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  locale: PublishedLocale;
};

const breadcrumbLabels = {
  de: "Brotkrümelnavigation",
  en: "Breadcrumb",
  pt: "Navegação estrutural",
} satisfies Record<PublishedLocale, string>;

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  return (
    <nav aria-label={breadcrumbLabels[locale]}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={item.href}>
              {index > 0 ? (
                <span aria-hidden="true" className="text-zinc-600">
                  ›
                </span>
              ) : null}
              {isCurrentPage ? (
                <span aria-current="page" className="text-zinc-200">
                  {item.name}
                </span>
              ) : (
                <Link
                  className="rounded-sm underline-offset-4 transition-colors hover:text-amber-400 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  href={item.href}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
