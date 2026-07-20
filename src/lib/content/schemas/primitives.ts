import { z } from "zod";

export const KebabSlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const PagePathSchema = z
  .string()
  .regex(/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/)
  .refine((path) => path === "/" || path.endsWith("/"), {
    message: "Page paths must start and end with /.",
  });

export const DateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)), {
    message: "Date must be a valid YYYY-MM-DD value.",
  });

export const PublicAssetPathSchema = z
  .string()
  .regex(/^\/assets\/(?:images|svg)\/[a-z0-9][a-z0-9./_-]*$/);

export const LinkPathSchema = z.string().regex(/^\/[a-z0-9][a-z0-9./_-]*\/?$/);
