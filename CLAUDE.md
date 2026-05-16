# Stellar Voice Agents Website

Marketing site for **Stellar Voice Agents** — live at **https://www.stellarvoiceagents.com**. Vite + React 19 + plain CSS, hosted on Vercel (team `mindsheeplabs-projects`, project `stellarvoice`).

Founders: **Gary Sarco** (CEO — `garysarco1@gmail.com`) + **David Taylor** (CTO — `david@mindsheep.com.au`).

## Stack
- Vite + React 19, plain CSS (no Tailwind/shadcn), lucide-react icons, Poppins font
- react-router-dom v7
- One Vercel Serverless Function: `api/calculator/submit.js` (Node ESM, Resend SDK)
- Domain: `stellarvoiceagents.com` → 307 → `www.stellarvoiceagents.com`
- Repo: https://github.com/davidmindsheep/stellarvoice (push to main → auto-deploy ~60s)

## What's live
- **Homepage**: Hero → SocialProof → Calculator CTA → ProblemSolution → Products → HowItWorks → Demos → Features → Industries → Testimonials → Pricing → Team → FAQ → CTABanner → Footer
- **Products**: AI Receptionist ($597/mo), ClosedLoop ($10/lead), Dead Lead Revival ($10/lead)
- **Calculator quiz**: 30-sec popup, 6-7 questions, branching by pain → result with $/mo revenue leak + Calendly CTA. Math in `src/calculator/calc.js` (inlined in api function too).
- **Calendly popup**: All booking CTAs use `src/lib/calendly.js` to open Gary's Calendly inline. URL: `https://calendly.com/garysarco1/30min`
- **Email pipeline**: POST to `/api/calculator/submit` → Resend sends internal alert (david+gary) + client confirmation. Domain verified.
- **Case study**: `/case-studies/easystart-homes` (Denes/EasyStart Homes, 13 sections)
- **Analytics**: GTM `GTM-KVGBGVZQ`, GA4 `G-4F7XRGN84B`. DataLayer events in `src/lib/analytics.js`
- **SEO**: sitemap.xml, robots.txt, llms.txt, JSON-LD, canonical, Search Console verified

## Brand tokens (`src/index.css`)
```
--deep-purple: #25005D     primary, headlines, CTAs
--electric-violet: #7868F8 accent, icons, top borders
--royal-purple: #473D92    gradient midpoint, labels
--violet-hover: #6A5AF5    button hover
--pale-lavender: #F5F2FF   soft backgrounds
--off-white: #F3F3F3       alt section backgrounds
--near-black: #1A1A1A      body text
--hero-gradient            deep-purple → electric-violet → fade
```

## Brand voice (enforce in any copy)
- No hype: revolutionary, game-changing, disruptive — banned
- No hedging: may help, aims to, could improve — replace with direct claims
- Numerals always: 3×, +120%, 24/7
- ALL CAPS only on "NEVER LOSE ANOTHER LEAD" signature line
- "engage, qualify, and book" — three verbs, that order
- Industries named: Real Estate, Health, Finance (not "your industry")
- Verb-first CTAs: "Book a Demo", "Take the Test" (never "Learn More" / "Get Started")

## Env vars (Vercel Production + Preview)
- `RESEND_API_KEY` — ⚠️ needs rotation (was in plaintext chat)
- `INTERNAL_EMAILS` — `david@mindsheep.com.au,garysarco1@gmail.com`
- `FROM_EMAIL` — `Stellar Voice Agents <hello@stellarvoiceagents.com>`
- `REPLY_TO_EMAIL` — `garysarco1@gmail.com`

## Pending (non-blocking)
1. Rotate Resend API key
2. Real EasyStart logo → `public/easystart-logo.png`
3. Dashboard screenshot → `public/easystart-dashboard.png`
4. Audio transcript for case study
5. Better David Taylor headshot
6. Replace placeholder testimonial names (Gary's re-recording)
7. BNI $500 special pricing decision
8. Google Ads conversion tag when ads launch
9. Mark `quiz_completed` + `book_demo_clicked` as Key Events in GA4 after they fire

## File map
```
api/calculator/submit.js             Vercel function (Resend email send)
src/App.jsx                          Router (BrowserRouter, ScrollToTop)
src/pages/HomePage.jsx               Homepage
src/pages/CaseStudyEasyStart.jsx     Case study page
src/components/Navbar.jsx            Routing-aware nav
src/components/Calculator/           Quiz components
src/calculator/                      Quiz math + questions (client)
src/lib/calendly.js                  Lazy Calendly popup
src/lib/analytics.js                 dataLayer wrapper
public/audio/                        6 demo MP3s
vercel.json                          SPA fallback (excludes /api/)
.env.example                         Resend env vars list
```

## End-to-end test (curl)
```bash
curl -sL -X POST "https://stellarvoiceagents.com/api/calculator/submit" \
  -H "Content-Type: application/json" \
  -d '{"pain":"missed","missedVolume":"some","customerValue":"m","industry":"realEstate","businessName":"TEST","contact":"david@mindsheep.com.au"}'
```
Expected: `{"ok":true,...,"contactKind":"email"}` and $9,353/mo.

## Workflow
- Dev: `npm run dev` from repo root
- Or `mcp__Claude_Preview__preview_start` with name `stellarvoice-dev`
- Push to `main` → Vercel auto-deploys
- Resend logs: `curl -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/emails?limit=10`
- Vercel logs via MCP: project `prj_sSATdwwd5LXXy4Lg7Yb0bgQS8Xkz`, team `team_Ke8Qp1JVic9duCPKtjpy4LmL`
