"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile, sections } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SoundToggle } from "@/components/avatar/AvatarSound";

const SPY_IDS = ["top", ...navLinks.map((l) => l.id), "certifications"];
// The hero highlights nothing; Certifications sits under "Experience".
const SPY_ALIASES = { top: null, certifications: "experience" };

export default function Header() {
  const active = useActiveSection(SPY_IDS, SPY_ALIASES);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 sm:px-6 md:px-8 md:pt-6">
      {/* Monogram badge → back to top */}
      <a
        href="#top"
        aria-label={`${profile.monogram} · ${profile.name}, back to top`}
        className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink text-sm font-semibold tracking-wide text-canvas shadow-soft transition-transform hover:scale-105"
      >
        {profile.monogram}
      </a>

      <div className="pointer-events-auto flex items-center gap-2">
        <SoundToggle />

        {/* Desktop pill navbar */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-canvas/70 p-1.5 shadow-soft backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-canvas" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center rounded-full border border-line bg-canvas/95 text-ink shadow-soft md:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </header>
  );
}

function MobileMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: string | null }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll, focus the close button, and close on Escape while open
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="glow pointer-events-auto fixed inset-0 z-50 flex flex-col bg-canvas px-6 pb-10 pt-4 md:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full bg-ink text-canvas"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="space-y-2">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={onClose}
                    aria-current={active === link.id ? "true" : undefined}
                    className="flex items-baseline gap-4 rounded-2xl px-2 py-2 text-4xl font-bold tracking-tight text-ink"
                  >
                    <span className="w-8 text-xs font-medium tabular-nums text-muted">{sections[link.id].number}</span>
                    <span className={active === link.id ? "font-serif font-normal italic" : ""}>{link.label}</span>
                  </a>
                </m.li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-muted">{profile.email}</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
