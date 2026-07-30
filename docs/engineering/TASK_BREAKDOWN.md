# Task Breakdown — Website MVP

**Contract status:** Work items for website implementation through v1 launch.

**Sources:** [implementation/IMPLEMENTATION_ROADMAP.md](../implementation/IMPLEMENTATION_ROADMAP.md), [WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md)

**Complexity:** S (< 2h) · M (2–8h) · L (1–2 days)

**Status key:** `[ ]` Not started · `[~]` In progress · `[x]` Done

---

## Phase 1 — Project Foundation

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-001 | Create route groups `(marketing)`, `(auth)`, `(onboarding)` under `src/app/` | — | S | Folder structure matches [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md); build passes |
| WEB-002 | Create `src/providers/index.tsx` and wire in root layout | WEB-001 | S | Provider tree renders; no client errors |
| WEB-003 | Create `config/navigation.ts` with primary and footer links | — | S | Links match [WEBSITE_ROUTES.md](../implementation/WEBSITE_ROUTES.md) |
| WEB-004 | Implement `Container` component | — | S | Max-width + padding; used in one test page |
| WEB-005 | Implement `Section` component | WEB-004 | S | Vertical spacing per design system |
| WEB-006 | Implement `Grid` component | WEB-004 | S | Responsive columns |
| WEB-007 | Implement `Typography` variants component | — | S | h1–h4, body, muted variants |
| WEB-008 | Implement `Header` + `Navigation` | WEB-003 | M | Desktop + mobile nav; links work |
| WEB-009 | Implement `Footer` | WEB-003 | S | Legal and nav links present |
| WEB-010 | Implement `MarketingLayout` | WEB-008, WEB-009 | M | Wraps marketing pages; skip-to-content link |
| WEB-011 | Implement `AuthLayout` | WEB-001 | S | Centered shell for auth pages |
| WEB-012 | Implement `OnboardingLayout` with progress placeholder | WEB-001 | M | Progress indicator slot; minimal branding |
| WEB-013 | Add root layout metadata template (`title`, default OG) | — | S | `%s \| Stratos` pattern; TODO confirm exact format |
| WEB-014 | Create `src/app/not-found.tsx` | — | S | Branded 404 with link home |
| WEB-015 | Create `src/app/error.tsx` | — | S | Client error boundary with retry |
| WEB-016 | Create `src/app/robots.ts` | — | S | Disallows auth/onboarding/API |
| WEB-017 | Create `src/app/sitemap.ts` with static routes | WEB-003 | S | All public marketing routes listed |
| WEB-018 | Create `features/seo/` with `buildPageMetadata()` helper | WEB-013 | M | Returns Next.js `Metadata` object |
| WEB-019 | Add cookie consent banner placeholder in `features/legal/` | WEB-010 | M | Banner renders; accept stores preference — copy TODO |
| WEB-020 | Create `.env.example` with required variables | — | S | Documents all vars from [DEPLOYMENT.md](./DEPLOYMENT.md) |
| WEB-021 | Phase 1 QA: build, lint, layout smoke test | WEB-001–020 | S | `npm run build` passes; header/footer on `/` |

---

## Phase 2 — Landing Page

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-022 | Create `features/marketing/` module scaffold | WEB-010 | S | Folder + index.ts |
| WEB-023 | Implement `Hero` component | WEB-005, WEB-007 | M | Value prop, primary + secondary CTA |
| WEB-024 | Implement `CTA` component (reusable) | WEB-007 | S | Variants: signup, download, learn-more |
| WEB-025 | Implement `FeatureCard` component | WEB-006 | S | Icon, title, description |
| WEB-026 | Build Home page hero section | WEB-023 | M | Primary CTA → `/signup` |
| WEB-027 | Build adaptation narrative section | WEB-005, WEB-025 | M | How Stratos adapts over time |
| WEB-028 | Build Koach intro section on Home | WEB-005 | M | Static Koach explanation; link to `/koach` |
| WEB-029 | Build social proof section | WEB-005 | M | Placeholder or testimonial content — TODO copy |
| WEB-030 | Build Journey Board teaser section | WEB-005 | M | Teaser + link; full feed not implemented |
| WEB-031 | Build pricing teaser section | WEB-005 | S | Teaser + link to `/pricing` |
| WEB-032 | Build final CTA block | WEB-024 | S | Sign Up CTA at page bottom |
| WEB-033 | Home page metadata and OpenGraph | WEB-018 | S | Unique title, description, OG tags |
| WEB-034 | Move `/` into `(marketing)/page.tsx` | WEB-010, WEB-026–032 | S | Home uses MarketingLayout |
| WEB-035 | Phase 2 QA: Home responsive + a11y spot check | WEB-034 | S | Keyboard nav; mobile layout; Lighthouse SEO ≥ 90 |

---

## Phase 3 — Core Marketing Pages

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-036 | `/features` page with feature grid | WEB-025, WEB-024 | M | All MVP feature outcomes listed per IA |
| WEB-037 | `/koach` page — static deep-dive | WEB-005, WEB-024 | M | Coaching philosophy; no live chat |
| WEB-038 | `/about` page | WEB-005, WEB-024 | S | Mission summary; team placeholder if copy TODO |
| WEB-039 | Implement `FAQAccordion` component | — | M | Accessible expand/collapse |
| WEB-040 | `/faq` page | WEB-039, WEB-024 | M | Product, Koach, onboarding, pricing FAQs |
| WEB-041 | `/download` page with store badge placeholders | WEB-024 | M | Store links; login reminder; troubleshooting copy |
| WEB-042 | Metadata for features, koach, about, faq, download | WEB-018 | S | Unique metadata each route |
| WEB-043 | Phase 3 QA: all pages linked from nav | WEB-036–042 | S | No 404 from header links |

---

## Phase 4 — Pricing

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-044 | Create `features/pricing/` module | — | S | Module scaffold |
| WEB-045 | Implement `PricingCard` component | WEB-006 | M | Tier name, features, CTA |
| WEB-046 | Define pricing tier content constants | — | S | Free vs premium — TODO product copy |
| WEB-047 | `/pricing` page | WEB-045, WEB-046, WEB-039 | M | Tier comparison; billing FAQ snippet; no checkout |
| WEB-048 | Pricing page metadata | WEB-018 | S | OG + description |
| WEB-049 | Phase 4 QA: pricing CTA → signup | WEB-047 | S | Verified |

---

## Phase 5 — Authentication

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-050 | Create auth Zod schemas (signup, login, forgot) | — | S | Schemas in `features/auth/schemas/` |
| WEB-051 | Implement `LoginForm` client component | WEB-050, WEB-011 | M | Validates; calls `signIn`; shows errors |
| WEB-052 | Implement `SignUpForm` client component | WEB-050, WEB-011 | M | Terms checkbox; calls `signUp` |
| WEB-053 | `/login` page | WEB-051 | S | Guest-only; links to signup and forgot |
| WEB-054 | `/signup` page | WEB-052 | S | Guest-only; redirects to onboarding on success |
| WEB-055 | Implement `ForgotPasswordForm` | WEB-050 | M | Email submit via Better Auth |
| WEB-056 | `/forgot-password` page | WEB-055 | S | Should Have complete |
| WEB-057 | `/verify-email` status page | WEB-011 | M | Pending/success/expired states — TODO if verification required |
| WEB-058 | Implement `src/middleware.ts` redirect matrix | WEB-053, WEB-054 | L | Matches [AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md) |
| WEB-059 | Auth route metadata (noindex) | WEB-018 | S | login, signup not indexed |
| WEB-060 | Phase 5 QA: signup → session → onboarding redirect | WEB-054, WEB-058 | M | E2E-02 ready |

---

## Phase 6 — Onboarding

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-061 | Create `features/onboarding/` module scaffold | — | S | Folder structure per feature template |
| WEB-062 | Define onboarding step config in `config/onboarding.ts` | — | S | Step order matches routes — TODO field schema |
| WEB-063 | Design onboarding DB ownership and migration | WEB-061 | M | Document updated; migration applied — see [DATABASE_BOUNDARIES.md](./DATABASE_BOUNDARIES.md) |
| WEB-064 | Implement onboarding service (server) | WEB-063 | L | CRUD onboarding profile by userId |
| WEB-065 | Implement onboarding Zod schemas per step | WEB-062 | M | One schema per step |
| WEB-066 | Implement `saveOnboardingStep` Server Action | WEB-064, WEB-065 | M | Validates and persists |
| WEB-067 | Implement `completeOnboarding` Server Action | WEB-064 | M | Sets complete; triggers plan gen hook — TODO backend |
| WEB-068 | Implement progress indicator component | WEB-012 | M | Shows current/total steps |
| WEB-069 | `/onboarding/goals` step page | WEB-066, WEB-068 | M | Saves and navigates forward |
| WEB-070 | `/onboarding/experience` step page | WEB-066 | M | Complete |
| WEB-071 | `/onboarding/schedule` step page | WEB-066 | M | Complete |
| WEB-072 | `/onboarding/equipment` step page | WEB-066 | M | Complete |
| WEB-073 | `/onboarding/constraints` step page | WEB-066 | M | Complete |
| WEB-074 | `/onboarding/preferences` step page | WEB-066 | M | Complete |
| WEB-075 | `/onboarding/complete` confirmation page | WEB-067, WEB-024 | M | Plan-ready message; download CTA |
| WEB-076 | `/onboarding` index redirect to first incomplete step | WEB-064 | S | Resume logic works |
| WEB-077 | Middleware: block complete users from onboarding routes | WEB-058, WEB-067 | S | Redirect to `/download` |
| WEB-078 | Phase 6 QA: full onboarding flow E2E-03 | WEB-069–077 | L | Data persists on refresh; resume works |

---

## Phase 7 — Blog

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-079 | Resolve ADR-014: select blog content source | — | M | ADR updated; approach documented |
| WEB-080 | Create `features/blog/` module | WEB-079 | S | Module scaffold |
| WEB-081 | Implement `BlogCard` component | WEB-006 | S | Title, excerpt, date, link |
| WEB-082 | Implement blog data loader (`getBlogPosts`) | WEB-079 | M | Returns post list |
| WEB-083 | `/blog` listing page | WEB-081, WEB-082 | M | Renders ≥1 post |
| WEB-084 | Implement `getBlogPost(slug)` loader | WEB-079 | M | Single post fetch |
| WEB-085 | `/blog/[slug]` article page | WEB-084, WEB-024 | M | Author, date, body, CTAs |
| WEB-086 | Blog metadata + OG per article | WEB-018 | S | Dynamic metadata |
| WEB-087 | Add blog slugs to sitemap | WEB-017, WEB-082 | S | Sitemap includes posts |
| WEB-088 | Phase 7 QA: blog navigation E2E-09 | WEB-083, WEB-085 | S | Listing → article works |

---

## Phase 8 — Community (Should Have)

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-089 | Create `features/community/` module | — | S | Module scaffold |
| WEB-090 | Define highlight data source (static or API) | WEB-089 | M | TODO confirmed with product |
| WEB-091 | Implement `JourneyBoardHighlight` component | WEB-006 | M | Read-only highlight card |
| WEB-092 | `/community` page | WEB-091, WEB-024 | M | Explains Journey Board; shows highlights |
| WEB-093 | Community page metadata | WEB-018 | S | Indexable |
| WEB-094 | Phase 8 QA: community page renders | WEB-092 | S | No posting UI present |

---

## Phase 9 — Legal, Contact, Launch

| ID | Description | Deps | Size | Definition of Done |
|----|-------------|------|------|-------------------|
| WEB-095 | Create `features/legal/` content modules | — | M | Privacy, Terms, Cookies copy — TODO legal review |
| WEB-096 | `/privacy` page | WEB-095, WEB-010 | S | Published |
| WEB-097 | `/terms` page | WEB-095, WEB-010 | S | Published |
| WEB-098 | `/cookies` page | WEB-095, WEB-010 | S | Published |
| WEB-099 | Finalize cookie consent integration | WEB-019, WEB-098 | M | Consent gates analytics when enabled |
| WEB-100 | Create `features/contact/` module | — | S | Module scaffold |
| WEB-101 | Contact form schema + `ContactForm` component | WEB-100 | M | Validation |
| WEB-102 | `POST /api/contact` or Server Action | WEB-101 | M | Submits successfully — TODO email provider |
| WEB-103 | `/contact` page | WEB-101, WEB-102 | M | Should Have complete |
| WEB-104 | Production env vars configured in Vercel | WEB-020 | S | Per [DEPLOYMENT.md](./DEPLOYMENT.md) |
| WEB-105 | Production migrations deployed | WEB-063 | S | `prisma migrate deploy` success |
| WEB-106 | Full manual QA checklist | All | L | [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) pre-release |
| WEB-107 | Lighthouse audit on core routes | WEB-106 | M | Performance + SEO ≥ 90 |
| WEB-108 | MVP launch sign-off | WEB-106, WEB-107 | S | All Must Have acceptance criteria met |

---

## Dependency Graph (Phases)

```
WEB-001–021 (Phase 1)
    ├── WEB-022–035 (Phase 2)
    ├── WEB-036–043 (Phase 3)
    ├── WEB-044–049 (Phase 4)
    ├── WEB-050–060 (Phase 5)
    │       └── WEB-061–078 (Phase 6)
    ├── WEB-079–088 (Phase 7) — blocked on WEB-079 ADR
    ├── WEB-089–094 (Phase 8)
    └── WEB-095–108 (Phase 9)
```

---

## Parallel Work Opportunities

| Can run in parallel | After |
|---------------------|-------|
| WEB-036–041 (marketing pages) | Phase 1 |
| WEB-044–049 (pricing) | Phase 1 |
| WEB-079–088 (blog) | Phase 1 + ADR-014 |
| WEB-095–098 (legal) | Phase 1 |
| WEB-050–057 (auth UI) | Phase 1 |

Onboarding (Phase 6) requires auth (Phase 5) and DB schema (WEB-063).

---

## Out of Scope (No Tasks)

- Workout logging UI
- Koach chat UI
- Web subscription checkout
- Mobile app
- Full Journey Board feed
- Newsletter *(not in MVP)*

---

## Task Tracking

Move task status in this document or external tracker. Reference task IDs in commit messages and PR titles.

When a task completes, verify definition of done before marking `[x]`.

---

## Open Blockers

| Blocker | Tasks affected |
|---------|----------------|
| ADR-014 blog content source | WEB-079–088 |
| Onboarding field schema | WEB-062, WEB-065, WEB-069–074 |
| Legal copy | WEB-095–098 |
| Email provider | WEB-102, WEB-055, WEB-057 |
| Analytics provider | WEB-099 |
| App store URLs | WEB-041, WEB-075 |
| Production domain | WEB-104 |
