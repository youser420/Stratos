# Project Structure

**Contract status:** Binding for all website implementation work.

**Sources:** [implementation/ENGINEERING_DECISIONS.md](../implementation/ENGINEERING_DECISIONS.md), [implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md](../implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md)

---

## Overview

Stratos uses a **feature-driven monorepo** (single Next.js application). All application code lives under `src/`. Product docs live in `docs/`. Engineering contracts live in `docs/engineering/` and `docs/implementation/`.

```
stratos/
├── docs/                    # Product + engineering documentation
├── prisma/                  # Schema and migrations (shared platform)
├── public/                  # Static assets
├── src/                     # Application source
│   ├── app/                 # Next.js App Router (routes only)
│   ├── features/            # Feature modules
│   ├── components/          # Shared UI
│   ├── server/              # Server-only infrastructure
│   ├── config/              # Configuration
│   ├── providers/           # React context providers
│   ├── hooks/               # Shared hooks
│   ├── utils/               # Pure utilities
│   ├── types/               # Shared types
│   └── lib/                 # Client-safe re-exports
├── components.json          # shadcn/ui config
├── next.config.ts
├── prisma.config.ts
├── tsconfig.json
└── package.json
```

---

## `src/app/` — Routes

**Purpose:** URL routing, layouts, metadata exports, and thin page composition.

**Rules:**

- No business logic in page files.
- No direct Prisma calls.
- Compose from `components/layouts/` and `features/*/`.
- API route handlers delegate to `server/` or Better Auth.

### Planned structure

```
src/app/
├── layout.tsx                      # Root layout (fonts, globals)
├── globals.css
├── error.tsx                       # Global error boundary
├── not-found.tsx
├── robots.ts
├── sitemap.ts
├── (marketing)/
│   ├── layout.tsx                  # MarketingLayout
│   ├── page.tsx                    # /
│   ├── features/page.tsx
│   ├── koach/page.tsx
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   ├── download/page.tsx
│   ├── community/page.tsx            # Should Have
│   ├── contact/page.tsx              # Should Have
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── cookies/page.tsx
├── (auth)/
│   ├── layout.tsx                  # AuthLayout
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   └── verify-email/page.tsx
├── (onboarding)/
│   ├── layout.tsx                  # OnboardingLayout
│   ├── onboarding/
│   │   ├── page.tsx                # Redirect to first incomplete step
│   │   ├── goals/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── schedule/page.tsx
│   │   ├── equipment/page.tsx
│   │   ├── constraints/page.tsx
│   │   ├── preferences/page.tsx
│   │   └── complete/page.tsx
└── api/
    ├── auth/[...all]/route.ts      # Better Auth (exists)
    ├── onboarding/                 # Planned — see API_BOUNDARIES.md
    └── contact/route.ts            # Planned — Should Have
```

**Never place here:** Feature services, Zod schemas, DB queries, reusable UI components.

---

## `src/features/` — Feature Modules

**Purpose:** Self-contained domain modules. Each feature owns its UI, actions, schemas, and types for its bounded context.

### Module structure (template)

```
src/features/<feature-name>/
├── components/           # Feature-scoped UI
├── hooks/                # Feature-scoped hooks
├── actions/              # Server Actions
├── schemas/              # Zod validation
├── types/                # Feature types
├── lib/                  # Feature-internal helpers (optional)
├── index.ts              # Public API barrel
└── README.md             # Optional — feature boundary notes
```

### Current and planned modules

| Module | Status | Path |
|--------|--------|------|
| `auth` | Partial | `src/features/auth/` |
| `onboarding` | Planned | `src/features/onboarding/` |
| `marketing` | Planned | `src/features/marketing/` |
| `blog` | Planned | `src/features/blog/` |
| `pricing` | Planned | `src/features/pricing/` |
| `community` | Planned | `src/features/community/` |
| `contact` | Planned | `src/features/contact/` |
| `legal` | Planned | `src/features/legal/` |
| `seo` | Planned | `src/features/seo/` |
| `analytics` | Planned | `src/features/analytics/` |

**Never place here:** Generic buttons/inputs (use `components/ui/`), cross-feature imports, raw Prisma client.

**Cross-feature rule:** Features do not import from other features. Shared code goes to `components/`, `utils/`, or `server/`.

---

## `src/components/` — Shared UI

**Purpose:** Reusable presentation components not owned by a single feature.

```
src/components/
├── ui/                   # shadcn/ui primitives (exists)
├── common/               # Composed shared components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── navigation.tsx
│   ├── cta.tsx
│   ├── feature-card.tsx
│   ├── section.tsx
│   ├── container.tsx
│   ├── grid.tsx
│   └── typography.tsx
└── layouts/
    ├── marketing-layout.tsx
    ├── auth-layout.tsx
    └── onboarding-layout.tsx
```

**Never place here:** Auth logic, API calls, onboarding step state, feature-specific forms.

---

## `src/server/` — Server Layer

**Purpose:** Server-only infrastructure. Every file or entry point imports `server-only`.

```
src/server/
├── auth/                 # Better Auth instance (exists)
├── db/                   # Prisma singleton (exists)
├── errors/               # AppError (exists)
├── http/                 # API response helpers (exists)
├── logger/               # Structured logging (exists)
├── middleware/           # Planned — auth/onboarding guards helpers
└── services/             # Planned — cross-cutting server services
    └── onboarding/       # Onboarding persistence (planned)
```

**Never place here:** React components, client hooks, `"use client"` files.

---

## `src/config/` — Configuration

**Purpose:** Static app configuration and environment validation.

```
src/config/
├── env.ts                # Server-only validated env (exists)
├── site.ts               # Site metadata (exists)
├── constants.ts          # App constants (exists)
├── navigation.ts         # Planned — nav link definitions
├── onboarding.ts         # Planned — step config
└── index.ts              # Client-safe exports only (exists)
```

**Rule:** `env.ts` is never re-exported from `index.ts`.

---

## `src/providers/` — React Providers

**Purpose:** Client-side context providers composed in root or segment layouts.

```
src/providers/
├── index.tsx             # Composes all providers
├── theme-provider.tsx    # TODO — if dark mode toggle required
└── analytics-provider.tsx # TODO — when provider confirmed
```

**Rules:**

- Providers are client components.
- Keep provider tree minimal.
- Auth session uses Better Auth client hooks — no custom SessionProvider unless required.

**Never place here:** Server logic, data fetching.

---

## `src/hooks/` — Shared Hooks

**Purpose:** React hooks used by two or more features.

```
src/hooks/
├── use-media-query.ts    # Planned
├── use-scroll-lock.ts    # Planned
└── index.ts              # Barrel (exists)
```

**Never place here:** Feature-specific hooks (keep in `features/<name>/hooks/`).

---

## `src/utils/` — Utilities

**Purpose:** Pure, stateless functions with no React or server dependencies.

```
src/utils/
├── cn.ts                 # Class merge (exists)
├── format-date.ts        # Planned
└── index.ts              # Barrel (exists)
```

**Never place here:** API calls, hooks, env access, DB access.

---

## `src/types/` — Shared Types

**Purpose:** Cross-cutting TypeScript types and interfaces.

```
src/types/
├── api.ts                # ApiResponse types (exists)
├── navigation.ts         # Planned
└── index.ts              # Barrel (exists)
```

**Never place here:** Zod schemas (use feature `schemas/`), runtime code.

---

## `src/lib/` — Client-Safe Exports

**Purpose:** Thin re-export layer for commonly used client-safe modules.

Currently re-exports `cn` from `utils/`. Do not use `lib/` as a dumping ground.

---

## `docs/` — Documentation

| Path | Audience |
|------|----------|
| `docs/` | Product, PM, design |
| `docs/implementation/` | Engineers — what to build |
| `docs/engineering/` | Engineers — how to organize and build |

Code changes that violate engineering docs require an ADR update.

---

## Naming Conventions

### Files and folders

| Item | Convention | Example |
|------|------------|---------|
| Directories | `kebab-case` | `features/onboarding/` |
| React components | `kebab-case.tsx` | `feature-card.tsx` |
| Component export | `PascalCase` | `export function FeatureCard` |
| Hooks | `use-*.ts` | `use-media-query.ts` |
| Server modules | `kebab-case.ts` | `app-error.ts` |
| Schemas | `*.schema.ts` | `signup.schema.ts` |
| Actions | `*.actions.ts` | `onboarding.actions.ts` |
| Types | `*.types.ts` or `types/index.ts` | — |
| Tests | `*.test.ts` / `*.spec.ts` | `cn.test.ts` |

### Imports

Use path aliases defined in `tsconfig.json`:

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@/server/*` | `src/server/*` |
| `@/features/*` | `src/features/*` |
| `@/config/*` | `src/config/*` |

Import order: external → `@/config` → `@/server` → `@/features` → `@/components` → `@/utils` → relative.

---

## Middleware (Planned)

```
src/middleware.ts         # Root middleware — auth/onboarding route guards
```

**Responsibilities:** Redirect matrix from [implementation/WEBSITE_USER_FLOWS.md](../implementation/WEBSITE_USER_FLOWS.md).

**TODO:** Confirm middleware vs. layout-level guard approach in [AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md).

---

## What Does Not Belong in This Repository (Website Scope)

- Mobile app source code
- Workout logging UI
- Koach chat UI
- Full analytics dashboard

These are documented as out of scope in [implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md).
