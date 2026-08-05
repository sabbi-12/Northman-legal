"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Pillar = {
  id: string;
  title: string;
  description: string;
  items?: string[];
  cards?: string[];
};

export function ServiceSolutions({
  heading,
  pillars,
}: {
  heading: string;
  pillars: Pillar[];
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional max-w-4xl">
        <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">{heading}</h2>

        <div className="mt-14 divide-y divide-navy/10 dark:divide-cream/10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="py-10 first:pt-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-heading-en text-2xl text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-medium text-slate-dark dark:text-cream">{pillar.title}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">
                {pillar.description}
              </p>

              {pillar.items && (
                <ul className="mt-6 space-y-3">
                  {pillar.items.map((item) => (
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

              {pillar.cards && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pillar.cards.map((card) => (
                    <div
                      key={card}
                      className="flex flex-col justify-between gap-4 rounded-institutional border border-navy/10 bg-cream p-6 transition-shadow hover:shadow-institutional dark:border-cream/10 dark:bg-navy/40"
                    >
                      <p className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">{card}</p>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.75}
                        className="self-end text-accent"
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
