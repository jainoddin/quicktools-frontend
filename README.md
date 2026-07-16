# QuickTools.ai Frontend

Next.js app for QuickTools.ai — AI tools, dashboard, pricing, content (blog/news/articles).

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Google Analytics 4 (full journey events + User-ID, no PII)
- Razorpay checkout (client SDK)

## Setup

```bash
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL to your backend
npm run dev
```

App: `http://localhost:3001`

## Env

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Backend base URL (local or Render) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID |

Never commit `.env.local` — only `.env.example`.

## Analytics

Events tracked end-to-end: page views, login/logout, tool generate/download/share, content opens, newsletter/contact leads, checkout/purchase.

Logged-in users are identified with MongoDB `user_id` (no name/email sent to GA).

## Scripts

```bash
npm run dev    # next dev -p 3001
npm run build
npm start
```
