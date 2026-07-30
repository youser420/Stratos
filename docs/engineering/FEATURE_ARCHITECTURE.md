# Feature Architecture

**Contract status:** Binding for all feature development.

**Sources:** [implementation/WEBSITE_COMPONENT_MAP.md](../implementation/WEBSITE_COMPONENT_MAP.md), [implementation/ENGINEERING_DECISIONS.md](../implementation/ENGINEERING_DECISIONS.md)

Each feature is a **bounded module** with a defined public API via `index.ts`. Internal files are private to the feature.

---

## Feature Index

| Feature | Priority | Route(s) |
|---------|----------|----------|
| Authentication | Must Have | `/login`, `/signup`, `/forgot-password`, `/verify-email` |
| Onboarding | Must Have | `/onboarding/*` |
| Marketing | Must Have | `/`, `/features`, `/koach`, `/about`, `/faq`, `/download` |
| Pricing | Must Have | `/pricing` |
| Blog | Must Have | `/blog`, `/blog/[slug]` |
| Community | Should Have | `/community` |
| Contact | Should Have | `/contact` |
| Legal | Must Have | `/privacy`, `/terms`, `/cookies` |
| Shared UI | Foundation | All pages |
| SEO | Foundation | Indexable routes |
| Analytics | Should Have | All routes *(provider TBD)* |

---

## Authentication

### Purpose

Account creation, login, session management, and auth UI for website and shared mobile identity.

### Responsibilities

- Sign Up and Login forms
- Password reset UI
- Email verification status UI
- Better Auth client integration
- Post-auth redirect orchestration (with middleware/layout)
- Guest-only route protection

### Dependencies

- `server/auth/` — Better Auth server instance
- `app/api/auth/[...all]/` — Auth API handler
- `components/layouts/auth-layout`
- `components/ui/*` — Form primitives

### Public API (`features/auth/index.ts`)

Export only:

- `authClient`, `signIn`, `signUp`, `signOut`, `useSession` (client)
- Auth form components when built
- Auth-related types

Do **not** export server auth instance from this barrel.

### Future Expansion

- Social sign-in (Could Have — [MVP.md](../MVP.md))
- Web account settings (Could Have)
- MFA

---

## Onboarding

### Purpose

Multi-step web flow to collect personalization data after Sign Up.

### Responsibilities

- Step UI for: goals, experience, schedule, equipment, constraints, preferences
- Progress indicator
- Step validation (Zod schemas)
- Save step data via Server Actions or API
- Completion flag and plan-ready confirmation screen
- Resume incomplete onboarding at last step

### Dependencies

- `features/auth` — authenticated user required
- `server/services/onboarding/` or `features/onboarding/actions/` — persistence
- `config/onboarding.ts` — step order and metadata
- `components/layouts/onboarding-layout`
- Backend onboarding storage ([DATABASE_BOUNDARIES.md](./DATABASE_BOUNDARIES.md))

### Public API

- `OnboardingStepForm` (or per-step components)
- `useOnboardingProgress` hook
- Server Actions: `saveOnboardingStep`, `completeOnboarding`
- Onboarding types and schemas

### Future Expansion

- Restart onboarding flow
- App-first onboarding bypass (Future — [MVP.md](../MVP.md))
- Plan preview enrichment

**TODO:** Confirm step fields with product before implementation.

---

## Marketing

### Purpose

Static and server-rendered marketing content pages that explain Stratos and drive conversion.

### Responsibilities

- Page section content composition for Home, Features, Koach, About, FAQ, Download
- Marketing copy structure (content may live in feature or CMS — TODO)
- CTA placement per [implementation/WEBSITE_INFORMATION_ARCHITECTURE.md](../implementation/WEBSITE_INFORMATION_ARCHITECTURE.md)

### Dependencies

- `components/common/*` — Hero, Section, CTA, FeatureCard, etc.
- `components/layouts/marketing-layout`
- `features/seo` — metadata helpers

### Public API

- Section components: `Hero`, `FeaturesGrid`, `KoachIntro`, etc.
- Content constants or loaders
- Page-specific metadata builders

### Future Expansion

- CMS integration
- A/B tested hero variants
- Localization

---

## Pricing

### Purpose

Display free vs. premium tier comparison. Informational only — no web checkout in v1.

### Responsibilities

- Tier definitions (content)
- `PricingCard` composition
- Billing FAQ snippet
- Copy noting subscription completes in mobile app

### Dependencies

- `components/common/pricing-card`
- `components/common/faq-accordion`
- `features/marketing` — shared Section/CTA patterns

### Public API

- `PricingSection`, `PricingTierList`
- Pricing content constants

### Future Expansion

- Deep links to in-app purchase
- Web billing portal (post-launch assumption)

---

## Blog

### Purpose

SEO content — listing and article pages.

### Responsibilities

- Article listing
- Article detail rendering
- Related posts
- Inline conversion CTAs
- Slug-based routing

### Dependencies

- Content source (ADR-014 — **TODO:** MDX, CMS, or database)
- `features/seo` — article metadata, structured data
- `components/common/blog-card`

### Public API

- `getBlogPosts()`, `getBlogPost(slug)` — data loaders
- `BlogList`, `BlogArticle` components

### Future Expansion

- Categories, tags, search, pagination
- RSS feed
- Author pages

---

## Community

### Purpose

Curated Journey Board highlights on web (read-only).

### Priority

Should Have ([MVP.md](../MVP.md))

### Responsibilities

- Explain Journey Board ([GLOSSARY.md](../GLOSSARY.md))
- Render curated highlight entries
- Sign Up CTA

### Dependencies

- Highlight data source (**TODO**)
- `components/common/journey-board-highlight`

### Public API

- `getCommunityHighlights()`
- `CommunityHighlightsSection`

### Future Expansion

- CMS-managed highlights
- Full feed remains mobile-only

---

## Contact

### Purpose

Support and business inquiry form.

### Priority

Should Have

### Responsibilities

- Contact form UI and validation
- Form submission to API or email service

### Dependencies

- `app/api/contact/` ([API_BOUNDARIES.md](./API_BOUNDARIES.md))
- Email provider (**TODO**)

### Public API

- `ContactForm` component
- `submitContactForm` Server Action or API client

### Future Expansion

- Ticketing integration (Zendesk, etc.)

---

## Legal

### Purpose

Privacy, Terms, and Cookies policy pages plus cookie consent.

### Responsibilities

- Legal page layouts
- Cookie consent banner
- Consent preference storage (localStorage/cookie)

### Dependencies

- Legal copy from compliance stakeholder (**TODO**)
- `components/common/typography`

### Public API

- `CookieConsentBanner`
- Legal content modules or MDX files

### Future Expansion

- Geo-targeted consent rules
- Consent management platform

---

## Shared UI

### Purpose

Cross-feature presentation components and layouts.

### Responsibilities

- Header, Footer, Navigation
- Layout shells (marketing, auth, onboarding)
- Generic CTA, Section, Container, Grid, Typography
- shadcn/ui primitives in `components/ui/`

### Dependencies

- `config/navigation.ts` (planned)
- `utils/cn.ts`
- Design tokens in `globals.css`

### Public API

All exports from `components/common/` and `components/layouts/`.

### Future Expansion

- Design system documentation site
- Storybook *(not in v1 scope)*

---

## SEO

### Purpose

Centralized SEO utilities for indexable routes.

### Responsibilities

- Metadata builders (title, description, OG, Twitter)
- Sitemap generation helpers
- Robots configuration helpers
- Structured data builders (**TODO** — schema types)

### Dependencies

- `config/site.ts`
- Next.js `Metadata` API

### Public API

- `buildPageMetadata(options)`
- `buildBlogPostMetadata(post)`
- `getStaticRoutes()` for sitemap

### Future Expansion

- JSON-LD for organization, articles, FAQ

---

## Analytics

### Purpose

Event tracking instrumentation.

### Status

Provider not specified — **TODO**. Do not implement until confirmed.

### Responsibilities (when enabled)

- Page view tracking
- CTA click events ([implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md))
- Consent-gated script loading
- Provider abstraction in `providers/analytics-provider.tsx`

### Dependencies

- Cookie consent (Legal feature)
- Analytics provider selection

### Public API

- `trackEvent(name, properties)`
- `AnalyticsProvider`

### Future Expansion

- Funnel analytics for signup → onboarding → download

---

## Feature Interaction Matrix

| Feature | May import from |
|---------|-----------------|
| Authentication | Shared UI, SEO, utils, types |
| Onboarding | Authentication, Shared UI, server |
| Marketing | Shared UI, SEO, utils |
| Pricing | Marketing (patterns), Shared UI |
| Blog | Shared UI, SEO |
| Community | Shared UI, Marketing |
| Contact | Shared UI |
| Legal | Shared UI |
| SEO | config only |
| Analytics | providers, config |

**No feature may import from another feature** except through documented server APIs or shared layers above.

---

## Adding a New Feature

1. Create `src/features/<name>/` using module template.
2. Add routes under appropriate `app/` route group.
3. Document in this file.
4. Update [API_BOUNDARIES.md](./API_BOUNDARIES.md) and [DATABASE_BOUNDARIES.md](./DATABASE_BOUNDARIES.md) if applicable.
5. Add ADR if boundary changes.
