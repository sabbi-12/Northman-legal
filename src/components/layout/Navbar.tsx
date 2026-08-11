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

// Only Home keeps the transparent-before-scroll navbar (its hero photo
// extends up behind the navbar via the -mt-24 fill pattern). Every other
// page — including ones with their own navy hero band — always renders the
// navbar in its "scrolled" light-glass state, so header text/logo is never
// invisible against a page that doesn't share Home's exact treatment.
function isHomePath(pathname: string, lang: Locale) {
  return pathname === `/${lang}` || pathname === `/${lang}/`;
}

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [mounted, setMounted] = useState(false);

  const forceLightNav = !isHomePath(pathname, lang);
  const scrolled = scrolledPast || forceLightNav;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolledPast(window.scrollY > SCROLL_THRESHOLD);
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
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-navy/10 !bg-cream/70 backdrop-blur-lg backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <motion.nav
        initial={false}
        animate={{ height: scrolled ? 72 : 96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="container-header grid grid-cols-[auto_1fr_auto] items-center gap-6"
      >
        <Link href={`/${lang}`} className="relative shrink-0" aria-label={dict.meta.siteName}>
          {!scrolled && (
            <span
              className="pointer-events-none absolute -inset-x-4 -bottom-3 -top-1 -z-10 rounded-[50%] bg-white opacity-95 blur-lg"
              aria-hidden="true"
            />
          )}
          <BrandLogo height={scrolled ? 48 : 60} />
        </Link>

        <ul className="hidden items-center justify-center gap-6 nav:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-wide transition-colors",
                  isActive(link.href)
                    ? "text-button"
                    : scrolled
                      ? "text-slate-dark hover:text-navy"
                      : "text-white drop-shadow-[0_1px_4px_rgba(4,8,15,0.6)] hover:text-white/80"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <div
            className={cn(
              "hidden items-center gap-4 border-s ps-6 nav:flex",
              scrolled ? "border-navy/15" : "border-white/25"
            )}
          >
            <LanguageSwitcher currentLang={lang} onDark={!scrolled} />
            <DarkModeToggle
              labels={{ light: dict.nav.toggleLight, dark: dict.nav.toggleDark }}
              onDark={!scrolled}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={dict.nav.openMenu}
            className={cn(
              "flex h-10 w-10 items-center justify-center nav:hidden",
              scrolled ? "text-navy" : "text-white"
            )}
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
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
