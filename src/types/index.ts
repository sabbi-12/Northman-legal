import type { Locale } from "@/lib/i18n/config";

export type { Locale };

export type NavLink = {
  href: string;
  label: string;
};


export type PillarItem = {
  id: string;
  title: string;
  description: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  imageSrc: string;
};
