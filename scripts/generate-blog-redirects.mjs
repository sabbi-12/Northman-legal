#!/usr/bin/env node
/**
 * Generates the two redirect-rule blocks (for next.config.js and
 * src/data/redirects.ts) that map every live WP post URL to its new
 * News & Updates location — the explicit 1:1 entries the project's own
 * migration checklist requires (no wildcard-only rules for ranking pages).
 *
 * Usage:
 *   WP_BASE_URL=https://northmansterling.legal node scripts/generate-blog-redirects.mjs
 *
 * Paste the two printed blocks into next.config.js's `staticRedirects`
 * and src/data/redirects.ts's `staticRedirects` respectively — both files
 * must stay in sync manually per this project's existing convention.
 */

const WP_BASE_URL = process.env.WP_BASE_URL;

if (!WP_BASE_URL) {
  console.error("Missing WP_BASE_URL (e.g. https://northmansterling.legal)");
  process.exit(1);
}

async function fetchAllSlugs() {
  const slugs = [];
  let page = 1;
  while (true) {
    const url = `${WP_BASE_URL}/wp-json/wp/v2/posts?per_page=50&page=${page}&_fields=slug`;
    const res = await fetch(url);
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`WP API ${res.status} on page ${page}: ${await res.text()}`);
    const batch = await res.json();
    if (batch.length === 0) break;
    slugs.push(...batch.map((p) => p.slug));
    page += 1;
  }
  return slugs;
}

async function main() {
  const slugs = await fetchAllSlugs();
  console.log(`// ${slugs.length} posts found at ${WP_BASE_URL}\n`);

  console.log("// --- Paste into next.config.js's staticRedirects array ---");
  for (const slug of slugs) {
    console.log(`  { source: "/${slug}", destination: "/en/news-updates/${slug}", permanent: true },`);
  }

  console.log("\n// --- Paste into src/data/redirects.ts's staticRedirects array ---");
  for (const slug of slugs) {
    console.log(`  { source: "/${slug}", destination: "/en/news-updates/${slug}", permanent: true },`);
  }

  console.log(
    `\n// Sanity check: ${slugs.length} entries above should equal the post count ` +
      `Sanity ends up with after migrate-wp-posts.mjs runs. If they don't match, some ` +
      `posts were missed by one script or the other — investigate before deploying.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
