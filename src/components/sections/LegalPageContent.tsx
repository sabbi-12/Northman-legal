export type LegalSection = { heading: string; body: string };

export function LegalPageContent({
  title,
  intro,
  sections,
  lastUpdatedLabel,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  lastUpdatedLabel: string;
}) {
  const today = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date()
  );

  return (
    <section className="py-20">
      <div className="container-institutional max-w-2xl">
        <h1 className="text-4xl font-medium text-slate-dark md:text-5xl dark:text-cream">{title}</h1>
        <p className="mt-2 text-xs uppercase tracking-wide text-slate-mid dark:text-cream/50">
          {lastUpdatedLabel}: {today}
        </p>
        <p className="mt-6 text-base leading-relaxed text-slate-mid dark:text-cream/70">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-medium text-slate-dark dark:text-cream">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-mid dark:text-cream/70">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
