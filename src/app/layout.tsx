import type { ReactNode } from "react";

// Required by Next.js App Router: exactly one root layout must exist and
// provide <html>/<body>. Every real route lives under [lang]/layout.tsx
// (which has its own <html>/<body> with the real lang/dir/fonts) — this
// root layout is only ever reached by src/app/not-found.tsx, for requests
// that don't even match a [lang] segment.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
