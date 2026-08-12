"use client";

/** Animated equalizer indicator — pulses while playing, still when paused. */
export default function Equalizer({
  playing,
  className = "",
  barClassName = "",
}: {
  playing: boolean;
  className?: string;
  barClassName?: string;
}) {
  const base = "w-[3px] origin-center rounded-full bg-current";
  const motion = playing ? "animate-eq-1" : "";
  return (
    <span
      className={`inline-flex h-3.5 items-center gap-[2.5px] ${className}`}
      aria-hidden
      style={playing ? undefined : { opacity: 0.6 }}
    >
      <span
        className={`${base} ${motion} ${barClassName}`}
        style={playing ? undefined : { transform: "scaleY(0.35)" }}
      />
      <span
        className={`${base} ${playing ? "animate-eq-2" : ""} ${barClassName}`}
        style={playing ? undefined : { transform: "scaleY(0.35)" }}
      />
      <span
        className={`${base} ${playing ? "animate-eq-3" : ""} ${barClassName}`}
        style={playing ? undefined : { transform: "scaleY(0.35)" }}
      />
      <span
        className={`${base} ${playing ? "animate-eq-4" : ""} ${barClassName}`}
        style={playing ? undefined : { transform: "scaleY(0.35)" }}
      />
    </span>
  );
}
