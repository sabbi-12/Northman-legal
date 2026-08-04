"use client";

export type ConsentValue = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "ns-cookie-consent";
export const CONSENT_EVENT = "ns-consent-changed";
export const CONSENT_REOPEN_EVENT = "ns-consent-reopen";

// Dispatched by the floating "Manage consent" footer button so the banner
// component (already mounted at the layout level) can re-show itself
// without the button needing a reference to it.
export function requestConsentReopen() {
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/**
 * Hook-free subscribe helper for analytics components: invokes `callback`
 * immediately with the current consent state, then again whenever it
 * changes. Returns an unsubscribe function.
 */
export function subscribeToConsent(callback: (value: ConsentValue | null) => void): () => void {
  callback(getStoredConsent());

  const handler = (event: Event) => {
    const custom = event as CustomEvent<ConsentValue>;
    callback(custom.detail);
  };

  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
