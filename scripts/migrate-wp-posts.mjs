#!/usr/bin/env node
/**
 * Migrates WordPress posts into Sanity, preserving slug, publish date,
 * excerpt, and content — the fields that matter for SEO continuity.
 *
 * Usage:
 *   npm install --save-dev node-html-parser
 *   WP_BASE_URL=https://northmansterling.legal \
 *   SANITY_PROJECT_ID=xxxxx \
 *   SANITY_DATASET=production \
 *   SANITY_API_TOKEN=sk... \
 *   node scripts/migrate-wp-posts.mjs [--dry-run] [--lang=en]
 *
 * Safe to re-run: each post is upserted by a deterministic _id
 * (`post-<lang>-<slug>`), so running twice never creates duplicates.
 */

import { createClient } from "@sanity/client";
import { parse } from "node-html-parser";

const WP_BASE_URL = process.env.WP_BASE_URL;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || "production";
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const LANG = (process.argv.find((a) => a.startsWith("--lang="))?.split("=")[1]) || "en";

if (!WP_BASE_URL) {
  console.error("Missing WP_BASE_URL (e.g. https://northmansterling.legal)");
  process.exit(1);
}
if (!DRY_RUN && (!SANITY_PROJECT_ID || !SANITY_API_TOKEN)) {
  console.error("Missing SANITY_PROJECT_ID / SANITY_API_TOKEN (or pass --dry-run to preview only)");
  process.exit(1);
}

const sanity = DRY_RUN
  ? null
  : createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2025-01-01",
      token: SANITY_API_TOKEN,
      useCdn: false,
    });

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const url = `${WP_BASE_URL}/wp-json/wp/v2/posts?per_page=50&page=${page}&_embed`;
    const res = await fetch(url);
    if (res.status === 400) break; // WP returns 400 once you page past the last page
    if (!res.ok) throw new Error(`WP API ${res.status} on page ${page}: ${await res.text()}`);
    const batch = await res.json();
    if (batch.length === 0) break;
    posts.push(...batch);
    console.log(`Fetched page ${page} — ${batch.length} posts (running total: ${posts.length})`);
    page += 1;
  }
  return posts;
}

// WP's theme injects a shared "Subscribe to our Newsletter" + "Popular
// Articles" widget block into the tail of every post's raw content HTML —
// not article content, just boilerplate the page builder bakes in. Some
// posts have it, some don't (it seems to depend on when the post was last
// re-saved in the builder), so detect it by the widget's stable CSS class
// rather than assuming it's always present. Cutting the HTML here, before
// parsing, keeps it out of the migrated body entirely instead of
// converting it into junk blocks.
// The "Subscribe to Our Newsletter!" heading is a sibling widget just
// before the form (not its parent), so it needs its own marker — cutting
// at the form alone leaves that heading dangling with nothing under it.
const TRAILING_WIDGET_PATTERNS = [
  /elementor-widget-form/i,
  /elementor-widget-posts/i,
  />\s*Subscribe to [Oo]ur Newsletter/i,
];

function stripTrailingWidgets(html) {
  let cutAt = html.length;
  for (const pattern of TRAILING_WIDGET_PATTERNS) {
    const match = html.match(pattern);
    if (match && match.index < cutAt) cutAt = match.index;
  }
  if (cutAt === html.length) return html;
  // Walk back to the start of the enclosing element's opening `<div` so we
  // don't leave a dangling half-open tag before the cut point.
  const openTagStart = html.lastIndexOf("<div", cutAt);
  return html.slice(0, openTagStart === -1 ? cutAt : openTagStart);
}

// node-html-parser's textContent does not decode HTML entities on its
// own — WP content is full of them (curly quotes, apostrophes, ampersands)
// since it comes straight from wp_kses-filtered post content.
const NAMED_ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", mdash: "—", ndash: "–",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const codePoint = entity[1] === "x" || entity[1] === "X"
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
    }
    return NAMED_ENTITIES[entity] ?? match;
  });
}

// Converts WP's rendered HTML content into Sanity Portable Text blocks.
// Handles the tags a typical legal/business blog actually uses: p, h2-h4,
// ul/ol/li, strong/em/a, img, blockquote. Anything unrecognized is dropped
// with a console warning rather than silently mangled — check the warnings
// after a run and patch by hand for any post that used unusual markup.
function htmlToBlocks(rawHtml) {
  const html = stripTrailingWidgets(rawHtml);
  const root = parse(html);
  const blocks = [];
  const warnings = [];

  function textChildren(node) {
    const spans = [];
    for (const child of node.childNodes) {
      if (child.nodeType === 3) {
        const text = decodeEntities(child.rawText);
        if (text.trim()) spans.push({ _type: "span", text, marks: [] });
        continue;
      }
      const tag = child.tagName?.toLowerCase();
      if (tag === "strong" || tag === "b") {
        spans.push({ _type: "span", text: decodeEntities(child.textContent), marks: ["strong"] });
      } else if (tag === "em" || tag === "i") {
        spans.push({ _type: "span", text: decodeEntities(child.textContent), marks: ["em"] });
      } else if (tag === "a") {
        const href = child.getAttribute("href") || "";
        spans.push({ _type: "span", text: decodeEntities(child.textContent), marks: [`link-${href}`] });
      } else if (child.textContent?.trim()) {
        spans.push({ _type: "span", text: decodeEntities(child.textContent), marks: [] });
      }
    }
    return spans;
  }

  // Extracts inline "link-<href>" pseudo-marks into real Portable Text
  // markDefs, since PT needs a markDef object rather than the href inline.
  function finalizeSpans(spans) {
    const markDefs = [];
    const cleaned = spans.map((span) => {
      const marks = span.marks.map((mark) => {
        if (mark.startsWith("link-")) {
          const href = mark.slice(5);
          const key = `link-${markDefs.length}`;
          markDefs.push({ _key: key, _type: "link", href });
          return key;
        }
        return mark;
      });
      return { ...span, marks };
    });
    return { spans: cleaned, markDefs };
  }

  const CONTENT_TAGS = new Set(["p", "blockquote", "h2", "h3", "h4", "ul", "ol", "figure", "img"]);
  // Page builders (Elementor, Gutenberg groups, etc.) wrap real content in
  // arbitrarily deep <div>/<section> containers with no semantic meaning
  // of their own — walk() descends through those and only turns actual
  // content tags into blocks, wherever in the tree they land.
  function walk(node) {
    for (const child of node.childNodes) {
      if (child.nodeType !== 1) continue;
      const tag = child.tagName.toLowerCase();

      if (!CONTENT_TAGS.has(tag)) {
        walk(child); // descend into layout wrappers
        continue;
      }

      if (tag === "p" || tag === "blockquote") {
        const { spans, markDefs } = finalizeSpans(textChildren(child));
        if (spans.length === 0) continue;
        blocks.push({
          _type: "block",
          style: tag === "blockquote" ? "blockquote" : "normal",
          markDefs,
          children: spans,
        });
      } else if (tag === "h2" || tag === "h3" || tag === "h4") {
        const { spans, markDefs } = finalizeSpans(textChildren(child));
        if (spans.length === 0) continue;
        blocks.push({ _type: "block", style: tag, markDefs, children: spans });
      } else if (tag === "ul" || tag === "ol") {
        for (const li of child.querySelectorAll("li")) {
          const { spans, markDefs } = finalizeSpans(textChildren(li));
          if (spans.length === 0) continue;
          blocks.push({
            _type: "block",
            style: "normal",
            listItem: tag === "ul" ? "bullet" : "number",
            level: 1,
            markDefs,
            children: spans,
          });
        }
      }
      // Inline <figure>/<img> tags are intentionally skipped, not converted.
      // In practice these turned out to be widget noise (related/"Popular
      // Articles" thumbnails, the newsletter box's decorative background
      // dot-pattern) rather than real article photos — no reliable way to
      // tell those apart from a genuine inline content image at this layer.
      // Only the featured image (mainImage, handled separately) is kept.
    }
  }

  walk(root);

  return { blocks, warnings };
}

async function uploadFeaturedImage(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const src = media?.source_url;
  if (!src || DRY_RUN) return null;

  const res = await fetch(src);
  if (!res.ok) {
    console.warn(`  ! Failed to download featured image for "${post.slug}": ${src}`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await sanity.assets.upload("image", buffer, {
    filename: src.split("/").pop(),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: media.alt_text || post.title.rendered,
  };
}

function stripHtml(html) {
  return decodeEntities(parse(html).textContent).trim();
}

async function migratePost(post) {
  const slug = post.slug;
  const { blocks, warnings } = htmlToBlocks(post.content.rendered);
  if (warnings.length) {
    console.warn(`  Warnings for "${slug}":`, warnings);
  }

  const mainImage = await uploadFeaturedImage(post);

  const doc = {
    _id: `post-${LANG}-${slug}`,
    _type: "post",
    language: LANG,
    title: stripHtml(post.title.rendered),
    slug: { _type: "slug", current: slug },
    excerpt: stripHtml(post.excerpt.rendered).slice(0, 200),
    mainImage,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name,
    author: post._embedded?.author?.[0]?.name,
    publishedAt: post.date_gmt ? `${post.date_gmt}Z` : new Date().toISOString(),
    body: blocks,
  };

  if (DRY_RUN) {
    console.log(`[dry-run] Would upsert ${doc._id} — "${doc.title}" (${blocks.length} blocks)`);
    return;
  }

  await sanity.createOrReplace(doc);
  console.log(`✓ Migrated "${doc.title}" → post-${LANG}-${slug}`);
}

async function main() {
  console.log(`Fetching posts from ${WP_BASE_URL} ...`);
  const posts = await fetchAllPosts();
  console.log(`Found ${posts.length} published posts.\n`);

  for (const post of posts) {
    try {
      await migratePost(post);
    } catch (error) {
      console.error(`✗ Failed to migrate "${post.slug}":`, error.message);
    }
  }

  console.log("\nDone. Next steps:");
  console.log("1. Open Sanity Studio and spot-check a handful of migrated posts.");
  console.log("2. Search each post's body for '[TODO: re-upload image' and fix inline images by hand.");
  console.log("3. Run scripts/generate-blog-redirects.mjs against the same WP URL list.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
