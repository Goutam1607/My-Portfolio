"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { timeline, timelineExtras, type TimelineEntry, type TimelineType } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const badgeStyle: Record<TimelineType, string> = {
  Education: "bg-badge-education text-[#2c3e6b]",
  Leadership: "bg-badge-leadership text-[#6e4a0c]",
  Club: "bg-badge-club text-[#215c3a]",
  Event: "bg-badge-event text-[#7a2e2e]",
};

/*
 * Timeline: thin line down the middle on laptops (left on phones).
 * Years stay sticky while their entries scroll past; the line "draws" with scroll.
 */
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const years = [...new Set(timeline.map((e) => e.year))].sort((a, b) => a - b);

  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading sectionKey="experience" />
      </Reveal>

      <div ref={ref} className="relative mt-16">
        {/* track + drawn line */}
        <div aria-hidden className="absolute inset-y-0 left-[7px] w-px bg-line lg:left-1/2" />
        <m.div
          aria-hidden
          style={{ scaleY: reduceMotion ? 1 : progress }}
          className="absolute inset-y-0 left-[7px] w-px origin-top bg-ink lg:left-1/2"
        />

        {years.map((year) => (
          <div key={year} className="relative grid pb-12 last:pb-0 lg:grid-cols-2 lg:pb-20">
            {/* Year: sticky header on phones, sticky big number on the left half on laptops */}
            <div className="sticky top-[72px] z-10 ml-5 rounded-lg bg-canvas/95 py-2 pl-3 lg:static lg:ml-0 lg:rounded-none lg:bg-transparent lg:p-0 lg:pr-14">
              <p className="text-4xl font-bold tracking-tight text-ink lg:sticky lg:top-28 lg:text-right lg:text-8xl">{year}</p>
            </div>

            <ul className="space-y-5 pl-8 pt-3 lg:pl-14 lg:pt-4">
              {timeline
                .filter((e) => e.year === year)
                .map((entry) => (
                  <TimelineCard key={entry.title} entry={entry} />
                ))}
            </ul>
          </div>
        ))}

        {timelineExtras.length > 0 && (
          <div className="relative grid pt-6 lg:grid-cols-2">
            <Reveal className="pl-8 lg:col-start-2 lg:pl-14">
              {timelineExtras.map((extra) => (
                <p key={extra} className="flex items-center gap-2.5 text-sm text-muted">
                  <HeartHandshake className="size-4 text-ink" aria-hidden />
                  <span>
                    <span className="font-medium text-ink">Also:</span> {extra}
                  </span>
                </p>
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </Section>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <m.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      className="relative rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6"
    >
      {/* dot on the line */}
      <span
        aria-hidden
        className="absolute -left-[31px] top-7 size-3 rounded-full border-2 border-ink bg-canvas lg:-left-[62px]"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeStyle[entry.type]}`}>
          {entry.type}
        </span>
        {entry.period && <span className="text-xs text-muted">{entry.period}</span>}
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{entry.title}</h3>
      <p className="text-sm text-muted">{entry.place}</p>
      {entry.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {entry.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-ink/80">
              <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-ink/40" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {entry.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {entry.tags.map((t) => (
            <li key={t} className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-muted">
              {t}
            </li>
          ))}
        </ul>
      )}
    </m.li>
  );
}
