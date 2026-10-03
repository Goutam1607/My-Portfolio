import { sections } from "@/data/portfolio";

type SectionKey = keyof typeof sections;

/** Small spaced-out label, e.g. "01 —— ABOUT". */
export function Eyebrow({ number, label }: { number: string; label: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
      <span className="tabular-nums text-ink">{number}</span>
      <span aria-hidden className="h-px w-10 bg-ink/40" />
      <span>{label}</span>
    </p>
  );
}

/** Bold sans words + italic serif words, e.g. "Things I've *built.*" */
export function SectionTitle({
  title,
  id,
  className = "",
}: {
  title: readonly [string, string];
  id?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={`text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl ${className}`}>
      {title[0]}{" "}
      <em className="font-serif font-normal italic tracking-normal text-ink-soft">{title[1]}</em>
    </h2>
  );
}

/** Eyebrow + title from the data file. */
export function SectionHeading({ sectionKey, className = "" }: { sectionKey: SectionKey; className?: string }) {
  const s = sections[sectionKey];
  return (
    <div className={`space-y-5 ${className}`}>
      <Eyebrow number={s.number} label={s.label} />
      <SectionTitle title={s.title} id={`${sectionKey}-title`} />
    </div>
  );
}

/** Standard page section: anchor id, spacing, max width. */
export function Section({
  id,
  children,
  className = "",
  innerClassName = "",
  lazyRender = true,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Let the browser skip rendering this section until it's near the screen (faster first paint).
   *  Turn off for sections containing `position: fixed` elements, which it would trap. */
  lazyRender?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate scroll-mt-20 px-4 py-24 sm:px-6 md:px-10 md:py-32 ${lazyRender ? "lazy-render" : ""} ${className}`}
    >
      <div className={`mx-auto w-full max-w-6xl ${innerClassName}`}>{children}</div>
    </section>
  );
}
