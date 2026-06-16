import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/app/components/layout/AppShell";
import { siteMetadata } from "@/lib/constants";
import "./globals.css";

const vendSans = localFont({
  variable: "--font-vend-sans",
  src: [
    {
      path: "./fonts/vend/VendSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

const cinzelDecorative = localFont({
  variable: "--font-cinzel-decorative",
  src: [
    {
      path: "./fonts/cinzel/CinzelDecorative-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/cinzel/CinzelDecorative-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/cinzel/CinzelDecorative-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  preload: false,
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vendSans.variable} ${cinzelDecorative.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
