"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Step = { milestone: string; duration: string };

export function ServiceProcessTimeline({
  heading,
  note,
  steps,
  milestoneLabel,
  durationLabel,
}: {
  heading: string;
  note: string;
  steps: Step[];
  milestoneLabel: string;
  durationLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">{heading}</h2>
        <p className="mt-3 text-sm text-slate-mid dark:text-cream/60">{note}</p>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 overflow-x-auto rounded-institutional border border-navy/10 dark:border-cream/10"
        >
          <table className="w-full min-w-[520px] border-collapse text-start text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-white dark:border-cream/10 dark:bg-navy/40">
                <th className="w-12 px-5 py-3 text-start font-semibold text-slate-dark dark:text-cream">#</th>
                <th className="px-5 py-3 text-start font-semibold text-slate-dark dark:text-cream">{milestoneLabel}</th>
                <th className="px-5 py-3 text-start font-semibold text-slate-dark dark:text-cream">
                  {durationLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr
                  key={step.milestone}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-navy/20"
                      : "bg-cream/60 dark:bg-navy/30"
                  }
                >
                  <td className="px-5 py-3 text-slate-mid dark:text-cream/60">{index + 1}</td>
                  <td className="px-5 py-3 font-medium text-slate-dark dark:text-cream">{step.milestone}</td>
                  <td className="px-5 py-3 text-slate-mid dark:text-cream/70">{step.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
