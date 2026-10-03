"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type AvatarSound = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  /** False when the video is missing, so the sound buttons hide. */
  available: boolean;
  setAvailable: (available: boolean) => void;
  toggle: () => void;
  /** True once someone asked for sound before the (deferred) video had loaded. */
  videoWanted: boolean;
  /** Set when sound was requested before the video existed; AvatarVideo plays it once ready. */
  pendingSound: React.RefObject<boolean>;
  playWithSound: (video: HTMLVideoElement) => void;
};

const AvatarSoundContext = createContext<AvatarSound | null>(null);

/** Shares the hero video between the Hero section and the sound buttons. */
export function AvatarSoundProvider({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSound = useRef(false);
  const [muted, setMuted] = useState(true);
  const [available, setAvailable] = useState(true);
  const [videoWanted, setVideoWanted] = useState(false);

  // Restart the intro from the top with sound. It plays once, then goes back
  // to a silent loop (see AvatarVideo).
  const playWithSound = useCallback((video: HTMLVideoElement) => {
    video.currentTime = 0;
    video.loop = false;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    });
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      // The video loads after the page; load it now and play with sound when ready
      pendingSound.current = true;
      setVideoWanted(true);
      return;
    }
    if (video.muted) {
      playWithSound(video);
    } else {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    }
  }, [playWithSound]);

  const value = useMemo(
    () => ({ videoRef, muted, setMuted, available, setAvailable, toggle, videoWanted, pendingSound, playWithSound }),
    [muted, available, toggle, videoWanted, playWithSound],
  );

  return <AvatarSoundContext.Provider value={value}>{children}</AvatarSoundContext.Provider>;
}

export function useAvatarSound() {
  const ctx = useContext(AvatarSoundContext);
  if (!ctx) throw new Error("useAvatarSound must be used inside <AvatarSoundProvider>");
  return ctx;
}

/** Small round speaker button that sits next to the navbar. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const { muted, available, toggle } = useAvatarSound();
  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? "Turn on sound for my video intro" : "Mute my video intro"}
      title={muted ? "Sound on" : "Sound off"}
      className={`relative grid size-11 place-items-center rounded-full border border-line bg-canvas/95 text-ink shadow-soft md:bg-canvas/70 md:backdrop-blur-md transition-colors hover:bg-ink hover:text-canvas ${className}`}
    >
      {muted ? <VolumeX className="size-[18px]" aria-hidden /> : <Volume2 className="size-[18px]" aria-hidden />}
      {/* Live indicator while sound is playing */}
      {!muted && (
        <span aria-hidden className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-canvas" />
      )}
    </button>
  );
}
