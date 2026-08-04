import "server-only";
import { createClient } from "@sanity/client";

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

// How long ISR-cached Sanity data is allowed to go stale before Next.js
// triggers a background revalidation. The /api/revalidate webhook (fired
// by a Sanity document webhook) can also force an immediate refresh
// in between these windows — see that route for details.
export const NEWS_REVALIDATE_SECONDS = 3600; // 1 hour

export const sanityClient =
  SANITY_PROJECT_ID.length > 0
    ? createClient({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        apiVersion: SANITY_API_VERSION,
        useCdn: true, // fast, cached reads — fine since ISR/webhook handles freshness
      })
    : null; // Sanity not configured yet — see lib/sanity/posts.ts for how this is handled
