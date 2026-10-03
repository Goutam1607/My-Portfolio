"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { skillCategories, skills, type SkillCategory } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { fallbackLogo, logos } from "@/components/skills/logos";

type Skill = (typeof skills)[number];
type Filter = "All" | SkillCategory;

/** Tile colours per category (white palette: navy → slate → steel → light grey). */
const categoryStyle: Record<SkillCategory, { tile: string; dot: string }> = {
  Languages: { tile: "bg-cat-lang text-canvas", dot: "bg-cat-lang" },
  "ML & Data": { tile: "bg-cat-ml text-canvas", dot: "bg-cat-ml" },
  "IoT & Security": { tile: "bg-cat-iot text-ink", dot: "bg-cat-iot" },
  Tools: { tile: "bg-cat-tools text-ink", dot: "bg-cat-tools" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Skill | null>(null);
  const filters: Filter[] = ["All", ...skillCategories];

  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading sectionKey="skills" />
      </Reveal>

      {/* Filter chips (also act as the colour legend) */}
      <Reveal delay={0.05} className="mt-10">
        <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  on ? "border-ink bg-ink text-canvas" : "border-line bg-canvas text-muted hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f !== "All" && (
                  <span aria-hidden className={`size-2.5 rounded-sm ring-1 ring-ink/10 ${categoryStyle[f].dot}`} />
                )}
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Compact preview for phones/tablets (fixed height → no layout jump on tap) */}
      <div className="mt-6 h-[92px] lg:hidden" aria-live="polite">
        <MobilePreview skill={active} />
      </div>

      <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <Reveal delay={0.1}>
          <ul className="grid grid-cols-4 gap-2 min-[420px]:grid-cols-5 sm:grid-cols-6 sm:gap-2.5 xl:grid-cols-8">
            {skills.map((skill) => {
              const match = filter === "All" || skill.category === filter;
              const isActive = active?.symbol === skill.symbol;
              return (
                <m.li
                  key={skill.symbol}
                  animate={{ opacity: match ? 1 : 0.2, scale: match ? 1 : 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(skill)}
                    onFocus={() => setActive(skill)}
                    onClick={() => setActive(skill)}
                    aria-label={`${skill.name} (${skill.category})`}
                    className={`relative flex aspect-square w-full flex-col justify-between rounded-xl p-1.5 text-left shadow-soft transition-transform hover:-translate-y-1 sm:p-2 ${
                      categoryStyle[skill.category].tile
                    } ${isActive ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas" : ""}`}
                  >
                    <span className="text-[9px] font-medium tabular-nums opacity-70 sm:text-[10px]">{skill.number}</span>
                    <span className="text-center text-xl font-bold leading-none tracking-tight sm:text-2xl lg:text-3xl">
                      {skill.symbol}
                    </span>
                    <span className="truncate text-center text-[8px] font-medium opacity-80 sm:text-[10px]">{skill.name}</span>
                  </button>
                </m.li>
              );
            })}
          </ul>
        </Reveal>

        {/* Big preview panel on laptops */}
        <div className="hidden lg:sticky lg:top-28 lg:block">
          <DesktopPreview skill={active} />
        </div>
      </div>
    </Section>
  );
}

function DesktopPreview({ skill }: { skill: Skill | null }) {
  return (
    <div className="relative h-[380px] overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <AnimatePresence mode="wait" initial={false}>
        {skill ? (
          <m.div
            key={skill.symbol}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="flex h-full flex-col p-7"
          >
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="font-mono">No. {pad(skill.number)}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 font-medium">
                <span aria-hidden className={`size-2 rounded-sm ${categoryStyle[skill.category].dot}`} />
                {skill.category}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <SkillLogo logo={skill.logo} className="size-24" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-ink">{skill.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{skill.note}</p>
            {/* faint element symbol in the corner */}
            <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-2 text-[120px] font-black leading-none text-ink/[0.04]">
              {skill.symbol}
            </span>
          </m.div>
        ) : (
          <m.div
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col items-center justify-center gap-4 p-7 text-center"
          >
            <div className="grid size-24 place-items-center rounded-2xl border-2 border-dashed border-ink/15 text-4xl font-bold text-ink/20">
              ?
            </div>
            <p className="text-sm text-muted">
              Hover an element
              <br />
              to inspect it.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobilePreview({ skill }: { skill: Skill | null }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {skill ? (
        <m.div
          key={skill.symbol}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex h-full items-center gap-4 rounded-2xl border border-line bg-card px-4 shadow-soft"
        >
          <SkillLogo logo={skill.logo} className="size-11 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-ink">
              {skill.name} <span className="ml-1 font-mono text-xs font-normal text-muted">No. {pad(skill.number)}</span>
            </p>
            <p className="line-clamp-2 text-xs leading-snug text-muted">{skill.note}</p>
          </div>
        </m.div>
      ) : (
        <m.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex h-full items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 text-sm text-muted"
        >
          <MousePointerClick className="size-4" aria-hidden /> Tap an element to inspect it
        </m.p>
      )}
    </AnimatePresence>
  );
}

function SkillLogo({ logo, className }: { logo: string; className: string }) {
  const { Icon, color } = logos[logo] ?? fallbackLogo;
  return <Icon className={className} style={{ color }} aria-hidden />;
}
