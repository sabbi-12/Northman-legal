"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { buildFAQSchema } from "@/components/seo/schemas/faqPage";

// Content is passed in rather than read from a fixed dict path, so each
// page using this (About Us, Home, ...) can show its own distinct set of
// questions instead of repeating the same FAQ verbatim across pages.
export function FAQ({
  title,
  items,
}: {
  title: string;
  items: Array<{ question: string; answer: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional max-w-3xl">
        <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">
          {title}
        </h2>

        <div className="mt-8 divide-y divide-navy/10 border-y border-navy/10 dark:divide-cream/10 dark:border-cream/10">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-start"
                >
                  <span className="text-base font-medium text-slate-dark dark:text-cream">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.75}
                    className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <JsonLd data={buildFAQSchema(items)} />
    </section>
  );
}
