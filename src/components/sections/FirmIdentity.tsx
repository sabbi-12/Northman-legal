import type { Dictionary } from "@/lib/i18n/getDictionary";

export function FirmIdentity({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-navy py-16 text-center text-cream">
      <div className="container-institutional max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          {dict.firmIdentity.heading}
        </h2>
        <p className="mt-4 text-sm uppercase leading-relaxed tracking-wide text-cream/70">
          {dict.firmIdentity.body}
        </p>
      </div>
    </section>
  );
}
