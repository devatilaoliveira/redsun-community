import type { Metadata } from "next";

export const SITE_NAME = "RedSun Rulebook";
export const SITE_DESCRIPTION = "Rulebook site for the RedSun tabletop RPG.";
export const SITE_URL =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  appleWebApp: {
    title: SITE_NAME,
  },
};
