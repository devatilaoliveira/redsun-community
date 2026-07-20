import type { Metadata } from "next";
import localFont from "next/font/local";

import { defaultLocaleHomePath } from "@/lib/content/routing";
import { siteMetadata } from "@/lib/constants";
import "../globals.css";

const vendSans = localFont({
  variable: "--font-vend-sans",
  src: [
    { path: "../fonts/vend/VendSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/vend/VendSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/vend/VendSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/vend/VendSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/vend/VendSans-Bold.ttf", weight: "700", style: "normal" },
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

export const metadata: Metadata = {
  ...siteMetadata,
  alternates: {
    canonical: defaultLocaleHomePath(),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${vendSans.variable} ${cinzelDecorative.variable} antialiased`}
      lang="en"
    >
      <body className="min-h-dvh bg-background text-foreground">{children}</body>
    </html>
  );
}
