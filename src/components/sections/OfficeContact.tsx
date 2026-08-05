"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, PhoneCall, Mail } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ORGANIZATION } from "@/lib/seo/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function OfficeContact({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const office = dict.aboutPage.office;

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-institutional">
        <span className="block h-px w-14 origin-left bg-accent rtl:origin-right" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-medium uppercase tracking-wide text-slate-dark md:text-3xl dark:text-cream">
          {office.heading}
        </h2>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 grid gap-8 rounded-institutional border border-navy/10 bg-cream p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 sm:grid-cols-2 md:grid-cols-4 md:p-10"
        >
          <div>
            <p className="text-sm font-semibold text-slate-dark dark:text-cream">{dict.footer.officeName}</p>
          </div>

          <div className="flex items-start gap-2.5 md:col-span-2">
            <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-sm leading-relaxed text-slate-mid dark:text-cream/70">
              {dict.footer.officeAddress}
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <a
              href={`mailto:${ORGANIZATION.email}`}
              className="text-sm text-slate-mid transition-colors hover:text-navy dark:text-cream/70 dark:hover:text-cream"
            >
              {ORGANIZATION.email}
            </a>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-sm text-slate-mid dark:text-cream/70">
              {office.mobileLabel}:{" "}
              <a href={`tel:${ORGANIZATION.telephone}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                {ORGANIZATION.telephoneDisplay}
              </a>
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <PhoneCall size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <span className="text-sm text-slate-mid dark:text-cream/70">
              {office.landlineLabel}:{" "}
              <a href={`tel:${ORGANIZATION.landline}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                {ORGANIZATION.landlineDisplay}
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
