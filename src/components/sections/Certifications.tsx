"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Certifications({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-navy/10 bg-white py-20 dark:border-cream/10 dark:bg-navy/30">
      <div className="container-institutional text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream"
        >
          {dict.certifications.title}
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-mid dark:text-cream/70">
          {dict.certifications.subtitle}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {dict.certifications.items.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative h-28 w-28 sm:h-32 sm:w-32">
                <Image
                  src={cert.imageSrc}
                  alt={cert.name}
                  fill
                  sizes="128px"
                  quality={100}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
