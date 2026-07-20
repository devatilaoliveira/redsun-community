import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import "server-only";
import { load } from "js-yaml";
import { z } from "zod";

import {
  DEFAULT_LOCALE,
  isPublishedLocale,
  type PublishedLocale,
} from "@/lib/constants/locales";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

const HeaderTextSchema = z.object({
  skipToContent: z.string().min(1),
  menuLabel: z.string().min(1),
  closeMenuLabel: z.string().min(1),
  homeLabel: z.string().min(1),
  navigationLabel: z.string().min(1),
  brand: z.string().min(1),
  brandSuffix: z.string().min(1),
});

const FooterTextSchema = z.object({
  description: z.string().min(1),
  legalLabel: z.string().min(1),
});

export type HeaderText = z.infer<typeof HeaderTextSchema>;
export type FooterText = z.infer<typeof FooterTextSchema>;

async function readComponentYaml(locale: PublishedLocale, component: string) {
  const filePath = path.join(CONTENT_DIR, locale, "components", `${component}.yaml`);
  const raw = await fs.readFile(filePath, "utf8");
  return load(raw);
}

export const getHeaderText = cache(async (locale: string): Promise<HeaderText> => {
  const documentLocale = isPublishedLocale(locale) ? locale : DEFAULT_LOCALE;
  return HeaderTextSchema.parse(await readComponentYaml(documentLocale, "header"));
});

export const getFooterText = cache(async (locale: string): Promise<FooterText> => {
  const documentLocale = isPublishedLocale(locale) ? locale : DEFAULT_LOCALE;
  return FooterTextSchema.parse(await readComponentYaml(documentLocale, "footer"));
});
