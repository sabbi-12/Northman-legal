import type { StructureResolver } from "sanity/structure";

// Default structureTool() lists documents by _updatedAt desc (last edited),
// not publishedAt — after the one-time WP migration touched all 56 posts in
// a different order than their real publish dates, that made Studio's list
// look completely out of sync with the live site, which always queries
// `order(publishedAt desc)`. This mirrors that same order so both match.
export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("News & Updates Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("News & Updates Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "post"),
    ]);
