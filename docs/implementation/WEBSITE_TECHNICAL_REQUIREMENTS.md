# Website Technical Requirements

**Source:** Existing codebase, [MVP.md](../MVP.md), [ROADMAP.md](../ROADMAP.md)

Implementation standards for the Stratos website. No code samples — patterns and requirements only.

---

## Stack (Current)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI primitives) |
| Auth | Better Auth |
| Database | PostgreSQL (Neon) via Prisma 6 |
| Forms | React Hook Form + Zod |
| Deployment | Vercel *(assumption — [ROADMAP.md](../ROADMAP.md))* |

Do not introduce alternate frameworks without an ADR.

---

## Repository Structure

Current feature-driven layout under `src/`:

```
src/
├── app/           # Routes only — thin pages
├── features/      # Feature modules (auth, onboarding, etc.)
├── components/    # Shared UI (ui/, common/, layouts/)
├── server/        # Server-only infrastructure
├── config/        # App configuration
├── lib/           # Client-safe shared exports
├── hooks/         # Shared React hooks
├── utils/         # Pure utilities
└── types/         # Shared TypeScript types
```

**Rules:**

- Business logic belongs in `features/` or `server/` — not in `app/` page files.
- Server-only code imports `server-only` package.
- Do not import `@/server/*` or `@/config/env` from client components.

Reference: existing architecture (do not restructure without ADR).

---

## Next.js App Router

### Page Files

- One route segment per [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md) entry.
- Page components are thin — compose layouts and feature components.
- Use route groups `(marketing)`, `(auth)`, `(onboarding)` for layout organization.

### Server Components (Default)

- All page components unless interactivity requires client.
- Marketing content pages, blog listing, legal pages, layouts.
- Data fetching for static or server-rendered content.

### Client Components (`"use client"`)

Use only when necessary:

- Forms with client-side validation and submission
- Interactive UI (mobile nav, accordions with client state if not server-rendered)
- Better Auth client hooks (`useSession`, etc.)
- Cookie consent banner

**Rule:** Push `"use client"` to the smallest leaf component possible.

---

## TypeScript

- Strict mode enabled.
- No `any` without explicit justification comment.
- Shared types in `src/types/`.
- Feature-specific types colocated in `src/features/<feature>/`.
- Environment types derived from Zod schema in `src/config/env.ts` (server-only).

---

## Tailwind CSS v4

- Global styles in `src/app/globals.css`.
- Use design tokens via CSS variables — see [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md).
- Utility composition via `cn()` from `src/utils/cn.ts`.
- No inline styles except dynamic values not expressible in Tailwind.

---

## shadcn/ui

- Primitives live in `src/components/ui/`.
- Add new primitives via shadcn CLI; do not fork unnecessarily.
- Compose marketing components from ui primitives in `components/common/`.

---

## Feature-First Architecture

| Concern | Location |
|---------|----------|
| Auth forms, session UI | `features/auth/` |
| Onboarding steps | `features/onboarding/` *(planned)* |
| Auth server config | `server/auth/` |
| DB access | `server/db/` |
| API response helpers | `server/http/` |
| Errors | `server/errors/` |
| Logging | `server/logger/` |

Features expose a public API via `index.ts` barrel. Do not deep-import internal feature files from outside the feature.

---

## Authentication

- Better Auth instance: `src/server/auth/`
- Auth API route: `src/app/api/auth/[...all]/route.ts`
- Client: `src/features/auth/client.ts`
- Shared identity with mobile app ([MVP.md](../MVP.md))

**TODO:** Document session cookie names and mobile token exchange when mobile phase begins.

---

## Forms

- React Hook Form for all user input forms.
- Zod schemas for validation — colocate with feature (`features/auth/schemas/`, etc.).
- Server Actions or API routes for submission — **TODO:** confirm preferred pattern per form.

---

## Accessibility

- WCAG 2.1 AA on all public pages.
- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`.
- All form inputs labeled; errors linked via `aria-describedby`.
- Focus management on route change and modal open/close.
- Skip-to-content link in marketing layout.

---

## SEO

### Metadata

- Export `metadata` or `generateMetadata` from each indexable page.
- Include: `title`, `description`, `openGraph`, `twitter`.
- Title format: `{Page} | Stratos` or `{Page} — Stratos` — **TODO:** confirm exact pattern.

### OpenGraph

Required on: Home, Features, Koach, Pricing, About, Blog articles, Download.

Include: `og:title`, `og:description`, `og:url`, `og:image`, `og:type`.

**TODO:** Provide default OG image asset.

### Robots

- `src/app/robots.ts` — allow public routes, disallow auth/onboarding/API.
- Reference sitemap URL.

### Sitemap

- `src/app/sitemap.ts` — generate from static route list + blog slugs.
- **TODO:** Confirm blog slug source at implementation time.

---

## Performance

### Targets

See [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md#performance-goals).

### Requirements

- Use `next/image` for all raster images with explicit dimensions.
- Use `next/font` for web fonts (already in root layout).
- Lazy load below-fold images and non-critical client components.
- Avoid large client bundles on marketing pages — no auth/onboarding code on `/`.
- Static generation or ISR for marketing pages where possible.
- Dynamic rendering only for auth, onboarding, and personalized routes.

---

## Security

- Validate environment variables at startup via Zod (`src/config/env.ts`).
- Never expose `BETTER_AUTH_SECRET` or `DATABASE_URL` to client.
- Client env: `NEXT_PUBLIC_*` only.
- CSRF protection via Better Auth defaults.
- Rate limiting on auth endpoints — **TODO:** confirm Better Auth / middleware strategy.
- Sanitize user-generated content on blog if applicable.
- HTTPS only in production.
- Security headers via Next.js config — **TODO:** define CSP policy.

---

## Error Handling

### Server

- Use `AppError` from `src/server/errors/` for known failures.
- Use `handleRouteError` from `src/server/http/` in API route handlers.
- Log unexpected errors via `src/server/logger/`.

### Client

- Form-level error display; no silent failures.
- Global error boundary: `src/app/error.tsx` — **TODO:** implement.
- Not found: `src/app/not-found.tsx` — **TODO:** implement.

---

## Logging

- Use `logger` from `src/server/logger/` for server-side events.
- Log: auth failures, onboarding save failures, unhandled errors.
- Do not log passwords, tokens, or PII beyond user ID.
- Structured JSON log format for production — **TODO:** integrate with Vercel log drain or external service.

---

## Analytics

Provider not specified. See [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md#analytics-placeholders).

Do not add analytics scripts until provider is confirmed.

---

## Testing

**TODO:** Define testing strategy. Minimum expectations:

- Build passes (`npm run build`)
- TypeScript strict check passes
- Critical flow E2E: signup → onboarding → download *(when implemented)*

---

## Deployment

- Vercel deployment assumed.
- Environment variables configured per environment in Vercel dashboard.
- Preview deployments for PRs.
- Production requires all Must Have routes functional.

---

## Dependencies

- Do not add packages without justification.
- Prefer existing stack over new libraries.
- Record significant dependency choices in [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md).
