# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are corporate HR and global-mobility managers at foreign companies expanding into or already operating in Saudi Arabia, handling employee relocation, work visas, and company incorporation on their organization's behalf. The site also serves individual expats and investors needing personal visa, notary/POA, or document-attestation support, but corporate mobility managers are the primary audience the site is built to convert.

## Product Purpose

Northman Sterling Legal is a Riyadh-headquartered registered law firm (a division of Northman & Sterling's global mobility services) providing legal support for operating in Saudi Arabia: corporate immigration, company incorporation, outbound visas, document attestation, commercial dispute resolution and court-order enforcement, and authorized notary/Power of Attorney issuance. The website's job is to generate qualified consultation leads through its contact and newsletter forms — lead generation is the primary success metric, not brand presence alone.

## Positioning

Serves clients from 35+ countries out of a single Riyadh base, combining deep familiarity with Saudi regulatory practice with international-firm responsiveness. Distinguishing marks: ISO 27001 / 37001 / 9001:2015 certification, authorized notary/POA issuance status, and an established international events/PR presence (SME London Business Awards, FEM EMEA Summit, HR Leaders Conference, PIF Private Sector Forum).

## Operating Context

- Bilingual site: English (LTR) and Arabic (RTL), served under `/en` and `/ar` locale prefixes, with a persistent language switcher.
- News & Updates is CMS-driven (Sanity), ISR-revalidated; a separate Sanity Studio project exists standalone under `studio/`.
- Contact and newsletter forms send via SMTP (Nodemailer) to the firm's inbox — no CRM/ESP integration is wired yet.
- Analytics/marketing stack: GTM, GA4, Microsoft Clarity, HubSpot script loader, all gated behind a cookie-consent decision that never blocks indexation.
- Client Portal is a separate external application linked from the top bar, not part of this codebase.
- Deployment target: Vercel.

## Capabilities and Constraints

- **This is a rebuild of an already-indexed WordPress site** (northmansterling.legal). Migration SEO care is a hard constraint: explicit 1:1 301 redirects for legacy URLs, preserved canonical/hreflang, per-language sitemap, and Search Console monitoring after launch — not a nice-to-have.
- HubSpot forms/campaign attribution, Search Console verification, and booking/conversion tracking are not yet built (see CLAUDE.md's running punch list).
- Real brand imagery is arriving incrementally from the client (ISO badges, event photos, service icons, office photos). Some arrive at low native resolution (WordPress thumbnail exports, ~300px wide); full-resolution originals are requested when possible but not guaranteed.
- Social profile URLs (Facebook/Twitter/LinkedIn) are not yet provided — footer icons currently link to `#`.

## Brand Commitments

- Name: Northman Sterling Legal, a division of Northman & Sterling.
- Visual identity is confirmed and already implemented, per the client's official color-code summary (2026-08-04): dark navy #0B192C (primary/section backgrounds), white/off-white #FFFFFF-#F8F9FA (backgrounds), slate-blue #2E5B88 (accent/icons/links), charcoal #3E4856 (body text), light-gray borders. CTA buttons specifically use a dedicated sky-blue #27AAE1 (hover: the slate-blue accent #2E5B88), per a later direct client instruction — kept separate from `accent` in `tailwind.config.js`'s `button` token rather than overloading it. Cinzel (EN heading) / Amiri (AR heading) serif type and near-square "institutional" corners carry over from the earlier direction — deliberately restrained and institutional, explicitly not a tech-startup aesthetic. Real logo confirmed (`public/images/logo-real.png`); no light/inverted logo variant exists yet. A square logo variant (`public/images/logo-mark-square.png`) has also been supplied but is not yet wired into any component.
- Dark mode exists as an optional UX toggle only; light is the default. Dark mode carries no direct SEO value and should never be treated as a priority feature.
- Confirmed real Riyadh office address, mobile, landline, and email (Level 18, Al Faisaliah Tower, King Fahad Road, Olaya District, Riyadh; ksa@northmansterling.legal). The number previously on file as a fax line (00966 112 978 293) was corrected to a second phone/landline number per the client's About Us brief (2026-08-05) — it is clickable (`tel:`) everywhere now, not fax.

## Evidence on Hand

- Real ISO 27001 / 37001 / 9001:2015 certification badges (`public/images/certifications/`).
- Real photos for all four named events in the Event Gallery — SME Awards, FEM EMEA Summit, HR Leaders Conference, PIF Forum (`public/images/events/`).
- Real icons for the four Core Services cards (`public/images/services/`).
- Real hero background photo (London Eye/Thames) and two supporting section photos ("Why Choose Us", "Legal Advisors"), the latter two at low native resolution (`public/images/hero/`, `public/images/about/`).
- The About Us page now has a real Team section (5 named members, roles, locations) per the client's brief (2026-08-05). No headshots or LinkedIn URLs were supplied with it — each member renders as an initials avatar, and the LinkedIn icon is decorative (no href) until real photos/URLs arrive. Individual team headshots exist in the client's local media folder but have not been matched to these 5 names or placed on the live site yet.
- No case studies, testimonials, pricing, or press mentions beyond the four named events are confirmed. Do not fabricate any.

## Product Principles

1. Preserve SEO equity through the WordPress-to-Next.js migration above all else — this is a rebuild of a ranked site, not a greenfield launch.
2. Every visual and copy decision defaults to institutional restraint over startup polish; when in doubt, choose the more conservative, law-firm-appropriate option.
3. Never substitute a stock or unrelated photo for a specific factual claim (a named event, a named certification) — real assets only for anything presented as evidence.
4. Bilingual parity is non-negotiable: no EN-only feature or content ships without its AR equivalent.
5. The contact and newsletter forms are the conversion point the whole page is built to serve — every section exists to build enough trust and clarity to get a visitor to one of those forms.

## Accessibility & Inclusion

No formal accessibility standard has been specified by the client. Current implementation follows sensible defaults (semantic landmarks, focus-visible states, RTL-aware logical properties), but no WCAG conformance level has been confirmed as a requirement.
