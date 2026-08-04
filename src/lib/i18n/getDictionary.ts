import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((mod) => mod.default),
  ar: () => import("./dictionaries/ar.json").then((mod) => mod.default),
};

export async function getDictionary(locale: Locale) {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
