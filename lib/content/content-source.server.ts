import "server-only";

import type { ContentRepository } from "./content-repository.interface";
import { LocalYamlRepository } from "./local-yaml.repository.server";
import { SupabaseRepository } from "./supabase.repository.server";

export function getContentRepository(): ContentRepository {
  const source = process.env.CONTENT_SOURCE ?? "local";

  if (source === "supabase") {
    return new SupabaseRepository();
  }

  return new LocalYamlRepository();
}
