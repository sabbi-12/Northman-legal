# CLAUDE.md — Northman Sterling (northmansterling.legal)

Living project doc. Update this file every time we ship a page or make an
architectural/SEO decision — it is the source of truth for continuity across
sessions, not a one-time plan.

## Role this project is run under

Every change on this codebase is made wearing five hats at once:
senior full-stack dev (20yrs), website/error-handling analyst, web designer,
code-reuse/DRY reviewer, and SEO specialist. Concretely that means: no page
ships without unique metadata + canonical + hreflang; no client component
ships if server-rendering would do; no redirect is "close enough"; no visual
choice undermines an "institutional law firm" register in favor of a
"tech startup" one.

## Current status (last updated 2026-08-10)

The Next.js 14 App Router scaffold is **already substantially built** —
this is not a greenfield start. Verified present and wired correctly:

| Requirement | Status | Where |
|---|---|---|
| SSR/SSG for marketing pages | ✅ | `src/app/[lang]/**/page.tsx`, static + `generateStaticParams` |
| Unique title/description per page | ✅ pattern exists, ⚠️ needs real copy per page | each `page.tsx` `generateMetadata` |
| Canonical URLs | ✅ | every page's `alternates.canonical` |
| EN–AR hreflang | ✅ | root layout + per-page `alternates.languages`, `sitemap.ts` |
| LegalService/Organization/Attorney schema | ✅ wired site-wide | `[lang]/layout.tsx` + `components/seo/schemas/*` |
| Article schema | ✅ on article pages | `news-updates/[slug]/page.tsx` |
| FAQPage schema | ⚠️ builder exists (`schemas/faqPage.ts`), **not yet emitted** — `FAQ.tsx` renders visually but doesn't call `JsonLd` | fix when wiring About Us real content |
| XML sitemap per language | ✅ | `src/app/sitemap.ts` (one entry per locale + hreflang alternates) |
| robots.txt | ✅ | `src/app/robots.ts` |
| Breadcrumbs (visual + schema) | ✅ | `components/seo/Breadcrumbs.tsx` |
| 301 redirects from old WP URLs | ✅ full crawl done 2026-08-07 — all 56 blog posts + corporate-immigration/-2 + company-incorporation + terms-and-conditions now explicit 1:1 | `src/data/redirects.ts` + mirrored in `next.config.js` — see "WP → Vercel migration" below |
| Open Graph / social metadata | ✅ pattern exists, ⚠️ OG images are placeholder paths that don't exist yet | root layout + `public/images/og-default-{en,ar}.jpg` missing |
| WebP/AVIF images | ✅ configured | `next.config.js` `images.formats` |
| Minimal client JS | ✅ by default (RSC everywhere) — audit each new component for unnecessary `"use client"` | |
| Cookie consent, non-blocking for indexation | ✅ correctly built — gates analytics only, never content | `ui/CookieConsent.tsx` + `lib/analytics/consent.ts` |
| HubSpot tracking | ✅ script loader, consent-gated | `analytics/HubSpotTracking.tsx` |
| HubSpot forms + campaign attribution | ❌ not built yet | needs a `HubSpotForm` embed component + UTM/attribution capture |
| GA4 + GTM | ✅ consent-gated | `analytics/GA4.tsx`, `GoogleTagManager.tsx` |
| Search Console verification | ❌ not present | add `verification.google` in root `generateMetadata` once we have the token |
| Microsoft Clarity | ✅ | `analytics/MicrosoftClarity.tsx` |
| Call/email/WhatsApp/form conversion tracking | ✅ click delegation via `dataLayer` | `analytics/EventTracking.tsx` |
| Booking conversion tracking | ❌ no booking flow exists yet | build once we know the booking tool (Calendly? HubSpot meetings?) |
| Dark mode (UX only, default light) | ✅ correctly deprioritized — `ThemeProvider` defaults light, toggle is optional | `ui/ThemeProvider.tsx`, `layout/DarkModeToggle.tsx` |
| Language switcher | ✅ | `layout/LanguageSwitcher.tsx` |
| Restrained/institutional visual style | ✅ direction set — Cinzel/Amiri serif headings, navy/cream/accent(slate-blue) palette, no startup-gradient aesthetic | `[lang]/layout.tsx` fonts, `tailwind.config.js` |

**Bottom line:** the architecture and SEO plumbing are sound and mostly
already match the brief. What's missing is (a) real content per page,
(b) a handful of not-yet-built features flagged ❌ above, and (c) the
pre-launch migration data (full WP crawl, real OG images, credentials).

## Working model: page by page

1. User supplies content/copy for one page (or section).
2. We fill in real EN + AR dictionary strings in
   `src/lib/i18n/dictionaries/{en,ar}.json` — never hardcode copy in JSX.
3. We finalize that page's `generateMetadata` (title, description, OG,
   canonical) with the real content, not placeholders.
4. We wire any schema that page needs (FAQ schema is still owed on About Us –
   see table above).
5. We check the redirect map / sitemap entry for that page's real old-WP URL.
6. We test: `npm run dev`, verify render + `view-source` for metadata/schema,
   `npm run typecheck`.
7. Update this file's status table and the "Page log" below.

## Page log

| Page | Content received | Metadata finalized | Schema wired | Notes |
|---|---|---|---|---|
| Home | ✅ 2026-08-04, full 10-section brief | ✅ (existing root layout metadata covers it) | Org/LegalService/Attorney (sitewide) | See "Home page build" + "Home page bolder pass" below |
| About Us | ✅ 2026-08-05, full 10-section brief | ✅ (title/description updated for new content) | Org/LegalService/Attorney (sitewide), Core Pillars anchors, FAQPage (pre-existing) | See "About Us page build" below |
| Contact Us | ✅ 2026-08-05, full 8-section brief | ✅ (title/description updated for new content) | Org/LegalService/Attorney (sitewide) | See "Contact Us page build" below + "Session 2026-08-10" for the hero photo/`-mt-24` rework and Global Offices trim to KSA-only |
| Services (replaces Regions in nav) | ✅ 2026-08-05, full 6-section brief | ✅ (title/description updated for new content) | Org/LegalService/Attorney (sitewide) | See "Services page build" below |
| Services → Corporate Immigration detail | ✅ 2026-08-05 | ✅ | Org/LegalService/Attorney (sitewide) | `/services/corporate-immigration`, "pillars" layout |
| Services → Company Incorporation detail | ✅ 2026-08-05 | ✅ | Org/LegalService/Attorney (sitewide) | `/services/company-incorporation`, "ksa-guide" layout |
| Services → remaining 4 (Outbound Visas, Consular Visa, Employee Outsourcing, Document Attestation) | — | — | | Grid cards exist on /services; "Learn More" → Contact Us until detail content is written |
| News & Updates (list + detail) | ✅ 56 real posts migrated from WP | Article ✅ | Article ✅ | Sanity-backed, ISR |
| Privacy Policy | — | — | | |
| Disclaimer | — | — | | |
| Terms and Conditions | ✅ 2026-08-07, full WP text copied verbatim | ✅ | | `/terms-and-conditions`, see "WP → Vercel migration" below |

(Fill in as we go — don't let this table go stale.)

## Home page build (2026-08-04)

Built to the client's 10-section content brief. New section components added
under `src/components/sections/`: `TrustBanner`, `CoreServices`,
`WhyChooseUs`, `LegalAdvisors`, `EventGallery`, `LatestInsights`,
`LetsConnect`, `FirmIdentity`, `Newsletter`. Assembled in
`src/app/[lang]/page.tsx`. All copy lives in the dictionaries (new keys:
`trustBanner`, `coreServices`, `whyChooseUs`, `legalAdvisors`,
`eventGallery`, `latestInsights`, `letsConnect`, `firmIdentity`,
`newsletter`) — EN and AR both filled in, not placeholders.

Decisions worth knowing about before touching this again:

- **Custom SVG placeholders are being retired as real assets arrive.**
  Originally built a custom inline-SVG London skyline for the hero and
  gradient-plus-icon tiles for services/events, since the brief asked for
  photos but didn't supply any at the time. The user has since been sending
  real assets one at a time — as of 2026-08-04: the hero background is now
  a real photo (`public/images/hero/westminster-sunset.jpg` — superseded
  the earlier London Eye/Thames photo, see the rebrand-era Hero note
  below), all 4 Event Gallery photos are real, all 4
  Core Services icons are real, the Why Choose Us and Legal Advisors photos
  are real (though both of those are small WordPress-thumbnail exports,
  ~300px wide — capped their display size accordingly, flagged to the user
  that full-resolution originals would sharpen them up). `LatestInsights.tsx`
  blog thumbnails are still gradient-plus-icon placeholders — swap for
  `next/image` the moment real thumbnails are provided, same pattern as
  everywhere else.
- **Latest Insights is static, not Sanity-driven.** The brief gave four
  specific post titles/dates/authors for the home page. `LatestInsights.tsx`
  hardcodes those from the dictionary. The original Sanity-backed
  `NewsUpdates.tsx` component still exists and still works — swap it back in
  once those four articles (or others) actually exist as Sanity documents.
- **Newsletter signup emails the team, it doesn't call an ESP.** No mailing
  list provider has been chosen yet, so `/api/newsletter` reuses the same
  SMTP transport as the contact form (factored out into
  `src/lib/email/mailer.ts`, shared by both routes) and just emails
  `CONTACT_TO_EMAIL` each signup. Replace with a real Mailchimp/HubSpot list
  call once the firm picks one — don't leave both running.
- **Contact form service list** (`contactPage.formServiceOptions`) was
  expanded to the 9 options from the brief's lead-capture section. This is
  shared by both the home page's "Let's Connect" form and the Contact Us
  page form, so both are already in sync.
- **`ORGANIZATION` constants updated** (`src/lib/seo/constants.ts`) with the
  real Riyadh address, phone, fax, and `ksa@northmansterling.legal` from the
  brief's footer section. `facebookUrl`/`twitterUrl`/`linkedinUrl` are still
  blank placeholders — footer social icons currently link to `#`. Fill
  these in before launch; they also feed `Organization` schema's `sameAs`.
- **"Manage consent" floating button** added
  (`components/ui/ManageConsentButton.tsx`) per the brief's footer note. It
  only appears after a consent decision has been made (so it doesn't
  duplicate the first-visit banner) and reopens `CookieConsent` via a
  `ns-consent-reopen` window event, wired in `[lang]/layout.tsx` — applies
  site-wide, not just on Home.
- **Ticker** now leads with the exact example headline from the brief
  ("How Government Relations Services Support Iqama Processing...").

## Real media has started arriving (2026-08-04)

The user has a local folder, `C:\Users\sabbi\OneDrive\Desktop\northmanlegal media\`,
with real assets pulled from the live WP site — event photos for all 4
Event Gallery entries, real ISO certificates, real team headshots, real
logo files, and blog images. As pieces are handed over, copy them into
`public/images/<category>/` and wire them in, replacing the placeholder
icon-tile graphics described above.

**Done so far:** the 3 real ISO badges (27001 Information Security, 37001
Anti-Bribery, 9001:2015 Quality Management) now live in
`public/images/certifications/` and render in `Certifications.tsx`, which
was split back out as its own "We Are Certified" section placed directly
after Hero (matching the original brief order) — `TrustBanner.tsx` now only
covers the "35+ Countries" + HQ + quick-badge-links part of that section.

**Event Gallery — done (2026-08-04).** All 4 real event photos now live in
`public/images/events/` and `EventGallery.tsx` was rebuilt from the
icon-tile placeholder into a full sliding carousel: one large slide at a
time (real photo with a bottom gradient overlay for text legibility),
autoplay every 6s (pauses on hover), prev/next arrows, and dot indicators,
using framer-motion's AnimatePresence for the slide transition rather than
a scroll-snap track. Section anchor `#event-gallery` (linked from the
footer's "Key Events") is preserved.

**Still on placeholders, waiting on real assets:** team
headshots (could support a future "Our Team" section — don't invent one
unprompted), and blog thumbnails (`LatestInsights.tsx` still uses an
accent-tinted icon tile, no photo). The real logo is done — see the
Rebrand section below. `public/images/logo-mark-square.png` (the square
logo variant the client also sent) is copied into `public/images/` but
**not wired into any component yet** — `BrandLogo.tsx` only renders the
horizontal wordmark. Decide if/where the square mark is needed (favicon?
a compact mobile navbar mark?) before it goes stale as an orphaned asset.

**Compliance Highlights split out of Hero (2026-08-04).** The 3-item
checklist (Global Immigration Solutions / Expertise and Partnerships /
Strategic Mobility Optimization) used to be an overlaid card at the bottom
of the Hero. It's now its own component, `ComplianceHighlights.tsx`, titled
"Complete Compliance & Legal Support", placed directly after Hero. First
attempt kept it on a navy background and it visually merged with Hero above
(two navy sections back to back read as one block) — fixed by giving it a
distinct cream/white background (`dark:bg-navy-dark`) so the section break
is unmistakable. Hero itself is back to just eyebrow/headline/subheadline/CTA,
nothing else. Dictionary key moved from `hero.features` to
`complianceHighlights.items` (with a new `complianceHighlights.title` key).

**Hero background is now a real photo, not the SVG skyline (2026-08-04).**
Swapped in `public/images/hero/london-eye.png` (real London Eye/Thames
photo, 1519×700) as the Hero's `next/image` background, replacing the
custom-drawn SVG. Overlay was initially way too heavy (a flat 75% navy fill
*plus* a near-opaque gradient stacked on top of it — effectively hid the
photo entirely) — fixed by removing the flat layer and using a single
lighter gradient (`from-navy/60 via-navy/25 to-navy/55`), with drop-shadows
added to the text elements instead to keep legibility without needing a
heavy overlay to do it.

**Hero photo swapped again, same session, during the rebrand pass
(2026-08-04).** `london-eye.png` was replaced by
`public/images/hero/westminster-sunset.jpg` (deleted the old file). The
gradient was also darkened a second time — `from-navy/60 via-navy/25
to-navy/55` → `from-navy/70 via-navy/40 to-navy/65` — since the new photo
runs brighter/warmer than the London Eye shot and needed more navy over it
to hold text legibility. The eyebrow text also moved off the old gold
token onto plain `text-white` (drop-shadow strengthened to compensate) as
part of the same pass — see the Rebrand section below for the full color
rename.

**Core Services icons are real (2026-08-04).** `CoreServices.tsx` no longer
uses lucide icons — each card now renders its matching real icon from
`public/images/services/`: `corporate-immigration.png` (plane+globe),
`company-incorporation.png` (person+buildings), `outbound-visas.png`
(globe+VISA card), `document-attestation.png` (documents+checkmark). Mapped
by matching the provided filenames to the four service IDs, not by guessing
from the image content alone.

**Why Choose Us and Legal Advisors both have real photos now (2026-08-04),
both at low native resolution.** `why-choose-us.png` is 300×227 and
`legal-advisor.png` is 300×200 — both are WordPress-thumbnail-sized exports,
not full-resolution originals. Both are capped to modest display widths
(`max-w-sm` / a fixed aspect box) to minimize upscaling softness, with
`quality={95}` set on the `next/image` calls. The user has been told
directly, more than once, that full-resolution Envato originals (not
thumbnail exports) would sharpen these up — flag this again if new images
keep arriving pre-shrunk.

**`/impeccable` design-skill installed (2026-08-04), not yet usable this
session.** Ran `npx impeccable install`, which added
`.claude/skills/impeccable/` (reference docs + scripts) and registered
`PostToolUse`/`Stop` hooks in `.claude/settings.local.json` that run a
design-detector script after UI edits. Also ran its `init` flow manually
(the skill wasn't yet indexed by the harness mid-session, so `/impeccable`
and the Skill tool both returned "unknown" — **skills installed mid-session
need a fresh session/restart of Claude Code before the slash command and
Skill tool will recognize them**) and wrote `PRODUCT.md` at the project
root plus `.impeccable/live/config.json` (live-mode config, points at
`src/app/[lang]/layout.tsx`, no CSP detected in this project so nothing was
patched). Once a new session picks up the skill, `/impeccable audit`,
`/impeccable critique`, etc. become available for reviewing this build.

## Rebrand: new color palette + real logo (2026-08-04)

The client supplied an official color-code summary and 4 real logo variants,
superseding the improvised navy/gold/cream direction from the earlier build
phase. Applied site-wide, not just on Home:

- **Palette remapped in `tailwind.config.js`, not rewritten per-component.**
  Every component already consumed shared token names (`navy`, `gold`,
  `cream`, `slate.dark`, `slate.mid`) — updating the hex values (and
  renaming `gold` → `accent`, since a token literally named "gold" that
  resolves to blue would be a confusing, dishonest name for the next person
  who touches this code) re-themed the entire site in one file. New values:
  `navy` → #0B192C, `accent` → #2E5B88 (was gold #C5A059), `cream` → #F8F9FA
  (was #FAF9F6), `slate.dark` → #3E4856 (charcoal body text, was #1A202C),
  `slate.mid` → #5C6B7A (derived secondary tone), `navy-dark` → #04080F.
  `slate.mid` and the navy/accent shade ramps beyond the base value weren't
  in the client's brief — they're derived to keep the existing ramp-based
  classes (`accent-100`, `navy-700`, etc.) working, not literal client specs.
  Confirm with the client if a specific mid-tone or extended ramp matters
  before this goes further.
- **Real logo wired in.** Client sent 4 exported logo variants (all in the
  media folder, transparent PNG, navy ink only — no light/inverted variant
  supplied). Picked the horizontal wordmark with the "LEGAL" sub-mark
  (`Northman-Legal-Logo-3-e1761052736538-300x89.png`, copied to
  `public/images/logo-real.png`) over the square version and the plain
  no-"LEGAL" mark, since this site is specifically the Legal division and
  needs that distinction visible. New `components/ui/BrandLogo.tsx` renders
  it; since the logo only has dark ink, anywhere it must sit on a navy
  surface (footer, dark-mode navbar) it's wrapped in a small cream card via
  `onDark` instead of guessing at an inverted colorway that doesn't exist
  yet — **ask the client for a real white/light logo variant** so that
  wrapper can be retired for a proper inverted mark. The old placeholder
  monogram SVGs (`logo.svg`, `logo-dark.svg`) are deleted; all 4 SEO schema
  builders (`Organization`, `LegalService`, `Attorney`, `Article`) now point
  at the real logo too.
- **Dedicated CTA-button color added, separate from `accent`.** The client
  gave a direct color instruction for buttons specifically: a bright
  sky-blue (`#27AAE1`) default, dropping to the slate-blue `accent` tone
  (`#2E5B88`) on hover. Added as its own `button`/`button-hover` token in
  `tailwind.config.js` rather than overloading `accent` — `accent` stays
  reserved for icons/borders/links/section labels, `button` is CTA-only
  (Hero's primary CTA, `Newsletter.tsx`'s submit button, `ContactForm.tsx`,
  `WhyChooseUs.tsx`, `LegalAdvisors.tsx`). CTA text is plain white on both
  states, not navy — check contrast if the client ever revises the button
  hex.
- **Framer-motion coverage extended.** `FirmIdentity.tsx`, `Newsletter.tsx`,
  `LetsConnect.tsx`, and `LatestInsights.tsx`'s post cards had no entrance
  animation before this pass (everything else already did) — added the same
  `whileInView` fade/slide-up pattern used everywhere else, so the whole
  page now animates consistently on scroll.
- **Scope note:** this pass re-themes colors/logo/motion across every page
  (they all share the same Tailwind config and layout), but does not
  redesign layouts, copy, or structure — About Us/Regions/Contact/legal
  pages still have placeholder content per the Page log below. "Redesign
  the whole website" was interpreted as "apply the new brand system
  everywhere," not as a from-scratch layout rebuild of unbuilt pages.
- **`/impeccable` still not usable this session** — installed and
  initialized two sessions ago but never picked up by the harness mid-session
  (see the earlier note below). This rebrand was done by hand-following the
  skill's own reference docs (its `craft-floor.md` quality-floor guidance,
  its brief-wins/refinement principles), not by invoking `/impeccable`
  itself. A fresh session should be able to run `/impeccable audit` or
  `/impeccable critique` against this if a second opinion is wanted.

## Home page bolder pass (2026-08-05)

The Home page previously repeated one pattern — same-size `icon + heading +
text` cards on nearly every section, all using the identical staggered
fade-up entrance — which is exactly the "lazy container" default the design
skill's craft-floor flags. Reworked for real layout variety, no new colors/
fonts/tokens, same real copy and images throughout:

- **Compliance Highlights** — 3 equal cards → asymmetric split (heading
  left, divided clause-style list right, no boxes).
- **Core Services** — 4-up grid → first service gets a featured two-column
  treatment (bigger icon/type), the other three become a divided list.
- **Certifications** — kept as a quiet trust strip (real ISO evidence,
  not decoration) but gave the heading real display weight and added
  dividers between the seals.
- **Trust & Global Reach** — the real "35+ Countries" fact now renders as
  a large serif numeral callout instead of being buried in a sentence.
- **Why Choose Us** — 2×2 paragraph grid → lead statement + supporting
  copy; added a thin offset accent-rule frame behind the photo (a new
  reusable device, not a one-off).
- **Legal Advisors** — same offset-frame device on its photo; the 3 stats
  (35+/Riyadh/24-7) became large serif numerals in a divided row instead
  of small icon-topped boxes.
- **Latest Insights** — icon-tile placeholder cards → an editorial list
  (date · title · arrow). There are still no real blog photos, so a list
  reads as intentional rather than another fake-photo card.
- A single signature motif — the thin accent rule introduced on the Hero's
  "letterhead seal" entrance — now opens most section headings site-wide,
  giving the page one consistent identity mark instead of the repeated
  card as its only visual idea.
- Event Gallery, Let's Connect, Firm Identity, and Newsletter were left
  untouched — Event Gallery already has its own scroll-pin treatment (see
  below), and Firm Identity is meant to be the quiet moment between louder
  sections.

## Event Gallery scroll-pin effect (2026-08-05)

Replaced the autoplay slide carousel in `EventGallery.tsx` with a
scroll-driven "sticky stack" effect (adapted from a user-supplied Skiper UI
snippet): each of the 4 real event photos pins to the viewport while
scrolling, then shrinks and rotates away to reveal the next. Decisions
made adapting the snippet to this codebase:

- **No Lenis.** The snippet wraps the page in `ReactLenis root`, a smooth-
  scroll library that isn't a dependency here and would hijack scroll for
  the whole site, not just this section. Rebuilt the scroll tracking with
  framer-motion's own `useScroll`/`useInView` (already a dependency),
  scoped per-card — no new package, no site-wide behavior change.
- **Captions kept.** The snippet has no text at all; this site's event
  photos carry real evidence (event name + description), so the caption
  overlay was grouped into the same counter-rotating inner layer as the
  image, keeping it upright and legible while the outer card spins away.
- **Corners matched.** `rounded-4xl` → `rounded-institutional`, to stay
  consistent with every other card on the site rather than reading as a
  different design system.
- Trade-off: the section now spans ~4 viewport-heights of scroll instead
  of one compact block — inherent to the effect, not a bug.

## Hero motion pass (2026-08-05)

`Hero.tsx`'s entrance was a generic staggered fade-up on every element —
explicitly called out in the design skill's `animate` playbook as "not a
thesis." Replaced with one authored sequence themed on the brand ("the
letterhead seal"): a thin accent rule draws in above the eyebrow, then the
headline reveals through a direction-aware `clip-path` wipe (left→right in
EN, right→left in AR) instead of a plain fade, with the rest following in
tightened succession so the whole thing reads as ~1.2s of one rehearsed
entrance rather than four independent fades. `useReducedMotion()` short-
circuits the whole sequence to an instant, fully visible state — note this
is necessary because framer-motion's JS-driven animations ignore the
sitewide CSS `prefers-reduced-motion` override in `globals.css` (that
override only catches native CSS transitions/animations). The same
`entrance = reduceMotion ? false : undefined` pattern was carried into
every new/reworked section this session for consistency.

## About Us page build (2026-08-05)

Built to the client's full 10-section content brief (page header, Company
Overview, Vision/Mission/Purpose, Global Team, What We Believe, We Embrace
Ownership, CTA banner, Registration & Entity Statement, Newsletter, Office
& Contact). New components under `src/components/sections/`:
`CompanyOverview`, `ValuesGrid`, `Team`, `WhatWeBelieve`, `Ownership`,
`AboutCtaBanner`, `OfficeContact`. New dictionary keys under
`aboutPage.{companyOverview,values,team,belief,ownership,ctaBanner,office}`
— EN and AR both filled in, not placeholders. Decisions worth knowing
before touching this again:

- **Core Pillars and FAQ are not in the client's 10-section list, but stay
  on the page anyway.** They're appended after the 10 sections. Reason:
  the Home page's Core Services and Trust Banner already deep-link to
  `/about-us#global-immigration`, `#commercial-disputes`, `#notary-poa`,
  and `#core-pillars` — those anchors only exist inside `CorePillars.tsx`.
  Dropping it would have broken live cross-page navigation the brief
  didn't ask to change. FAQ's schema was already flagged as owed; it now
  ships correctly since About Us has real content.
- **Registration & Entity Statement (brief section 8) reuses the existing
  `FirmIdentity` component as-is** — its dictionary content already
  matched the brief's copy word-for-word (it was written for the Home
  page's identical statement band). Same for **Newsletter (section 9)** —
  reused directly, no new component.
- **The "Landline" number is a real fact correction, not just new copy.**
  The brief lists `00966 112 978 293` as a landline phone number; the
  codebase had that exact number on file as the firm's *fax*
  (`ORGANIZATION.fax`/`faxDisplay`, `footer.faxLabel`) since the original
  build. Renamed to `ORGANIZATION.landline`/`landlineDisplay` everywhere
  (constants, Footer, dictionaries) and made it a clickable `tel:` link
  like the mobile number — it no longer appears as fax anywhere on the
  site. If this was actually the fax number after all, it needs reverting
  before launch.
- **Team photos are real (2026-08-05), matched by filename not
  appearance.** The client's media folder had headshots named
  `Murtaza-NS.png`, `Manisha-Gami-NS.png`, `Qadri-NS.png`,
  `Owais-ALI-NS.png`, `Noor-Nadeem.png` — copied to
  `public/images/team/` and matched to the 5 brief members by that exact
  filename correspondence, not by guessing from the photo itself (per
  Product Principle #3, never attach an unverified photo to a named real
  person). Rendered as circular `object-cover object-top` crops. LinkedIn
  URLs still weren't supplied, so the icon stays decorative (`aria-hidden`,
  no `href`) — swap it in once real profile URLs arrive.
- **Vision/Mission/Purpose (brief section 3) has no section heading in the
  brief** — didn't invent one. It renders as a navy "manifesto strip" with
  the three items divided by rules, each item's own title (Vision/Mission/
  Purpose) doing the heading's job.
- Same signature rule + `useReducedMotion()` pattern from the Home page
  bolder pass carried through every new section here, for one consistent
  identity across both pages.

## Contact Us page build (2026-08-05)

Built to the client's full 8-section brief (header, Let's Connect + socials,
General Enquiries form, Global Offices grid, Registration & Entity
Statement, Newsletter, KSA office spotlight, footer). New components under
`src/components/sections/`: `ConnectBanner`, `EnquiriesForm`,
`GlobalOffices`. New dictionary keys under
`contactPage.{connect,formSectionSubtitle,formServicePlaceholder,offices}`
— EN and AR both filled in. Decisions worth knowing before touching this
again:

- **Global office data (8 locations: UK, KSA, UAE, Brussels, Frankfurt,
  Delhi, Washington, Houston) is new factual content**, not previously
  anywhere in the codebase — added as `contactPage.offices.items` in the
  dictionaries (addresses/phones kept in Latin script in both EN and AR,
  matching how official postal addresses are conventionally shown even on
  Arabic pages; only the country label is translated). Some offices have
  only an email (Brussels, Frankfurt, Delhi) — rendered conditionally, not
  padded with invented addresses/phones.
- **Regional office relies on the About Us page's `OfficeContact`
  component, reused as-is** — brief section 7 ("Regional Office Spotlight
  KSA") is identical content to About Us's office section (same heading,
  address, mobile, landline, email), so no new component was built for it.
  Same for **Registration & Entity Statement (section 5) and Newsletter
  (section 6)** — both reuse the existing `FirmIdentity`/`Newsletter`
  components directly.
- **New general enquiries inbox added**: `ORGANIZATION.generalEmail`
  (`info@northmansterling.legal`) in `src/lib/seo/constants.ts` — distinct
  from the existing KSA-specific `ORGANIZATION.email`
  (`ksa@northmansterling.legal`). Shown on the "Let's Connect" banner only.
- **Contact form copy realigned to the brief's field names** across both
  the Contact Us and Home "Let's Connect" forms (they share
  `ContactForm.tsx`): "Full name" → "Full Name", "Email address" →
  "Business Email", "Phone number" → "Phone Number", "Area of interest" →
  "Service", "Message" → "Your Inquiry", submit "Send Message" → "Submit
  Enquiry" (now consistent with the Home page form, which already used
  that label). The service `<select>` also gained a disabled placeholder
  option ("Choose Service") and `required`, so it can no longer silently
  submit "Company Incorporation" as an unintended default — the brief's
  "(Choose Service)*" reads as an actual required choice, not a pre-filled
  one.
- **Section 2's subheading ships with a trailing "…" on purpose.** The
  brief text ("We would love to discuss your immigration and mobility
  needs…") was given truncated; asked the client directly rather than
  completing the sentence myself, and was told to render it exactly as
  given, ellipsis and all.
- Removed the now-dead `contactPage.officeTitle` key (the old ad-hoc
  "Our Office" sidebar card this rebuild replaced).

## Services page build, Regions retired (2026-08-05)

The navbar's "Regions" link was replaced with "Services", pointing at a new
`src/app/[lang]/services/page.tsx` built to the client's 6-section brief
(header, value proposition, 6-service grid, Registration Statement,
Newsletter, KSA office spotlight). New dictionary key: `servicesPage`. New
components: `ServicesValueProp`, `ServicesGrid`. Decisions worth knowing:

- **Regions was fully retired, not just unlinked** — confirmed with the
  user first, since `/regions` had live legacy-WordPress redirects pointing
  into it (`/regions`, `/regions/`, `/global-presence`) and was in
  `sitemap.ts`. `src/app/[lang]/regions/page.tsx` and the `regionsPage`
  dictionary key are deleted; those three legacy sources, plus the
  pre-existing (and already-wrong) `/services` → `/en/about-us` redirect,
  now all point to `/en/services` in both `next.config.js` and
  `src/data/redirects.ts` (kept in sync manually, per convention).
  `sitemap.ts`'s `regions` entry became `services` (priority bumped
  0.7 → 0.8, matching About Us — it's an equally primary commercial page).
- **4 of the 6 services reuse the real icons already shipped for Home's
  Core Services** (`corporate-immigration`, `company-incorporation`,
  `outbound-visas`, `document-attestation` — same files in
  `public/images/services/`). The other two, **Consular Visa and Employee
  Outsourcing, are new services with no real icon asset yet** — they fall
  back to lucide icons (`Stamp`, `UsersRound`) in `ServicesGrid.tsx` rather
  than an empty tile or a borrowed unrelated image. Swap for real icons
  the moment they're supplied, same pattern as every other placeholder
  asset on this project.
- **"Learn More" on each service card links to Contact Us.** The brief
  didn't specify a target (no per-service detail pages exist) — each
  card's description is already the full "read more" text per the brief,
  so the button reads as a conversion CTA, consistent with every other
  "Learn More"/CTA button sitewide.
- **Registration Statement, Newsletter, and the KSA office spotlight all
  reuse existing components** (`FirmIdentity`, `Newsletter`,
  `OfficeContact` — the last one already built for About Us and reused
  again on Contact Us) — identical real content, no new components built.

## Service detail pages started: Corporate Immigration (2026-08-05)

The client's brief for individual service detail pages arrived styled in a
completely different system (raw `bg-[#0E1E38]`, `text-blue-600`,
`rounded-full` pill buttons, `01/ 02/ 03` numeral badges) — the client
explicitly asked to carry this site's own design language instead, so the
content/structure was kept but every style translated to our existing
tokens (navy/accent/cream, `rounded-institutional`, our button/CTA
pattern, our signature accent-rule motif). Built as a dynamic route,
`src/app/[lang]/services/[slug]/page.tsx`, seeded so far with only
`corporate-immigration` — the other 5 services will populate the same
route once their content arrives, not five new page files.

- **New dictionary namespace `serviceDetails.<slug>`** holds each detail
  page's full content (solutions pillars, distinct-approach copy,
  highlights, CTA label). `src/lib/data/serviceSlugs.ts` exports
  `SERVICE_DETAIL_SLUGS`, the single source of truth for which slugs have
  a real page — both `ServicesGrid.tsx` (Services page) and
  `CoreServices.tsx` (Home page) check it to decide whether a service's
  "Learn More" links to its new detail page or falls back to Contact Us.
  Corporate Immigration's "Learn More" now points to
  `/services/corporate-immigration` on both pages; the other 5 still fall
  back to Contact Us (or the About Us anchor, for the 3 that had one)
  until they get real content.
- **The brief's `01/ 02/ 03` numbered highlight cards were NOT
  reproduced literally.** Those 3 items (Team Presence, Adaptability,
  Global Perspective) are parallel strengths, not a meaningful sequence —
  numbering them violates this project's own design-quality floor
  ("section numbers unless the sequence itself carries information the
  reader needs"). Built as a 3-column divided strip with the accent-rule
  motif instead (reusing the device from About Us's Vision/Mission/Purpose
  section), no numerals. The 4 solution *pillars* above it, by contrast,
  do get a small accent numeral (01–04) — that sequence is a real
  methodology order (consult → stay compliant → get visas → track), so
  numbering earns its place there.
- **Real featured image wired in (2026-08-05).** The passport + toy
  airplane photo landed in the client's media folder as
  `immigration-solution.jpg` (not pasted-and-saved by hand — the client
  drops new assets into
  `C:\Users\sabbi\OneDrive\Desktop\Northman legal next.js\files (4)\northmanlegal media\`
  and a fresh file-timestamp check finds them; check there first before
  asking for a re-upload). Copied to
  `public/images/services/corporate-immigration-hero.jpg`, wired via
  `serviceDetails["corporate-immigration"].imageSrc/imageAlt` in both
  dictionaries. `ServiceFeaturedImage.tsx`'s navy→accent gradient +
  passport/plane lucide-icon fallback still exists in the component for
  the other 5 services, which don't have a real photo yet.
- Registration Statement, Newsletter, and the KSA office spotlight reuse
  `FirmIdentity`/`Newsletter`/`OfficeContact` again — same components,
  fourth page now sharing them.

## Second service detail page: Company Incorporation Saudi Arabia (2026-08-05)

This one's shape didn't fit the `corporate-immigration` template at all — no
pillars, instead a video embed, a "Why Saudi" essay, a foreign-ownership
callout, an entity-forms checklist, 3 separate entity comparison tables,
and a 12-step process timeline. Rather than force it into the pillars
template, `serviceDetails.<slug>` now carries a `"layout"` discriminator
(`"pillars"` | `"ksa-guide"`), and `src/app/[lang]/services/[slug]/page.tsx`
branches into two render functions (`PillarsPage` / `KsaGuidePage`). Same
URL pattern (`/services/[slug]`), same dictionary-driven
`SERVICE_SLUGS`/`generateStaticParams`, just two different component trees.
Seven new components: `ServiceQuoteIntro`, `ServiceVideoBanner`,
`ServiceWhySaudi`, `ServiceOwnershipCallout`, `ServiceEntityForms`,
`ServiceEntityComparison`, `ServiceProcessTimeline`, `ServiceSecondaryEntities`,
`ServiceFinalCallout`.

- **All 3 real photos came from the client's media folder, not fabricated.**
  `Saudi-Arabia.jpg` (a Saudi flag photo) → hero background
  (`ksa-flag-banner.jpg`); a Kingdom Centre tower photo the client pasted
  mid-session landed in the media folder as `MISA-Services-license-.png`
  (matched by fresh-file-timestamp, same pattern as the corporate-immigration
  photo) → the intro section's "Riyadh towers" image
  (`riyadh-towers.jpg`); and `CTA-Company-Formation.png` — found inside the
  saved WP page's own asset folder — is the *exact* image the live site
  already uses for the closing "Set up Business in KSA" banner, copied in
  as `company-formation-cta.png`. No stock substitutes anywhere.
- **The video section embeds the real LinkedIn post via iframe**
  (`linkedin.com/embed/feed/update/urn:li:ugcPost:7224730810107469830`),
  matching what the live WP page actually does — not a generic video
  placeholder.
- **The process timeline table was simplified from 3 duplicate columns to
  1.** The brief (and the live site) list identical LLC/JSC/Branch
  durations for every single one of the 12 steps — three columns that
  always agree convey no extra information and read as a mistake to
  anyone who notices. Collapsed to one "Typical Timeline" column plus a
  note that it's consistent across all three structures. If the entities
  ever diverge on timing, this needs to go back to 3 columns.
- **Breadcrumb intentionally drops the brief's literal "Regions / Middle
  East / Africa" path.** That reflected the old WP site's regions
  taxonomy, which this rebuild retired earlier today (see "Services page
  build" above) — reusing it here would add a dead, unlinked crumb.
  Used `Home > Services > Company Incorporation Saudi Arabia` instead,
  matching the real URL hierarchy.
- **Legacy redirect added**: `/company-incorporation-saudi-arabia` (the
  live WP URL) → `/en/services/company-incorporation`, in both
  `next.config.js` and `src/data/redirects.ts`.
- **Sitemap gap found and fixed while doing this**: `sitemap.ts` never
  had an entry for individual `/services/[slug]` pages at all — neither
  `corporate-immigration` nor this one were being submitted to search
  engines. Added a loop over the same `serviceDetails` dictionary keys the
  `[slug]` route itself reads, so any future slug added there is
  automatically in the sitemap too.
- Gold checkmarks/highlight-box colors from the brief were translated to
  the site's `accent` token, consistent with every other page — gold was
  retired in the rebrand.

## Session checkpoint (2026-08-05, end of day)

A large session — Home page bolder pass, Hero motion rework, Event Gallery
scroll-pin rebuild, and three full new pages (About Us, Contact Us,
Services) plus two service detail pages, all with real content and real
client-supplied images throughout. Everything is committed across several
commits on `main` (`922fc0c` home page final design → `87b751d` about us
page → `46f3631` contact us page → `aa47d39` services page → `827b708`
immigration solutions → `5d7e0fb` company incorporation saudi → `9fba1a8`/
`a1c1d22` services) — working tree clean except this doc update. Picking
this back up tomorrow, start here:

- **Regions is gone from the nav; Services replaces it.** `/regions` and
  the old, already-wrong `/services` → `/en/about-us` redirect both now
  point at the real `/services` page. See "Services page build, Regions
  retired" below for the full account before touching redirects again.
- **`/services/[slug]` is a dynamic route with a `layout` discriminator**
  (`"pillars"` for Corporate Immigration, `"ksa-guide"` for Company
  Incorporation) — the other 4 services (Outbound Visas, Consular Visa,
  Employee Outsourcing, Document Attestation) still have no detail page;
  their "Learn More" buttons correctly fall back to Contact Us on both
  the Home page and the Services page (`SERVICE_DETAIL_SLUGS` in
  `src/lib/data/serviceSlugs.ts` is the single source of truth for this —
  check it before writing a 3rd detail page, since its content shape may
  need a 3rd `layout` value rather than being forced into "pillars" or
  "ksa-guide").
- **A real fact correction happened today, not just new copy**: the
  number on file as the firm's fax (`00966 112 978 293`) was renamed to
  `ORGANIZATION.landline` everywhere per the client's own Contact Us
  brief. If that turns out to have actually been the fax line, it needs
  reverting — see "Contact Us page build" below.
- **`/impeccable` is confirmed usable** (loaded cleanly again this
  session) but still nothing has gone through `/impeccable critique` or
  `/impeccable document` — `DESIGN.md` still doesn't exist. Worth doing
  once the remaining 4 service detail pages are further along, so the
  captured design system reflects the full page set rather than a
  half-built one.
- **Open threads carried forward, unchanged:** Privacy Policy and
  Disclaimer still placeholder content, `logo-mark-square.png` still
  unwired, footer social URLs still `#`, LinkedIn profile URLs for the
  About Us team still missing, and the full pre-launch migration
  checklist below is untouched.

## Pre-launch migration checklist (do NOT skip — live site is indexed)

- [x] Export every currently-indexed URL from the live WP site — done
      2026-08-07 via a mix of live-site crawl (WebFetch on the real
      `northmansterling.legal` nav/footer/news-listing pages) and direct
      Sanity queries (`getAllPostSlugs`) cross-checked against user-confirmed
      WP permalinks. See "WP → Vercel migration" below for the full account —
      **standard sitemap.xml/wp-sitemap.xml/sitemap_index.xml paths all 404
      on the live site**, so this was done by crawl, not sitemap export.
- [x] Give every one of those URLs an explicit 1:1 entry in
      `src/data/redirects.ts` + `next.config.js` — done for all 56 blog
      posts, `/corporate-immigration`, `/corporate-immigration-2`,
      `/company-incorporation` (no suffix), `/terms-and-conditions`. See
      below for what's still possibly missing (WP's `/page/2/`…`/page/14/`
      blog pagination URLs were seen in the crawl but not yet redirect-mapped
      — check Search Console Coverage after launch to see if any actually
      rank before deciding whether they need entries).
- [x] Carry over any existing content worth keeping — Terms & Conditions
      full text copied verbatim from WP (see below); the 56 blog posts were
      already migrated to Sanity earlier in the project.
- [x] Generate real `og-default-en.jpg` / `og-default-ar.jpg` (1200×630) —
      done 2026-08-10, see "OG image generation" below for how (and the
      Windows/`next/og` bug worked around to get there).
- [~] Fill every blank in `.env.local` for prod — still open as of
      2026-08-11: `SMTP_PASS` for `ksa@northmansterling.legal` — see
      "Session 2026-08-11" below, this is now a real blocker with a
      confirmed root cause (Google rejects the app password we were given —
      535-5.7.8 auth failure, reproduced independently of our code). Needs a
      freshly-generated app password from someone with direct account
      access. `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` still deferred by user.
      GTM/GA4/Clarity: still no accounts, still not a blocker.
- [ ] Add Search Console verification meta tag.
- [x] Vercel domain/DNS cutover — **done**, confirmed 2026-08-11.
      `northmansterling.legal` now resolves to Vercel (216.198.79.1) and
      serves this Next.js/Sanity build directly — the WordPress site is no
      longer live at this domain. This happened between sessions without
      being logged here; if picking this up cold, verify current DNS state
      with `nslookup` before assuming anything in this doc about "the live
      WP site" is still true — see "Session 2026-08-11" below for what else
      that cutover broke (mail DNS) that needed fixing.
- [ ] After deploy: submit new sitemap in Search Console, monitor Coverage
      report for 404s/soft-404s and ranking movement for at least 4–6 weeks.

## TopBar redesign + real Sanity ticker (2026-08-07)

The old `TopBar`/`Ticker` was a continuous CSS marquee driven by static
dictionary text (`dict.topBar.tickerItems`). Rebuilt to match a WordPress
reference screenshot (bell icon + "Current Updates" label, sky-blue "Latest
News" badge + white headline box + prev/next chevrons, dark "Client Portal"
button) and to show real content:

- **`Ticker.tsx` rebuilt from a marquee into a discrete one-post-at-a-time
  slider.** Accepts real `NewsPost[]` (title + slug) instead of the deleted
  `TickerItem` type — `src/types/index.ts`'s `TickerItem` export is gone.
  Auto-advances every 6s, manual prev/next, RTL-aware chevrons, each
  headline links to the real `/[lang]/news-updates/[slug]` post.
- **`layout.tsx` fetches `getLatestPosts(lang, 6)`** and passes it down
  through `TopBar` to `Ticker` — this is a real Sanity fetch on every page
  load (server-rendered, not client-fetched), same caching behavior as
  every other `getLatestPosts` call site.
- **Multiple redesign passes on `TopBar`** in response to iterative
  feedback: navy-glass → tried `bg-cream`/`bg-white` variants → landed on
  **`!bg-white`, fixed regardless of dark/light mode** (`!` important flag,
  no `dark:` variant at all) since the user wanted this one bar to never
  follow the site theme toggle. Height bumped `h-11` → `h-14`. "Current
  Updates" is now a real link to `/[lang]/news-updates`, not static text.
  Dictionary keys `latestNewsLabel`/`previousUpdate`/`nextUpdate` added
  (EN+AR); old `tickerItems` array removed from both dictionaries.

## Navbar: transparent/blurred + shrink-on-scroll (2026-08-07)

Multiple iterative passes on `Navbar.tsx` per user feedback, in order:

1. Made the sticky header **translucent + blurred** (`bg-navy/35
   backdrop-blur-lg`) instead of solid navy, so Home's Hero photo shows
   through it, with bigger logo (`height={36}`→`46`) and a light backing
   chip behind the logo (still `onDark`, since no light-ink logo variant
   exists — see the original Rebrand section above, still true).
2. **Bug found**: `LanguageSwitcher`/`DarkModeToggle` used to assume they
   sit on a surface that follows the site's dark/light toggle
   (`text-navy dark:text-cream`) — but the navbar itself is *always*
   navy-glass regardless of theme, so in light mode these rendered
   navy-text-on-navy-background, nearly invisible. Fixed by adding an
   `onDark` prop to both (same pattern as `BrandLogo`), applied only on
   the desktop header's usage — the mobile drawer's usage of both
   components was untouched since that surface *does* follow the theme.
3. **"Grey before scrolling" bug**: `bg-navy/35` over a light page
   background (or the white TopBar directly above it) blends into a flat
   grey rather than reading as navy glass. Fixed by raising to `bg-navy/55`
   and later, per the user's actual root-cause diagnosis, by giving
   `Hero.tsx` a `-mt-24` negative margin (see below) so the real photo
   extends up behind the sticky navbar on Home specifically.
4. **Shrink-on-scroll added**: a `scrolled` boolean (scroll listener,
   24px threshold) drives the nav bar height `96px→72px` via
   framer-motion and the logo height `46px→34px` via a CSS
   `transition-[height]` added directly to the `<Image>` inside
   `BrandLogo.tsx` (not the wrapping card — the card's height is
   intrinsic to padding, the actual animated value lives on the image).
   Header stays `sticky` (not `fixed`), so the shrink doesn't leave a
   gap — content just moves up to fill the reclaimed space.

## Hero `-mt-24` fill-behind-navbar pattern, and where it did/didn't spread (2026-08-07)

`Hero.tsx` got `-mt-24` (pulling the section up by exactly the navbar's
tall-state height) plus matching extra top padding, so its photo/gradient
layers extend up underneath the sticky transparent navbar instead of
showing blank space behind the blur. This pattern was then propagated to
About Us/Contact Us/Services/service-detail's navy header bands too (moving
`Breadcrumbs` inside each navy section, adding an `onDark` prop to
`Breadcrumbs` for cream-toned text) — **then partially reverted** after
further feedback:

- About Us and Contact Us: `-mt-24` removed, replaced with a plain `pt-4`
  top margin — the user wanted visible breathing room back under the
  navbar on these two pages specifically.
- Services: the navy hero band itself was removed per user request ("wo
  services jo likha hy usay remove krke... hero section ka content bana
  do"). `ServicesValueProp.tsx` was deleted — its heading/subtext
  (`servicesPage.valueProp.heading/subtext`) now render directly as the
  page's real `<h1>`/subhead inside a navy hero, replacing the plain
  "Services" title. Breadcrumbs moved back out of the hero, now render
  below it on the page's normal background — same "breadcrumbs below hero"
  treatment applied to About Us and Contact Us too.
- **Net effect**: the `-mt-24`/navbar-fill treatment now lives on Home's
  Hero only. About Us/Contact Us/Services all have breadcrumbs *below*
  their (non-negative-margin) navy header band, not inside it. If touching
  any of these four sections again, don't assume they're still consistent
  with each other — check the live file, not just this note.

## Dark-mode contrast bugs found + fixed (2026-08-07)

User-reported: "icons dark mode mein invisible ho jate hain" and "blog
section hover pe invisible ho jata hai dark mode mein." Root cause in both
`LatestInsights.tsx` and `NewsCard.tsx`: post titles were
`dark:text-cream` at rest but `group-hover:text-navy` with **no dark
override** — hovering a card in dark mode turned the title navy-on-navy
(invisible). Fixed by adding `dark:group-hover:text-accent` to both. The
"icons" complaint turned out to be the same bug family, not a separate
issue — audited `CoreServices`/`Certifications`/social icons and found
those already correctly theme-aware.

## WP → Vercel migration: URL crawl, blog redirects, real gaps found (2026-08-07)

User's end goal: move the live WordPress site (northmansterling.legal,
hosted on cPanel) to Vercel, pointing the same domain at the new site, with
**zero SEO/ranking damage** — same URLs where practical, explicit 301s
where they can't be. This is the first real progress against the
"Pre-launch migration checklist" above, which had been entirely unchecked
since the project started.

- **Standard sitemap paths (`/sitemap.xml`, `/wp-sitemap.xml`,
  `/sitemap_index.xml`) all 404 on the live site** — no SEO plugin sitemap
  is exposed (or it's disabled). Had to crawl by hand instead: WebFetch on
  the homepage nav/footer, then the `/news-updates/` listing page and its
  paginated variants (`?e-page-...=2`, `=3` — Elementor's own pagination
  param, not real WP `/page/N/` pagination, and it turned out **not to
  actually change content between params in this crawl** — page "3" showed
  the same posts as page "1", so the listing's own pagination could not be
  trusted to enumerate all 56 posts by itself).
- **The crawl's 40 unique post URLs were cross-checked against a direct
  Sanity query** (`*[_type == "post" && language == "en"].slug.current`,
  56 results) rather than trusted blindly — every single one of the 40
  matched a real Sanity slug exactly, which is strong evidence the
  earlier WP→Sanity migration preserved slugs verbatim. The user then
  manually verified the remaining ~16 slugs in WP admin (Posts → edit →
  Slug field, since permalink-hover-preview didn't work in their WP
  theme) and confirmed they matched too — so **all 56 blog posts now have
  an explicit 1:1 redirect**, not an assumption.
- **One genuine near-miss caught by this cross-check**: two different
  Sanity posts have visually similar titles ("Qatar announced New
  Residence Permit..." and a second post whose slug collided into
  `...-entrepreneurs-2`). The user confirmed via a live screenshot that
  WP's actual URL for the second post really does carry the `-2` suffix —
  so both got their own correct redirect entry; this was **not** a
  migration bug, just two coincidentally-similar titles.
- **Real content gaps found during the crawl, fixed the same session:**
  - `/terms-and-conditions/` is a real, live, indexed WP page — the new
    site had no equivalent at all (only `disclaimer`, a *different*
    document). Worse: the footer's "Terms & Conditions" *label* existed
    but linked to `/disclaimer` — silently serving the wrong legal
    document under that label. Fixed: copied the WP page's full text
    verbatim (including its oddly generic "laws of respective
    country"/"specific country" governing-law clause — the user
    explicitly said to preserve WP's original wording as-is rather than
    have Claude specify "Kingdom of Saudi Arabia"), built a new
    `/terms-and-conditions` page (EN+AR, reusing `LegalPageContent` like
    `disclaimer` does), fixed the footer link, added sitemap entry +
    redirects. `disclaimer` itself is now an orphaned page (nothing
    internally links to it) but stays published since it's real content
    with no WP equivalent that supersedes it.
  - `/corporate-immigration/` and `/corporate-immigration-2/` are **two
    different live WP pages** (the former is an old 2023 image-attachment
    page, not real content; the latter is the real Corporate Immigration
    service page) — both now redirect to `/en/services/corporate-immigration`.
  - `/company-incorporation/` (no "-saudi-arabia" suffix) is a third live
    WP URL for the same content already covered by
    `/company-incorporation-saudi-arabia` — added its own redirect to
    `/en/services/company-incorporation`.
  - **Real social URLs recovered from the WP footer**: Facebook
    (`facebook.com/northmansterling`), Twitter
    (`twitter.com/northmansterlin`), LinkedIn
    (`linkedin.com/company/northman-sterling`) — `ORGANIZATION.facebookUrl`
    etc. in `src/lib/seo/constants.ts` were blank placeholders since the
    original build; now filled in, which also feeds `Organization`
    schema's `sameAs` automatically (no separate schema edit needed,
    `Footer.tsx`/`ConnectBanner.tsx` already read from `ORGANIZATION.*`).
  - **`CLIENT_PORTAL_URL` (`northmansterling.app`) confirmed correct**
    against the live WP footer's "Client Portal" link — no change needed.
- **Bilingual `/en`/`/ar` URL structure question, resolved**: the user
  asked whether dropping the locale prefix (to match WP's un-prefixed
  root-level slugs more literally) would help SEO. Answered no — explained
  that `/en`/`/ar` + hreflang is the standard, Google-sanctioned pattern
  for bilingual sites (which is what the whole `[lang]/layout.tsx` +
  `sitemap.ts` hreflang setup already implements), that WP itself had no
  Arabic version to begin with so there's no "same URL" to preserve on
  that axis, and that the real SEO risk is broken/missing redirects, not
  URL-prefix shape. **Decision: keep `/en`/`/ar` as-is, do not restructure
  routing.** Don't revisit this without a new, specific reason — it was a
  deliberate, explained decision, not an open question.
- **Still open / explicitly not done this session**: OG images, `.env.local`
  production secrets, Search Console verification tag, the actual Vercel
  deploy + domain/DNS cutover itself. See the checklist above for the
  current state of each.

## Team LinkedIn icons: real profile links + brand mark (2026-08-07)

`Team.tsx`'s LinkedIn icon was `aria-hidden`/non-clickable for all 5
members since no profile URLs existed. The user supplied 4 real URLs
(Murtaza, Manisha, Owais, Noor) plus a 5th (Mohammad Qadri) that is
**LinkedIn's own `/404/` error page** — the user explicitly asked for it to
be wired in anyway rather than left decorative, so it is (flagged back to
the user that it's a dead link; swap it the same way once a real URL turns
up). `aboutPage.team.members[].linkedinUrl` is a new optional dictionary
field (EN+AR) — present only for members with a real link; `Team.tsx`
branches on its presence to render either a clickable `<a>` or the old
decorative `<span>`.

Two icon-styling passes: first swapped the plain outlined icon for a
filled `#0A66C2` (LinkedIn's real brand blue) circular badge — a
deliberate, scoped exception to the site's otherwise-restrained
navy/accent-only palette, justified because it's a recognizable third-party
brand mark, not a UI color choice. Then, per follow-up feedback, replaced
lucide's generic `Linkedin` icon with an inline hand-written SVG
(`LinkedInGlyph` in `Team.tsx`) that reproduces LinkedIn's actual "in"
wordmark glyph, since lucide's icon is a generic outline, not the real
brand mark. Both the clickable and the decorative (Qadri) variant use the
same `LinkedInGlyph` now — no visual inconsistency between "has a link" and
"doesn't" beyond color/opacity.

## OG image generation + first pre-launch checklist items closed (2026-08-10)

Started working through the pre-launch checklist for real, in order.

**OG images**: `next/og`'s `ImageResponse` (Next's built-in Satori-based
generator) crashes unconditionally on this dev machine — importing
`next/og` at all triggers `@vercel/og`'s bundled default-font loader,
which builds a malformed `file:` URL and throws `ERR_INVALID_URL` because
the project's path contains spaces and parentheses
(`Northman legal next.js\files (4)\...`). Passing custom fonts via the
`fonts` option didn't help since the crash happens at module-init, before
any of that code runs. This is a Windows-path bug, not a code bug — it
would not occur on Vercel's Linux build environment, but it did block
generating the images locally via that route.

Worked around it entirely: `scripts/generate-og-images.mjs` builds each
image as an SVG string (brand navy background, radial accent-blue glow,
the real logo embedded as base64, headline/tagline text) and rasterizes it
with `sharp` (added as a devDependency, used only by this script) via
`sharp(Buffer.from(svg)).jpeg(...).toFile(...)`. sharp's librsvg/harfbuzz/
fribidi stack handles Arabic text shaping correctly, so the `ar` variant
renders with proper joined glyphs, not tofu/boxes. Wrote both
`public/images/og-default-en.jpg` and `-ar.jpg` at the exact 1200×630 size
`[lang]/layout.tsx`'s existing `openGraph.images` metadata already
references — no metadata code changes needed, just the missing files.
Re-run the script (`node scripts/generate-og-images.mjs`) if the copy or
design ever needs to change; it's a one-off generator, not part of the
build.

**`.env.local` production values — partially filled in.** Sanity project
ID/dataset/API token were already set from earlier in the project (that's
why News & Updates already worked in dev). Added this session:
- `SANITY_REVALIDATE_SECRET` — generated a random 24-byte hex string
  (`crypto.randomBytes(24).toString("hex")`). **Still needs to be entered
  as the `Authorization: Bearer <secret>` header value when the Sanity
  webhook is configured** (sanity.io/manage → API → Webhooks → URL
  `https://northmansterling.legal/api/revalidate`, filter
  `_type == "post"` — the exact steps are already documented in
  `src/app/api/revalidate/route.ts`'s own comment). Not done yet since
  there's no deployed URL to point the webhook at.
- `SMTP_HOST` — the user pulled the real value from cPanel's Email
  Accounts → "Connect Devices" panel: `mail.northmansterling.legal`, port
  465, confirming the existing `SMTP_PORT`/`SMTP_USER` values in the env
  file were already correct.

**Still blank, explicitly deferred by the user, not blockers right now:**
- `SMTP_PASS` — the user doesn't have the `info@northmansterling.legal`
  mailbox password on hand; they'll confirm it later. Until it's filled
  in, the contact form and newsletter signup will fail at send-time in
  production (`mailer.ts` throws if any of `SMTP_HOST`/`USER`/`PASS`/`TO`
  is missing) — don't forget this before actually launching.
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` — the user has a HubSpot account but
  said "hubspot baad mei set krty hain" (we'll set up HubSpot later) —
  deliberately deferred, not forgotten.
- `NEXT_PUBLIC_GTM_ID`/`GA4_ID`/`CLARITY_ID` — user confirmed none of
  these accounts exist yet. Left blank on purpose; each analytics
  component (`GA4.tsx`, `GoogleTagManager.tsx`, `MicrosoftClarity.tsx`)
  already no-ops cleanly when its env var is unset (checked before the
  consent-gated `<Script>` even renders), so this is not something that
  needs revisiting until those accounts actually exist.

## Sanity Studio installed + deployed (2026-08-10)

The `studio/` project (already scaffolded earlier, per its own README) had
never actually had its dependencies installed or been run — the user
wanted it working now so daily blog posting doesn't require a code change
per post.

- **`studio/.env.local` was missing entirely** — created it with the same
  `SANITY_STUDIO_PROJECT_ID=08hwxtv4` / `SANITY_STUDIO_DATASET=production`
  values already in the main app's `.env.local` (both projects must point
  at the same dataset — this is not a new/second project).
- **`npm install` inside `studio/`** — this is a genuinely separate
  `node_modules` from the main app's (React 19 vs. the main app's React 18,
  per the README's own explanation), ~950 packages, took a few minutes.
- **Real bug found and fixed**: `studio/tsconfig.json` extended
  `"sanity/tsconfig"`, a subpath that no longer exists in the installed
  `sanity@6.9.1` package (`Error: File 'sanity/tsconfig' not found`) —
  stale scaffolding from an older Sanity version's convention. Replaced
  with a plain, self-contained `compilerOptions` block instead of relying
  on the package to ship one. `npm run dev` then started cleanly at
  `localhost:3333`.
- **Deployed to a permanent hosted URL**: `npm run deploy` needs a
  `studioHost` set in `sanity.cli.ts` (wasn't configured) — added
  `studioHost: "northman-sterling"`, which deploys to
  `https://northman-sterling.sanity.studio`. CLI auth was already present
  on this machine (GitHub-linked Sanity account, `syedsabi08@gmail.com`) —
  no login/password was needed despite the user not having it on hand.
  Also added the `deployment.appId` the CLI printed after the first
  deploy, so future re-deploys (`npm run deploy` again after adding a new
  schema field, etc.) won't re-prompt for an app ID.
- **The user can now log into `https://northman-sterling.sanity.studio`
  from any computer** (not just this dev machine) to write/publish blog
  posts directly — no `localhost:3333`, no code deploy, no Claude Code
  session needed for routine posting. New posts appear on the live site
  within an hour by default (ISR) unless the revalidate webhook (see
  `SANITY_REVALIDATE_SECRET` above) is wired up post-launch for instant
  updates.

## Sanity Studio bug: blank "new document" pane (2026-08-10, same day as the deploy above)

Right after the first deploy, the user tried clicking "+" → "News & Updates
Post" on the live `https://northman-sterling.sanity.studio` and got a
completely blank content pane — the URL resolved correctly
(`/intent/create/template=post;type=post`), but no form ever rendered.
Took several rounds of walking the user through DevTools (Console → no
red error at all; the "1 error"/"38 warnings" badge was just third-party
preload-timing noise and an unrelated ad-tech pixel's Quirks Mode notice;
Network tab showed only websocket/telemetry/batch requests, nothing
failing) before finding the actual cause by re-reading `sanity.config.ts`
directly instead of continuing to debug from the browser side.

**Root cause**: `sanity.config.ts`'s `plugins` array only had
`visionTool()` — **`structureTool()` was never added**. In Sanity Studio
v6+, `structureTool()` is what actually provides the document list/editor
UI; without it registered, there is no desk structure at all, so the
"create new document" intent route resolves (the router works) but has
nothing to render into the content pane — hence a silent blank screen
with zero console errors, not a crash. `npx sanity schema validate`
correctly reported 0 errors throughout, because the *schema* was fine —
this was a missing *plugin*, a completely different config surface.

**Fix**: added `import { structureTool } from "sanity/structure"` and put
`structureTool()` first in the `plugins` array (before `visionTool()`).
Verified the fix locally first (`localhost:3333`, Vite logged
`dependency optimized: sanity/structure` and reloaded cleanly), then
re-ran `npm run deploy` — redeployed to the same
`https://northman-sterling.sanity.studio` URL, no new `appId` prompt this
time since that was already saved in `sanity.cli.ts` from the first
deploy.

**Lesson for next time this project's Studio acts "blank" with no
console error**: check `sanity.config.ts`'s `plugins` array first, before
spending time in browser DevTools — a missing plugin registration fails
silently by design (no error to catch), unlike almost everything else in
this codebase which either throws or degrades to a visible fallback.

## Session 2026-08-10: sitemap dedup check, Home page media swaps, Event Gallery rebuild, About Us copy + team template, Navbar rework, Contact Us hero, TopBar/Offices trim

A long, mostly design-iteration session across several pages. In rough order:

**Sitemap duplicate-content check (.com vs .legal).** User asked to compare
blog posts between `northmansterling.com` and `northmansterling.legal` for
duplicates. Both are **live WordPress sites** right now, not this Next.js
rebuild — `.com` has a working `post-sitemap.xml` (56 posts), `.legal`'s
standard sitemap paths all 404 (consistent with the earlier 2026-08-07 WP
crawl notes below), so its ~57 posts were crawled from `/news-updates/`
pagination instead. Found exactly **2 confirmed duplicates** (identical
slug + verified matching author/date/body via WebFetch, not just slug
matching): `saudi-arabia-ranks-2nd-best-country-for-expats-a-transformational-journey`
and `riyadh-to-design-worlds-tallest-sports-tower`. A handful of
similar-sounding pairs (ETA visa posts, visa-comparison posts) were checked
by actually reading both articles and confirmed as topically related but
distinct, not duplicates. **`.legal` being live WordPress right now is
itself a fact worth flagging before launch** — need to confirm with the
user whether that's the intentional pre-launch state or whether the
Next.js build is supposed to already be live somewhere.

**Legal Advisors section (Home) — photo swap + stats moved onto photo.**
Replaced `/images/about/legal-advisor.png` with a new real photo the user
supplied, `legal-advisor-ksa.jpg` (gavel + rice on the Saudi flag) in
`LegalAdvisors.tsx`. Went through several iterations per direct feedback:
first removed the "35+ Countries / Riyadh / 24-7" stats row entirely along
with a bottom blur/gradient on the photo, then user asked to bring the
stats back but **overlaid directly on the photo's blurred bottom band**
instead of below it as a separate row — implemented as white text with a
drop-shadow and vertical dividers sitting on top of the gradient, keeping
the original side-by-side (text left/photo right) layout throughout, never
switched to stacked.

**Event Gallery rebuilt from scroll-pin to a manual+auto scrollable strip.**
The previous "sticky stack" scroll-pin effect (see 2026-08-05 entry below)
was replaced per the user's request for a locale-aware marquee. Went
through a few architecture changes before landing:
1. First built a pure CSS `@keyframes` marquee (`animate-marquee-ltr`/`-rtl`
   in `globals.css`), direction driven by `lang`.
2. User reported the overlaid title/description text wasn't legible against
   the real event photos — root-caused to relying on a gradient over
   arbitrary photo content; fixed by moving the caption onto a **solid
   `bg-navy` plate below the photo** instead of overlaid on top of it, so
   contrast no longer depends on what's in each specific photo.
3. User asked for hover-to-expand-and-read-full-text — added
   `group-hover/card:line-clamp-none` behavior, with the card's own height
   growing (not the fixed-aspect photo squashing) via `items-start` on the
   track instead of stretched-height siblings.
4. User asked for manual left/right arrows too — since CSS `@keyframes`
   can't cleanly be "stepped," rebuilt Event Gallery entirely as a native
   `overflow-x-auto` scroll container (`EventGallery.tsx`) with `scrollBy`-
   driven prev/next buttons and a `setInterval`-based auto-advance (not
   continuous `rAF`, which would fight the buttons' own smooth-scroll) that
   pauses on hover/focus/manual use and resumes after a delay — same
   "auto-advance + manual override" shape as the existing `Ticker.tsx`.
5. Arrow **placement bug**: first attempt absolutely positioned the arrows
   at the container edges with a `-translate-x-1/2`/`translate-x-1/2`
   straddle, which pushed them half-outside the padded container (and off
   fully on narrow viewports). Fixed by moving them into normal document
   flow, right-aligned next to the section heading (`sm:flex`, hidden below
   `sm` since touch/swipe is the natural mobile interaction there) — no
   absolute positioning, no transform-based edge-straddle, can't escape the
   visible container again.
- Added `eventGallery.previous`/`.next` dictionary keys (EN+AR) for the
  arrow `aria-label`s; removed the now-dead CSS marquee keyframes and added
  a small reusable `.scrollbar-hide` utility to `globals.css`.

**About Us copy rewrite, benchmarked against real regional firms.** User
pushed back twice on an initial copy draft — first for not being
"humanised/SEO-riched" and using em-dashes, then for not having actually
cross-checked how established Saudi/GCC firms position themselves. Ran a
research agent against Al Tamimi & Company, AlGhazzawi & Partners, and
Zamakhchary & Co.'s real About Us pages (via WebFetch/search, sources cited
in the agent's own report) before finalizing. **Key finding used**: don't
compete on Al Tamimi's "largest/leading" superlative axis (not a credible
claim for this firm's size) — instead follow the AlGhazzawi/Zamakhchary
pattern of an identity-first, fact-led opener, leading trust signals with
real verifiable credentials (this firm's ISO 27001/37001/9001 certification
and notary/POA authorization are genuinely rare at this size and should
carry the credibility weight instead of adjectives). Rewrote and shipped in
both EN+AR: **Company Overview** heading/both paragraphs, **What We
Believe**, **We Embrace Ownership**, **CTA Banner** ("Our Experts!" → "Our
Legal Team"), and the **Team section intro** (now states the real "35+
countries" + real named events fact, worded as "represented at" rather than
implying unverified wins). No em-dashes in any of the new copy. Vision/
Mission/Purpose, Ownership's bullet list, FAQ, and Office/Registration
sections were explicitly left untouched (out of scope, factual/legal
content).

**Team section reset to an empty template.** Per explicit user request, all
5 team members' `name`/`role`/`location`/`imageSrc`/`linkedinUrl` were
blanked to empty strings in both dictionaries (real names/photos/LinkedIn
URLs removed entirely — the user will supply new details later, possibly
different people). `Team.tsx` now branches on `Boolean(member.name)`: empty
slots render a dashed-border card with a generic person-icon avatar and
faint "Name / Role / Location" placeholder labels, instead of a broken
`<Image src="">` or blank text. Grid stayed at 5 slots, same layout —
dropping in real data later is a pure content edit, no component changes
needed. **The user has not yet supplied the new details — this is a
genuinely empty placeholder state right now, not real content.**

**Navbar: transparent-before-scroll, cream-glass-after, with several
follow-up passes on the logo treatment.** Multiple rounds of direct
feedback, in order:
1. **Base problem**: the real logo (`logo-real.png`) is navy ink with no
   light/inverted variant. The old navbar was navy-glass with the logo
   wrapped in a solid cream card (`onDark` prop on `BrandLogo`) to stay
   legible. User wanted the logo *without* a card and asked to pick a
   navbar background where it's actually visible instead.
2. Landed on: navbar **fully transparent before scrolling** (`bg-transparent`,
   no blur, hero photo shows straight through — this only works cleanly on
   pages with a navy band directly under the nav, see point 5), all nav
   text/icons/toggles render **white**; **on scroll past 24px**, navbar
   becomes the existing blurred cream-glass bar and everything reverts to
   navy/slate-dark coloring. `scrolled` boolean now also drives this
   color-scheme swap, not just the height-shrink it already did.
3. **Header layout recentered**: switched from a 2-group `flex justify-between`
   to a `grid-cols-[auto_1fr_auto]` — logo fixed-left, nav links
   (Home/About Us/Services/News & Updates/Contact Us) centered in the
   flexible middle column, language switcher + dark-mode toggle + mobile
   menu button fixed-right.
4. **Logo-visibility treatment went through several iterations** before
   landing: glow-all-around → straddling white card (user: "don't want a
   white card") → drop-shadow on the ink itself → back to a positioned
   glow specifically **beneath** the logo (not surrounding it), sized to
   actually cover its footprint (`-inset-x-4 -bottom-3 -top-1`, `opacity-95`,
   `blur-lg`) rather than a thin sliver — each earlier attempt was reported
   back as "not visible enough" or "not what I meant," so don't assume the
   current one is final without a live look. Logo size was bumped up twice
   over the session (46px → 54px → 60px pre-scroll; 34px → 40px → 44px →
   48px scrolled) per repeated "make it bigger" requests.
5. **Legal pages exception, real edge case found**: Privacy Policy,
   Disclaimer, and Terms & Conditions have **no navy band** under the
   navbar — plain cream page background from the very top. A transparent
   white-text nav would be unreadable there. Fixed by forcing the navbar
   into its "scrolled" (light-glass, navy text) state permanently on those
   3 routes, detected via `pathname` in `Navbar.tsx` (`ALWAYS_LIGHT_NAV_PATHS`)
   since `Navbar` mounts once sitewide in `[lang]/layout.tsx` with no
   per-page props — don't add a prop for this without checking that
   constant first.
6. Mobile drawer (`bg-navy-dark` solid panel, not glass-over-photo) was
   deliberately left untouched — still uses the `onDark` cream card, since
   it's a genuinely solid dark surface, not in conflict with any photo.

**Contact Us hero rebuilt to match Home/Services's `-mt-24` pattern.**
Previously a flat `bg-navy` band with no photo (per the 2026-08-07 entry
below, which had deliberately removed the `-mt-24` treatment from Contact
Us). User asked to bring it back "like home page and service page" — added
a real photo (`top-view-of-group-business-leader-presenting-infor...jpg`
from the media folder, copied to `public/images/contact/contact-hero.jpg`,
chosen since it fits "connect with our team" and wasn't already used
elsewhere) with the same `-mt-24`/gradient/drop-shadow treatment as
Services' hero. **This reverses a documented prior decision** — if Contact
Us's hero looks inconsistent with About Us (which still has no `-mt-24`
per the 2026-08-07 entry) that's expected right now, not a bug; both were
deliberate, just from different sessions/instructions.

**TopBar Client Portal link removed, Global Offices trimmed to KSA only.**
Per explicit request: `TopBar.tsx`'s "Client Portal" button (and its
`CLIENT_PORTAL_URL` import) is gone — the dictionary label strings
(`topBar.clientPortal`) still exist as unused data, harmless, not wired to
anything. `GlobalOffices.tsx`'s office grid (previously 8: UK, KSA, UAE,
Brussels, Frankfurt, Delhi, Washington, Houston) is now **Saudi Arabia
only** in both dictionaries — heading changed "Global Offices" → "Our
Office" (AR: "مكتبنا حول العالم" → "مكتبنا"), grid layout changed from a
3-column grid to a single centered card (`max-w-md`, no grid-cols) since a
lone card in a 3-column grid would float awkwardly left.

**Session ended here per user's own sign-off ("that's all for today").**
Everything above is committed to the working tree but not yet verified
with a live browser screenshot in this session — this environment had no
`chromium-cli`/Playwright available, and the local dev server was
restarted several times (killed stale processes on 3000-3002, cleared a
corrupted `.next` cache that was throwing an `EINVAL: readlink` error on a
OneDrive-synced path — a Windows/OneDrive filesystem quirk, not a code
bug). **Next session should start with a live visual pass** on: the
Legal Advisors photo/stats overlay, Event Gallery's arrows + hover-expand +
auto-scroll interplay, the Navbar's white-glow-under-logo strength/size
(went through 4+ rounds of "not visible"/"not what I meant" without a
screenshot to confirm against), and the new Contact Us hero photo crop.

## Conventions to hold the line on

- Server Components by default. Only mark `"use client"` where actual
  interactivity (state, effects, browser APIs) is required — the analytics
  and consent components already do this correctly; match that pattern.
- All copy lives in `src/lib/i18n/dictionaries/{en,ar}.json`, read through
  `getDictionary()`. Never inline EN/AR strings in components.
- All schema builders live in `components/seo/schemas/*.ts` and are rendered
  via the shared `<JsonLd data={...} />` — don't hand-roll `<script>` tags.
- Every new page needs: `generateMetadata` with canonical + hreflang,
  `Breadcrumbs` (if not top-level), and an entry in `sitemap.ts`'s
  `staticRoutes` if it's a static marketing page.
- `next.config.js`'s redirect list and `src/data/redirects.ts` must be kept in
  sync manually (config.js can't import the .ts file directly) — update both,
  always.
