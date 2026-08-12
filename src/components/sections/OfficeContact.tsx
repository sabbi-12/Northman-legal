"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, PhoneCall, Mail } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ORGANIZATION } from "@/lib/seo/constants";
import { ContactForm } from "@/components/sections/ContactForm";
import { TiltCard } from "@/components/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1] as const;

// `withForm` is opt-in — this component is shared across About Us, Contact
// Us, Services, and the service-detail pages, and only About Us wants the
// paired quick-inquiry form. Every other caller keeps the original
// single-column static info card unchanged.
export function OfficeContact({ dict, withForm = false }: { dict: Dictionary; withForm?: boolean }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const office = dict.aboutPage.office;

  const infoCard = (
    <motion.div
      initial={entrance ?? { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className={
        withForm
          ? "grid gap-6 rounded-institutional border border-navy/10 bg-cream p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40"
          : "grid gap-8 rounded-institutional border border-navy/10 bg-cream p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 sm:grid-cols-2 md:grid-cols-4 md:p-10"
      }
    >
      <div>
        <p className="text-sm font-semibold text-slate-dark dark:text-cream">{dict.footer.officeName}</p>
      </div>

      <div className={`flex items-start gap-2.5 ${withForm ? "" : "md:col-span-2"}`}>
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
  );

  if (!withForm) {
    return (
      <section className="bg-white py-24 dark:bg-navy/30">
        <div className="container-institutional">
          <h2 className="text-2xl font-medium uppercase tracking-wide text-slate-dark md:text-3xl dark:text-cream">
            {office.heading}
          </h2>
          <TiltCard maxTilt={5} className="mt-8 block">
            {infoCard}
          </TiltCard>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24 dark:bg-navy/30">
      <div className="container-header grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-medium uppercase tracking-wide text-slate-dark md:text-3xl dark:text-cream">
            {office.heading}
          </h2>
          <div className="mt-8">{infoCard}</div>
        </div>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          <TiltCard
            maxTilt={2.5}
            className="block rounded-institutional border border-navy/10 bg-cream p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 md:p-10"
          >
            <p className="text-base font-medium text-slate-dark dark:text-cream">
              {dict.contactPage.formSectionSubtitle}
            </p>
            <div className="mt-6">
              <ContactForm dict={dict} />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
