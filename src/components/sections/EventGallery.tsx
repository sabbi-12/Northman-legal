"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

type EventItem = Dictionary["eventGallery"]["events"][number];

const EASE = [0.16, 1, 0.3, 1] as const;

export function EventGallery({ dict, lang: _lang }: { dict: Dictionary; lang: Locale }) {
  const events = dict.eventGallery.events;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section
      id="event-gallery"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-cream"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/backgrounds/event-gallery-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-35 blur-md saturate-[0.6]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/65 via-navy/5 to-navy/65"
        aria-hidden="true"
      />

      <div className="container-header relative">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="block h-px w-12 bg-cream" aria-hidden="true" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream drop-shadow-[0_1px_3px_rgba(4,8,15,0.8)]">
              {dict.eventGallery.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">{dict.eventGallery.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60 md:text-right">
            {dict.eventGallery.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {events[0] && (
            <EventRowNumbered
              event={events[0]}
              index={0}
              entrance={entrance}
              kicker={dict.eventGallery.kickerEngagements}
            />
          )}
          {events[1] && (
            <EventRowQuoted
              event={events[1]}
              index={1}
              entrance={entrance}
              kicker={dict.eventGallery.kickerRecognition}
            />
          )}
        </div>
      </div>
    </section>
  );
}

type RowProps = { event: EventItem; index: number; entrance: false | undefined };

function EventPhoto({
  event,
  priority,
  frameSide,
  fit = "cover",
}: {
  event: EventItem;
  priority: boolean;
  frameSide: "start" | "end";
  fit?: "cover" | "contain";
}) {
  return (
    <div className="group relative">
      <div
        className={`absolute -bottom-5 h-full w-full rounded-institutional border border-accent/30 transition-transform duration-500 group-hover:-bottom-6 ${
          frameSide === "end" ? "-end-5 group-hover:-end-6" : "-start-5 group-hover:-start-6"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-2.5 h-full w-full rounded-institutional bg-accent/10 ${
          frameSide === "end" ? "-end-2.5" : "-start-2.5"
        }`}
        aria-hidden="true"
      />
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-institutional border border-cream/15 shadow-institutional ${
          fit === "contain" ? "bg-navy-dark" : ""
        }`}
      >
        <Image
          src={event.imageSrc}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 520px, 90vw"
          quality={95}
          className={
            fit === "contain"
              ? "object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              : "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          }
          priority={priority}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function EventRowNumbered({ event, index, entrance, kicker }: RowProps & { kicker: string }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={entrance ?? { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="order-2 lg:order-1"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream drop-shadow-[0_1px_3px_rgba(4,8,15,0.8)]">
          {kicker}
        </span>
        <h3 className="mt-6 text-2xl font-medium leading-snug sm:text-3xl">{event.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">{event.description}</p>
      </motion.div>

      <motion.div
        initial={entrance ?? { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="order-1 lg:order-2"
      >
        <EventPhoto event={event} priority={index === 0} frameSide="end" />
      </motion.div>
    </div>
  );
}

function EventRowQuoted({ event, index, entrance, kicker }: RowProps & { kicker: string }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={entrance ?? { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <EventPhoto event={event} priority={index === 0} frameSide="start" />
      </motion.div>

      <motion.div
        initial={entrance ?? { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream drop-shadow-[0_1px_3px_rgba(4,8,15,0.8)]">
          {kicker}
        </span>
        <h3 className="mt-6 text-2xl font-medium leading-snug sm:text-3xl">{event.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">{event.description}</p>
      </motion.div>
    </div>
  );
}
