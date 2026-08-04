"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ui/ThemeProvider";

export function DarkModeToggle({
  labels,
}: {
  labels: { light: string; dark: string };
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? labels.light : labels.dark}
      title={isDark ? labels.light : labels.dark}
      className="flex h-9 w-9 items-center justify-center rounded-institutional border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream dark:hover:border-gold dark:hover:text-gold"
    >
      {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
    </button>
  );
}
