import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { about, profile, quickFacts } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import PillLink from "@/components/ui/PillLink";
import Reveal from "@/components/ui/Reveal";
import LanyardCard from "@/components/about/LanyardCard";

/*
 * Layout
 *  phone:   text → card → facts (stacked)
 *  tablet:  text + facts on the left, card on the right
 *  laptop:  text | card | facts
 */
export default function About() {
  return (
    <Section id="about" className="glow">
      <div
        className="grid gap-x-12 gap-y-14 [grid-template-areas:'text'_'card'_'facts']
          md:grid-cols-[minmax(0,1fr)_300px] md:[grid-template-areas:'text_card'_'facts_card']
          xl:grid-cols-[minmax(0,1.1fr)_300px_minmax(0,0.9fr)] xl:[grid-template-areas:'text_card_facts']"
      >
        {/* Left: heading, bio, buttons */}
        <Reveal className="[grid-area:text] xl:pt-10">
          <SectionHeading sectionKey="about" />
          <p className="mt-8 text-lg leading-relaxed text-ink/85">{about.bio}</p>
          <p className="mt-4 leading-relaxed text-muted">{about.bioSecondary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink
              href={profile.resume}
              download={profile.resumeDownloadName}
              variant="solid"
              icon={<ArrowDown className="size-4" />}
            >
              Résumé
            </PillLink>
            <PillLink href={profile.github} icon={<ArrowUpRight className="size-4" />}>
              <FaGithub className="size-4" aria-hidden /> GitHub
            </PillLink>
            <PillLink href={profile.linkedin} icon={<ArrowUpRight className="size-4" />}>
              <FaLinkedinIn className="size-4" aria-hidden /> LinkedIn
            </PillLink>
          </div>
        </Reveal>

        {/* Middle: the lanyard hangs from the very top of the section on tablet/laptop */}
        <div className="flex justify-center [grid-area:card] md:-mt-32">
          <LanyardCard />
        </div>

        {/* Right: quick facts + quote */}
        <Reveal delay={0.1} className="[grid-area:facts] xl:pt-10">
          <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-muted">Quick facts</h3>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-3.5 text-sm">
                <dt className="text-muted">{fact.label}</dt>
                <dd className="font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-8 font-serif text-3xl italic leading-tight text-ink-soft">
            “{about.quote}”
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
