# Website Component Map

**Source:** [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md), [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md)

This document defines **reusable component responsibilities**. It does not specify implementation, props, or file paths beyond architectural placement guidance.

---

## Placement Conventions

| Location | Responsibility |
|----------|----------------|
| `src/components/ui/` | shadcn/ui primitives — unstyled or minimally composed |
| `src/components/common/` | Shared marketing and app-agnostic components |
| `src/components/layouts/` | Page shells, header, footer wrappers |
| `src/features/<feature>/components/` | Feature-scoped components (e.g., auth forms, onboarding steps) |

Do not place feature-specific logic in `components/common/`.

---

## Layout Components

### `MarketingLayout`

**Responsibility:** Shell for public marketing pages.

**Includes:** Header, Footer, main content slot, optional cookie banner slot.

**Used on:** `/`, `/features`, `/koach`, `/pricing`, `/about`, `/faq`, `/blog`, `/community`, `/contact`, `/download`, legal pages.

**Must not:** Fetch user workout data; render authenticated app features.

---

### `AuthLayout`

**Responsibility:** Centered, minimal shell for authentication pages.

**Includes:** Logo, compact header or back link, form slot, legal microcopy area.

**Used on:** `/login`, `/signup`, `/forgot-password`, `/verify-email`.

**Must not:** Include full marketing navigation.

---

### `OnboardingLayout`

**Responsibility:** Shell for multi-step onboarding flow.

**Includes:** Progress indicator, step content slot, next/back actions, minimal branding.

**Used on:** `/onboarding/*`.

**Must not:** Include marketing footer distractions.

---

## Navigation Components

### `Header`

**Responsibility:** Primary site navigation and utility actions.

**Includes:**

- Logo → `/`
- Nav links: Home, Features, Koach, Pricing, Community, Blog, About
- Utility: Login, Sign Up, Download

**Behavior:**

- Responsive collapse (mobile menu)
- Active route indication
- Authenticated state: TODO — confirm nav changes for logged-in users

**Must not:** Contain page-specific content.

---

### `Footer`

**Responsibility:** Secondary navigation and legal links.

**Includes:**

- Privacy, Terms, Cookies, Contact, FAQ
- Social links *(assumption)*
- Copyright

**Must not:** Duplicate primary CTAs excessively.

---

### `Navigation`

**Responsibility:** Nav link list used by Header (desktop and mobile variants).

**Must not:** Implement auth logic directly — receives auth state via props or composition.

---

## Conversion Components

### `CTA`

**Responsibility:** Reusable call-to-action block.

**Variants:** Sign Up, Download App, Learn More.

**Includes:** Headline, supporting copy, primary button, optional secondary button.

**Used on:** Most marketing pages and blog articles.

**Must not:** Hardcode route-specific copy — accept content via props or CMS.

---

### `PricingCard`

**Responsibility:** Display a single pricing tier.

**Includes:** Tier name, price, feature list, CTA button.

**Used on:** `/pricing`.

**TODO:** Confirm tier count and feature list source.

---

## Content Components

### `FeatureCard`

**Responsibility:** Single product capability highlight.

**Includes:** Icon or visual, title, description.

**Used on:** `/`, `/features`.

**Must not:** Link to in-app features on web.

---

### `BlogCard`

**Responsibility:** Blog post preview in listing grids.

**Includes:** Title, excerpt, date, optional author, link to `/blog/[slug]`.

**Used on:** `/blog`.

---

### `FAQAccordion`

**Responsibility:** Expandable question/answer list.

**Used on:** `/faq`, optionally `/pricing`.

**Must not:** Be the sole FAQ surface if page-level FAQ content differs.

---

### `Testimonials`

**Responsibility:** Social proof quotes or user stories.

**Used on:** `/` *(assumption — Home required content mentions social proof)*.

**TODO:** Confirm if dedicated component needed or section-level content.

---

### `JourneyBoardHighlight`

**Responsibility:** Curated Journey Board entry for web display.

**Includes:** User milestone summary, optional image, link to Sign Up or Community.

**Used on:** `/`, `/community`.

**Must not:** Implement full Journey Board feed.

**TODO:** Confirm data source for curated highlights.

---

## Structural Components

### `Section`

**Responsibility:** Vertical page section with consistent spacing and optional background variant.

**Includes:** Inner `Container`, optional section heading, children slot.

**Used on:** All marketing pages.

---

### `Container`

**Responsibility:** Max-width wrapper with horizontal padding.

**Must not:** Define page-specific layout logic.

---

### `Grid`

**Responsibility:** Responsive grid for cards and feature blocks.

**Used on:** Features, blog listing, community highlights, pricing.

---

## Typography Components

### `Typography`

**Responsibility:** Consistent heading and body text styles.

**Variants:** `h1`–`h4`, body, lead, muted, label.

**Rules:** See [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md).

**Must not:** Inline arbitrary font sizes in page files when a variant exists.

---

## Form Components

Form primitives come from `src/components/ui/` (Input, Button, Textarea, etc.).

Feature-specific forms belong in `src/features/`.

### `LoginForm`

**Location:** `src/features/auth/components/` *(planned)*

**Responsibility:** Email/password login, validation, error display, submit to Better Auth client.

**Must not:** Live in `components/common/`.

---

### `SignUpForm`

**Location:** `src/features/auth/components/` *(planned)*

**Responsibility:** Registration fields, terms acceptance, submit, redirect to onboarding.

---

### `ForgotPasswordForm`

**Location:** `src/features/auth/components/` *(planned)*

**Responsibility:** Email capture for password reset.

---

### `ContactForm`

**Location:** `src/features/contact/components/` or `src/components/common/` *(TODO: confirm feature boundary)*

**Responsibility:** Name, email, message, submit.

---

### `OnboardingStepForm`

**Location:** `src/features/onboarding/components/` *(planned)*

**Responsibility:** Generic step wrapper with validation, save progress, navigation.

**Must not:** Combine all steps in one component.

---

## UI Primitives (Existing)

Located in `src/components/ui/`. Managed by shadcn/ui.

| Component | Use on website |
|-----------|----------------|
| `Button` | CTAs, forms, navigation actions |
| `Input` | Auth and contact forms |
| `Textarea` | Contact form |
| `Card` | Feature cards, pricing, blog previews |
| `Dialog` / `Sheet` | Mobile navigation *(assumption)* |
| `Badge` | Labels, tags |
| `Avatar` | Blog authors, community highlights |

Do not modify ui primitives for page-specific behavior — compose in common/feature components.

---

## Components Not Required (v1)

| Component | Reason |
|-----------|--------|
| `WorkoutLogger` | Mobile-only |
| `KoachChat` | Mobile-only |
| `AnalyticsDashboard` | Mobile-only |
| `SubscriptionCheckout` | Primary flow is in-app |

---

## Component Creation Checklist

Before adding a component:

1. Is it used on more than one page? → `components/common/`
2. Is it feature-specific? → `features/<feature>/components/`
3. Is it a primitive? → `components/ui/` via shadcn
4. Is it a layout shell? → `components/layouts/`
