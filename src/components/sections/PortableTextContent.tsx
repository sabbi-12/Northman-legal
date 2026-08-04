import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1200).fit("max").url();
      return (
        <span className="relative my-8 block aspect-[16/9] w-full overflow-hidden rounded-institutional">
          <Image src={imageUrl} alt={value.alt ?? ""} fill className="object-cover" />
        </span>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal = /^https?:\/\//.test(value?.href ?? "");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-headings:font-medium prose-a:text-navy prose-a:no-underline hover:prose-a:text-gold dark:prose-a:text-gold">
      <PortableText value={value} components={components} />
    </div>
  );
}
