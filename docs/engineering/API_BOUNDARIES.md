# API Boundaries

**Contract status:** Binding for all HTTP endpoints.

**Rule:** Document only — do not implement in this blueprint.

**Sources:** [implementation/WEBSITE_ROUTES.md](../implementation/WEBSITE_ROUTES.md), [implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md)

---

## Conventions

| Field | Description |
|-------|-------------|
| **Owner** | Feature or server module responsible |
| **Auth** | `None`, `Session`, `Optional` |
| **Errors** | Standard shape via `ApiResponse<T>` from `src/types/api.ts` |

### Standard error codes

| Code | HTTP | When |
|------|------|------|
| `VALIDATION_ERROR` | 400 | Invalid input |
| `UNAUTHORIZED` | 401 | Missing or invalid session |
| `FORBIDDEN` | 403 | Valid session, insufficient access |
| `NOT_FOUND` | 404 | Resource missing |
| `CONFLICT` | 409 | Duplicate or state conflict |
| `INTERNAL_ERROR` | 500 | Unhandled server error |

Use `ok()` and `fail()` from `src/server/http/`.

---

## Authentication — Better Auth

### `ALL /api/auth/*`

| Field | Value |
|-------|-------|
| **Purpose** | Better Auth handler — signup, login, logout, session, password reset, verification |
| **Owner** | `server/auth` |
| **Status** | Implemented |
| **Auth** | Varies by sub-route |
| **Implementation** | `src/app/api/auth/[...all]/route.ts` |

#### Sub-routes (Better Auth managed)

Better Auth exposes multiple internal endpoints under `/api/auth/`. Website consumes these via:

- `features/auth/client.ts` (client)
- Better Auth server API (server actions)

**Do not** duplicate auth endpoints. Extend via Better Auth configuration only.

| Operation | Better Auth path (typical) | Auth |
|-----------|---------------------------|------|
| Sign Up | `/api/auth/sign-up/email` | None |
| Sign In | `/api/auth/sign-in/email` | None |
| Sign Out | `/api/auth/sign-out` | Session |
| Session | `/api/auth/get-session` | Optional |
| Forgot Password | `/api/auth/forget-password` | None |
| Reset Password | `/api/auth/reset-password` | Token |
| Verify Email | `/api/auth/verify-email` | Token |

**TODO:** Confirm exact Better Auth v1.6 endpoint paths during auth phase implementation.

#### Input / Output

Defined by Better Auth. Website forms map to Better Auth client methods.

#### Errors

Better Auth error responses — wrap in UI-friendly messages in feature layer.

---

## Onboarding

### `GET /api/onboarding`

| Field | Value |
|-------|-------|
| **Purpose** | Fetch current user's onboarding profile and step progress |
| **Owner** | `features/onboarding` |
| **Status** | Planned |
| **Auth** | Session |
| **Input** | None |
| **Output** | `{ success: true, data: OnboardingProfile }` |
| **Errors** | `UNAUTHORIZED`, `NOT_FOUND` |

---

### `PATCH /api/onboarding/step`

| Field | Value |
|-------|-------|
| **Purpose** | Save data for a single onboarding step |
| **Owner** | `features/onboarding` |
| **Status** | Planned |
| **Auth** | Session |
| **Input** | `{ step: string, data: Record<string, unknown> }` — validated by step schema |
| **Output** | `{ success: true, data: { currentStep: string, completedSteps: string[] } }` |
| **Errors** | `VALIDATION_ERROR`, `UNAUTHORIZED`, `CONFLICT` |

**Alternative:** Server Actions instead of REST — **TODO:** confirm pattern in [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md). If Server Actions used, this endpoint may not exist.

---

### `POST /api/onboarding/complete`

| Field | Value |
|-------|-------|
| **Purpose** | Mark onboarding complete; trigger plan generation |
| **Owner** | `features/onboarding` + backend service |
| **Status** | Planned |
| **Auth** | Session |
| **Input** | None (all steps must be saved) |
| **Output** | `{ success: true, data: { completedAt: string, planId?: string } }` |
| **Errors** | `VALIDATION_ERROR` (incomplete steps), `UNAUTHORIZED` |

---

## Contact

### `POST /api/contact`

| Field | Value |
|-------|-------|
| **Purpose** | Submit contact form |
| **Owner** | `features/contact` |
| **Status** | Planned (Should Have) |
| **Auth** | None |
| **Input** | `{ name: string, email: string, message: string, subject?: string }` |
| **Output** | `{ success: true, data: { id?: string } }` |
| **Errors** | `VALIDATION_ERROR`, `INTERNAL_ERROR` |

**TODO:** Rate limiting strategy. Email provider (Resend, SendGrid, etc.).

---

## Blog

### Content API

**Status:** Depends on ADR-014.

| Option | API needed |
|--------|------------|
| MDX in repo | None — file system reads at build time |
| CMS | External CMS API — not Stratos-owned endpoint |
| Database | `GET /api/blog/posts`, `GET /api/blog/posts/[slug]` — **TODO if Option C** |

Default assumption for v1: **no Stratos blog API** — static/MDX generation.

---

## Community

### `GET /api/community/highlights`

| Field | Value |
|-------|-------|
| **Purpose** | Fetch curated Journey Board highlights |
| **Owner** | `features/community` |
| **Status** | Planned (Should Have) |
| **Auth** | None |
| **Input** | Query: `limit?: number` |
| **Output** | `{ success: true, data: JourneyBoardHighlight[] }` |
| **Errors** | `INTERNAL_ERROR` |

**Alternative:** Static content with no API — acceptable for v1 Should Have if product accepts static highlights.

---

## Health / System

### `GET /api/health`

| Field | Value |
|-------|-------|
| **Purpose** | Deployment health check |
| **Owner** | `server/` |
| **Status** | Optional — recommended |
| **Auth** | None |
| **Output** | `{ status: "ok" }` |
| **Errors** | 503 if DB unreachable |

---

## Explicitly Out of Scope (No API on Website v1)

| Endpoint | Reason |
|----------|--------|
| Workout logging | Mobile-only |
| Koach chat | Mobile-only |
| Analytics dashboard data | Mobile-only |
| Subscription checkout | Mobile-only ([MVP.md](../MVP.md)) |
| Full Journey Board CRUD | Mobile-only |
| Nutrition tracking | Mobile-only |

---

## Server Actions vs REST

| Use Server Action | Use API Route |
|-------------------|---------------|
| Onboarding step save (same origin) | Better Auth (required) |
| Contact form | Mobile app future APIs |
| Internal mutations from web forms | Webhooks from external services |
| Auth-adjacent flows via Better Auth client | Public third-party integrations |

**Default for website mutations:** Server Actions in `features/<name>/actions/`.

**TODO:** Finalize in ADR when onboarding implementation starts.

---

## API Ownership Summary

| Endpoint | Owner |
|----------|-------|
| `/api/auth/*` | `server/auth` |
| `/api/onboarding/*` | `features/onboarding` |
| `/api/contact` | `features/contact` |
| `/api/community/highlights` | `features/community` |
| `/api/health` | `server/` |

---

## Mobile App APIs (Reference Only)

Not website implementation scope. Backend platform (product Phase 5) will expose mobile endpoints sharing User and onboarding data.

Document separately in `docs/engineering/api/` when mobile phase begins.
