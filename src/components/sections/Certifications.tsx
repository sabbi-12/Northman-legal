"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Certifications({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="border-b border-navy/10 bg-white py-20 dark:border-cream/10 dark:bg-navy/30">
      <div className="container-header text-center">
        <motion.span
          initial={entrance ?? { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto block h-px w-14 bg-accent"
          aria-hidden="true"
        />
        <motion.h2
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream"
        >
          {dict.certifications.title}
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-mid dark:text-cream/70">
          {dict.certifications.subtitle}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {dict.certifications.items.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className="flex flex-col items-center gap-5 rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 lg:p-10"
            >
              <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                <Image
                  src={cert.imageSrc}
                  alt={cert.name}
                  fill
                  sizes="(min-width: 640px) 192px, 160px"
                  quality={100}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-slate-dark dark:text-cream">{cert.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
