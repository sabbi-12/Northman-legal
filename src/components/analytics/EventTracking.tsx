"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushEvent(event: string, extra: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...extra });
}

/**
 * Renders nothing — attaches document-level delegated listeners so any
 * call / email / WhatsApp link or the consultation form works without
 * every component needing to know about analytics individually.
 */
export function EventTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        pushEvent("call_click", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        pushEvent("email_click", { link_url: href });
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        pushEvent("whatsapp_click", { link_url: href });
      }
    }

    function handleSubmit(event: SubmitEvent) {
      const form = event.target as HTMLFormElement;
      const trackId = form?.getAttribute?.("data-ns-track");
      if (trackId === "contact-form") {
        pushEvent("consultation_form_submit", { form_id: trackId });
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
