"use client";

import { useState } from "react";
import Image from "next/image";

// Autoplaying, looping, muted background video for the Home hero. Falls
// back to the existing static photo (fallbackSrc) until the video can
// actually play, and permanently if it fails to load at all — so a slow
// connection or an unsupported browser never shows a blank frame.
export function HeroVideoBackground({
  videoSrc,
  fallbackSrc,
  fallbackAlt = "",
}: {
  videoSrc: string;
  fallbackSrc: string;
  fallbackAlt?: string;
}) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="absolute inset-0">
      <Image
        src={fallbackSrc}
        alt={fallbackAlt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className={`object-cover transition-opacity duration-700 ${
          videoReady && !videoFailed ? "opacity-0" : "opacity-100"
        }`}
      />
      {!videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
