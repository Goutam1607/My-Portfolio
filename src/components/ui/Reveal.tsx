"use client";

import { m } from "framer-motion";

/** Fades + slides its content up the first time it scrolls into view. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Render as a list item when used directly inside <ul>/<ol>. */
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? m.li : m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay }}
    >
      {children}
    </Tag>
  );
}
