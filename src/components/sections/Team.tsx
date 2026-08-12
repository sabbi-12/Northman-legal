"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Team({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const team = dict.aboutPage.team;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional grid gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-start">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="font-serif text-6xl font-medium leading-none text-accent sm:text-7xl">35+</span>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-mid dark:text-cream/60">
            {team.statLabel}
          </p>

          <div className="relative mt-8 w-full max-w-xs">
            <div
              className="absolute -bottom-3 -end-3 h-full w-full rounded-institutional border border-accent/40"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-institutional shadow-institutional">
              <ParallaxLayer strength={16} className="absolute inset-0">
                <Image
                  src="/images/about/global-team.jpg"
                  alt={team.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 320px, 90vw"
                  quality={95}
                  className="object-cover"
                />
              </ParallaxLayer>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={entrance ?? { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          >
            <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
              {team.heading}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-mid dark:text-cream/70">
              {team.body}
            </p>
          </motion.div>

          <motion.div
            initial={entrance ?? { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-navy/10 pt-6 dark:border-cream/10"
          >
            {team.eventNames.map((name) => (
              <span
                key={name}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-mid dark:text-cream/50"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
