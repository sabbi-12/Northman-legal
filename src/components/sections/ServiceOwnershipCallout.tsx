"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceOwnershipCallout({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-16 dark:bg-navy/30">
      <div className="container-institutional">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-e-institutional border-s-4 border-accent bg-accent/5 p-8 dark:bg-accent/10 md:p-10"
        >
          <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">{heading}</h2>
          <div className="mt-5 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-slate-mid dark:text-cream/70">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
