# Website Routes

**Source:** [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md), [MVP.md](../MVP.md)

Route paths follow Next.js App Router conventions under `src/app/`. This document defines **logical routes** — file structure may use route groups (e.g., `(marketing)`, `(auth)`).

**Legend**

| Column | Values |
|--------|--------|
| Auth | `Public`, `Guest only`, `Authenticated`, `Onboarding required` |
| SEO | `Index`, `No index` |
| Priority | `Must Have`, `Should Have`, `Could Have` |

---

## Marketing Routes

### `/`

| Field | Value |
|-------|-------|
| **Purpose** | Landing page; introduce Stratos and primary value proposition |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Hero`, `Section`, `FeatureCard` (summary), `CTA`, Journey Board teaser, pricing teaser |
| **Primary CTA** | Sign Up |
| **Future enhancements** | A/B tested hero variants; social proof carousel |

---

### `/features`

| Field | Value |
|-------|-------|
| **Purpose** | Explain platform capabilities at outcome level |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Section`, `FeatureCard`, `Grid`, `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | Anchor links per feature block |

---

### `/koach`

| Field | Value |
|-------|-------|
| **Purpose** | Deep-dive on AI coach — personality, memory, adaptation |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Section`, `Typography`, illustrative Koach scenarios *(static)*, `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | Interactive demo *(out of v1 scope)* |

---

### `/pricing`

| Field | Value |
|-------|-------|
| **Purpose** | Free vs. premium tier comparison |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `PricingCard`, `FAQAccordion` (snippet), `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | In-app purchase deep links |

---

### `/community`

| Field | Value |
|-------|-------|
| **Purpose** | Journey Board curated highlights; social proof |
| **Priority** | Should Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Section`, highlight cards *(TODO: component name)*, `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | CMS-driven highlights |

---

### `/blog`

| Field | Value |
|-------|-------|
| **Purpose** | Article listing for SEO and education |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `BlogCard`, `Grid`, `CTA` |
| **Primary CTA** | Sign Up (soft) |
| **Future enhancements** | Categories, tags, pagination, search |

---

### `/blog/[slug]`

| Field | Value |
|-------|-------|
| **Purpose** | Individual blog article |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Typography`, article body, author/date metadata, related posts, inline `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | Table of contents; structured data |

**TODO:** Confirm content source (MDX, CMS, database).

---

### `/about`

| Field | Value |
|-------|-------|
| **Purpose** | Mission, credibility, team/founder story |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `Section`, `Typography`, `CTA` |
| **Primary CTA** | Sign Up |
| **Future enhancements** | Careers link *(future)* |

---

### `/faq`

| Field | Value |
|-------|-------|
| **Purpose** | Pre-purchase and product FAQ |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, `FAQAccordion`, `CTA` |
| **Primary CTA** | Sign Up, Contact |
| **Future enhancements** | FAQ structured data |

---

### `/contact`

| Field | Value |
|-------|-------|
| **Purpose** | Support and business inquiries |
| **Priority** | Should Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout`, contact form, FAQ link |
| **Primary CTA** | Submit inquiry |
| **Future enhancements** | Ticketing integration |

**TODO:** Confirm form backend (email service, API route).

---

### `/download`

| Field | Value |
|-------|-------|
| **Purpose** | App Store / Play Store hub |
| **Priority** | Must Have |
| **Auth** | Public *(authenticated state may show personalized copy)* |
| **SEO** | Index |
| **Required components** | Store badges, QR code *(assumption)*, troubleshooting notes, login reminder |
| **Primary CTA** | Store links |
| **Future enhancements** | Deep links; device detection |

---

## Authentication Routes

### `/login`

| Field | Value |
|-------|-------|
| **Purpose** | Authenticate returning users |
| **Priority** | Must Have |
| **Auth** | Guest only *(redirect if authenticated)* |
| **SEO** | No index |
| **Required components** | `AuthLayout`, login form, link to Sign Up, forgot password link |
| **Post-login redirect** | Per onboarding state — see [WEBSITE_USER_FLOWS.md](./WEBSITE_USER_FLOWS.md) |
| **Future enhancements** | Social sign-in |

---

### `/signup`

| Field | Value |
|-------|-------|
| **Purpose** | Create new account |
| **Priority** | Must Have |
| **Auth** | Guest only |
| **SEO** | No index |
| **Required components** | `AuthLayout`, registration form, terms/privacy acceptance, link to Login |
| **Post-signup redirect** | `/onboarding` (first step) |
| **Future enhancements** | Social sign-in |

---

### `/forgot-password`

| Field | Value |
|-------|-------|
| **Purpose** | Initiate password recovery |
| **Priority** | Should Have |
| **Auth** | Guest only |
| **SEO** | No index |
| **Required components** | `AuthLayout`, email form, confirmation state |
| **Future enhancements** | — |

**TODO:** Confirm Better Auth password reset flow and email template ownership.

---

### `/verify-email`

| Field | Value |
|-------|-------|
| **Purpose** | Email verification confirmation / holding page |
| **Priority** | Should Have *(assumption — [MVP.md](../MVP.md))* |
| **Auth** | Authenticated or token-based |
| **SEO** | No index |
| **Required components** | `AuthLayout`, verification status message, resend action |
| **Future enhancements** | — |

**TODO:** Confirm whether email verification is required before onboarding in v1.

---

## Onboarding Routes

Base path: `/onboarding`. User must be **Authenticated**. Incomplete onboarding users are redirected here from protected routes.

**TODO:** Confirm step order and field schema with product/backend.

### `/onboarding`

| Field | Value |
|-------|-------|
| **Purpose** | Entry / redirect to first incomplete step |
| **Auth** | Authenticated; onboarding incomplete |
| **SEO** | No index |
| **Required components** | Onboarding shell, progress indicator, redirect logic |

---

### `/onboarding/goals`

| Field | Value |
|-------|-------|
| **Purpose** | Capture fitness goals (e.g., fat loss, muscle building, general fitness) |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form, progress indicator, next/back |

---

### `/onboarding/experience`

| Field | Value |
|-------|-------|
| **Purpose** | Capture training experience level |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form |

---

### `/onboarding/schedule`

| Field | Value |
|-------|-------|
| **Purpose** | Capture training days / availability |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form |

---

### `/onboarding/equipment`

| Field | Value |
|-------|-------|
| **Purpose** | Capture available equipment |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form |

---

### `/onboarding/constraints`

| Field | Value |
|-------|-------|
| **Purpose** | Capture injuries, limitations, medical constraints |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form |

---

### `/onboarding/preferences`

| Field | Value |
|-------|-------|
| **Purpose** | Capture nutrition and training preferences |
| **Auth** | Authenticated |
| **SEO** | No index |
| **Required components** | Onboarding shell, step form |

---

### `/onboarding/complete`

| Field | Value |
|-------|-------|
| **Purpose** | Plan-ready confirmation; download prompt |
| **Auth** | Authenticated; onboarding complete |
| **SEO** | No index |
| **Required components** | Confirmation message, plan preview summary *(TODO: content)*, Download CTA |
| **Primary CTA** | Download App |

---

## Legal Routes

### `/privacy`

| Field | Value |
|-------|-------|
| **Purpose** | Privacy Policy |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | `MarketingLayout` or minimal legal layout, `Typography` |

---

### `/terms`

| Field | Value |
|-------|-------|
| **Purpose** | Terms of Service |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | Legal layout, `Typography` |

---

### `/cookies`

| Field | Value |
|-------|-------|
| **Purpose** | Cookie policy and consent reference |
| **Priority** | Must Have |
| **Auth** | Public |
| **SEO** | Index |
| **Required components** | Legal layout, cookie categories, consent banner integration |

---

## API Routes (Existing)

### `/api/auth/[...all]`

| Field | Value |
|-------|-------|
| **Purpose** | Better Auth handler |
| **Status** | Implemented |
| **Reference** | `src/app/api/auth/[...all]/route.ts`, `src/server/auth/` |

Not a page route — excluded from sitemap and marketing IA.

---

## Routes Explicitly Not Required (v1)

| Route | Reason |
|-------|--------|
| `/dashboard` | Dashboard is mobile-only ([GLOSSARY.md](../GLOSSARY.md)) |
| `/workouts/*` | Workout logging is mobile-only |
| `/koach/chat` | Live Koach is mobile-only |
| `/account/settings` | Could Have — post-launch assumption |

---

## Route Group Recommendation

| Group | Routes | Layout |
|-------|--------|--------|
| `(marketing)` | `/`, `/features`, `/koach`, `/pricing`, etc. | `MarketingLayout` |
| `(auth)` | `/login`, `/signup`, `/forgot-password`, `/verify-email` | `AuthLayout` |
| `(onboarding)` | `/onboarding/*` | `OnboardingLayout` |
| `(legal)` | `/privacy`, `/terms`, `/cookies` | Legal or marketing layout |

**TODO:** Confirm route group naming with team. Groups do not affect URL paths.

---

## Sitemap Inclusion

**Include:** All public marketing, blog, legal, `/download`

**Exclude:** Auth, onboarding, API routes
