"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Facebook, Twitter, Linkedin } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ORGANIZATION } from "@/lib/seo/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ConnectBanner({ dict }: { dict: Dictionary }) {
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion ? false : undefined;
  const connect = dict.contactPage.connect;

  const socials = [
    { icon: Facebook, url: ORGANIZATION.facebookUrl, label: "Facebook" },
    { icon: Twitter, url: ORGANIZATION.twitterUrl, label: "Twitter / X" },
    { icon: Linkedin, url: ORGANIZATION.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <section className="bg-white py-16 dark:bg-navy/30">
      <div className="container-institutional flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-xl"
        >
          <h2 className="text-2xl font-medium text-slate-dark md:text-3xl dark:text-cream">
            {connect.heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-mid dark:text-cream/70">
            {connect.subheading}
          </p>
          <a
            href={`mailto:${ORGANIZATION.generalEmail}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-navy dark:hover:text-cream"
          >
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            {ORGANIZATION.generalEmail}
          </a>
        </motion.div>

        <div className="flex shrink-0 items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-institutional border border-navy/15 text-navy transition-colors hover:border-accent hover:text-accent dark:border-cream/15 dark:text-cream"
            >
              <social.icon size={17} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
