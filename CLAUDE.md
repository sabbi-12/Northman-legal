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

## Current status (2026-08-04)

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
| 301 redirects from old WP URLs | ⚠️ placeholder set only | `src/data/redirects.ts` + mirrored in `next.config.js` — **needs full WP crawl before launch** |
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
| Home | ✅ 2026-08-04, full 10-section brief | ✅ (existing root layout metadata covers it) | Org/LegalService/Attorney (sitewide) | See "Home page build" below |
| About Us | ✅ 2026-08-05, full 10-section brief | ✅ (title/description updated for new content) | Org/LegalService/Attorney (sitewide), Core Pillars anchors, FAQPage (pre-existing) | See "About Us page build" below |
| Regions | — | — | | |
| News & Updates (list + detail) | — | — | Article ✅ | Sanity-backed, ISR |
| Contact Us | — | — | | |
| Privacy Policy | — | — | | |
| Disclaimer | — | — | | |

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

## Session checkpoint (2026-08-04, end of day)

Everything described above through the Rebrand section is committed —
`46feef9` ("website design changes") on `main`, working tree clean at the
close of this session. Picking this back up tomorrow, start here:

- **`/impeccable` is now usable.** It was installed/initialized in an
  earlier session but not picked up mid-session; this session's fresh
  start confirmed the skill loads (`context.mjs` and `context-signals.mjs`
  both ran successfully). Nothing has been critiqued or audited yet —
  `critique.latest` is `null`. A first `/impeccable critique` or
  `/impeccable document` pass (to generate the still-missing `DESIGN.md`)
  is queued but not started.
- **No code changes were made this session** — this session was
  docs-only, reconciling `CLAUDE.md`/`PRODUCT.md`/`SNAPSHOT.md` against
  what the *previous* session's rebrand commit actually shipped (the hero
  photo's second swap to `westminster-sunset.jpg`, the new dedicated
  `button` CTA-color token, and the still-unwired `logo-mark-square.png`
  asset weren't written down until now).
- **Open threads carried forward, unchanged:** the Page log (About Us,
  Regions, Contact Us, Privacy Policy, Disclaimer all still placeholder
  content), FAQ schema still not emitted, `logo-mark-square.png` needs a
  decision on where/whether it's used, footer social URLs still `#`, and
  the full pre-launch migration checklist below is untouched.

## Pre-launch migration checklist (do NOT skip — live site is indexed)

- [ ] Export every currently-indexed URL from the live WP site (WP sitemap.xml
      or a full Screaming Frog crawl).
- [ ] Give every one of those URLs an explicit 1:1 entry in
      `src/data/redirects.ts` + `next.config.js` — wildcard-only rules are not
      acceptable for anything that currently ranks.
- [ ] Carry over any existing content worth keeping (don't drop indexed,
      valuable copy just because it's being rebuilt).
- [ ] Generate real `og-default-en.jpg` / `og-default-ar.jpg` (1200×630) —
      currently referenced but absent from `public/images/`.
- [ ] Fill every blank in `.env.local` for prod (Sanity project ID, SMTP,
      GTM/GA4/Clarity/HubSpot IDs, revalidate secret) — see
      `.env.local.example` for the full list.
- [ ] Add Search Console verification meta tag.
- [ ] After deploy: submit new sitemap in Search Console, monitor Coverage
      report for 404s/soft-404s and ranking movement for at least 4–6 weeks.

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
