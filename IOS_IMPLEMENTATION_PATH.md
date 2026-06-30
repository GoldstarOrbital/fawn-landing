# FAWN iOS Implementation Path

## Current State

Inspected workspace on 2026-06-29:

- `fawn-landing`: static GitHub Pages marketing site with signup/login links, YouTube pitch embed, campus savings, founding member pages, and shared polish assets.
- `fawn-frontend`: single-file PWA-style app (`index.html`, `manifest.json`, `sw.js`). It is not a native iOS app and does not currently contain React Native, Expo, Swift, or Xcode project files.
- `fawn-backend`: FastAPI + SQLAlchemy API deployed on Railway. Existing routes cover auth, accounts, transactions, cards, P2P, deals, member, public stats, waitlist, Stripe webhook, Unit webhook, and funding.
- `fawn-design-system`: small React component library with FAWN tokens and components. Useful as design reference, but not directly usable in Swift without translation.
- Wix CLI app project: not found in inspected FAWN repos. The `wix:wix-app` skill is therefore not directly applicable unless FAWN intentionally becomes a Wix app extension. For iOS, Wix CLI is not the correct path.

## Recommended iOS Path

### Phase 1: Ship a Real Mobile App Shell Fast

Use Expo React Native for the first iOS implementation. It matches the current web/JS skillset, can reuse API contracts quickly, and avoids requiring a Mac/Xcode-only workflow at the beginning. Use EAS Build for TestFlight once Apple Developer access is available.

Recommended repo:

- Create `fawn-mobile` as a sibling repo or folder.
- Stack: Expo, React Native, TypeScript, Expo Router, SecureStore, React Query or TanStack Query.
- API base: `https://web-production-13d5b.up.railway.app`.
- Auth storage: `expo-secure-store` for JWT.
- Screens: onboarding, signup, login, dashboard, account, card, P2P, campus savings, settings.

### Phase 2: Backend Readiness for iOS

The backend already exposes most required routes. Before TestFlight, verify these contracts:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /accounts/dashboard`
- `GET /transactions/summary`
- `GET /cards`
- `POST /cards`
- `GET /deals/schools/{school}`
- P2P routes under `/p2p`

Recommended backend additions for mobile polish:

- `GET /mobile/bootstrap`: returns current user, account status, feature flags, school/deals summary, and app configuration in one request.
- Mobile-safe error schema: `{ code, message, recovery_action }`.
- Device/session table for future push notifications and logout-all-devices.
- Server-controlled feature flags for Add Funds, P2P, Cards, Campus Deals, Founding Member perks.

### Phase 3: App Store / TestFlight Requirements

Manual requirements:

- Apple Developer Program account.
- App name, bundle ID, privacy policy URL, support URL.
- App icon at iOS sizes.
- Privacy nutrition labels covering account data, financial info, contact info, identifiers, diagnostics.
- Clear disclosure that FAWN is not a bank and banking services are provided by FDIC-insured partner infrastructure.
- If real banking onboarding is active, confirm Unit production KYC flow and compliance language before public App Store release.

### Phase 4: Design Translation

Translate `fawn-design-system/src/tokens.css` into mobile constants:

- `green: #00c896`
- `greenDark: #00a87e`
- `bg: #080b10`
- `surface: #0e1318`
- `surface2: #161616`
- `border: #1e2730`
- `text: #e8edf2`
- `muted: #6b7a8d`
- radius: 8, 12, 16
- spacing: 4, 8, 16, 24, 48

Use WDS-style discipline for mobile even though WDS itself is not imported: segmented tabs for modes, toggles for binary fields like military status, inputs for profile fields, cards for account snapshots, and icon buttons for direct actions.

## Initial Screen Plan

1. Welcome
   - Brand statement and CTA: Create account / Log in.
2. Signup
   - Email, password, full name, phone, school, location, military status toggle.
3. Login
   - Email/password, forgot password.
4. Dashboard
   - Balance card, account status, recent transactions, quick actions.
5. Campus
   - School selector, local deals, submit deal.
6. Cards
   - Virtual card list, create card, freeze/unfreeze.
7. P2P
   - Handle setup, send/request/split.
8. Settings
   - Profile, school, location, military status, logout.

## Initial Scaffold Created

Created `C:\Users\alexg\OneDrive\Desktop\fawn-mobile` as the starting Expo React Native codebase. It includes app config, TypeScript config, FAWN theme tokens, an API client pointed at Railway, an auth provider, welcome/login/signup screens, and starter dashboard/campus/settings tabs.

Validation completed:

- `npm install` completed and generated `package-lock.json`.
- `npm run typecheck` passes.
- Login and signup now call the shared auth provider, store the returned JWT with `expo-secure-store`, and show basic loading/error states instead of routing directly to the dashboard.
- The mobile scaffold is now its own local git repo at `C:\Users\alexg\OneDrive\Desktop\fawn-mobile`, committed at `463e302 Scaffold FAWN mobile app`.

To install dependencies and run the app:

```powershell
cd C:\Users\alexg\OneDrive\Desktop\fawn-mobile
npm install
npx expo start
```

Next implementation tasks:

- Verify the backend accepts the mobile signup payload fields for school, location, and military status.
- Add `GET /mobile/bootstrap` or equivalent app-start API.
- Add real card/P2P/deal queries with loading, empty, and error states.
- Prepare EAS project, bundle ID, icon, privacy policy, and TestFlight metadata.

## Blockers

- No existing native iOS app codebase was found.
- Cannot complete TestFlight/App Store without Apple Developer account credentials and app metadata.
- Cannot use Wix CLI app workflow unless a real Wix CLI app project is introduced; current FAWN architecture does not require it.

