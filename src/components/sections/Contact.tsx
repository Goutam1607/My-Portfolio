"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { contact, profile, sections } from "@/data/portfolio";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import PillLink from "@/components/ui/PillLink";
import Reveal from "@/components/ui/Reveal";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts without the Clipboard API
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (!(await copyText(profile.email))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const s = sections.contact;

  return (
    <Section id="contact" className="glow" innerClassName="pb-4" lazyRender={false}>
      <Reveal>
        <Eyebrow number={s.number} label={s.label} />
        <SectionTitle title={s.title} id="contact-title" className="mt-5 sm:text-7xl md:text-8xl" />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{contact.blurb}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-5">
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-[clamp(1.25rem,5.2vw,3.5rem)] font-semibold tracking-tight text-ink underline decoration-ink/15 decoration-2 underline-offset-[10px] transition-colors hover:decoration-ink"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className="grid size-10 shrink-0 place-items-center rounded-full border sm:size-12 border-line bg-canvas text-ink shadow-soft transition-colors hover:bg-ink hover:text-canvas"
          >
            {copied ? <Check className="size-5" aria-hidden /> : <Copy className="size-5" aria-hidden />}
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <PillLink href={profile.github} variant="solid" icon={<ArrowUpRight className="size-4" />}>
            <FaGithub className="size-4" aria-hidden /> GitHub
          </PillLink>
          <PillLink href={profile.linkedin} icon={<ArrowUpRight className="size-4" />}>
            <FaLinkedinIn className="size-4" aria-hidden /> LinkedIn
          </PillLink>
          <PillLink href={profile.resume} download={profile.resumeDownloadName} icon={<ArrowDown className="size-4" />}>
            Résumé
          </PillLink>
        </div>
      </Reveal>

      {/* "Copied!" toast (the live region is always present so screen readers announce it) */}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        <AnimatePresence>
          {copied && (
            <m.p
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas shadow-soft"
            >
              <Check className="size-4" aria-hidden /> Copied!
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
