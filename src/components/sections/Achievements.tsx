import { Award, BadgeCheck, FolderGit2, Globe, Medal, Rocket, Trophy, Users, type LucideIcon } from "lucide-react";
import { awards, stats } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const icons: Record<string, LucideIcon> = {
  rocket: Rocket,
  folder: FolderGit2,
  badge: BadgeCheck,
  globe: Globe,
  trophy: Trophy,
  medal: Medal,
  award: Award,
  users: Users,
};

export default function Achievements() {
  return (
    <Section id="achievements">
      <Reveal>
        <SectionHeading sectionKey="achievements" />
      </Reveal>

      {/* Count-up stats */}
      <ul className="mt-14 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = icons[stat.icon] ?? Rocket;
          return (
            <Reveal as="li" key={stat.label} delay={i * 0.06} className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft">
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-canvas">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="mt-6 text-5xl font-bold tracking-tight text-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-medium text-ink">{stat.label}</p>
              <p className="mt-1 text-sm text-muted">{stat.note}</p>
            </Reveal>
          );
        })}
      </ul>

      {/* Awards */}
      <Reveal className="mt-16">
        <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted">Awards &amp; recognition</h3>
      </Reveal>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {awards.map((award, i) => {
          const Icon = icons[award.icon] ?? Trophy;
          return (
            <Reveal
              as="li"
              key={award.title}
              delay={i * 0.06}
              className="group flex h-full gap-4 rounded-2xl border border-line bg-canvas p-5 transition-colors hover:border-ink/30 sm:p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-ink transition-colors group-hover:bg-ink group-hover:text-canvas">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold leading-snug text-ink">{award.title}</p>
                <p className="mt-0.5 text-sm text-muted">{award.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{award.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
