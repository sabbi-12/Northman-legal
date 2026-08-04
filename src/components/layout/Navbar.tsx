"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";
import type { NavLink } from "@/types";
import { cn } from "@/lib/utils";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: NavLink[] = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about-us`, label: dict.nav.aboutUs },
    { href: `/${lang}/regions`, label: dict.nav.regions },
    { href: `/${lang}/news-updates`, label: dict.nav.newsUpdates },
    { href: `/${lang}/contact-us`, label: dict.nav.contactUs },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/90 backdrop-blur-md dark:border-cream/10 dark:bg-navy-dark/90">
      <nav className="container-institutional flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="shrink-0" aria-label={dict.meta.siteName}>
          <BrandLogo height={36} className="dark:hidden" />
          <BrandLogo height={36} onDark className="hidden dark:inline-flex" />
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wide transition-colors",
                    isActive(link.href)
                      ? "text-accent"
                      : "text-navy/80 hover:text-navy dark:text-cream/80 dark:hover:text-cream"
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-s border-navy/10 ps-6 dark:border-cream/10">
            <LanguageSwitcher currentLang={lang} />
            <DarkModeToggle labels={{ light: dict.nav.toggleLight, dark: dict.nav.toggleDark }} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={dict.nav.openMenu}
          className="flex h-10 w-10 items-center justify-center text-navy lg:hidden dark:text-cream"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-navy/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: lang === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "-100%" : "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col bg-cream p-6 dark:bg-navy-dark"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <BrandLogo height={30} className="dark:hidden" />
                <BrandLogo height={30} onDark className="hidden dark:inline-flex" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label={dict.nav.closeMenu}
                  className="flex h-9 w-9 items-center justify-center text-navy dark:text-cream"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "text-base font-medium uppercase tracking-wide",
                        isActive(link.href) ? "text-accent" : "text-navy dark:text-cream"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between border-t border-navy/10 pt-6 dark:border-cream/10">
                <LanguageSwitcher currentLang={lang} />
                <DarkModeToggle labels={{ light: dict.nav.toggleLight, dark: dict.nav.toggleDark }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
