"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import { TiltCard } from "@/components/ui/TiltCard";
import { getServicePhoto } from "@/lib/data/servicePhotos";

export type ServiceCardData = {
  id: string;
  title: string;
  subtext: string;
  // Optional per-service photo. Falls back to the cycled SERVICE_PHOTOS
  // texture set below when a service doesn't have a real photo yet — fill
  // this in per service as real photos are supplied, no component change
  // needed.
  imageSrc?: string;
};

export function ServicePhotoCard({
  service,
  lang,
  learnMoreLabel,
  href,
  index,
}: {
  service: ServiceCardData;
  lang: Locale;
  learnMoreLabel: string;
  href: string;
  index: number;
}) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const photo = service.imageSrc || getServicePhoto(service.id, index);

  // Mixed entrance set, cycled by index so consecutive rows don't all move
  // the same way — some cards slide from the side, some rise up, some
  // scale in, some rotate in slightly. No delay before motion starts;
  // only a small per-card offset so a row doesn't move as one rigid block.
  const variant = index % 5;
  const initialOffset =
    variant === 0
      ? { opacity: 0, x: -70 }
      : variant === 1
        ? { opacity: 0, x: 70 }
        : variant === 2
          ? { opacity: 0, y: 55 }
          : variant === 3
            ? { opacity: 0, scale: 0.85 }
            : { opacity: 0, rotate: -6, y: 40 };
  const springKeys =
    variant === 0 || variant === 1
      ? (["x"] as const)
      : variant === 2
        ? (["y"] as const)
        : variant === 3
          ? (["scale"] as const)
          : (["rotate", "y"] as const);
  const delay = (index % 6) * 0.07;

  const card = (
    <Link
      href={href}
      className="group relative flex min-h-[16rem] w-full flex-col justify-end overflow-hidden rounded-institutional shadow-institutional"
    >
      <Image
        src={photo}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-sm"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/35 to-navy/10 transition-colors duration-500 ease-out group-hover:from-navy/90 group-hover:via-navy/55"
        aria-hidden="true"
      />

      <div className="relative flex flex-col justify-end p-7 md:p-8">
        <h3 className="text-xl font-semibold leading-snug text-white drop-shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-2xl md:text-[1.75rem]">
          {service.title}
        </h3>

        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="min-h-0 overflow-hidden">
            <p className="mt-3 text-sm leading-relaxed text-white/90">{service.subtext}</p>
            <span className="mb-1 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              {learnMoreLabel}
              <ArrowIcon
                size={15}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <motion.div
      initial={entrance ?? initialOffset}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        ...Object.fromEntries(
          springKeys.map((key) => [key, { type: "spring", stiffness: 120, damping: 16, mass: 0.7, delay }])
        ),
      }}
    >
      <TiltCard className="h-full">{card}</TiltCard>
    </motion.div>
  );
}
