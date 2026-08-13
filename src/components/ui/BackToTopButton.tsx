"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_SHOW_THRESHOLD = 400;

export function BackToTopButton({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SCROLL_SHOW_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      title={label}
      className="fixed bottom-5 end-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-cream shadow-institutional transition-colors hover:bg-navy/90 dark:bg-accent dark:text-navy dark:hover:bg-accent/90"
    >
      <ArrowUp size={18} strokeWidth={1.75} />
    </button>
  );
}
