"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const VERT_MARGIN_VH = 8;

type EventItem = Dictionary["eventGallery"]["events"][number];

export function EventGallery({ dict }: { dict: Dictionary }) {
  const events = dict.eventGallery.events;

  return (
    <section id="event-gallery" className="scroll-mt-24 bg-navy py-24 text-cream">
      <div className="container-institutional text-center">
        <h2 className="text-3xl font-medium md:text-4xl">{dict.eventGallery.title}</h2>
      </div>

      <div className="relative mx-auto mt-4 flex w-full max-w-[1000px] flex-col items-center gap-[8vh] px-4">
        {events.map((event, index) => (
          <StickyEventCard key={event.title} event={event} priority={index === 0} />
        ))}
      </div>
    </section>
  );
}

function StickyEventCard({ event, priority }: { event: EventItem; priority: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({ target: container });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - VERT_MARGIN_VH}% 0px`,
    once: true,
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => {
      let animationValue = 1;
      if (value > maxScrollY) {
        animationValue = Math.max(0, 1 - (value - maxScrollY) / 10000);
      }
      scale.set(animationValue);
      filter.set((1 - animationValue) * 100);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxScrollY]);

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="sticky w-full overflow-hidden rounded-institutional border border-cream/10 bg-navy/40"
      style={{
        scale,
        rotate: filter,
        height: `${100 - 2 * VERT_MARGIN_VH}vh`,
        top: `${VERT_MARGIN_VH}vh`,
      }}
    >
      <motion.div className="relative h-full w-full" style={{ rotate: negateFilter }}>
        <Image
          src={event.imageSrc}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 1000px, 100vw"
          quality={95}
          className="object-cover object-center"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <h3 className="text-lg font-medium leading-snug sm:text-xl lg:text-2xl">{event.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/80">{event.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
