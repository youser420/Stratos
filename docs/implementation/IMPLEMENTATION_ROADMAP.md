# Implementation Roadmap — Website

**Source:** [ROADMAP.md](../ROADMAP.md), [MVP.md](../MVP.md), [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md)

Website-focused implementation phases. Mobile and backend phases reference product [ROADMAP.md](../ROADMAP.md) but are not fully specified here.

Phases are sequential unless noted. Completion criteria are verifiable without marketing language.

---

## Phase 1 — Project Foundation

**Goal:** Runnable project with layout shell, theme, navigation, footer, and SEO infrastructure.

**Product alignment:** Product [ROADMAP.md](../ROADMAP.md) Phase 1 (Foundation) + Phase 2 prerequisites.

### Deliverables

- [ ] Route group structure: `(marketing)`, `(auth)`, `(onboarding)` — [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md)
- [ ] `MarketingLayout` with `Header`, `Footer`, `Container`, `Section`
- [ ] Theme tokens wired per [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md)
- [ ] Root layout metadata defaults (title template, OG defaults)
- [ ] `robots.ts` and `sitemap.ts`
- [ ] `not-found.tsx` and `error.tsx`
- [ ] Cookie banner placeholder *(if required — TODO confirm)*

### Dependencies

- None (current codebase provides auth infra and ui primitives)

### Completion Criteria

- Build passes
- Marketing layout renders on placeholder home page
- Header links resolve (pages may 404 until later phases)
- Sitemap and robots accessible
- Lighthouse SEO baseline ≥ 90 on home

---

## Phase 2 — Landing Page

**Goal:** Ship home page with full conversion-oriented content.

**Product alignment:** Product Phase 2 (Marketing Website) — Home.

### Deliverables

- [ ] `/` — hero, adaptation narrative, Koach intro, social proof, Journey Board teaser, pricing teaser, final CTA
- [ ] `Hero`, `CTA`, `FeatureCard`, `Section`, `Grid` components
- [ ] Page metadata and OpenGraph
- [ ] Mobile-responsive layout

### Dependencies

- Phase 1 (layout, theme, components)

### Completion Criteria

- All Home required content from [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) present
- Primary CTA routes to `/signup`
- Secondary CTA routes to `/features` or `/download`
- Passes accessibility spot check (keyboard, contrast)

---

## Phase 3 — Marketing Pages (Core)

**Goal:** Implement remaining Must Have marketing routes.

### Deliverables

- [ ] `/features`
- [ ] `/koach`
- [ ] `/about`
- [ ] `/faq`
- [ ] `/download`
- [ ] Shared components: `FAQAccordion`, `JourneyBoardHighlight` *(if needed)*

### Dependencies

- Phase 1, Phase 2

### Completion Criteria

- Each page matches IA spec: purpose, required content, primary CTA
- All pages indexable with unique metadata
- Download page includes store badge placeholders *(TODO: real URLs when app published)*

---

## Phase 4 — Pricing

**Goal:** Ship pricing comparison page.

### Deliverables

- [ ] `/pricing` with `PricingCard` components
- [ ] Tier comparison (free vs. premium — content TODO from product)
- [ ] Billing FAQ snippet
- [ ] Note that subscription completes in mobile app

### Dependencies

- Phase 1

### Completion Criteria

- Pricing page matches [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md)
- No checkout flow on web
- CTA routes to `/signup`

---

## Phase 5 — Authentication

**Goal:** Sign up and login flows with session management and redirects.

**Product alignment:** Product Phase 3 (Authentication).

### Deliverables

- [ ] `/login` — `LoginForm` in `features/auth/`
- [ ] `/signup` — `SignUpForm`
- [ ] `/forgot-password` — Should Have
- [ ] `/verify-email` — Should Have *(if confirmed)*
- [ ] `AuthLayout`
- [ ] Post-auth redirect matrix — [WEBSITE_USER_FLOWS.md](./WEBSITE_USER_FLOWS.md)
- [ ] Middleware or layout guards for auth/onboarding state

### Dependencies

- Phase 1
- Existing Better Auth setup (`src/server/auth/`, `/api/auth/[...all]`)

### Completion Criteria

- User can sign up and log in
- Session persists across refresh
- Redirect rules match global redirect matrix
- Guest-only routes reject authenticated users appropriately

---

## Phase 6 — Onboarding

**Goal:** Multi-step web onboarding with persistence and plan confirmation.

**Product alignment:** Product Phase 4 (Onboarding).

### Deliverables

- [ ] `features/onboarding/` module
- [ ] Routes: `/onboarding/goals`, `/experience`, `/schedule`, `/equipment`, `/constraints`, `/preferences`, `/complete`
- [ ] `OnboardingLayout` with progress indicator
- [ ] Server persistence of step data *(requires backend — coordinate with product Phase 5)*
- [ ] Onboarding completion flag per user
- [ ] Plan-ready confirmation UI on `/onboarding/complete`
- [ ] Download prompt at completion

### Dependencies

- Phase 5 (authenticated users)
- Backend onboarding API *(product Phase 5 — partial parallel)*

### Completion Criteria

- User completes all steps without data loss on refresh
- Incomplete users resume at last step
- Complete users cannot re-enter onboarding without explicit restart *(TODO if restart offered)*
- Redirect to `/download` after completion
- Matches [USER_FLOW.md](../USER_FLOW.md) primary flow

---

## Phase 7 — Blog

**Goal:** Blog listing and article template for SEO and content marketing.

### Deliverables

- [ ] `/blog` — listing with `BlogCard`
- [ ] `/blog/[slug]` — article template
- [ ] Content source implementation *(blocked on ADR-014)*
- [ ] At least one published article for launch
- [ ] Article metadata and OpenGraph
- [ ] Inline and end-of-article CTAs

### Dependencies

- Phase 1
- ADR-014 decision (content source)

### Completion Criteria

- Listing and article routes render
- Article page includes author, date, related posts *(if content available)*
- Sitemap includes blog slugs
- Meets [MVP.md](../MVP.md) Must Have blog requirement

---

## Phase 8 — Community Preview

**Goal:** Curated Journey Board highlights on web.

**Priority:** Should Have ([MVP.md](../MVP.md))

### Deliverables

- [ ] `/community` page
- [ ] Curated highlight data source *(TODO)*
- [ ] Read-only display — no posting
- [ ] Sign Up CTA

### Dependencies

- Phase 1, Phase 2 (component patterns)

### Completion Criteria

- Page explains Journey Board per [GLOSSARY.md](../GLOSSARY.md)
- No full feed implementation
- Highlights render from defined data source

---

## Phase 9 — Legal, Contact, and Launch Hardening

**Goal:** Compliance pages, contact channel, and production readiness.

### Deliverables

- [ ] `/privacy`, `/terms`, `/cookies`
- [ ] `/contact` — Should Have
- [ ] Cookie consent integration
- [ ] Analytics integration *(when provider confirmed)*
- [ ] Performance audit on all Must Have routes
- [ ] Full acceptance criteria — [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md)

### Dependencies

- Phases 1–7 (Must Have pages)
- Legal copy from legal/compliance stakeholder *(TODO)*

### Completion Criteria

- All Must Have acceptance criteria pass
- Legal pages linked from footer
- Production deployment verified on Vercel
- No out-of-scope features present

---

## Dependency Graph

```
Phase 1: Foundation
    │
    ├──► Phase 2: Landing
    │         │
    │         └──► Phase 3: Marketing Pages
    │
    ├──► Phase 4: Pricing
    │
    ├──► Phase 5: Authentication
    │         │
    │         └──► Phase 6: Onboarding ──► Backend (product Phase 5)
    │
    ├──► Phase 7: Blog (ADR-014)
    │
    ├──► Phase 8: Community (Should Have)
    │
    └──► Phase 9: Legal & Launch Hardening
```

---

## Cross-Reference to Product Roadmap

| Product Phase | Website Implementation Phase |
|---------------|------------------------------|
| Phase 1 Foundation | Phase 1 |
| Phase 2 Marketing Website | Phases 2, 3, 4, 7, 8 |
| Phase 3 Authentication | Phase 5 |
| Phase 4 Onboarding | Phase 6 |
| Phase 5 Backend Platform | Supports Phase 6 (parallel) |
| Phase 6 Mobile Application | Out of scope — `/download` links only |
| Phase 7 Premium | Pricing page only; no web checkout |

---

## Out of Scope for This Roadmap

- Mobile application implementation
- Backend API specification *(future: `docs/implementation/api/`)*
- Koach AI model integration on web
- Workout logging, analytics dashboard, full Journey Board
- Premium checkout on web

---

## Open TODOs Blocking Progress

| TODO | Blocks |
|------|--------|
| ADR-014: Blog content source | Phase 7 |
| Onboarding step schema confirmation | Phase 6 |
| Legal copy delivery | Phase 9 |
| Analytics provider selection | Phase 9 |
| App store URLs | Phase 3 `/download`, Phase 6 completion |
| Email verification requirement | Phase 5 scope |
