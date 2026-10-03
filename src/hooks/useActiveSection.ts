"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently crossing the
 * middle of the screen. `aliases` lets a section without its own nav
 * link highlight another one (or nothing, with `null`).
 */
export function useActiveSection(ids: readonly string[], aliases: Record<string, string | null> = {}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id in aliases ? aliases[id] : id);
        }
      },
      // A thin band across the middle of the viewport
      { rootMargin: "-45% 0px -54% 0px" },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids/aliases are module constants
  }, []);

  return active;
}
