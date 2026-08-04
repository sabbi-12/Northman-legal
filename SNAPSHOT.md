# Snapshot — 2026-08-04, end of Home page build

This is a **frozen restore point**, not a living doc (that's `CLAUDE.md` and
`PRODUCT.md`). If a future edit breaks something, this file describes
exactly what "correct" looked like at this checkpoint — diff against it to
find what changed. Everything below was verified working (`npm run
typecheck` clean, home page returning HTTP 200 on both `/en` and `/ar`) at
the time this was written.

> **Superseded for anything color/logo/motion-related.** A git repository
> was initialized right after this was written — commit `ad5dded` on
> `main` (pushed to `github.com/sabbi-12/Northman-legal`) is the actual,
> literal restore point for everything described below, more reliable than
> this document. A rebrand pass landed on top of that commit shortly after
> (new navy/white/slate/charcoal palette, real logo, extended framer-motion
> coverage — see `CLAUDE.md`'s "Rebrand" section for the full account). The
> structural facts here (section order, component list, asset manifest,
> dictionary key set) are still accurate; only the specific color/logo
> details predate the rebrand. One asset-manifest entry is now wrong, not
> just recolored: the Hero background photo was swapped a second time
> during the rebrand pass, from `images/hero/london-eye.png` (below) to
> `images/hero/westminster-sunset.jpg` — the old file no longer exists on
> disk. Commit `46feef9` ("website design changes") is the checkpoint that
> carries the rebrand + this hero swap; treat it as current, not this file.

## What's built

The Home page (`src/app/[lang]/page.tsx`) — the only page whose content has
been finalized so far. About Us, Regions, News & Updates, Contact Us,
Privacy Policy, and Disclaimer all exist as pages but still have placeholder
content (see `CLAUDE.md`'s Page log).

## Home page section order (exact, as rendered)

```tsx
<Hero dict={dict} lang={lang} />
<ComplianceHighlights dict={dict} />
<Certifications dict={dict} />
<TrustBanner dict={dict} lang={lang} />
<CoreServices dict={dict} lang={lang} />
<WhyChooseUs dict={dict} lang={lang} />
<LegalAdvisors dict={dict} lang={lang} />
<EventGallery dict={dict} />
<LatestInsights dict={dict} lang={lang} />
<LetsConnect dict={dict} />
<FirmIdentity dict={dict} />
<Newsletter dict={dict} />
```

Plus the persistent `TopBar` + `Navbar` (header) and `Footer`, both rendered
from `src/app/[lang]/layout.tsx`, not the page itself.

## Section-by-section state

| # | Section | Component | Background | Real media used | Notes |
|---|---|---|---|---|---|
| 0 | Header | `layout/TopBar.tsx`, `layout/Navbar.tsx` | navy / cream | — | Ticker leads with the brief's exact example headline |
| 1 | Hero | `sections/Hero.tsx` | navy, real photo bg | `images/hero/london-eye.png` | Eyebrow/headline/subheadline/CTA only — no checklist here anymore |
| 2 | Compliance Highlights | `sections/ComplianceHighlights.tsx` | **cream** (`dark:bg-navy-dark`) | — | Title "Complete Compliance & Legal Support"; the 3-item checklist, split out of Hero |
| 3 | We Are Certified | `sections/Certifications.tsx` | white | 3 real ISO badges | `images/certifications/iso-{27001,37001,9001-2015}.{png,jpg}` |
| 4 | Trust & Global Reach | `sections/TrustBanner.tsx` | cream | — | "35+ Countries" + HQ note + 3 quick badge links only (certified block moved to #3) |
| 5 | Core Services | `sections/CoreServices.tsx` | cream | 4 real service icons | `images/services/{corporate-immigration,company-incorporation,outbound-visas,document-attestation}.png` |
| 6 | Why Choose Us | `sections/WhyChooseUs.tsx` | white | 1 real photo (low-res, 300×227) | `images/about/why-choose-us.png` |
| 7 | Your Legal Advisors | `sections/LegalAdvisors.tsx` | cream | 1 real photo (low-res, 300×200) | `images/about/legal-advisor.png`; stats (35+/Riyadh/24-7) now in a light strip below the photo, not inside a navy card |
| 8 | Event Gallery | `sections/EventGallery.tsx` | navy | 4 real event photos | `images/events/*.png`; sliding carousel (autoplay, prev/next, dots), `aspect-[3/2]`, `quality={95}` |
| 9 | Latest Insights | `sections/LatestInsights.tsx` | white | none yet (gradient+icon tiles) | Static 4 posts from the brief, not Sanity — `NewsUpdates.tsx` still exists, unused, for when real posts exist |
| 10 | Let's Connect | `sections/LetsConnect.tsx` | cream | — | Wraps shared `ContactForm.tsx`, submit label "Submit Enquiry" |
| 11 | Firm Identity | `sections/FirmIdentity.tsx` | navy | — | "Northman Sterling Legal" statement band |
| 12 | Newsletter | `sections/Newsletter.tsx` | cream | — | Posts to `/api/newsletter`, emails the team (no ESP yet) |
| — | Footer | `layout/Footer.tsx` | navy | — | Real address/phone/fax/email; social icons still link to `#` (no real URLs yet) |

## Asset manifest (everything under `public/images/` that isn't a logo)

```
public/images/hero/london-eye.png              1519×700  — Hero background
public/images/certifications/iso-27001.png      512×512  — ISO 27001 badge
public/images/certifications/iso-37001.png      512×512  — ISO 37001 badge
public/images/certifications/iso-9001-2015.jpg  (jpg)    — ISO 9001:2015 badge
public/images/services/corporate-immigration.png  95×94  — plane+globe icon
public/images/services/company-incorporation.png  95×94  — person+buildings icon
public/images/services/outbound-visas.png         95×94  — globe+VISA card icon
public/images/services/document-attestation.png   95×94  — documents+check icon
public/images/events/sme-london-business-awards-2024.png  1200×800
public/images/events/fem-emea-summit-2023.png             1200×800
public/images/events/hr-leaders-conference-2024.png       1200×800
public/images/events/pif-private-sector-forum.png         1200×800
public/images/about/why-choose-us.png            300×227  — low-res, flag for replacement
public/images/about/legal-advisor.png            300×200  — low-res, flag for replacement
```

Source originals for all of these live in the user's local folder
`C:\Users\sabbi\OneDrive\Desktop\northmanlegal media\` — if a copied file
under `public/images/` ever goes missing or corrupted, it can be re-copied
from there (exact source filenames are in `CLAUDE.md`'s media notes).

## Dictionary key inventory (`src/lib/i18n/dictionaries/{en,ar}.json`)

Both files must always have the same top-level key set:

```
meta, nav, topBar, hero, complianceHighlights, trustBanner, coreServices,
whyChooseUs, legalAdvisors, eventGallery, latestInsights, letsConnect,
firmIdentity, newsletter, pillars, certifications, globalPresence,
newsSection, aboutPage, regionsPage, contactPage, cookieConsent,
legalPages, footer
```

If `en.json` and `ar.json` ever drift (a key added to one but not the other),
that's a bug — the whole build assumes bilingual parity everywhere (see
`PRODUCT.md`'s Product Principles).

## Other state worth knowing about

- `src/lib/email/mailer.ts` — shared SMTP sender, used by both
  `/api/contact` and `/api/newsletter`.
- `src/lib/seo/constants.ts` — `ORGANIZATION` has real Riyadh address/phone
  (`+966570011966`)/fax/`ksa@northmansterling.legal`; social URLs still
  blank.
- `src/components/ui/ManageConsentButton.tsx` + `CONSENT_REOPEN_EVENT` in
  `lib/analytics/consent.ts` — floating "Manage consent" button, site-wide,
  wired into `[lang]/layout.tsx`.
- `.env.local` exists locally (copied from `.env.local.example`) with no
  real credentials filled in yet — Sanity, SMTP, and analytics IDs are all
  blank, so News & Updates falls back to empty and forms will fail to send
  until real SMTP creds are added.
- `PRODUCT.md` and `.impeccable/live/config.json` were created by the
  `impeccable` design skill's `init` flow. The skill itself
  (`.claude/skills/impeccable/`) was installed mid-session and needs a
  fresh Claude Code session before `/impeccable` or the Skill tool will
  recognize it.
- This is **not a git repository** — there is no commit history to fall
  back on. This file plus `CLAUDE.md` are the only recovery mechanism if
  something regresses. If git ever gets initialized here, treat that as a
  strict upgrade, not a replacement for keeping these files current.

## How to verify the site still matches this snapshot

```bash
npm run typecheck       # must be clean
npm run dev              # then check:
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/ar
```

Both should return `200`. If a section is missing or an image 404s, compare
`src/app/[lang]/page.tsx` and the asset manifest above against current state
to find the regression.
