"use client";

import { useEffect, useState } from "react";

/** Live digital clock with blinking separator + date. */
export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="h-9 w-28" />;

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const blink = now.getMilliseconds() < 500;

  const date = now.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="glass flex flex-col items-start rounded-2xl px-3.5 py-2 leading-none">
      <span className="tabular text-[17px] font-semibold tracking-wide text-amber-100 sm:text-[19px]">
        {hh}
        <span
          className={`text-amber-400 ${blink ? "opacity-100" : "opacity-30"}`}
        >
          :
        </span>
        {mm}
        <span className="text-amber-400/70">:{ss}</span>
      </span>
      <span className="mt-1 text-[10px] font-medium tracking-[0.14em] text-white/55 uppercase">
        {date}
      </span>
    </div>
  );
}
