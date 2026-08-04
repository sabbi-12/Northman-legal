"use client";

import type { TickerItem } from "@/types";

export function Ticker({ items }: { items: TickerItem[] }) {
  if (items.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly.
  const loopItems = [...items, ...items];

  return (
    <div className="relative flex-1 overflow-hidden" aria-label="Current updates">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap py-2 rtl:[animation-direction:reverse]">
        {loopItems.map((item, index) => (
          <span key={`${item.id}-${index}`} className="text-sm text-cream/90">
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-gold">
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
