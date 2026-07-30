# Website Requirements

**Source:** [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md), [MVP.md](../MVP.md), [USER_FLOW.md](../USER_FLOW.md)

---

## Purpose of the Website

The Stratos website is a **marketing, trust, and onboarding surface**. It is not the primary fitness platform.

The website must:

- Introduce Stratos and explain how it works
- Build credibility and trust
- Publish blog content
- Highlight Journey Board community content (curated)
- Allow account creation and onboarding
- Direct users to download the mobile app

**Reference:** [VISION.md](../VISION.md) — mobile-first execution; website is the front door.

---

## Primary Goals

1. Convert visitors to **Sign Up**
2. Complete **web onboarding** with sufficient personalization data
3. Drive **mobile app download** after onboarding
4. Communicate product differentiation (adaptive coaching, Koach, long-term memory)

---

## Secondary Goals

1. Support SEO via blog and structured marketing pages
2. Reduce support burden via FAQ and legal pages
3. Surface pricing expectations (conversion occurs primarily in mobile app)
4. Provide returning users a path to log in and resume onboarding or download

---

## Target Users

Derived from [USER_PERSONAS.md](../USER_PERSONAS.md):

| Persona | Website relevance |
|---------|-------------------|
| Beginner | Clear messaging; low-friction signup and onboarding |
| Intermediate | Feature depth; adaptation and analytics messaging |
| Advanced lifter | Koach credibility; no patronizing tone |
| Fat-loss user | Nutrition + training alignment messaging |
| Muscle-building user | Progressive overload and program messaging |

Website copy and IA must speak to multiple personas without requiring persona-specific routes in v1.

---

## Pages

### Must Have (v1)

Per [MVP.md](../MVP.md):

| Page | Route *(see WEBSITE_ROUTES.md)* |
|------|--------------------------------|
| Home | `/` |
| Features | `/features` |
| Koach | `/koach` |
| Pricing | `/pricing` |
| About | `/about` |
| FAQ | `/faq` |
| Download | `/download` |
| Login | `/login` |
| Sign Up | `/signup` |
| Onboarding | `/onboarding/*` |
| Blog (listing + article) | `/blog`, `/blog/[slug]` |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Cookies | `/cookies` |

### Should Have (v1)

| Page | Route |
|------|-------|
| Community | `/community` |
| Contact | `/contact` |

### Supporting Auth Routes

| Route | Priority |
|-------|----------|
| `/forgot-password` | Should Have |
| `/verify-email` | Should Have *(assumption — see MVP.md)* |

---

## Authentication

### Requirements

- Account creation on website ([MVP.md](../MVP.md))
- Login for returning users
- Shared account identity with mobile app
- Session management via existing Better Auth integration
- Redirect logic based on onboarding completion state ([USER_FLOW.md](../USER_FLOW.md))

### Post-Auth Redirect Rules

| User state | Redirect target |
|------------|-----------------|
| New signup, onboarding incomplete | `/onboarding` (first step) |
| Onboarding incomplete (returning) | Resume last onboarding step |
| Onboarding complete | `/download` or minimal logged-in landing *(TODO: confirm logged-in home route)* |
| Authenticated user visits `/login` or `/signup` | Redirect away per state |

### Out of Scope (Website Auth)

- Social sign-in *(Could Have — [MVP.md](../MVP.md))*
- Full account settings / billing UI *(Could Have / post-launch assumption)*

---

## Onboarding

### Requirements

- Multi-step web flow after Sign Up ([WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md))
- Capture: goals, experience level, schedule, equipment, injuries/constraints, nutrition preferences *(step list is product assumption)*
- Progress indicator across steps
- Persist completion state per user
- Plan-ready confirmation screen after final step
- Download app prompt at completion

### Handoff

Onboarding output must be available to:

- Initial plan generation (backend — out of website UI scope)
- Mobile app first-run experience ([USER_FLOW.md](../USER_FLOW.md))

### TODO

- [ ] Confirm exact onboarding steps and field schema with product/backend
- [ ] Confirm plan preview UI content on confirmation step

---

## Shared UI

Global elements per [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md):

- Header with primary navigation
- Footer with legal and utility links
- Site-wide CTAs: **Sign Up**, **Download App**
- Cookie consent banner *(assumption — EU/UK)*

Component responsibilities: [WEBSITE_COMPONENT_MAP.md](./WEBSITE_COMPONENT_MAP.md)

---

## SEO Requirements

### Must Have

- Unique `<title>` and meta description per marketing page
- Semantic HTML heading hierarchy
- Canonical URLs for marketing pages
- `robots.txt`
- `sitemap.xml` including public marketing and blog routes
- OpenGraph and Twitter card metadata for shareable pages

### Should Have

- Structured data for blog articles *(TODO: confirm schema type)*
- Structured data for organization *(TODO: confirm)*

### Excluded from Indexing

- `/onboarding/*`
- `/login`, `/signup`, `/forgot-password`, `/verify-email`
- Authenticated-only routes

---

## Accessibility

- WCAG 2.1 AA target for all public pages
- Keyboard navigable header, footer, forms, and modals
- Visible focus states
- Form labels, error associations, and aria attributes on interactive components
- Sufficient color contrast in light and dark modes
- Respect `prefers-reduced-motion`

Details: [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md)

---

## Performance Goals

| Metric | Target |
|--------|--------|
| Lighthouse Performance (mobile) | ≥ 90 on marketing pages |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Marketing page TTI | Perceived instant above fold |

Implementation: [WEBSITE_TECHNICAL_REQUIREMENTS.md](./WEBSITE_TECHNICAL_REQUIREMENTS.md)

---

## Analytics Placeholders

Analytics provider not specified in product docs.

### TODO — Instrumentation Events

Define provider and implement tracking for:

| Event | Trigger |
|-------|---------|
| `page_view` | Route change |
| `cta_click_signup` | Sign Up CTA |
| `cta_click_download` | Download CTA |
| `signup_complete` | Account created |
| `onboarding_step_complete` | Each onboarding step |
| `onboarding_complete` | Final onboarding step |
| `download_store_click` | App Store / Play Store badge |

---

## Out of Scope (Website)

Per [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) and [MVP.md](../MVP.md):

- Full workout logging interface
- Live Koach chat session UI
- Complete dashboard and analytics
- Full Journey Board feed and posting
- In-depth nutrition tracking
- Primary subscription purchase flow
- Full fitness platform experience

Use [GLOSSARY.md](../GLOSSARY.md) terminology when referencing these capabilities in copy only.

---

## Acceptance Criteria (Website v1)

Website v1 is complete when:

1. All **Must Have** pages are implemented and responsive
2. User can sign up, log in, and complete onboarding end-to-end
3. Onboarding completion persists and triggers download prompt
4. Legal pages (Privacy, Terms, Cookies) are published
5. Blog listing and article template render at least one article
6. SEO fundamentals (metadata, sitemap, robots) are in place
7. No in-scope page is a dead end — each has a defined next step toward Sign Up or Download
8. Out-of-scope features are not implemented on web
9. Build passes; core flows function in production environment

Launch success criteria cross-reference: [MVP.md](../MVP.md#launch-success-criteria-assumption)
