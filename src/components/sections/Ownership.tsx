"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Ownership({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const ownership = dict.aboutPage.ownership;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-start">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-institutional shadow-institutional">
            <ParallaxLayer strength={16} className="absolute inset-0">
              <Image
                src="/images/about/gavel-and-scales-desk.jpg"
                alt={ownership.imageAlt}
                fill
                sizes="(min-width: 1024px) 360px, 90vw"
                quality={95}
                className="object-cover"
              />
            </ParallaxLayer>
          </div>
        </motion.div>

        <div>
          <h2 className="text-3xl font-medium leading-tight text-slate-dark md:text-4xl dark:text-cream">
            {ownership.heading}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {ownership.body}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ownership.items.map((item, index) => (
              <motion.div
                key={item}
                initial={entrance ?? { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
