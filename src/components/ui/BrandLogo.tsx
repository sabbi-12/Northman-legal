import Image from "next/image";

import { cn } from "@/lib/utils";

// The real logo file (public/images/logo-real.png) has navy ink on a
// transparent background — it only reads on a light surface. No inverted
// (white/light) variant has been supplied yet, so anywhere the logo needs
// to sit on a dark surface (the navy footer, the dark-mode navbar) it's
// given its own small light card to sit on instead of guessing at an
// inverted colorway. Swap this for a real light-variant image the moment
// the brand supplies one.
export function BrandLogo({
  className,
  height = 40,
  onDark = false,
}: {
  className?: string;
  height?: number;
  onDark?: boolean;
}) {
  const width = Math.round(height * (300 / 89));
  const image = (
    <Image
      src="/images/logo-real.png"
      alt="Northman Sterling Legal"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      priority
    />
  );

  if (!onDark) {
    return <span className={className}>{image}</span>;
  }

  return (
    <span className={cn("inline-flex rounded-institutional bg-cream px-3 py-2", className)}>
      {image}
    </span>
  );
}
