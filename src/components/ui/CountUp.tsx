"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Number that counts up from 0 when it scrolls into view.
 * The final value is in the HTML (good for SEO / no-JS); reduced-motion users just see it.
 */
export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const ready = useRef(false);

  // Reset to 0 while still off-screen so the count-up is visible later
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion || ready.current) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) el.textContent = `0${suffix}`;
    ready.current = true;
  }, [reduceMotion, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
