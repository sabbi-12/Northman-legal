"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Section = {
  heading: string;
  body: string;
  items?: string[];
};

function SectionBody({ section, entrance }: { section: Section; entrance: false | undefined }) {
  return (
    <motion.div
      initial={entrance ?? { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="py-10 first:pt-0"
    >
      <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">{section.heading}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">{section.body}</p>
      {section.items && (
        <ul className="mt-6 space-y-3">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export function SimpleServiceDetail({
  sections,
  imageSrc,
  imageAlt,
  imageSide = "right",
}: {
  sections: Section[];
  // Optional per-service photo. When present, the first section sits
  // beside it (left or right per imageSide) instead of full-width text —
  // remaining sections stay full-width below. Falls back to the plain
  // text-only layout when no image is supplied.
  imageSrc?: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const [firstSection, ...restSections] = sections;

  if (!imageSrc || !firstSection) {
    return (
      <section className="bg-white py-20 dark:bg-navy/30">
        <div className="container-institutional max-w-3xl">
          <div className="divide-y divide-navy/10 dark:divide-cream/10">
            {sections.map((section) => (
              <SectionBody key={section.heading} section={section} entrance={entrance} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 dark:bg-navy/30">
      <div className="container-institutional max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            initial={entrance ?? { opacity: 0, x: imageSide === "right" ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className={imageSide === "right" ? "md:order-1" : "md:order-2"}
          >
            <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">
              {firstSection.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">{firstSection.body}</p>
            {firstSection.items && (
              <ul className="mt-6 space-y-3">
                {firstSection.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            initial={entrance ?? { opacity: 0, x: imageSide === "right" ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`relative aspect-[4/3] overflow-hidden rounded-institutional shadow-institutional ${
              imageSide === "right" ? "md:order-2" : "md:order-1"
            }`}
          >
            <Image src={imageSrc} alt={imageAlt ?? ""} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </div>

        {restSections.length > 0 && (
          <div className="mt-10 divide-y divide-navy/10 dark:divide-cream/10">
            {restSections.map((section) => (
              <SectionBody key={section.heading} section={section} entrance={entrance} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
