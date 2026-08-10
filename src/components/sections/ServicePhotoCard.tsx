"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

// 6 real photos supplied for the Home services grid, assigned to the 6
// featured services by index (stable per-card, not re-randomized on every
// render) rather than tied to a specific practice area's meaning — the
// brief asked for the photos used "randomly" as texture, not as literal
// illustrations of each practice.
const SERVICE_PHOTOS = [
  "/images/services-bg/service-bg-1.jpg",
  "/images/services-bg/service-bg-2.jpg",
  "/images/services-bg/service-bg-3.jpg",
  "/images/services-bg/service-bg-4.jpg",
  "/images/services-bg/service-bg-5.jpg",
  "/images/services-bg/service-bg-6.jpg",
];

export type ServiceCardData = {
  id: string;
  title: string;
  subtext: string;
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
  const photo = SERVICE_PHOTOS[index % SERVICE_PHOTOS.length];

  return (
    <motion.div
      initial={entrance ?? { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: EASE }}
    >
      <Link
        href={href}
        className="group relative block aspect-square w-full overflow-hidden rounded-institutional shadow-institutional"
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

        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
          <h3 className="text-2xl font-semibold leading-snug text-white drop-shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-1 md:text-[1.75rem]">
            {service.title}
          </h3>

          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-white/90">{service.subtext}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              {learnMoreLabel}
              <ArrowIcon
                size={15}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
