"use client";

import { m } from "framer-motion";
import type { Project } from "@/data/portfolio";

/*
 * Small hand-drawn UI previews for each project (pure divs/SVG, no screenshots).
 * Rows, bars and team names are illustrative sample data, labelled as such.
 */

export default function Mockup({ type }: { type: Project["mockup"] }) {
  const Comp = { firewall: FirewallMockup, sentiment: SentimentMockup, scan: ScanMockup, leaderboard: LeaderboardMockup }[type];
  return (
    <div aria-hidden className="w-full select-none">
      <Comp />
    </div>
  );
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-canvas text-ink shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted">{title}</span>
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

const row = (i: number) => ({
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.25 + i * 0.08 },
});

/* 01 — MUD firewall decisions + 8/8 ring */
function FirewallMockup() {
  const rows: [string, string, boolean][] = [
    ["thermostat", "vendor-cloud:443", true],
    ["camera", "unknown:23", false],
    ["smart-bulb", "mqtt-broker:1883", true],
    ["rogue-dev", "*:*", false],
    ["smart-plug", "ntp:123", true],
  ];
  return (
    <Window title="mud-manager · audit.csv">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 44 44" className="size-14 shrink-0 -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="5" />
          <m.circle
            cx="22" cy="22" r="18" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.3 }}
          />
        </svg>
        <div>
          <p className="text-lg font-bold leading-none">8/8</p>
          <p className="mt-1 text-[10px] text-muted">rogue-device tests passed</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 font-mono text-[10px]">
        <p className="grid grid-cols-[1fr_1.3fr_auto] gap-2 px-1.5 text-muted">
          <span>device</span><span>destination</span><span>policy</span>
        </p>
        {rows.map(([device, dest, allow], i) => (
          <m.p key={device} {...row(i)} className="grid grid-cols-[1fr_1.3fr_auto] items-center gap-2 rounded-md bg-surface px-1.5 py-1">
            <span className="truncate">{device}</span>
            <span className="truncate text-muted">{dest}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${allow ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {allow ? "ALLOW" : "BLOCK"}
            </span>
          </m.p>
        ))}
      </div>
      <p className="mt-2 text-right text-[9px] text-muted">sample log view</p>
    </Window>
  );
}

/* 02 — Sentiment bars per brand + feature chips */
function SentimentMockup() {
  const brands: [string, number, number][] = [
    ["Zepto", 58, 22],
    ["BigBasket", 46, 30],
    ["Swiggy Instamart", 52, 18],
  ];
  return (
    <Window title="review-intel · dashboard">
      <p className="text-[11px] font-semibold">Review sentiment by brand</p>
      <div className="mt-3 space-y-3">
        {brands.map(([brand, pos, neu], i) => (
          <div key={brand}>
            <p className="mb-1 text-[10px] text-muted">{brand}</p>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-surface">
              <m.span className="bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${pos}%` }} transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }} />
              <m.span className="bg-slate-300" initial={{ width: 0 }} animate={{ width: `${neu}%` }} transition={{ delay: 0.4 + i * 0.12, duration: 0.7 }} />
              <m.span className="bg-rose-400" initial={{ width: 0 }} animate={{ width: `${100 - pos - neu}%` }} transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-3 text-[9px] text-muted">
        <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-500" />positive</span>
        <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-slate-300" />neutral</span>
        <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-rose-400" />negative</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["sentiment", "pain points", "feature gaps", "insights"].map((k) => (
          <span key={k} className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] font-medium">#{k}</span>
        ))}
      </div>
      <p className="mt-2 text-right text-[9px] text-muted">sample data</p>
    </Window>
  );
}

/* 03 — Dermoscopic image scan + classification bar */
function ScanMockup() {
  return (
    <Window title="skin-classifier · predict">
      <div className="relative mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_50%,#8b5e4a_0%,#b98a6f_22%,#e8cbb5_48%,#f3e2d4_75%)]">
        {/* corner brackets */}
        {["left-2 top-2 border-l-2 border-t-2", "right-2 top-2 border-r-2 border-t-2", "bottom-2 left-2 border-b-2 border-l-2", "bottom-2 right-2 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute size-4 border-white/90 ${c}`} />
        ))}
        {/* moving scan line */}
        <span className="absolute inset-x-0 top-0 h-8 animate-[scan_2.4s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-sky-300/50 to-transparent motion-reduce:hidden" />
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-[10px] font-medium">
          <span className="text-emerald-600">Benign</span>
          <span className="text-rose-600">Malignant</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400">
          <m.span
            className="block h-full w-1 rounded-full bg-ink"
            initial={{ x: 0 }} animate={{ x: 40 }} transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
          />
        </div>
        <p className="mt-2 text-[10px] text-muted">confidence · sample output</p>
      </div>
    </Window>
  );
}

/* 04 — Live results leaderboard */
function LeaderboardMockup() {
  const teams: [string, number][] = [
    ["Team 07", 92],
    ["Team 03", 86],
    ["Team 12", 79],
    ["Team 01", 71],
  ];
  return (
    <Window title="symbiot 2026 · results">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500/70 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          LIVE RESULTS
        </p>
        <div className="flex gap-1 text-[9px]">
          {["All", "AI", "IoT", "Web"].map((d, i) => (
            <span key={d} className={`rounded-full px-1.5 py-0.5 ${i === 0 ? "bg-ink text-canvas" : "bg-surface text-muted"}`}>{d}</span>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {teams.map(([team, score], i) => (
          <m.div key={team} {...row(i)} className="flex items-center gap-2 rounded-md bg-surface px-2 py-1.5 text-[10px]">
            <span className={`grid size-4 place-items-center rounded-full text-[9px] font-bold ${i === 0 ? "bg-amber-300" : "bg-canvas"}`}>{i + 1}</span>
            <span className="w-12 font-medium">{team}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-canvas">
              <m.span className="block h-full rounded-full bg-ink" initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }} />
            </span>
          </m.div>
        ))}
      </div>
      <p className="mt-2 text-right text-[9px] text-muted">sample leaderboard</p>
    </Window>
  );
}
