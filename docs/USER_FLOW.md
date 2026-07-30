# Stratos — User Flow

This document describes end-to-end user journeys across the website and mobile app. The website supports discovery, trust, account creation, and onboarding. The mobile app is where ongoing coaching lives.

---

## Primary Flow — New User

```
Landing Page
      ↓
Learn about Stratos (Features, Koach, Pricing, Community)
      ↓
Sign Up
      ↓
Complete Onboarding
      ↓
Generate Personalized Plan
      ↓
Download Mobile App
      ↓
Continue Journey in Mobile App
```

### Step-by-step

| Step | Channel | User action | Outcome |
|------|---------|-------------|---------|
| 1. Landing | Website | Arrives via search, social, referral, or ad | Understands what Stratos is in seconds |
| 2. Learn | Website | Explores Features, Koach, Pricing, Blog, Community | Builds trust; sees differentiation |
| 3. Sign Up | Website | Creates account (email or supported auth method) | Account exists; ready for onboarding |
| 4. Onboarding | Website | Completes goal, experience, schedule, preferences, constraints | Stratos has enough context to personalize |
| 5. Plan generation | Website *(assumption: preview)* | Sees confirmation that a personalized plan is ready | Motivation to download app and start |
| 6. Download | Website | Follows App Store / Play Store links | Mobile app installed |
| 7. Continue | Mobile app | Logs in, syncs account, begins workouts with Koach | Primary product experience begins |

**Note:** Plan generation may show a summary or preview on web; full workout execution, logging, and ongoing adaptation occur in the mobile app.

---

## Alternate Flow — Returning User (Not Logged In)

```
Landing Page or Login
      ↓
Login
      ↓
Redirect based on state:
  • Onboarding incomplete → Resume Onboarding
  • Onboarding complete, app not installed → Download prompt
  • Onboarding complete, app installed → Open app / deep link
```

Returning users should not repeat onboarding unless they explicitly restart their journey.

---

## Alternate Flow — Returning User (Logged In, Web)

```
Login
      ↓
Account dashboard (web) — minimal
      ↓
Primary CTA: Open / Download Mobile App
```

The website does not replace the mobile training experience. Logged-in web sessions focus on account management, download prompts, and content (blog, community highlights).

---

## Alternate Flow — Premium User

```
Mobile App (subscription active)
      ↓
Full access to premium coaching, analytics, and features
      ↓
Website: account/billing management (assumption)
```

Premium conversion is expected to occur primarily in the mobile app. The website may surface pricing and benefits but is not the main subscription surface.

**Assumption:** Subscription management may be handled in-app with optional web account settings for billing visibility.

---

## Alternate Flow — Content-Only Visitor

```
Blog or Community (Journey Board highlights)
      ↓
Read / browse
      ↓
Optional: Sign Up or Download
```

Not every visitor signs up immediately. Content paths should always offer a clear path to Sign Up or Download without forcing account creation.

---

## Alternate Flow — App-First Discovery

```
Hears about Stratos → Downloads app directly (assumption: future)
      ↓
Sign Up / Login in app
      ↓
Onboarding in app if not completed on web
```

**Assumption:** v1 may require web onboarding first; app-first onboarding could be a post-launch enhancement. See MVP.md.

---

## Flow Principles

1. **One account, two surfaces** — Website and mobile share identity and onboarding state.
2. **Web converts; app retains** — Website earns trust and completes setup; app delivers daily value.
3. **No dead ends** — Every web page has a logical next step (learn more, sign up, download).
4. **Onboarding once** — Collect essential personalization data before the first meaningful mobile session.
5. **Koach continuity** — Context from onboarding and early web interactions should inform the first mobile coaching experience.

---

## Key Handoff Points

| Handoff | From | To | Critical data |
|---------|------|-----|----------------|
| Sign up → Onboarding | Auth | Onboarding flow | User ID, auth session |
| Onboarding → Plan | Onboarding | Plan preview / confirmation | Goals, experience, preferences |
| Web → Mobile | Download page / post-onboarding | Mobile app | Account sync, initial plan, Koach context |
| Web content → Conversion | Blog / Community | Sign Up or Download | Interest signals *(future personalization assumption)* |

---

## Assumptions

- Personalized plan preview on web is sufficient to motivate download; full plan interaction requires the app.
- Deep linking from web to app will be supported for logged-in users post-launch.
- Onboarding is primarily a web flow in v1.
