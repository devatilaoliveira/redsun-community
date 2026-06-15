import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteMetadata } from "@/lib/constants";
import "./globals.css";

const vendSans = localFont({
  variable: "--font-vend-sans",
  src: [
    {
      path: "./fonts/vend/VendSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/vend/VendSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/vend/VendSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/vend/VendSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/vend/VendSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/vend/VendSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
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
      className={`${vendSans.variable} ${cinzelDecorative.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
