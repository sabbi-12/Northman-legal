import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

/**
 * Configure this as a Sanity webhook (sanity.io/manage → API → Webhooks):
 *   URL: https://northmansterling.legal/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter: _type == "post"
 *   HTTP method: POST
 *   HTTP headers: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *
 * All post queries in lib/sanity/posts.ts are tagged "post", so a single
 * revalidateTag call refreshes every cached page that reads post data
 * (homepage News section, listing page, and every article detail page)
 * without needing per-page invalidation logic.
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

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
