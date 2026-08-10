"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

const SCROLL_THRESHOLD = 24;

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: NavLink[] = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about-us`, label: dict.nav.aboutUs },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/news-updates`, label: dict.nav.newsUpdates },
    { href: `/${lang}/contact-us`, label: dict.nav.contactUs },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  const headerElement = (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-navy/55 backdrop-blur-lg backdrop-saturate-150">
      <motion.nav
        initial={false}
        animate={{ height: scrolled ? 72 : 96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="container-header flex items-center justify-between"
      >
        <Link href={`/${lang}`} className="shrink-0" aria-label={dict.meta.siteName}>
          <BrandLogo height={scrolled ? 34 : 46} onDark />
        </Link>

        <div className="hidden items-center gap-8 nav:flex">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wide transition-colors drop-shadow-[0_1px_4px_rgba(4,8,15,0.6)]",
                    isActive(link.href) ? "text-button" : "text-cream/90 hover:text-cream"
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-s border-cream/20 ps-6">
            <LanguageSwitcher currentLang={lang} onDark />
            <DarkModeToggle labels={{ light: dict.nav.toggleLight, dark: dict.nav.toggleDark }} onDark />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={dict.nav.openMenu}
          className="flex h-10 w-10 items-center justify-center text-cream nav:hidden"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>
      </motion.nav>
    </header>
  );

  const drawer = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-navy-dark/60 nav:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div
            initial={{ x: lang === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: lang === "ar" ? "-100%" : "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col overflow-y-auto bg-navy-dark p-6 shadow-2xl"
            style={{ backgroundColor: "#04080F" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <BrandLogo height={30} onDark />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={dict.nav.closeMenu}
                className="flex h-9 w-9 items-center justify-center text-cream"
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
                      isActive(link.href) ? "text-button" : "text-cream/90 hover:text-cream"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between border-t border-cream/15 pt-6">
              <LanguageSwitcher currentLang={lang} onDark />
              <DarkModeToggle labels={{ light: dict.nav.toggleLight, dark: dict.nav.toggleDark }} onDark />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {headerElement}
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
