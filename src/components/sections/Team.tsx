"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Team({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const team = dict.aboutPage.team;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {team.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">{team.body}</p>
        </motion.div>
      </div>
    </section>
  );
}
