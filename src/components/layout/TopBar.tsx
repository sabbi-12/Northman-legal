import { ExternalLink } from "lucide-react";

import { Ticker } from "@/components/ui/Ticker";
import { CLIENT_PORTAL_URL } from "@/lib/seo/constants";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function TopBar({ dict }: { dict: Dictionary; lang: Locale }) {
  return (
    <div className="hidden bg-navy text-cream md:block">
      <div className="container-institutional flex items-center gap-6 py-0">
        <span className="shrink-0 border-e border-cream/20 py-2 pe-6 text-xs font-medium uppercase tracking-widest text-gold">
          {dict.topBar.updatesLabel}
        </span>
        <Ticker items={dict.topBar.tickerItems} />
        <a
          href={CLIENT_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 border-s border-cream/20 py-2 ps-6 text-xs font-medium uppercase tracking-widest transition-colors hover:text-gold"
        >
          {dict.topBar.clientPortal}
          <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
