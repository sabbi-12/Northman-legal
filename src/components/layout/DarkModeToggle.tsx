"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

export function DarkModeToggle({
  labels,
  onDark = false,
}: {
  labels: { light: string; dark: string };
  onDark?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? labels.light : labels.dark}
      title={isDark ? labels.light : labels.dark}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-institutional border transition-colors hover:border-accent hover:text-accent",
        onDark
          ? "border-cream/20 text-cream"
          : "border-navy/15 text-navy dark:border-cream/15 dark:text-cream"
      )}
    >
      {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
    </button>
  );
}
