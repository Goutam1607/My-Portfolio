"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * Wraps the whole site so that:
 * - every animation respects the visitor's "reduce motion" system setting, and
 * - the animation engine loads after the page has painted (components use the
 *   lightweight `m.div` etc.; `strict` errors if a heavy `motion.div` sneaks in).
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
