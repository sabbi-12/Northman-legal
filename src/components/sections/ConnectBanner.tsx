"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, Facebook, Twitter, Linkedin } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
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
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional">
        <motion.div
          initial={entrance ?? { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid overflow-hidden rounded-institutional shadow-institutional lg:grid-cols-2"
        >
          {/* Left panel — always light, regardless of site dark mode; this
              card is a fixed light/navy pairing, not a theme-following one. */}
          <div className="flex flex-col justify-center bg-white p-8 md:p-12">
            <h2 className="text-4xl font-medium text-button">{connect.heading}</h2>
            <span className="mt-3 block h-0.5 w-28 bg-slate-dark" aria-hidden="true" />

            <a
              href={`mailto:${ORGANIZATION.generalEmail}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-dark transition-colors hover:text-button"
            >
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              {ORGANIZATION.generalEmail}
            </a>

            <p className="mt-5 text-lg leading-relaxed text-slate-dark">{connect.subheading}</p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-institutional bg-navy text-white transition-colors hover:bg-button"
                >
                  <social.icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Right panel — the enquiries form, on a fixed navy card. */}
          <div className="bg-navy p-8 md:p-12">
            <h3 className="text-center text-2xl font-medium text-white">{dict.contactPage.title}</h3>
            <span className="mx-auto mt-3 block h-0.5 w-24 bg-button" aria-hidden="true" />

            <div className="mt-8">
              <ContactForm dict={dict} variant="dark" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
