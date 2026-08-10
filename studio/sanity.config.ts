import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// These must match NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET
// in the Next.js app's .env.local — both point at the same Sanity project.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "northman-sterling-studio",
  title: "Northman Sterling — Content",

  projectId,
  dataset,

  plugins: [
    // The actual document-editing UI (content pane, document list, "+ new
    // document" flow) — without this the Studio has no desk structure
    // registered at all, so clicking "New document" resolves the route but
    // renders a blank pane instead of a form.
    structureTool(),
    // Vision lets an editor run raw GROQ queries from within the Studio —
    // useful for sanity-checking the same queries lib/sanity/posts.ts uses.
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
