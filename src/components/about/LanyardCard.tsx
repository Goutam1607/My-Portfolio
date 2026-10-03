"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, m, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, RefreshCw } from "lucide-react";
import { idCard, profile } from "@/data/portfolio";

/** Pendulum feel: low damping = several gentle swings before it settles. */
const SWING = { type: "spring" as const, stiffness: 26, damping: 2.6 };
const MAX_ANGLE = 65;

/**
 * A college/company style ID card hanging from a lanyard.
 * - swings in when it first scrolls into view
 * - drag it sideways: it rotates around the top of the strap and springs back
 * - hover (mouse) or tap (touch) flips it to show the back
 */
export default function LanyardCard() {
  const reduceMotion = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const inView = useInView(anchorRef, { once: true, amount: 0.4 });
  const rotate = useMotionValue(0);
  const [flipped, setFlipped] = useState(false);
  const drag = useRef<{ startX: number; startY: number; offset: number; moved: boolean } | null>(null);

  // Swing in the first time it's seen
  useEffect(() => {
    if (!inView || reduceMotion) return;
    rotate.set(16);
    const controls = animate(rotate, 0, SWING);
    return () => controls.stop();
  }, [inView, reduceMotion, rotate]);

  /** Angle (deg) of the pointer around the hook at the top of the strap. */
  const pointerAngle = (e: React.PointerEvent) => {
    const r = anchorRef.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(e.clientY - r.top, 1);
    return (-Math.atan2(dx, dy) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    rotate.stop();
    drag.current = { startX: e.clientX, startY: e.clientY, offset: pointerAngle(e) - rotate.get(), moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 6) d.moved = true;
    if (d.moved && !reduceMotion) {
      const angle = pointerAngle(e) - d.offset;
      rotate.set(Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle)));
    }
  };

  const endDrag = (e: React.PointerEvent, cancelled = false) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    // A touch tap (no real movement) flips the card; mice flip on hover instead
    if (!d.moved && !cancelled && e.pointerType !== "mouse") setFlipped((f) => !f);
    animate(rotate, 0, { ...SWING, velocity: rotate.getVelocity() });
  };

  return (
    <div ref={anchorRef} className="relative flex flex-col items-center">
      <m.div style={{ rotate, transformOrigin: "50% 0%" }} className="flex flex-col items-center will-change-transform">
        <Strap />

        {/* Card (3D flip) */}
        <div
          className="relative -mt-1 h-[420px] w-[264px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
          style={{ perspective: 1400 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e)}
          onPointerCancel={(e) => endDrag(e, true)}
          onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && !drag.current && setFlipped(false)}
        >
          <m.div
            className="relative size-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <CardFront />
            <CardBack />
          </m.div>
        </div>
      </m.div>

      {/* Keyboard / screen-reader friendly flip control + hint */}
      <p className="mt-6 flex items-center gap-2 text-xs text-muted">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-medium text-ink transition-colors hover:bg-ink hover:text-canvas"
        >
          <RefreshCw className="size-3.5" aria-hidden />
          Flip card
        </button>
        <span aria-hidden>· drag to swing</span>
      </p>
    </div>
  );
}

/** Fabric strap with stitching, a metal ring at the top and a clip at the bottom. */
function Strap() {
  return (
    <div aria-hidden className="flex flex-col items-center">
      <div className="size-4 rounded-full border-[3px] border-zinc-400 bg-transparent" />
      <div className="relative -mt-1 h-16 w-6 overflow-hidden rounded-b-sm bg-ink md:h-40">
        <div className="absolute inset-y-0 left-[3px] right-[3px] border-x border-dashed border-canvas/25" />
        <p className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.3em] text-canvas/55 [writing-mode:vertical-rl]">
          {profile.name} · Developer · {profile.name} · Developer
        </p>
      </div>
      {/* clip */}
      <div className="relative z-10 -mt-0.5 h-5 w-9 rounded-md bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-sm">
        <div className="absolute inset-x-2 top-1.5 h-1 rounded-full bg-zinc-500/50" />
      </div>
      <div className="z-10 -mt-1 h-3 w-4 rounded-b-md border-x-[3px] border-b-[3px] border-zinc-400" />
    </div>
  );
}

const faceClass =
  "absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_24px_50px_-20px_rgb(30_34_53/0.35)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

/** Slot punched through the top of the card for the clip. */
function Slot({ className }: { className: string }) {
  return <div aria-hidden className={`absolute left-1/2 top-2.5 h-2 w-12 -translate-x-1/2 rounded-full ${className}`} />;
}

function CardFront() {
  return (
    <div className={`${faceClass} flex flex-col border-line bg-canvas`}>
      {/* dark header strip */}
      <div className="relative bg-ink px-5 pb-3 pt-7 text-canvas">
        <Slot className="bg-canvas" />
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.3em]">
          {idCard.header}
          <BadgeCheck className="size-4 text-sky-300" aria-label="verified" />
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center px-5 pt-5">
        <div className="relative h-[136px] w-[110px] overflow-hidden rounded-xl ring-4 ring-surface">
          <Image src={profile.photo} alt={`Photo of ${profile.name}`} fill sizes="110px" className="object-cover" draggable={false} />
        </div>

        <p className="mt-4 text-xl font-bold tracking-[0.12em] text-ink">{idCard.name}</p>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">{idCard.role}</p>

        <dl className="mt-4 grid w-full grid-cols-2 gap-2 border-t border-line pt-3">
          {idCard.fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">{f.label}</dt>
              <dd className="font-mono text-xs font-semibold text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <Barcode value={idCard.fields[0]?.value ?? idCard.name} />
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className={`${faceClass} flex flex-col border-ink bg-ink px-6 pb-5 pt-9 text-canvas [transform:rotateY(180deg)]`}>
      <Slot className="bg-canvas" />
      <p className="font-serif text-3xl italic">{idCard.backTitle}</p>
      <ul className="mt-4 space-y-2.5">
        {idCard.whatIAm.map((item) => (
          <li key={item.title} className="flex gap-2.5">
            <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-canvas/15">
              <Check className="size-2.5" aria-hidden />
            </span>
            <span className="text-[13px] leading-snug">
              <span className="font-semibold">{item.title}</span>
              <span className="block text-[11px] text-canvas/60">{item.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <p className="font-signature text-[2.6rem] leading-none text-canvas/90">{idCard.signature}</p>
        <p className="mt-1 border-t border-canvas/20 pt-1 text-[9px] uppercase tracking-[0.25em] text-canvas/45">Signature</p>
      </div>
    </div>
  );
}

/** Decorative barcode generated from the ID text (same bars every time). */
function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; x < 196; i++) {
    const code = value.charCodeAt(i % value.length);
    const w = ((code * (i + 3)) % 3) + 1;
    const gap = ((code + i * 7) % 3) + 1.5;
    bars.push({ x, w });
    x += w + gap;
  }
  return (
    <div className="mt-auto w-full pb-4 pt-3" aria-hidden>
      <svg viewBox="0 0 200 34" className="h-9 w-full text-ink" preserveAspectRatio="none">
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={34} fill="currentColor" />
        ))}
      </svg>
      <p className="mt-1 text-center font-mono text-[9px] tracking-[0.4em] text-muted">{value}</p>
    </div>
  );
}
