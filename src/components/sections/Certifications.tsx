import { ArrowRight } from "lucide-react";
import { certifications, certificationsIntro } from "@/data/portfolio";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Certifications() {
  return (
    <Section id="certifications">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading sectionKey="certifications" />
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">{certificationsIntro}</p>
          <p aria-hidden className="mt-8 hidden text-[9rem] font-black leading-none tracking-tighter text-ink/[0.05] lg:block">
            {pad(certifications.length)}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="border-t border-line">
            {certifications.map((cert, i) => (
              <li key={cert.name} className="group border-b border-line py-1.5">
                <div className="flex items-center gap-4 rounded-xl px-3 py-3.5 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:bg-ink group-hover:text-canvas sm:px-4">
                  <span className="font-mono text-xs text-muted transition-colors group-hover:text-canvas/50">{pad(i + 1)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-muted transition-colors group-hover:text-canvas/60">
                      {cert.issuer}
                      {cert.date && ` · ${cert.date}`}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="size-4 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
