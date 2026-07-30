# Testing Strategy

**Contract status:** Binding for quality assurance approach.

**Sources:** [implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md), [implementation/IMPLEMENTATION_ROADMAP.md](../implementation/IMPLEMENTATION_ROADMAP.md)

**Status:** Testing tooling not yet configured — **TODO** select frameworks.

---

## Goals

1. Prevent regressions in conversion-critical flows (signup → onboarding → download)
2. Ensure accessibility and performance baselines on marketing pages
3. Keep test suite maintainable and aligned with feature boundaries

---

## Test Pyramid

```
        ┌─────────┐
        │   E2E   │  Critical user flows
        ├─────────┤
        │ Integr. │  Server Actions, API routes
        ├─────────┤
        │  Unit   │  Utils, schemas, pure functions
        └─────────┘
```

---

## Unit Tests

### Scope

| Target | Examples |
|--------|----------|
| `utils/` | `cn()`, date formatters |
| `features/*/schemas/` | Zod schema validation rules |
| `server/errors/` | `AppError`, `isAppError` |
| `features/seo/` | Metadata builder functions |
| `config/` | Navigation config shape |

### Out of scope for unit tests

- shadcn/ui primitives (tested upstream)
- Static marketing copy
- Better Auth internals

### Tooling (TODO)

- **Recommended:** Vitest
- Location: colocated `*.test.ts` or `__tests__/` adjacent to source

### Standard

- Test happy path + primary error cases for schemas
- No snapshot tests for large HTML output

---

## Integration Tests

### Scope

| Target | Examples |
|--------|----------|
| Server Actions | Onboarding step save, contact submit |
| API routes | `/api/contact`, `/api/onboarding/*` |
| Auth redirects | Middleware redirect matrix |
| Database | Onboarding profile CRUD with test DB |

### Approach

- Use test database or mocked Prisma layer — **TODO:** define strategy
- Test auth flows with Better Auth test utilities if available
- Verify `ApiResponse` shape on API errors

### Tooling (TODO)

- Vitest + supertest or Next.js route testing pattern

---

## End-to-End (E2E) Tests

### Critical flows (Must Have)

| ID | Flow |
|----|------|
| E2E-01 | Visitor lands on `/` → navigates to `/signup` |
| E2E-02 | Sign up → redirect to onboarding |
| E2E-03 | Complete all onboarding steps → `/onboarding/complete` → `/download` |
| E2E-04 | Login (onboarding complete) → redirect to `/download` |
| E2E-05 | Login (onboarding incomplete) → resume onboarding |
| E2E-06 | Protected route without session → `/login` |

### Secondary flows (Should Have)

| ID | Flow |
|----|------|
| E2E-07 | Forgot password submission |
| E2E-08 | Contact form submission |
| E2E-09 | Blog article navigation |

### Tooling (TODO)

- **Recommended:** Playwright
- Run against preview deployment or local `next start`

### Environment

- Dedicated test user accounts
- Test database seeded and torn down per run

---

## Accessibility Testing

### Automated

- axe-core in Playwright or eslint-plugin-jsx-a11y
- Run on: Home, Sign Up, Login, one onboarding step, Download

### Manual checklist (each release)

- [ ] Keyboard navigation through header and forms
- [ ] Screen reader spot check on auth and onboarding
- [ ] Color contrast in light and dark mode
- [ ] Focus order logical on mobile nav

### Target

WCAG 2.1 AA per [implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md)

---

## Performance Testing

### Automated

- Lighthouse CI on PR for `/`, `/signup`, `/features` — **TODO:** configure
- Thresholds:
  - Performance ≥ 90
  - Accessibility ≥ 90
  - SEO ≥ 90
  - LCP < 2.5s

### Manual

- Test on throttled mobile network before launch
- Verify no layout shift on font load

---

## Manual QA

### Pre-release checklist

| Area | Checks |
|------|--------|
| Marketing | All Must Have pages render; CTAs work; mobile responsive |
| Auth | Sign up, login, logout, session persistence |
| Onboarding | All steps save; resume works; completion redirects |
| SEO | Metadata present; sitemap.xml valid; robots.txt correct |
| Legal | Privacy, Terms, Cookies published and linked |
| Download | Store links open correctly *(when URLs available)* |

### Browser matrix

- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari / Chrome

---

## Acceptance Criteria Mapping

Website v1 acceptance criteria from [implementation/WEBSITE_REQUIREMENTS.md](../implementation/WEBSITE_REQUIREMENTS.md):

| Criterion | Verification |
|-----------|--------------|
| Must Have pages implemented | Manual QA + E2E smoke |
| Sign up → onboarding → download | E2E-02, E2E-03 |
| Legal pages published | Manual QA |
| Blog listing + article | E2E-09 + manual |
| SEO fundamentals | Lighthouse + sitemap validation |
| No dead ends | Manual link audit |
| Out-of-scope not present | Manual + code review |
| Build passes | CI |

---

## CI Pipeline (Planned)

```
PR opened
  → npm run lint
  → npm run build
  → unit tests (when configured)
  → E2E smoke (on main / pre-release)
  → Lighthouse (on main)
```

**TODO:** Add test scripts to `package.json` when tooling selected.

---

## Test Data

| Data | Source |
|------|--------|
| Test user credentials | Environment variables in CI |
| Onboarding fixtures | Seed script — **TODO** |
| Blog content | Fixture MDX files |

Never use production credentials in tests.

---

## What Not to Test in v1

- Koach AI responses
- Mobile app flows
- Payment / subscription
- Full Journey Board interactions

---

## Definition of Done (Testing)

A task is not done unless:

1. Build passes
2. New utils/schemas have unit tests *(when test framework exists)*
3. User-facing flows in task scope manually verified
4. Critical flow E2E added or updated if flow changed
5. No known a11y regressions on touched pages
