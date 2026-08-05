"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Item = {
  title: string;
  description: string;
  keyFeaturesLabel?: string;
  keyFeatures?: string[];
};

export function ServiceSecondaryEntities({ items }: { items: Item[] }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-16 dark:bg-navy/30">
      <div className="container-institutional max-w-3xl space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={entrance ?? { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
          >
            <h3 className="text-lg font-medium text-slate-dark dark:text-cream">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">{item.description}</p>

            {item.keyFeatures && (
              <div className="mt-4">
                {item.keyFeaturesLabel && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.keyFeaturesLabel}
                  </p>
                )}
                <ul className="mt-3 space-y-2.5">
                  {item.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
