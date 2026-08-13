"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/getDictionary";
import { ThankYouModal } from "@/components/ui/ThankYouModal";

type Status = "idle" | "submitting" | "success" | "error";

const RESUBMIT_COOLDOWN_SECONDS = 30;

export function ContactForm({
  dict,
  submitLabel,
  variant = "light",
}: {
  dict: Dictionary;
  submitLabel?: string;
  // "dark" is for placing the form on a fixed navy card (e.g. the Contact
  // Us "Let's Connect" panel) — always-light fields regardless of the
  // site's own dark-mode toggle, with placeholder text standing in for a
  // visible label (label stays in the DOM for screen readers via sr-only).
  variant?: "light" | "dark";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(0);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || cooldown > 0) return;
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      service: formData.getAll("service").map((value) => value.toString()),
      message: formData.get("message")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setSubmittedName(payload.name);
      setThankYouOpen(true);
      form.reset();

      setCooldown(RESUBMIT_COOLDOWN_SECONDS);
      cooldownIntervalRef.current = setInterval(() => {
        setCooldown((seconds) => {
          if (seconds <= 1) {
            if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
    } catch {
      setStatus("error");
    }
  }

  const isDark = variant === "dark";

  const fieldClasses = isDark
    ? "w-full rounded-institutional border border-navy/15 bg-white px-4 py-3 text-sm text-slate-dark placeholder:text-slate-mid/70 transition-colors focus:border-button focus:outline-none"
    : "w-full rounded-institutional border border-navy/15 bg-white px-4 py-3 text-sm text-slate-dark placeholder:text-navy/40 transition-colors focus:border-accent focus:outline-none dark:border-cream/15 dark:bg-navy/40 dark:text-cream dark:placeholder:text-cream/30";

  const labelClasses = isDark
    ? "sr-only"
    : "mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream";

  return (
    <form onSubmit={handleSubmit} data-ns-track="contact-form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {dict.contactPage.formName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={dict.contactPage.formNamePlaceholder}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            {dict.contactPage.formEmail}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={dict.contactPage.formEmailPlaceholder}
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          {dict.contactPage.formPhone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder={dict.contactPage.formPhonePlaceholder}
          className={fieldClasses}
        />
      </div>

      <fieldset>
        <legend className={isDark ? "sr-only" : "mb-1.5 block text-sm font-medium text-slate-dark dark:text-cream"}>
          {dict.contactPage.formService}
          <span className="ml-1 font-normal text-slate-mid dark:text-cream/50">
            ({dict.contactPage.formServicePlaceholder})
          </span>
        </legend>
        <div
          className={
            isDark
              ? "grid gap-2 rounded-institutional border border-navy/15 bg-white p-4 sm:grid-cols-2"
              : "grid gap-2 rounded-institutional border border-navy/15 bg-white p-4 sm:grid-cols-2 dark:border-cream/15 dark:bg-navy/40"
          }
        >
          {dict.contactPage.formServiceOptions.map((option: string) => (
            <label
              key={option}
              className={
                isDark
                  ? "flex items-center gap-2 text-sm text-slate-dark"
                  : "flex items-center gap-2 text-sm text-slate-dark dark:text-cream/80"
              }
            >
              <input
                type="checkbox"
                name="service"
                value={option}
                className="h-4 w-4 rounded border-navy/30 text-button focus:ring-button"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {dict.contactPage.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={dict.contactPage.formMessagePlaceholder}
          className={fieldClasses}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || cooldown > 0}
        className="flex w-full items-center justify-center gap-2 rounded-institutional bg-button px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} strokeWidth={2} />
        {status === "submitting"
          ? dict.contactPage.formSubmitting
          : cooldown > 0
            ? `${dict.contactPage.formSubmit} (${cooldown}s)`
            : submitLabel ?? dict.contactPage.formSubmit}
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

      <ThankYouModal
        open={thankYouOpen}
        onClose={() => setThankYouOpen(false)}
        title={dict.contactPage.formThankYouTitle.replace("{{name}}", submittedName)}
        body={dict.contactPage.formThankYouBody}
        closeLabel={dict.contactPage.formThankYouClose}
      />
    </form>
  );
}
