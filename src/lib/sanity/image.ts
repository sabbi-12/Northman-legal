import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { SANITY_PROJECT_ID, SANITY_DATASET } from "./client";

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
