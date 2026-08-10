"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Section = {
  heading: string;
  body: string;
  items?: string[];
};

export function SimpleServiceDetail({ sections }: { sections: Section[] }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-20 dark:bg-navy/30">
      <div className="container-institutional max-w-3xl">
        <div className="divide-y divide-navy/10 dark:divide-cream/10">
          {sections.map((section) => (
            <motion.div
              key={section.heading}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="py-10 first:pt-0"
            >
              <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
                {section.body}
              </p>
              {section.items && (
                <ul className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={17}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
