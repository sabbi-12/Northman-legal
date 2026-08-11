"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const SESSION_KEY = "spotlightPlayed";

// Light pool behind the Home logo — a real radial gradient (no hard edge,
// no box), wide but shallow so it hugs the wordmark's own proportions
// instead of a tall oval. Visible only pre-scroll: it fades out once the
// header switches to its solid scrolled state, same as the rest of Home's
// transparent-hero treatment.
//
// Only the very first "flicker-on" moment (the pool brightening irregularly
// before settling, see .flicker-run in globals.css) is one-time and
// session-gated — plain CSS keyframes, not framer-motion, for exact timing
// control. Once that animation finishes (or immediately, on later
// navigations within the same session), the .flicker-run class is removed
// and opacity is driven purely by the `active` prop instead — this keeps
// the one-time animation and the ongoing scroll-based show/hide from ever
// fighting over the same CSS property.
export function SpotlightFlicker({ active }: { active: boolean }) {
  const poolRef = useRef<HTMLDivElement>(null);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const el = poolRef.current;
    if (!el) return;

    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "true");
    setFlickering(true);

    const onAnimationEnd = () => setFlickering(false);
    el.addEventListener("animationend", onAnimationEnd);
    return () => el.removeEventListener("animationend", onAnimationEnd);
  }, []);

  return (
    <div
      ref={poolRef}
      aria-hidden="true"
      className={cn(
        "logo-glow pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full",
        flickering ? "flicker-run" : ["transition-opacity duration-300", active ? "opacity-100" : "opacity-0"]
      )}
      style={{
        width: "520px",
        height: "190px",
        background:
          "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,247,225,0.72) 0%, rgba(255,247,225,0.42) 40%, rgba(255,247,225,0.14) 65%, transparent 82%)",
        filter: "blur(15px)",
      }}
    />
  );
}
