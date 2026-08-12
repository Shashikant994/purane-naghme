"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SONGS, type EraId, type Song } from "@/app/data/songs";

/* ────────────────────────────────────────────────────────────────────────
   Player engine — native React Context (no external state management).
   The YouTube IFrame API bridge lives in YouTubeAudioEngine and reports
   through these same methods via a mutable ref.
   ──────────────────────────────────────────────────────────────────────── */

export type RepeatMode = "off" | "all" | "one";

export interface EngineHandle {
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  loadSong: (song: Song, autoplay: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface PlayerState {
  queue: Song[];
  index: number;
  currentSong: Song | null;
  isPlaying: boolean;
  isReady: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
  eraFilter: EraId | "all";
  drawerOpen: boolean;
  searchQuery: string;
  engineRef: React.MutableRefObject<EngineHandle | null>;
  playSongAt: (queueIndex: number) => void;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  seek: (seconds: number) => void;
  setEraFilter: (era: EraId | "all") => void;
  setDrawerOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  reportProgress: (currentTime: number, duration: number) => void;
  reportReady: () => void;
  reportEnded: () => void;
  reportState: (playing: boolean) => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<EngineHandle | null>(null);

  const [eraFilter, setEraFilter] = useState<EraId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const queue = useMemo(() => {
    const base =
      eraFilter === "all" ? SONGS : SONGS.filter((s) => s.eraId === eraFilter);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.movie.toLowerCase().includes(q) ||
        String(s.year).includes(q),
    );
  }, [eraFilter, searchQuery]);

  const [index, setIndex] = useState(0);

  const currentSong = useMemo(
    () => (queue.length > 0 ? queue[index % queue.length] : null),
    [queue, index],
  );

  /* Reset index when the queue shrinks */
  useEffect(() => {
    if (queue.length === 0) {
      setIndex(0);
      engineRef.current?.pause();
      setIsPlaying(false);
    } else if (index >= queue.length) {
      setIndex(0);
    }
  }, [queue.length, index]);

  /* Load the first song into the hidden player once it is ready */
  useEffect(() => {
    if (!isReady || !currentSong) return;
    const loaded = engineRef.current?.getDuration() ?? 0;
    // Only auto-load the very first song of the session.
    if (loaded === 0) {
      engineRef.current?.loadSong(currentSong, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const loadAt = useCallback(
    (queueIndex: number, autoplay = true) => {
      const target = queue[queueIndex];
      if (!target) return;
      setIndex(queueIndex);
      engineRef.current?.loadSong(target, autoplay);
      if (autoplay) setIsPlaying(true);
      else setIsPlaying(false);
    },
    [queue],
  );

  const playSongAt = useCallback(
    (queueIndex: number) => loadAt(queueIndex, true),
    [loadAt],
  );

  const playSong = useCallback(
    (song: Song) => {
      const queueIndex = queue.findIndex((s) => s.id === song.id);
      if (queueIndex >= 0) loadAt(queueIndex, true);
      else {
        // Song not in current queue (e.g. era-filtered) — play it standalone.
        setEraFilter("all");
        setSearchQuery("");
        // Wait a tick for the queue to rebuild, then play.
        setTimeout(() => {
          const i = SONGS.findIndex((s) => s.id === song.id);
          if (i >= 0) {
            setIndex(i);
            engineRef.current?.loadSong(SONGS[i], true);
            setIsPlaying(true);
          }
        }, 0);
      }
    },
    [queue, loadAt],
  );

  const togglePlay = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !currentSong) return;
    if (isPlaying) {
      engine.pause();
      setIsPlaying(false);
    } else {
      engine.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentSong]);

  const next = useCallback(() => {
    if (queue.length === 0) return;
    if (shuffle) {
      if (queue.length === 1) {
        engineRef.current?.seekTo(0);
        engineRef.current?.play();
        setIsPlaying(true);
        return;
      }
      let nextIndex = index;
      while (nextIndex === index) {
        nextIndex = Math.floor(Math.random() * queue.length);
      }
      loadAt(nextIndex, true);
      return;
    }
    loadAt((index + 1) % queue.length, true);
  }, [queue, index, shuffle, loadAt]);

  const prev = useCallback(() => {
    if (queue.length === 0) return;
    const engine = engineRef.current;
    // Restart current track if it has played for more than 3 seconds.
    if (engine && engine.getCurrentTime() > 3) {
      engine.seekTo(0);
      return;
    }
    if (shuffle) {
      let prevIndex = index;
      while (prevIndex === index) {
        prevIndex = Math.floor(Math.random() * queue.length);
      }
      loadAt(prevIndex, true);
      return;
    }
    loadAt((index - 1 + queue.length) % queue.length, true);
  }, [queue, index, shuffle, loadAt]);

  const toggleShuffle = useCallback(() => setShuffle((v) => !v), []);

  const cycleRepeat = useCallback(() => {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }, []);

  const seek = useCallback((seconds: number) => {
    engineRef.current?.seekTo(seconds);
  }, []);

  const reportProgress = useCallback(
    (t: number, d: number) => {
      setCurrentTime(t);
      if (d > 0) setDuration(d);
    },
    [],
  );

  const reportReady = useCallback(() => setIsReady(true), []);
  const reportEnded = useCallback(() => {
    if (repeat === "one" && currentSong) {
      engineRef.current?.seekTo(0);
      engineRef.current?.play();
      setIsPlaying(true);
    } else {
      next();
    }
  }, [repeat, currentSong, next]);

  const reportState = useCallback((playing: boolean) => setIsPlaying(playing), []);

  const value = useMemo<PlayerState>(
    () => ({
      queue,
      index,
      currentSong,
      isPlaying,
      isReady,
      currentTime,
      duration,
      shuffle,
      repeat,
      eraFilter,
      drawerOpen,
      searchQuery,
      engineRef,
      playSongAt,
      playSong,
      togglePlay,
      next,
      prev,
      toggleShuffle,
      cycleRepeat,
      seek,
      setEraFilter,
      setDrawerOpen,
      setSearchQuery,
      reportProgress,
      reportReady,
      reportEnded,
      reportState,
    }),
    [
      queue,
      index,
      currentSong,
      isPlaying,
      isReady,
      currentTime,
      duration,
      shuffle,
      repeat,
      eraFilter,
      drawerOpen,
      searchQuery,
      engineRef,
      playSongAt,
      playSong,
      togglePlay,
      next,
      prev,
      toggleShuffle,
      cycleRepeat,
      seek,
      reportProgress,
      reportReady,
      reportEnded,
      reportState,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}
