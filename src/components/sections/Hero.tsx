"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { hero, profile } from "@/data/portfolio";
import AvatarVideo from "@/components/avatar/AvatarVideo";

/** Delay for the CSS `animate-rise` entrance (CSS runs before JS loads, so the hero paints fast). */
const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax: avatar fades out and drifts up; watermark drifts down slowly
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const still = (v: MotionValue<number>) => (reduceMotion ? undefined : v);

  const [line1, line2] = hero.titleLines;

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="top-title"
      className="glow relative isolate flex min-h-svh flex-col overflow-hidden px-4 pb-10 pt-20 sm:px-6 md:px-10 lg:pb-14"
    >
      {/* Giant faint name watermark */}
      <m.p
        aria-hidden
        style={{ y: still(watermarkY) }}
        className="pointer-events-none absolute inset-x-0 top-[16%] -z-10 select-none whitespace-nowrap text-center text-[27vw] font-black leading-none tracking-tighter text-ink/[0.05] lg:top-[10%]"
      >
        {hero.watermark}
      </m.p>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* Avatar: centred on phones/tablets, standing to the right on laptops.
            --h sets its height; width and position follow from it. */}
        <div
          style={{ mixBlendMode: "multiply" }}
          className="animate-fade-in relative mx-auto mt-6 h-(--h) w-[calc(var(--h)*0.64)] [--h:min(44svh,520px)] sm:mt-10 sm:[--h:min(50svh,560px)] lg:absolute lg:bottom-0 lg:left-[calc(72%_-_var(--h)*0.32)] lg:mx-0 lg:mt-0 lg:[--h:min(84svh,820px)]"
        >
          <m.div
            style={{ opacity: still(avatarOpacity), y: still(avatarY) }}
            className="relative size-full"
          >
            <AvatarVideo />
          </m.div>
        </div>

        {/* Bottom row: text left, actions right */}
        <div className="relative mt-auto flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between lg:pt-0">
          <div className="max-w-2xl">
            <p style={delay(0.1)} className="animate-rise text-xs font-medium uppercase tracking-[0.25em] text-muted">
              {hero.eyebrow}
            </p>
            <h1
              id="top-title"
              style={delay(0.18)}
              className="animate-rise mt-4 text-[clamp(2.4rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-tight text-ink"
            >
              <span className="sr-only">{profile.name}, </span>
              <span className="block whitespace-nowrap">{line1}</span>
              <span className="block whitespace-nowrap">
                {line2}
                <span className="text-ink/25">.</span>
              </span>
            </h1>
            <p style={delay(0.26)} className="animate-rise mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {hero.subtitle}
            </p>
          </div>

          <div style={delay(0.34)} className="animate-rise flex items-center gap-6 lg:flex-col lg:items-end lg:gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {hero.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a href="#about" className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted hover:text-ink">
              Scroll
              <ArrowDown className="size-3.5 animate-bounce motion-reduce:animate-none" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
