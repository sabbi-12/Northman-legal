import { Bell } from "lucide-react";
import { Ticker } from "@/components/ui/Ticker";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import type { NewsPost } from "@/lib/sanity/types";

export function TopBar({
  dict,
  lang,
  posts,
}: {
  dict: Dictionary;
  lang: Locale;
  posts: NewsPost[];
}) {
  return (
    <div className="hidden !bg-white md:block">
      <div className="container-header flex h-14 items-center gap-5">
        <a
          href={`/${lang}/news-updates`}
          className="flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-mid transition-colors hover:text-navy"
        >
          <Bell size={14} strokeWidth={1.75} className="text-button" aria-hidden="true" />
          {dict.topBar.updatesLabel}
        </a>

        <span className="h-5 w-px shrink-0 bg-navy/10" aria-hidden="true" />

        <Ticker
          posts={posts}
          latestNewsLabel={dict.topBar.latestNewsLabel}
          previousLabel={dict.topBar.previousUpdate}
          nextLabel={dict.topBar.nextUpdate}
        />
      </div>
    </div>
  );
}
