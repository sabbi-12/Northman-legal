"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60 }),
};

export function EventGallery({ dict }: { dict: Dictionary }) {
  const events = dict.eventGallery.events;
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function go(nextIndex: number, dir: number) {
    setSlide([(nextIndex + events.length) % events.length, dir]);
  }

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  const active = events[index];

  return (
    <section id="event-gallery" className="scroll-mt-24 bg-navy py-24 text-cream">
      <div className="container-institutional">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-medium md:text-4xl">{dict.eventGallery.title}</h2>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous event"
              className="flex h-10 w-10 items-center justify-center rounded-institutional border border-cream/20 transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft size={18} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next event"
              className="flex h-10 w-10 items-center justify-center rounded-institutional border border-cream/20 transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div
          className="relative mx-auto mt-12 aspect-[3/2] w-full max-w-[1000px] overflow-hidden rounded-institutional border border-cream/10 bg-navy/40 sm:aspect-[3/2]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={active.title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                quality={95}
                className="object-cover object-center"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                <h3 className="text-lg font-medium leading-snug sm:text-xl lg:text-2xl">{active.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/80">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {events.map((event, i) => (
            <button
              key={event.title}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to ${event.title}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-accent" : "w-4 bg-cream/25 hover:bg-cream/45"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
