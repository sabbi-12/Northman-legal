"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ORGANIZATION } from "@/lib/seo/constants";

export function LetsConnect({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section id="lets-connect" className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-header grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
            {dict.letsConnect.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {dict.letsConnect.subtitle}
          </p>

          <ul className="mt-10 space-y-5 text-sm text-slate-mid dark:text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {dict.footer.officeName}, {dict.footer.officeAddress}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} strokeWidth={1.75} className="shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${ORGANIZATION.telephone}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                {ORGANIZATION.telephoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} strokeWidth={1.75} className="shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${ORGANIZATION.email}`} className="transition-colors hover:text-navy dark:hover:text-cream">
                {ORGANIZATION.email}
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-institutional border border-navy/10 bg-white p-8 shadow-institutional dark:border-cream/10 dark:bg-navy/40 md:p-10"
        >
          <ContactForm dict={dict} submitLabel={dict.letsConnect.submit} />
        </motion.div>
      </div>
    </section>
  );
}
