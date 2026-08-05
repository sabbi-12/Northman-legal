"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type EntityRow = { label: string; value: string };
type Entity = {
  id: string;
  name: string;
  note?: string;
  rows: EntityRow[];
  keyFeatures?: string[];
  recommendedPractices?: string[];
};

export function ServiceEntityComparison({
  heading,
  entities,
  keyFeaturesLabel,
  recommendedPracticesLabel,
}: {
  heading: string;
  entities: Entity[];
  keyFeaturesLabel: string;
  recommendedPracticesLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional">
        <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">{heading}</h2>

        <div className="mt-12 space-y-14">
          {entities.map((entity, index) => (
            <motion.div
              key={entity.id}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              className="border-t border-navy/10 pt-10 first:border-t-0 first:pt-0 dark:border-cream/10"
            >
              <h3 className="text-xl font-medium text-slate-dark dark:text-cream">{entity.name}</h3>
              {entity.note && (
                <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">{entity.note}</p>
              )}

              <div className="mt-6 overflow-x-auto rounded-institutional border border-navy/10 dark:border-cream/10">
                <table className="w-full min-w-[480px] border-collapse text-start text-sm">
                  <tbody>
                    {entity.rows.map((row, rowIndex) => (
                      <tr
                        key={row.label}
                        className={rowIndex % 2 === 0 ? "bg-cream dark:bg-navy/40" : "bg-white dark:bg-navy/20"}
                      >
                        <th
                          scope="row"
                          className="w-1/2 px-5 py-3 text-start font-medium text-slate-dark dark:text-cream"
                        >
                          {row.label}
                        </th>
                        <td className="px-5 py-3 text-slate-mid dark:text-cream/70">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(entity.keyFeatures || entity.recommendedPractices) && (
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  {entity.keyFeatures && (
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-accent">{keyFeaturesLabel}</p>
                      <ul className="mt-3 space-y-2.5">
                        {entity.keyFeatures.map((feature) => (
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
                  {entity.recommendedPractices && (
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                        {recommendedPracticesLabel}
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {entity.recommendedPractices.map((practice) => (
                          <li key={practice} className="flex items-start gap-2.5">
                            <CheckCircle2
                              size={16}
                              strokeWidth={1.75}
                              className="mt-0.5 shrink-0 text-accent"
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-relaxed text-slate-dark dark:text-cream/90">
                              {practice}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
