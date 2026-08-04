import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityPostDoc = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: SanityImageSource & { alt?: string };
  body: PortableTextBlock[];
  publishedAt: string;
  category?: string;
  author?: string;
  language: "en" | "ar";
};

// Normalized shape used by components — decoupled from the raw Sanity
// document so all Sanity-specific parsing (e.g. image URL resolution)
// lives only in lib/sanity/posts.ts.
export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: PortableTextBlock[];
  date: string;
  modifiedDate: string;
  featuredImage: { url: string; alt: string } | null;
  categories: string[];
  authorName: string | null;
};
