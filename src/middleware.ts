import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Only the bare root ("/") needs locale negotiation. Every other path is
// either already locale-prefixed or handled by the explicit 301 map in
// next.config.js, so we keep this middleware intentionally narrow —
// broad matchers here would run on every request and hurt TTFB.
export const config = {
  matcher: "/",
};

export function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.toLowerCase().includes("ar") ? "ar" : defaultLocale;
  const locale = locales.includes(preferred as (typeof locales)[number]) ? preferred : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 302);
}
