# Engineering Decisions (ADR Log)

Architecture Decision Records derived from existing product documentation and current codebase. Status reflects decisions **already implied** by product specs — not open proposals.

Format: **ADR-NNN — Title**

---

## ADR-001 — Website Is Marketing-First

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [VISION.md](../VISION.md), [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) |
| **Context** | Stratos is mobile-first. The website must not become the primary fitness platform. |
| **Decision** | The website is limited to marketing, trust, content, auth, onboarding, and download. |
| **Impact** | No workout logging, Koach chat, full analytics, or Journey Board feed on web. |
| **Consequences** | Engineering effort focuses on conversion and onboarding, not training UX. |

---

## ADR-002 — Mobile App Is Primary Product Surface

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [VISION.md](../VISION.md), [MVP.md](../MVP.md) |
| **Context** | Training happens in daily life contexts best served by mobile. |
| **Decision** | Full coaching features (workouts, Koach, dashboard, logging) ship in mobile app only. |
| **Impact** | Website CTAs drive download; web does not replicate app feature set. |

---

## ADR-003 — Web Onboarding Before Mobile First-Run

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [USER_FLOW.md](../USER_FLOW.md), [MVP.md](../MVP.md) |
| **Context** | Personalization data must exist before meaningful mobile sessions. |
| **Decision** | v1 onboarding is a web flow after Sign Up. |
| **Impact** | Onboarding routes, state, and persistence are website engineering requirements. |
| **Assumption** | App-first onboarding is explicitly future — [MVP.md](../MVP.md) Could Have / Future. |

---

## ADR-004 — Shared Backend, Shared Identity

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [USER_FLOW.md](../USER_FLOW.md), [MVP.md](../MVP.md) |
| **Context** | One account must work on web and mobile. |
| **Decision** | Single auth system (Better Auth) and user record shared across surfaces. |
| **Impact** | Avoid duplicate auth logic. Mobile auth must consume same identity provider. |
| **Consequences** | Auth configuration lives in `src/server/auth/`; not reimplemented per surface. |

---

## ADR-005 — Feature-Driven Code Organization

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current codebase structure |
| **Context** | SaaS products require modular boundaries as features grow. |
| **Decision** | Organize code by feature (`src/features/`) with shared infrastructure in `src/server/`, `src/components/`, `src/utils/`. |
| **Impact** | Auth UI in `features/auth/`; onboarding in `features/onboarding/`. Routes in `app/` stay thin. |

---

## ADR-006 — Server/Client Boundary Enforcement

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current codebase |
| **Context** | Next.js App Router requires clear server/client separation. |
| **Decision** | Server-only modules import `server-only`. Default to Server Components. Client components at leaf nodes only. |
| **Impact** | `server/`, `config/env.ts` never imported from client bundles. |

---

## ADR-007 — Better Auth for Website Authentication

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current implementation |
| **Context** | Auth is required for signup, login, and session sharing with mobile. |
| **Decision** | Use Better Auth with Prisma adapter; API route at `/api/auth/[...all]`. |
| **Impact** | Do not add parallel auth systems. Extend Better Auth for password reset and verification. |

---

## ADR-008 — Prisma as Database Access Layer

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current implementation, [MVP.md](../MVP.md) |
| **Context** | User, onboarding, and workout data require persistent storage. |
| **Decision** | All server database access via Prisma singleton in `src/server/db/`. |
| **Impact** | No raw SQL in page components. Migrations managed via Prisma CLI. |

---

## ADR-009 — Subscription Conversion in Mobile App

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [MVP.md](../MVP.md), [USER_FLOW.md](../USER_FLOW.md) |
| **Context** | Pricing page sets expectations; purchase may not belong on web. |
| **Decision** | Website `/pricing` is informational. Primary subscription flow is in mobile app. |
| **Impact** | No Stripe checkout on web in v1 Must Have scope. |
| **Assumption** | Web billing visibility is post-launch Could Have. |

---

## ADR-010 — Community Web Surface Is Read-Only Highlights

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [MVP.md](../MVP.md), [GLOSSARY.md](../GLOSSARY.md) |
| **Context** | Journey Board full functionality is mobile/phased. |
| **Decision** | `/community` displays curated highlights only — not a full social feed. |
| **Impact** | No posting, commenting, or real-time feed on web in v1. |

---

## ADR-011 — Koach Web Presence Is Marketing Only

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [MVP.md](../MVP.md), [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) |
| **Context** | Live Koach chat is mobile-only. |
| **Decision** | `/koach` page uses static illustrative content — no live AI session on web. |
| **Impact** | No Koach API integration on marketing pages. |

---

## ADR-012 — Environment Validation at Server Startup

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current `src/config/env.ts` |
| **Context** | Missing secrets cause runtime failures in production. |
| **Decision** | Validate required env vars with Zod; fail fast on invalid config. |
| **Impact** | Server modules import validated `env` — not raw `process.env`. |

---

## ADR-013 — Standardized API Error and Response Shape

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Current `src/server/http/`, `src/types/api.ts` |
| **Context** | Custom API routes (onboarding, contact) need consistent responses. |
| **Decision** | Use `ok()`, `fail()`, `handleRouteError()` helpers and shared `ApiResponse<T>` type. |
| **Impact** | All new API routes follow `{ success, data | error }` shape. |

---

## ADR-014 — Blog as Static or CMS-Driven Content

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [MVP.md](../MVP.md) Must Have blog |
| **Context** | Blog requires listing and article template; content source unspecified. |
| **Options** | MDX in repo; headless CMS; database-backed |
| **Decision** | **Option A (variant)** — TypeScript content modules in `src/features/blog/content/posts/`. No database table; posts exported as typed constants and loaded at build time. |
| **Impact** | Sitemap includes slugs from content index; non-dev editing requires a code change until CMS or DB is adopted. |
| **Consequences** | `getBlogPosts()` / `getBlogPost(slug)` read from filesystem modules; no blog API routes in v1. |

---

## ADR-015 — Route Groups for Layout Separation

| Field | Value |
|-------|-------|
| **Status** | Proposed |
| **Source** | [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md) |
| **Context** | Marketing, auth, and onboarding require different layouts. |
| **Decision** | Use App Router route groups: `(marketing)`, `(auth)`, `(onboarding)`. |
| **Impact** | URL paths unchanged; layout composition cleaner. |

---

## ADR-016 — Onboarding Step Routes as Path Segments

| Field | Value |
|-------|-------|
| **Status** | Proposed |
| **Source** | [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) |
| **Context** | Multi-step onboarding needs resume support and deep links. |
| **Decision** | Each step is a distinct route under `/onboarding/`. |
| **Impact** | Middleware can redirect to last incomplete step; browser back works per step. |
| **TODO** | Confirm step list and order with product. |

---

## ADR-017 — No Product Logic in Route Files

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | Feature-driven architecture |
| **Context** | `app/` pages tend to accumulate logic without discipline. |
| **Decision** | Route files compose layouts and feature components only. Business logic in `features/` or `server/`. |
| **Impact** | Easier testing; clearer ownership. |

---

## ADR-018 — Terminology Governed by Glossary

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Source** | [GLOSSARY.md](../GLOSSARY.md) |
| **Context** | Inconsistent terms (bot vs. Koach) erode brand and cause implementation confusion. |
| **Decision** | All user-facing copy and internal docs use glossary terms. |
| **Impact** | Component names and route copy align with glossary (e.g., Journey Board, not "progress feed"). |

---

## Adding New ADRs

When making a significant engineering decision:

1. Assign next ADR number.
2. Include Status, Source, Context, Decision, Impact.
3. Mark **Proposed** until team confirms.
4. Link from relevant implementation docs.

Do not create ADRs for trivial choices (e.g., individual component naming).
