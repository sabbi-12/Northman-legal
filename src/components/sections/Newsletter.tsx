"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

type Status = "idle" | "submitting" | "success" | "error";

export function Newsletter({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const email = new FormData(form).get("email")?.toString() ?? "";

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-cream py-20 dark:bg-navy-dark">
      <div className="container-institutional">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl rounded-institutional border border-navy/10 bg-white p-10 text-center shadow-institutional dark:border-cream/10 dark:bg-navy/40"
        >
          <Mail size={26} strokeWidth={1.5} className="mx-auto text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-medium text-slate-dark dark:text-cream">{dict.newsletter.title}</h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              {dict.newsletter.placeholder}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder={dict.newsletter.placeholder}
              className="w-full flex-1 rounded-institutional border border-navy/15 bg-white px-4 py-3 text-sm text-slate-dark placeholder:text-navy/40 transition-colors focus:border-accent focus:outline-none dark:border-cream/15 dark:bg-navy/40 dark:text-cream dark:placeholder:text-cream/30"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-institutional bg-button px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? dict.newsletter.submitting : dict.newsletter.submit}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-400" role="status">
              <CheckCircle2 size={16} strokeWidth={2} />
              {dict.newsletter.success}
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-red-700 dark:text-red-400" role="alert">
              <AlertCircle size={16} strokeWidth={2} />
              {dict.newsletter.error}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
