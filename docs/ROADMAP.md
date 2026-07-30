# Stratos — Product Roadmap

Development phases from foundation through premium features. Phases are sequential unless noted. Dependencies indicate what must exist before the next phase can start.

**Timeline note:** Durations are not estimated here — only logical order and dependencies. *(Assumption: team size and velocity will determine dates.)*

---

## Phase 1 — Foundation

**Goal:** Establish project infrastructure, architecture, and deployment pipeline.

**Deliverables**

- Repository, environments, and deployment (e.g., Vercel for web)
- Core architecture (feature-driven structure, server/client boundaries)
- Database and ORM setup
- Environment configuration and validation
- CI/CD and build verification
- Product documentation (`/docs`) as source of truth

**Dependencies:** None — starting point.

**Unlocks:** All subsequent phases.

---

## Phase 2 — Marketing Website

**Goal:** Ship a credible public website that explains Stratos and drives signups.

**Deliverables**

- Home, Features, Koach, Pricing, About, FAQ, Download pages
- Blog (listing + article template)
- Community page (highlights / placeholder if content not ready)
- Legal pages: Privacy, Terms, Cookies
- Responsive design, SEO basics
- Primary CTAs: Sign Up, Download

**Dependencies**

- Phase 1 (Foundation) — hosting, repo, design system baseline

**Unlocks:** Phase 3 (Authentication), public brand presence.

---

## Phase 3 — Authentication

**Goal:** Allow users to create accounts and log in on the website (and prepare for mobile).

**Deliverables**

- Sign Up and Login flows
- Session management
- Password recovery *(Should Have for launch)*
- Auth integration with backend user records
- Redirect logic for authenticated vs. anonymous users

**Dependencies**

- Phase 1 (Foundation) — database, auth provider setup
- Phase 2 (Marketing Website) — pages to embed auth flows

**Unlocks:** Phase 4 (Onboarding).

---

## Phase 4 — Onboarding

**Goal:** Collect personalization data and confirm initial plan readiness.

**Deliverables**

- Multi-step onboarding flow on web
- Goal, experience, schedule, equipment, constraints capture
- Onboarding completion state
- Plan-ready confirmation screen
- Download app prompt at end of flow

**Dependencies**

- Phase 3 (Authentication) — user must be logged in
- Phase 5 (Backend Platform) — partial; onboarding data storage must exist *(may run in parallel with early Phase 5)*

**Unlocks:** Meaningful mobile app first-run experience.

---

## Phase 5 — Backend Platform

**Goal:** Power user data, workouts, coaching context, and app sync.

**Deliverables**

- User profile and onboarding data APIs
- Workout and routine models and services
- Session logging endpoints
- Initial plan generation from onboarding inputs
- Koach integration layer (context injection, conversation storage)
- Subscription tier state *(assumption)*

**Dependencies**

- Phase 1 (Foundation)
- Phase 3 (Authentication) — user identity

**Unlocks:** Phase 6 (Mobile Application), Phase 4 completion (plan generation).

**Parallel work:** Can begin core backend work alongside Phase 2–3; full plan generation requires onboarding schema from Phase 4.

---

## Phase 6 — Mobile Application

**Goal:** Deliver the primary Stratos experience — training, Koach, logging, analytics.

**Deliverables**

- iOS and Android apps *(or cross-platform — assumption)*
- Login with web-created account
- Personalized workout routines
- Workout logging
- Koach AI coach
- Dashboard and basic analytics
- Progressive overload tracking
- Recovery recommendations *(Should Have)*
- Nutrition guidance *(Should Have)*
- App store submission and download links on web

**Dependencies**

- Phase 3 (Authentication) — shared identity
- Phase 4 (Onboarding) — initial user context
- Phase 5 (Backend Platform) — workouts, logging, Koach APIs

**Unlocks:** Public mobile launch, Phase 7 (Premium).

---

## Phase 7 — Premium Features

**Goal:** Monetize through subscription and deepen coaching value.

**Deliverables**

- Premium tier definition (aligned with Pricing page)
- In-app subscription flow
- Premium-gated features *(assumption: advanced analytics, deeper Koach memory, enhanced adaptation)*
- Journey Board (full mobile experience) *(Could Have / Future overlap)*
- Community features in app *(Future overlap)*
- Wrapped / milestone experiences *(Future)*

**Dependencies**

- Phase 6 (Mobile Application) — core app and user base
- Phase 5 (Backend Platform) — subscription and entitlements

**Unlocks:** Revenue growth, retention features.

---

## Dependency Overview

```
Phase 1: Foundation
    │
    ├──► Phase 2: Marketing Website
    │         │
    │         └──► Phase 3: Authentication
    │                   │
    │                   ├──► Phase 4: Onboarding ◄──┐
    │                   │                           │
    └──► Phase 5: Backend Platform ─────────────────┘
              │
              └──► Phase 6: Mobile Application
                        │
                        └──► Phase 7: Premium Features
```

---

## Cross-Phase Workstreams

These span multiple phases and should be planned continuously:

| Workstream | Phases |
|------------|--------|
| Product & design | All |
| Koach AI quality & safety | 5, 6, 7 |
| Analytics & instrumentation | 2, 6, 7 |
| Legal & compliance | 2, 3, 7 |
| Content (blog, community highlights) | 2, 6, 7 |
| App Store / Play Store ops | 6 |

---

## Milestone Gates

| Milestone | Phases complete | User-visible outcome |
|-----------|-----------------|----------------------|
| **Public website** | 1, 2 | Stratos is explainable and discoverable |
| **Account ready** | 1, 2, 3 | Users can sign up and log in |
| **Onboarding ready** | 1–4, 5 (partial) | Personalized setup complete on web |
| **Mobile beta** | 1–6 | Core coaching works in app |
| **Public launch** | 1–6 (Must Have + key Should Have) | Web + app available to all |
| **Premium launch** | 7 | Subscription revenue enabled |

---

## Assumptions

- Phases 4 and 5 overlap in practice — backend onboarding APIs can be built while web onboarding UI is in progress.
- Mobile development (Phase 6) is the longest phase and may start UI prototyping earlier against mock APIs.
- Premium (Phase 7) follows public launch, not a simultaneous v1 requirement.
