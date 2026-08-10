"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

type EventItem = Dictionary["eventGallery"]["events"][number];

const AUTO_ADVANCE_MS = 4500;
const RESUME_AFTER_MS = 6000;
const STEP_FRACTION = 0.85;

export function EventGallery({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const events = dict.eventGallery.events;
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number>();

  // RTL browsers already reverse scrollLeft's sign/direction natively, so the
  // same "always advance forward" step keeps English and Arabic each moving
  // in their own reading direction without a separate branch per locale.
  const rtl = lang === "ar";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const advance = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const atEnd = rtl ? track.scrollLeft <= -maxScroll + 1 : track.scrollLeft >= maxScroll - 1;

      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const direction = rtl ? -1 : 1;
        track.scrollBy({ left: direction * track.clientWidth * STEP_FRACTION, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(advance);
  }, [rtl]);

  function pauseAndScheduleResume() {
    pausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_AFTER_MS);
  }

  function scrollByStep(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    pauseAndScheduleResume();
    track.scrollBy({ left: direction * track.clientWidth * STEP_FRACTION, behavior: "smooth" });
  }

  return (
    <section id="event-gallery" className="scroll-mt-24 bg-navy py-24 text-cream">
      <div className="container-header flex items-end justify-between gap-6">
        <div>
          <span className="block h-px w-12 bg-accent" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-medium md:text-4xl">{dict.eventGallery.title}</h2>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByStep(rtl ? 1 : -1)}
            aria-label={dict.eventGallery.previous}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
          >
            <ChevronLeft size={18} strokeWidth={2} className="rtl:rotate-180" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(rtl ? -1 : 1)}
            aria-label={dict.eventGallery.next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
          >
            <ChevronRight size={18} strokeWidth={2} className="rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="container-header mt-8">
        <div
          ref={trackRef}
          onPointerEnter={() => {
            pausedRef.current = true;
          }}
          onPointerLeave={() => {
            window.clearTimeout(resumeTimerRef.current);
            pausedRef.current = false;
          }}
          onFocusCapture={pauseAndScheduleResume}
          className="scrollbar-hide flex gap-6 overflow-x-auto scroll-smooth"
        >
          {events.map((event, index) => (
            <div key={event.title} className="w-[280px] shrink-0 sm:w-[340px] lg:w-[380px]">
              <EventCard event={event} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, priority }: { event: EventItem; priority: boolean }) {
  return (
    <div className="group/card relative flex w-full flex-col overflow-hidden rounded-institutional border border-cream/10 bg-navy/40 focus-within:z-10 hover:z-10">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <Image
          src={event.imageSrc}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 280px"
          quality={95}
          className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
          priority={priority}
        />
      </div>

      <div className="relative border-t border-cream/10 bg-navy p-5 sm:p-6">
        <h3 className="text-base font-medium leading-snug sm:text-lg">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/70 group-hover/card:line-clamp-none group-focus-within/card:line-clamp-none sm:text-sm">
          {event.description}
        </p>
      </div>
    </div>
  );
}
