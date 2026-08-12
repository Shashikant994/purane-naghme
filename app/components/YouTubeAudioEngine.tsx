"use client";

import { useEffect, useRef } from "react";
import { usePlayer, type EngineHandle } from "@/app/context/PlayerContext";

/* ────────────────────────────────────────────────────────────────────────
   Invisible YouTube IFrame API audio engine.

   - Loads the official YouTube IFrame API once.
   - Creates the player inside a hidden container:
       opacity-0 · pointer-events-none · absolute -left-[9999px]
     so no video frame, controls or branding is ever visible.
   - UI actions are bound to native API methods:
       playVideo() · pauseVideo() · seekTo() · loadVideoById()
       getCurrentTime() · getDuration()
   - Playback state & progress are reported back into the PlayerContext.
   ──────────────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const API_SCRIPT_SRC = "https://www.youtube.com/iframe_api";

export default function YouTubeAudioEngine() {
  const {
    engineRef,
    reportReady,
    reportProgress,
    reportEnded,
    reportState,
    isPlaying,
  } = usePlayer();

  const playerRef = useRef<any>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Event callbacks are registered once on the native player; keep the
     LATEST versions behind refs so closures never go stale. */
  const reportEndedRef = useRef(reportEnded);
  const reportStateRef = useRef(reportState);
  useEffect(() => {
    reportEndedRef.current = reportEnded;
    reportStateRef.current = reportState;
  }, [reportEnded, reportState]);

  /* ── Build the EngineHandle the rest of the app talks to ────────────── */
  const buildHandle = (): EngineHandle => ({
    play: () => playerRef.current?.playVideo(),
    pause: () => playerRef.current?.pauseVideo(),
    seekTo: (seconds: number) => playerRef.current?.seekTo(seconds, true),
    loadSong: (song, autoplay) => {
      playerRef.current?.loadVideoById({
        videoId: song.youtubeId,
        startSeconds: 0,
      });
      if (autoplay) playerRef.current?.playVideo();
      else playerRef.current?.pauseVideo();
    },
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    getDuration: () => playerRef.current?.getDuration() ?? 0,
  });

  /* ── Progress poller (only while playing) ───────────────────────────── */
  useEffect(() => {
    if (!isPlaying) {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
        progressTimer.current = null;
      }
      return;
    }
    progressTimer.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      reportProgress(p.getCurrentTime() ?? 0, p.getDuration() ?? 0);
    }, 500);
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
      progressTimer.current = null;
    };
  }, [isPlaying, reportProgress]);

  /* ── Load IFrame API + create hidden player once ────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || readyRef.current) return;
      readyRef.current = true;

      playerRef.current = new window.YT.Player(hostRef.current, {
        width: "640",
        height: "360",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => {
            engineRef.current = buildHandle();
            reportReady();
          },
          onStateChange: (event: any) => {
            const state = event?.data;
            if (state === 1) reportStateRef.current(true);
            else if (state === 2) reportStateRef.current(false);
            else if (state === 0) reportEndedRef.current();
            else if (state === -1) reportStateRef.current(false);
          },
          onError: () => reportStateRef.current(false),
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    if (!document.querySelector(`script[src="${API_SCRIPT_SRC}"]`)) {
      const tag = document.createElement("script");
      tag.src = API_SCRIPT_SRC;
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (!cancelled) createPlayer();
    };

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
    >
      <div ref={hostRef} />
    </div>
  );
}
