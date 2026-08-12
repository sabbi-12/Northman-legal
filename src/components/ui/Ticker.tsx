"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { NewsPost } from "@/lib/sanity/types";

const AUTO_ADVANCE_MS = 6000;

export function Ticker({
  posts,
  latestNewsLabel,
  previousLabel,
  nextLabel,
}: {
  posts: NewsPost[];
  latestNewsLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (posts.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % posts.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const active = posts[index];

  function goTo(next: number) {
    setIndex((next + posts.length) % posts.length);
  }

  return (
    <div className="flex min-w-0 flex-1 items-stretch overflow-hidden rounded-institutional" aria-label="Latest news">
      <span className="flex shrink-0 items-center bg-button px-3.5 text-[11px] font-semibold uppercase tracking-widest text-white">
        {latestNewsLabel}
      </span>

      <div className="relative min-w-0 flex-1 overflow-hidden bg-navy/5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.25 }}
            className="absolute inset-0 flex items-center"
          >
            <Link
              href={`/${active.language}/news-updates/${active.slug}`}
              className="truncate px-3.5 py-1.5 text-sm font-medium text-navy transition-colors hover:text-button"
            >
              {active.title}
            </Link>
          </motion.div>
        </AnimatePresence>
        {/* Reserves height so the absolutely-positioned slide has something to sit in */}
        <div className="invisible px-3.5 py-1.5 text-sm font-medium" aria-hidden="true">
          {active.title}
        </div>
      </div>

      {posts.length > 1 && (
        <div className="flex shrink-0 items-center gap-0.5 bg-navy/5 pe-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={previousLabel}
            className="flex h-6 w-6 items-center justify-center rounded-full text-slate-mid transition-colors hover:bg-navy/10 hover:text-navy"
          >
            <ChevronLeft size={15} strokeWidth={2} className="rtl:rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={nextLabel}
            className="flex h-6 w-6 items-center justify-center rounded-full text-slate-mid transition-colors hover:bg-navy/10 hover:text-navy"
          >
            <ChevronRight size={15} strokeWidth={2} className="rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
