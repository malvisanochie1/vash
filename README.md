# Velora Hair

A hair-care shopping app for treatments, relaxers, daily care, styling, weavon and braids. It runs on Android, iOS, tablet and web from one codebase.

```
velora/
├── frontend/   React Native app (Expo, TypeScript, Tailwind via NativeWind, Reanimated)
└── backend/    REST API (Node, Express 5, TypeScript, Zod)
```

## Get the app on your phone

You never need to connect your phone to a computer.

1. **One-time setup**
   - Create a free account at [expo.dev](https://expo.dev). Go to **Account settings → Access tokens** and create a token.
   - In this GitHub repo, open **Settings → Secrets and variables → Actions**. Add a secret named `EXPO_TOKEN` and paste the token.
   - Open **Actions → Setup Expo project → Run workflow**. This links the app to your Expo account.
2. **Install**
   - Open **Actions → Build Android APK → Run workflow**.
   - When it finishes (about 15 minutes), the run summary shows a download link. Open it on your phone and install. Android asks once to allow installs from this source.
3. **Updates**
   - Every push to `main` publishes an over-the-air update automatically.
   - Close and reopen the app to get it. No reinstall is needed.
   - You only need a new APK when native code changes, for example a new native library, the app icon or the app name.

## View it on a laptop

- **Website (auto-updating):** import this repo on [vercel.com](https://vercel.com/new). Set **Root Directory** to `frontend` and keep the other defaults; `frontend/vercel.json` holds the build settings. Every push to `main` redeploys.
- **Locally:** `cd frontend && npm install && npm run web`. The app opens at http://localhost:8081.

## Frontend

```
frontend/src/
├── app/           Routes only (expo-router): thin screens that compose features
├── features/      Feature modules: auth, catalog, cart, checkout, orders, favorites, onboarding
│                  each with its own components, hooks and state
├── components/    Shared UI kit (ui/), layout, motion and brand
├── services/      API contract (api.types.ts) with remote and local implementations
├── data/          Demo catalogue used when no API URL is configured
├── config/        Environment and brand identity (rename the app in config/brand.ts)
├── theme/         Design tokens shared by Tailwind and runtime code
├── hooks/  lib/   Responsive layout, formatting, HTTP client, class merging
└── types/         Domain types shared with the backend contract
```

- **Styling:** Tailwind classes via NativeWind. Colours, fonts and motion presets live in `src/theme`.
- **State:** Zustand for client state (persisted). React Query for server state.
- **Data source:** without `EXPO_PUBLIC_API_URL` the app runs fully on built-in demo data. Set the variable and the same screens talk to the backend. Nothing else changes.
- **Product images:** each product renders an illustrated packshot from `art`. Add photo URLs to a product's `images` and the app shows the photos instead.
- **Responsive:** the product grid shows 2, 3 or 4 columns by screen width. Forms are centred, and sign-in and product pages switch to split layouts on tablet and desktop.

```bash
cd frontend
npm install
npm run web        # preview in the browser
npm run typecheck
```

Demo sign-in: `demo@velorahair.ng` / `velora123`. You can also tap "Use the demo account" on the login screen.

## Backend

Modules are layered as **routes → service → repository**. Repositories currently use an in-memory store behind an interface, so moving to Postgres or MongoDB only means writing a new repository.

| Endpoint | Purpose |
| --- | --- |
| `POST /api/v1/auth/register` · `POST /auth/login` · `GET /auth/me` | Accounts (JWT) |
| `GET /api/v1/products` · `/products/:id` · `/categories` | Catalogue, with search and category filters |
| `POST /api/v1/promotions/validate` | Promo codes (`BLACKFRIDAY`, `WASHDAY`) |
| `POST /api/v1/orders` · `GET /orders` · `GET /orders/:id` | Orders. The server prices every order. |
| `PATCH /api/v1/orders/:id/status` | Admin: move an order along its delivery timeline |

Payments use a provider registry with **bank transfer**, **card (Paystack)** and **pay on delivery**. Bank transfers go straight into the account set in `PAYOUT_*` (`.env`) and, for the app's demo mode, `frontend/src/config/payments.ts`. Card payments stay switched off until a gateway key is added, so no customer can be charged by mistake.

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # http://localhost:4000
npm test
```

## Still to configure

- A card gateway (OPay Business or Paystack) to switch on card payments with automatic confirmation.
- Final product prices. The current catalogue prices are placeholders.
- Hosting for the backend, then set `EXPO_PUBLIC_API_URL` as a GitHub Actions variable.
