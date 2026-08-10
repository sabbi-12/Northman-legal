import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "northman-sterling",
  deployment: {
    appId: "qcdwv2fx0lgzfcpy9upu3c8m",
  },
});
