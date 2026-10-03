"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { hero, profile } from "@/data/portfolio";
import { useAvatarSound } from "./AvatarSound";

const SIDE_FADE = "radial-gradient(ellipse 58% 120% at 50% 50%, #000 62%, transparent 100%)";
const FLOOR_FADE = "linear-gradient(to bottom, #000 93%, transparent 100%)";

/** Brightens the off-white background to pure white and fades the edges into the page. */
const MEDIA_STYLE: React.CSSProperties = {
  filter: "brightness(1.08) contrast(1.05)",
  maskImage: `${SIDE_FADE}, ${FLOOR_FADE}`,
  WebkitMaskImage: `${SIDE_FADE}, ${FLOOR_FADE}`,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

/**
 * The talking avatar, so it looks like you're standing on the page rather than inside a box
 * (the parent applies `mix-blend-mode: multiply`).
 *
 * For speed, the poster (identical to the first video frame) is shown immediately and the
 * 1.7 MB video only loads after the page has finished loading — or right away if someone
 * presses a sound button. Phones in data-saver mode skip the automatic video.
 */
export default function AvatarVideo() {
  const { videoRef, muted, setMuted, setAvailable, toggle, videoWanted, pendingSound, playWithSound } = useAvatarSound();
  const [failed, setFailed] = useState(false);
  const [idleReady, setIdleReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const loadVideo = idleReady || videoWanted;

  const fail = useCallback(() => {
    setFailed(true);
    setAvailable(false);
    console.info(`[avatar] No video found at ${hero.video}. Showing the placeholder silhouette instead.`);
  }, [setAvailable]);

  // Wait until the page has loaded and the browser is idle before fetching the video
  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(() => setIdleReady(true), { timeout: 2500 });
      else timer = setTimeout(() => setIdleReady(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video) return;

    video.muted = true;
    video.play().catch(() => {}); // autoplay can be blocked (e.g. battery saver); the poster stays visible

    const onPlaying = () => {
      setPlaying(true);
      if (pendingSound.current) {
        pendingSound.current = false;
        playWithSound(video);
      }
    };
    const onVolume = () => setMuted(video.muted);
    // After the intro plays once with sound, go back to a silent loop
    const onEnded = () => {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    };
    video.addEventListener("error", fail);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("volumechange", onVolume);
    video.addEventListener("ended", onEnded);

    // Pause while the hero is off-screen to save battery
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);

    return () => {
      video.removeEventListener("error", fail);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("volumechange", onVolume);
      video.removeEventListener("ended", onEnded);
      observer.disconnect();
    };
  }, [loadVideo, videoRef, fail, setMuted, pendingSound, playWithSound]);

  if (failed) return <AvatarPlaceholder />;

  return (
    <>
      <div className="relative size-full" style={MEDIA_STYLE}>
        <Image
          src={hero.poster}
          alt={`3D avatar of ${profile.name}`}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 1280px, 680px"
          className="object-cover"
          onError={fail}
          draggable={false}
        />
        {loadVideo && (
          <video
            ref={videoRef}
            src={hero.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>

      {/* "Tap for sound" hint, shown only while muted */}
      {muted && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-0 top-[30%] flex translate-x-1/3 items-center gap-1.5 rounded-full bg-ink py-2 pl-3 pr-3.5 text-xs font-medium text-canvas shadow-soft transition-transform hover:scale-105 sm:translate-x-1/2"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-canvas/70 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-canvas" />
          </span>
          <Volume2 className="size-3.5" aria-hidden />
          Hear my intro
        </button>
      )}
    </>
  );
}

/** Shown when the video file is missing. */
function AvatarPlaceholder() {
  return (
    <div className="flex size-full flex-col items-center justify-end pb-[2%]" role="img" aria-label="Avatar placeholder">
      <svg viewBox="0 0 200 520" className="h-[92%] w-auto text-ink/[0.07]" aria-hidden>
        <circle cx="100" cy="58" r="40" fill="currentColor" />
        <path
          d="M40 130c0-14 12-26 26-26h68c14 0 26 12 26 26v170c0 9-7 16-16 16h-6v186c0 9-7 16-16 16h-14c-9 0-16-7-16-16V340h-4v162c0 9-7 16-16 16H58c-9 0-16-7-16-16V316h-2c-9 0-16-7-16-16z"
          fill="currentColor"
        />
      </svg>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">Avatar coming soon</p>
    </div>
  );
}
