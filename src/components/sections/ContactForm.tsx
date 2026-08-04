"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ dict, submitLabel }: { dict: Dictionary; submitLabel?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      service: formData.get("service")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
      website_url: formData.get("website_url")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClasses =
    "w-full rounded-institutional border border-navy/15 bg-white px-4 py-3 text-sm text-slate-dark placeholder:text-navy/40 transition-colors focus:border-gold focus:outline-none dark:border-cream/15 dark:bg-navy/40 dark:text-cream dark:placeholder:text-cream/30";

  return (
    <form onSubmit={handleSubmit} data-ns-track="contact-form" className="space-y-5">
      {/* Honeypot — visually hidden, off the tab order. Named `website_url`
          (not a generic `url`/`website`) so browser autofill doesn't
          populate it and produce a false-positive spam rejection. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website_url">Leave this field empty</label>
        <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream">
            {dict.contactPage.formName}
          </label>
          <input id="name" name="name" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream">
            {dict.contactPage.formEmail}
          </label>
          <input id="email" name="email" type="email" required className={fieldClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream">
            {dict.contactPage.formPhone}
          </label>
          <input id="phone" name="phone" type="tel" className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream">
            {dict.contactPage.formService}
          </label>
          <select id="service" name="service" className={fieldClasses}>
            {dict.contactPage.formServiceOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream">
          {dict.contactPage.formMessage}
        </label>
        <textarea id="message" name="message" required rows={5} className={fieldClasses} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center gap-2 rounded-institutional bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} strokeWidth={2} />
        {status === "submitting" ? dict.contactPage.formSubmitting : submitLabel ?? dict.contactPage.formSubmit}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400" role="status">
          <CheckCircle2 size={16} strokeWidth={2} />
          {dict.contactPage.formSuccess}
        </p>
      )}

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400" role="alert">
          <AlertCircle size={16} strokeWidth={2} />
          {dict.contactPage.formError}
        </p>
      )}
    </form>
  );
}
