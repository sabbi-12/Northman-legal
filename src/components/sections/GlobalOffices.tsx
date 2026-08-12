"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { TiltCard } from "@/components/ui/TiltCard";

const EASE = [0.16, 1, 0.3, 1] as const;

function toTelHref(phone: string) {
  const normalized = phone.startsWith("00") ? `+${phone.slice(2)}` : phone;
  return normalized.replace(/[^\d+]/g, "");
}

export function GlobalOffices({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const offices = dict.contactPage.offices;

  return (
    <section className="bg-cream py-24 dark:bg-navy-dark">
      <div className="container-institutional">
        <h2 className="text-center text-3xl font-medium text-slate-dark md:text-4xl dark:text-cream">
          {offices.heading}
        </h2>

        <div className="mx-auto mt-12 grid max-w-lg gap-6">
          {offices.items.map((office, index) => (
            <motion.div
              key={office.id}
              initial={entrance ?? { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
            >
              <TiltCard
                maxTilt={6}
                className="flex flex-col items-center gap-4 rounded-institutional border border-navy/10 bg-white p-6 text-center shadow-institutional dark:border-cream/10 dark:bg-navy/40"
              >
                <div className="flex flex-col items-center gap-4">
                  {office.flagCode && (
                    <span className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-navy/10 bg-white shadow-institutional dark:border-cream/10">
                      <span
                        className={`fi fi-${office.flagCode}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        aria-hidden="true"
                      />
                    </span>
                  )}

                  <h3 className="text-base font-medium text-slate-dark dark:text-cream">{office.country}</h3>
                </div>

                <div className="flex flex-1 flex-col items-center gap-2.5 text-start">
                  {office.address && (
                    <div className="flex items-start gap-2 text-center">
                      <MapPin size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-slate-mid dark:text-cream/70">{office.address}</p>
                    </div>
                  )}

                  {office.phone && (
                    <div className="flex items-start gap-2">
                      <Phone size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <a
                        href={`tel:${toTelHref(office.phone)}`}
                        className="text-xs text-slate-mid transition-colors hover:text-navy dark:text-cream/70 dark:hover:text-cream"
                      >
                        {office.phone}
                      </a>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Mail size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-xs text-slate-mid transition-colors hover:text-navy dark:text-cream/70 dark:hover:text-cream"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
