"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServiceVideoBanner({
  heading,
  intro,
  servicesIntro,
  services,
  embedUrl,
}: {
  heading: string;
  intro: string;
  servicesIntro: string;
  services: string[];
  embedUrl: string;
}) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;

  return (
    <section className="bg-navy py-20 text-cream">
      <div className="container-institutional grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h2 className="text-3xl font-medium md:text-4xl">{heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-cream/80">{intro}</p>
          <p className="mt-6 text-sm font-medium text-cream">{servicesIntro}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service} className="flex items-start gap-2.5">
                <CheckCircle2 size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-cream/90">{service}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="aspect-video w-full overflow-hidden rounded-institutional shadow-institutional"
        >
          <iframe
            src={embedUrl}
            height="100%"
            width="100%"
            title="Northman Sterling — business expansion in Saudi Arabia"
            className="h-full w-full"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
