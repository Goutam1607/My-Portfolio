"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import {
  BrickWall,
  Brain,
  ChartColumn,
  FileCheck,
  Filter,
  Image as ImageIcon,
  KeyRound,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  ScanSearch,
  Server,
  Smartphone,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import PillLink from "@/components/ui/PillLink";
import Reveal from "@/components/ui/Reveal";
import Mockup from "@/components/projects/Mockups";

/** One icon per feature bullet, in order. */
const featureIcons: Record<Project["mockup"], LucideIcon[]> = {
  firewall: [Server, BrickWall, KeyRound, FileCheck],
  sentiment: [ScanSearch, MessageSquareText, ChartColumn, Lightbulb],
  scan: [ImageIcon, Brain, Target],
  leaderboard: [ListChecks, Trophy, Filter, Smartphone],
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  const [active, setActive] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Small delay so sweeping the mouse across strips doesn't open each one
  const hoverOpen = (i: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(i), 140);
  };

  return (
    <Section id="work">
      <Reveal>
        <SectionHeading sectionKey="work" />
      </Reveal>

      {/* Laptop (≥1280px): horizontal accordion */}
      <Reveal delay={0.1} className="mt-14 hidden xl:block">
        <div className="flex h-[35rem] gap-3" onMouseLeave={() => clearTimeout(hoverTimer.current)}>
          {projects.map((project, i) => {
            const open = active === i;
            return (
              <article
                key={project.title}
                onMouseEnter={() => hoverOpen(i)}
                className={`relative min-w-0 overflow-hidden rounded-2xl transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "grow bg-ink text-canvas shadow-[0_30px_60px_-30px_rgb(30_34_53/0.6)]" : "grow-0 bg-surface text-ink hover:bg-[#eceef2]"
                }`}
                style={{ flexBasis: "5.5rem", flexShrink: 0 }}
              >
                {/* Collapsed strip */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`project-${i}`}
                  className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                    open ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                  tabIndex={open ? -1 : 0}
                >
                  <Plus className="size-4 text-muted" aria-hidden />
                  <span className="rotate-180 whitespace-nowrap text-lg font-semibold tracking-tight [writing-mode:vertical-rl]">
                    {project.shortTitle}
                  </span>
                  <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {open && (
                    <m.div
                      id={`project-${i}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.28, duration: 0.45 } }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      className="absolute inset-0 grid min-w-[47.5rem] grid-cols-[minmax(0,1fr)_18.125rem] gap-10 p-10"
                    >
                      <ProjectDetails project={project} index={i} />
                      <div className="flex items-center">
                        <Mockup type={project.mockup} />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Phones, tablets, small laptops: stacked cards */}
      <div className="mt-12 space-y-5 xl:hidden">
        {projects.map((project, i) => (
          <Reveal key={project.title}>
            <article className="grid gap-8 rounded-2xl bg-ink p-6 text-canvas sm:p-8 md:grid-cols-[minmax(0,1fr)_16.25rem]">
              <ProjectDetails project={project} index={i} />
              <div className="mx-auto w-full max-w-[18.75rem] md:self-center">
                <Mockup type={project.mockup} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectDetails({ project, index }: { project: Project; index: number }) {
  const icons = featureIcons[project.mockup];
  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-sm text-canvas/50">{pad(index + 1)}</span>
        <span aria-hidden className="h-px w-6 bg-canvas/25" />
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-canvas/60">{project.tags.join(" · ")}</p>
      </div>
      <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem]">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-canvas/70">{project.description}</p>

      <ul className="mt-5 space-y-2.5">
        {project.features.map((feature, i) => {
          const Icon = icons[i] ?? ListChecks;
          return (
            <li key={feature} className="flex gap-3 text-sm leading-snug text-canvas/85">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-canvas/10">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="pt-0.5">{feature}</span>
            </li>
          );
        })}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded-full border border-canvas/15 px-2.5 py-1 text-[0.6875rem] text-canvas/75">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <PillLink href={project.link} variant="light" icon={<ArrowUpRight className="size-4" />}>
          {project.linkLabel}
        </PillLink>
      </div>
    </div>
  );
}
