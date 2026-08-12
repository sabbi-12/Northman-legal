"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// Mouse-follow 3D tilt — the card rotates toward the cursor position within
// its own bounds, springs back flat on pointer leave. Meant to be mixed in
// on a subset of cards, not applied everywhere; overuse reads as gimmicky.
export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: ReactNode;
  className?: string;
  // Max rotation in degrees at the card's edge.
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20, mass: 0.5 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.16), transparent 60%)`
  );

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * maxTilt * 2);
    rotateXRaw.set(-(py - 0.5) * maxTilt * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      <div className="relative h-full w-full">
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-institutional"
          style={{ background: glowBackground }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
