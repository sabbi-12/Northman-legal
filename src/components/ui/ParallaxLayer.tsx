"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Shared scroll-progress parallax primitive — wraps a section's background
// image/photo so it drifts at a different speed than the foreground content
// as the section crosses the viewport. Reused instead of hand-writing
// useScroll/useTransform per section so every parallax instance shares one
// tuned range and one reduced-motion guard.
export function ParallaxLayer({
  children,
  strength = 40,
  className,
}: {
  children: ReactNode;
  // Vertical travel in pixels across the full scroll range. Higher = more
  // noticeable drift. Kept modest (24-60px) sitewide so it reads as depth,
  // not a distraction, matching the institutional register.
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-[calc(100%+80px)] w-full">
        {children}
      </motion.div>
    </div>
  );
}
