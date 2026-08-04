import Link from "next/link";
import { MapPin, Mail, Phone, Printer, Facebook, Twitter, Linkedin } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import { ORGANIZATION } from "@/lib/seo/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: `/${lang}/news-updates`, label: dict.footer.blogs },
    { href: `/${lang}/news-updates`, label: dict.footer.immigrationUpdates },
    { href: `/${lang}#event-gallery`, label: dict.footer.keyEvents },
    { href: `/${lang}/contact-us`, label: dict.nav.contactUs },
    { href: `/${lang}/privacy-policy`, label: dict.footer.privacyPolicy },
    { href: `/${lang}/disclaimer`, label: dict.footer.termsConditions },
  ];

  // Placeholder until the firm shares its live social accounts — see
  // ORGANIZATION.facebookUrl/twitterUrl/linkedinUrl in lib/seo/constants.ts.
  const socials = [
    { icon: Facebook, url: ORGANIZATION.facebookUrl, label: "Facebook" },
    { icon: Twitter, url: ORGANIZATION.twitterUrl, label: "Twitter" },
    { icon: Linkedin, url: ORGANIZATION.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-navy/10 bg-navy text-cream">
      <div className="container-institutional grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo height={36} onDark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">{dict.footer.description}</p>

          <div className="mt-6 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-institutional border border-cream/15 transition-colors hover:border-accent hover:text-accent"
              >
                <social.icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
            {dict.footer.quickLinksTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {dict.footer.officeName}, {dict.footer.officeAddress}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${ORGANIZATION.telephone}`} className="transition-colors hover:text-cream">
                {ORGANIZATION.telephoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Printer size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {dict.footer.faxLabel}: {ORGANIZATION.faxDisplay}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${ORGANIZATION.email}`} className="transition-colors hover:text-cream">
                {ORGANIZATION.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-institutional flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-6 text-xs text-cream/60 md:flex-row">
        <p>
          © {year} {dict.footer.officeName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
