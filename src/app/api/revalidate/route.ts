import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { locales } from "@/lib/i18n/config";

export const runtime = "nodejs";

/**
 * Configure this as a Sanity webhook (sanity.io/manage → API → Webhooks):
 *   URL: https://northmansterling.legal/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter: _type == "post"
 *   HTTP method: POST
 *   HTTP headers: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *   Projection: { "slug": slug.current }
 *     (Vision/webhook payload must include the post's slug field for the
 *     revalidatePath call below to pre-build the new article immediately —
 *     without it, this still refreshes the listing/homepage via
 *     revalidateTag, but a brand-new post's own page can still 404 on its
 *     very first visit until Next.js builds it on demand.)
 *
 * All post queries in lib/sanity/posts.ts are tagged "post", so
 * revalidateTag refreshes every cached page that reads post data (homepage
 * News section, listing page). revalidatePath additionally forces the
 * specific new/changed article's own page to build right now, for both
 * locales, instead of waiting for its first real visitor to trigger an
 * on-demand ISR build (which is what caused the "cold" 404 a new post's
 * first viewer could hit — see CLAUDE.md's 2026-08-13 session note).
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret) {
    console.error("Revalidate webhook: SANITY_REVALIDATE_SECRET is not configured.");
    return NextResponse.json({ error: "Revalidation is not configured." }, { status: 500 });
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Invalid or missing secret." }, { status: 401 });
  }

  revalidateTag("post");

  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = typeof body?.slug === "string" ? body.slug : undefined;
  } catch {
    // No JSON body (or the webhook wasn't configured with a slug
    // projection) — revalidateTag above still ran, just skip the
    // per-path pre-build below.
  }

  if (slug) {
    for (const locale of locales) {
      revalidatePath(`/${locale}/news-updates/${slug}`);
    }
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? null, now: Date.now() });
}
