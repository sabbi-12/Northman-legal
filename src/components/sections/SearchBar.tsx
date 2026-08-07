"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";

export function SearchBar({
  lang,
  placeholder,
  buttonLabel,
  defaultValue = "",
  className,
}: {
  lang: Locale;
  placeholder: string;
  buttonLabel: string;
  defaultValue?: string;
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(
      query
        ? `/${lang}/news-updates?q=${encodeURIComponent(query)}`
        : `/${lang}/news-updates`
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full max-w-md items-center gap-2 rounded-institutional border border-navy/15 bg-white px-2 py-1.5 focus-within:border-accent dark:border-cream/15 dark:bg-navy/40 ${className ?? ""}`}
    >
      <Search size={16} strokeWidth={1.75} className="shrink-0 text-slate-mid dark:text-cream/50" aria-hidden="true" />
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full flex-1 border-0 bg-transparent py-1.5 text-sm text-slate-dark placeholder:text-slate-mid/70 focus:outline-none dark:text-cream dark:placeholder:text-cream/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-institutional bg-button px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
