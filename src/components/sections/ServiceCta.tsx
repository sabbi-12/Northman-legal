"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

export function ServiceCta({ label, lang }: { label: string; lang: Locale }) {
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-cream py-4 text-center dark:bg-navy-dark">
      <Link
        href={`/${lang}/contact-us`}
        className="group mx-auto my-8 inline-flex w-fit items-center gap-3 rounded-institutional bg-button px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
      >
        {label}
        <ArrowIcon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Link>
    </div>
  );
}
