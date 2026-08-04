# Northman Sterling — Project Architecture (Phase 1)

```
northman-sterling/
├── public/
│   ├── fonts/                              # self-hosted font fallbacks (optional, we use next/font + Google links)
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   ├── og-default-en.jpg
│   │   ├── og-default-ar.jpg
│   │   └── certifications/                 # cert badge assets
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── layout.tsx                  # ROOT i18n layout (dir, fonts, providers) — Phase 1
│   │   │   ├── page.tsx                    # Home (Hero, Pillars, Certifications, Global Presence, News)
│   │   │   ├── about-us/
│   │   │   │   └── page.tsx
│   │   │   ├── regions/
│   │   │   │   └── page.tsx
│   │   │   ├── news-updates/
│   │   │   │   ├── page.tsx                # Listing (SSG + ISR)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx            # Article detail (ISR revalidate)
│   │   │   ├── contact-us/
│   │   │   │   └── page.tsx
│   │   │   └── not-found.tsx
│   │   ├── sitemap.ts                      # Phase 4 — dynamic XML sitemap, per-language + hreflang
│   │   ├── robots.ts                       # Phase 4 — dynamic robots.txt
│   │   ├── api/
│   │   │   ├── contact/route.ts            # Phase 3 — Nodemailer/SMTP contact form handler
│   │   │   └── revalidate/route.ts         # Phase 3 — Sanity webhook → on-demand ISR refresh
│   │   ├── globals.css                     # Tailwind layers + font-face fallbacks + RTL utilities
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx                  # Ticker + Client Portal link — Phase 2
│   │   │   ├── Navbar.tsx                  # Logo, nav links, switchers — Phase 2
│   │   │   ├── LanguageSwitcher.tsx        # EN/AR elegant switcher — Phase 2
│   │   │   ├── DarkModeToggle.tsx          # Phase 2
│   │   │   └── Footer.tsx                  # Institutional footer — Phase 2
│   │   ├── sections/
│   │   │   ├── Hero.tsx                    # Phase 2
│   │   │   ├── CorePillars.tsx             # Immigration / Disputes / Notary — Phase 2
│   │   │   ├── Certifications.tsx          # Phase 2
│   │   │   ├── GlobalPresence.tsx          # "35+ countries" tagline — Phase 2
│   │   │   └── NewsUpdates.tsx             # Sanity-driven — Phase 3
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx                  # generic <script type=application/ld+json> renderer
│   │   │   ├── Breadcrumbs.tsx             # visual + schema — Phase 4
│   │   │   └── schemas/
│   │   │       ├── legalService.ts
│   │   │       ├── organization.ts
│   │   │       ├── attorney.ts
│   │   │       ├── article.ts
│   │   │       └── faqPage.ts
│   │   ├── analytics/
│   │   │   ├── GoogleTagManager.tsx        # afterInteractive
│   │   │   ├── GA4.tsx
│   │   │   ├── MicrosoftClarity.tsx        # lazyOnload
│   │   │   ├── HubSpotTracking.tsx         # lazyOnload
│   │   │   └── EventTracking.tsx           # call/email/whatsapp/form click handlers
│   │   └── ui/
│   │       ├── CookieConsent.tsx           # non-blocking, indexation-safe
│   │       ├── Ticker.tsx                  # top-bar marquee for current updates
│   │       └── ThemeProvider.tsx           # dark-mode context, default = light
│   │
│   ├── lib/
│   │   ├── i18n/
│   │   │   ├── config.ts                   # locales, defaultLocale, direction map
│   │   │   ├── getDictionary.ts             # dictionary loader (server-only)
│   │   │   └── dictionaries/
│   │   │       ├── en.json
│   │   │       └── ar.json
│   │   ├── sanity/
│   │   │   ├── client.ts                    # Sanity read client (CDN-backed)
│   │   │   ├── image.ts                     # urlFor() image URL builder
│   │   │   ├── posts.ts                      # GROQ query wrappers, tagged "post" for on-demand ISR
│   │   │   └── types.ts                     # SanityPostDoc, normalized NewsPost
│   │   ├── seo/
│   │   │   ├── metadata.ts                  # generateMetadata helpers, hreflang builder
│   │   │   └── constants.ts                 # site URL, socials, org info for schemas
│   │   └── utils.ts                          # cn(), formatDate(), etc.
│   │
│   ├── data/
│   │   └── redirects.ts                     # typed redirect map consumed by next.config.js
│   │
│   └── types/
│       └── index.ts                          # shared TS types (NavLink, Locale, etc.)
│
├── next.config.js                            # Phase 1 (this delivery)
├── tailwind.config.js                        # Phase 1 (this delivery)
├── postcss.config.js                         # Phase 1 (this delivery)
├── tsconfig.json                              # Phase 1 (this delivery)
├── package.json                               # Phase 1 (this delivery)
├── .env.local.example                         # Phase 1 (this delivery)
├── README.md
└── studio/                                     # STANDALONE Sanity Studio (separate project — see studio/README.md)
    ├── package.json                            # own React 19 install, independent of the Next.js app's React 18
    ├── sanity.config.ts
    ├── sanity.cli.ts
    ├── tsconfig.json
    ├── .env.local.example
    ├── README.md
    └── schemaTypes/
        ├── index.ts
        └── post.ts                             # title, slug, excerpt, mainImage, body (Portable Text), language, category, author
```

**Phase breakdown reminder:**
- Phase 1 (now): scaffolding, `next.config.js`, `tailwind.config.js`, root `[lang]/layout.tsx`, plus the supporting config files a real repo needs to actually run (`package.json`, `tsconfig.json`, `postcss.config.js`, `globals.css`, i18n config, `.env.local.example`).
- Phase 2: `TopBar`, `Navbar`, `LanguageSwitcher`, `DarkModeToggle`, `Hero`, `CorePillars`, `Certifications`, `GlobalPresence`, `Footer`.
- Phase 3: `lib/wordpress/api.ts`, `NewsUpdates.tsx`, `news-updates/page.tsx`, `news-updates/[slug]/page.tsx`, `about-us`, `regions`, `contact-us`.
- Phase 4: `sitemap.ts`, `robots.ts`, all JSON-LD schema components, `Breadcrumbs.tsx`, analytics scripts, `CookieConsent.tsx`.
