# Stellar Voice Agents — Marketing Site

Vite + React 19 marketing site for [stellarvoiceagents.com](https://www.stellarvoiceagents.com).
Deployed on Vercel.

## Stack

- **Vite + React 19** — single-page site with `react-router-dom` for the home page and case studies.
- **Vercel Serverless Function** at `api/calculator/submit.js` — receives ROI-quiz submissions and fans out two emails via Resend (internal alert + client confirmation).
- **GTM** for analytics; **Calendly** for demo bookings (lazy-loaded).

## Local development

```bash
npm install
npm run dev      # vite dev server
npm run lint     # eslint
npm run build    # production build
```

## Environment variables

The serverless function needs the following set in Vercel (Project → Settings → Environment Variables). See `.env.example`.

- `RESEND_API_KEY` — server-only, do NOT prefix with `VITE_`.
- `INTERNAL_EMAILS` — comma-separated recipients for the internal lead alert.
- `FROM_EMAIL` — verified Resend sender, e.g. `Stellar Voice Agents <hello@stellarvoiceagents.com>`.
- `REPLY_TO_EMAIL` — optional; defaults to the first `INTERNAL_EMAILS` entry.
- `ALLOWED_ORIGINS` — optional, comma-separated. Defaults to the production domains.

## Project layout

```
api/calculator/submit.js    Resend fan-out for quiz submissions
src/
  pages/                    Top-level routed pages
  components/               Section components used on the home page
  components/Calculator/    The quiz UI (entry: Calculator.jsx)
  calculator/               Source of truth for questions + math
                              (also consumed by api/calculator/submit.js)
  lib/                      analytics.js (GTM), calendly.js (lazy popup)
  hooks/                    useScrollReveal
public/                     Static assets (logos, audio demos, sitemap, etc.)
```

## Notable conventions

- Brand calculations live in `src/calculator/calc.js`. **Don't change the constants without David.**
- All booking CTAs go through `openCalendly()` so analytics + lazy-loading stay consistent.
- All quiz events go through `track()` in `src/lib/analytics.js` (pushes to `window.dataLayer`).
