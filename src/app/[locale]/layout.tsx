import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";

import { AppShell } from "@/components/ui/layout/AppShell";
import {
  DEFAULT_LOCALE,
  PUBLISHED_LOCALES,
  isPublishedLocale,
  siteMetadata,
} from "@/lib/constants";
import "../globals.css";

const vendSans = localFont({
  variable: "--font-vend-sans",
  src: [
    { path: "../fonts/vend/VendSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/vend/VendSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/vend/VendSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/vend/VendSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/vend/VendSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/vend/VendSans-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/vend/VendSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/vend/VendSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../fonts/vend/VendSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/vend/VendSans-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
});

const cinzelDecorative = localFont({
  variable: "--font-cinzel-decorative",
  src: [
    { path: "../fonts/cinzel/CinzelDecorative-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/cinzel/CinzelDecorative-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/cinzel/CinzelDecorative-Black.ttf", weight: "900", style: "normal" },
  ],
  preload: false,
});

export const metadata: Metadata = siteMetadata;

export function generateStaticParams() {
  return PUBLISHED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isPublishedLocale(locale)) {
    notFound();
  }

  const documentLocale = isPublishedLocale(locale) ? locale : DEFAULT_LOCALE;

  return (
    <html
      className={`${vendSans.variable} ${cinzelDecorative.variable} antialiased`}
      lang={documentLocale}
    >
      <body className="min-h-dvh bg-background text-foreground">
        <AppShell locale={documentLocale}>{children}</AppShell>
      </body>
    </html>
  );
}
