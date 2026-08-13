"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function ThankYouModal({
  open,
  onClose,
  title,
  body,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  closeLabel: string;
}) {
  // Lock page scroll while the modal is open, restore on close/unmount.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-institutional bg-cream p-8 text-center shadow-2xl dark:bg-navy-dark"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 text-slate-mid transition-colors hover:text-slate-dark dark:text-cream/50 dark:hover:text-cream"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <motion.div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle2 size={30} strokeWidth={2} />
            </motion.div>

            <h2 className="mt-5 text-xl font-medium text-slate-dark md:text-2xl dark:text-cream">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-mid dark:text-cream/70">
              {body}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex items-center justify-center rounded-institutional bg-button px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover"
            >
              {closeLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
