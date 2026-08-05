"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Team({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const team = dict.aboutPage.team;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <div className="max-w-2xl">
          <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {team.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-mid dark:text-cream/70">{team.body}</p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {team.members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={entrance ?? { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              className="flex flex-col items-center rounded-institutional border border-navy/10 bg-white p-6 text-center shadow-institutional dark:border-cream/10 dark:bg-navy/40"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full bg-cream dark:bg-navy/60">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  sizes="112px"
                  quality={95}
                  className="object-cover object-top"
                />
              </div>
              <h3 className="mt-4 text-base font-medium text-slate-dark dark:text-cream">{member.name}</h3>
              <p className="mt-1 text-sm text-accent">{member.role}</p>
              <p className="mt-1 text-xs text-slate-mid dark:text-cream/60">{member.location}</p>
              <span
                aria-hidden="true"
                className="mt-4 flex h-8 w-8 items-center justify-center rounded-institutional border border-navy/10 text-slate-mid/50 dark:border-cream/10 dark:text-cream/30"
              >
                <Linkedin size={14} strokeWidth={1.75} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
