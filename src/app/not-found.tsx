import Link from "next/link";

// Catches paths with no [lang] segment at all (the [lang]/not-found.tsx
// handles everything under a locale prefix). English-only by design —
// there's no locale to read at this level of the route tree.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "3rem 1.5rem" }}>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2E5B88" }}>404</p>
            <h1 style={{ marginTop: "0.75rem", fontSize: "2rem", fontWeight: 500, color: "#3E4856" }}>Page not found</h1>
            <p style={{ marginTop: "1rem", color: "#5C6B7A" }}>The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.</p>
            <Link
              href="/en"
              style={{
                marginTop: "2rem",
                display: "inline-flex",
                borderRadius: "0.25rem",
                backgroundColor: "#27AAE1",
                padding: "0.875rem 1.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
