# Northman Sterling — Sanity Studio

This is the content editor for the **News & Updates** section. It is a
**separate, standalone project** from the main Next.js site in the parent
folder — not a page inside it.

## Why separate?

Sanity Studio (v6) requires **React 19**. The Next.js site in this repo
runs **React 18** (Next.js 14's stable pairing). Trying to install both in
one `package.json` causes an unresolvable dependency conflict. Keeping them
as two independent projects — each with its own `node_modules` — sidesteps
that entirely, and is also how Sanity recommends running Studio in
production anyway (deployed once to `<project>.sanity.studio`, completely
decoupled from your frontend's build).

## One-time setup

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
   (or run `npx sanity init` from this folder to create one via the CLI).
2. Copy `.env.local.example` to `.env.local` and fill in the project ID
   and dataset name.
3. Put the **same** project ID and dataset name into the main app's
   `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID` /
   `NEXT_PUBLIC_SANITY_DATASET` — both projects must point at the same
   Sanity dataset.

## Running locally

```bash
cd studio
npm install
npm run dev
```

Opens the editor at `http://localhost:3333`.

## Deploying (so your team can use it from anywhere)

```bash
npm run deploy
```

This publishes the Studio to `https://<your-project-name>.sanity.studio` —
a free hosted URL from Sanity, no separate hosting/domain needed.

## Wiring up instant updates (optional but recommended)

By default the Next.js site refreshes News content at most once an hour
(ISR). To make a published post appear immediately:

1. In [sanity.io/manage](https://www.sanity.io/manage) → your project →
   **API** → **Webhooks**, add a webhook:
   - URL: `https://northmansterling.legal/api/revalidate`
   - Dataset: your production dataset
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"`
   - HTTP method: `POST`
   - HTTP headers: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
     (same value as `SANITY_REVALIDATE_SECRET` in the Next.js app's env vars)
