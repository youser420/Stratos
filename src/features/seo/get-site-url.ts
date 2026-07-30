import "server-only";

import { env } from "@/config/env";

export function getSiteUrl(): string {
  return env.appUrl;
}
