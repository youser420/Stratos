# Coding Standards

**Contract status:** Binding for all code contributions.

**Sources:** [implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md](../implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md), [implementation/DESIGN_SYSTEM_IMPLEMENTATION.md](../implementation/DESIGN_SYSTEM_IMPLEMENTATION.md), [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## General Principles

1. Match existing patterns before introducing new ones.
2. Smallest change that satisfies the task definition.
3. No business logic in route files.
4. No speculative features or abstractions.
5. Every PR must pass `npm run build` and TypeScript check.

---

## Naming

### Variables and functions

- `camelCase` for variables, functions, hooks
- `PascalCase` for components, types, interfaces, enums
- `SCREAMING_SNAKE_CASE` for module-level constants
- Prefix hooks with `use`
- Prefix server actions with verb: `saveOnboardingStep`, `submitContactForm`

### Files

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md#naming-conventions).

### Product terms

Use [GLOSSARY.md](../GLOSSARY.md). User-facing strings: **Koach**, **Journey Board**.

---

## Components

### Structure

```tsx
// 1. Imports
// 2. Types (if small; else separate file)
// 3. Component
// 4. Subcomponents (if private and small)
```

### Rules

- One primary component per file for `components/common/`
- Accept `className` prop when wrapper styling may vary
- Use `cn()` for class merging
- Prefer composition over props explosion (>8 props → refactor)
- Server Component by default; `"use client"` only when required

### Prohibited in shared components

- Direct Prisma access
- Direct `process.env` reads (except `NEXT_PUBLIC_*` in client)
- Feature-specific business rules

---

## Hooks

- One hook per file in `hooks/` or `features/*/hooks/`
- Return stable object or tuple; document return shape
- No hooks inside conditionals
- Shared hooks only if used by 2+ features

---

## Imports

### Order

1. React / Next.js
2. External packages
3. `@/config`
4. `@/server/*` *(server files only)*
5. `@/features/*`
6. `@/components/*`
7. `@/utils/*`, `@/hooks/*`, `@/types/*`
8. Relative imports

### Rules

- Use path aliases — no deep relative paths (`../../../`)
- Never import `@/server/*` from client components
- Never import `@/config/env` from client components
- Import from feature public API (`@/features/auth`) — not internal paths

---

## TypeScript

- `strict: true` — no exceptions
- Prefer `interface` for object shapes; `type` for unions and utilities
- No `any` — use `unknown` and narrow
- No non-null assertion (`!`) without comment
- Export types from feature `types/` or `src/types/`
- Use Zod `infer` for form types from schemas

---

## Error Handling

### Server Actions / API routes

- Throw `AppError` for expected failures
- Catch unknown errors; log via `logger.error`; return generic message to client
- Use `handleRouteError` in API routes

### Client forms

- Display field-level validation errors from Zod
- Display single banner for server errors
- Never expose stack traces to users

### Error codes

Use consistent codes from [API_BOUNDARIES.md](./API_BOUNDARIES.md).

---

## Logging

- Use `logger` from `@/server/logger` on server only
- Log: auth failures (without password), onboarding save failures, unhandled errors
- Do not log: passwords, tokens, full session objects, PII beyond user ID
- Include `requestId` or correlation ID when available — **TODO**

---

## Accessibility

- Semantic HTML elements
- All inputs have associated labels
- Keyboard operable interactive elements
- Focus visible
- `aria-*` on dynamic content (errors, loading)
- Images have `alt` text
- Minimum touch target 44px on mobile
- Test with keyboard before PR merge for UI tasks

---

## Performance

- Use `next/image` for images
- Use `next/font` for fonts (root layout only)
- No large client bundles on marketing pages
- Dynamic import client components below fold when heavy
- Avoid unnecessary `useEffect` data fetching — prefer server fetch

---

## Styling

- Tailwind utilities only — no CSS modules unless ADR approved
- Semantic design tokens from `globals.css` — no raw color classes in new code
- Migrate legacy raw colors (e.g., `zinc-*` on home) when touching files
- See [DESIGN_SYSTEM_IMPLEMENTATION.md](../implementation/DESIGN_SYSTEM_IMPLEMENTATION.md)

---

## Documentation

### Code comments

- Comment non-obvious business rules only
- No commented-out code in merged PRs
- TODO format: `// TODO(STRATOS-123): description` or `// TODO: description`

### Engineering docs

- Update `docs/engineering/` when architecture changes
- Add ADR for significant decisions

### Commit messages

- Imperative mood: "Add onboarding layout"
- Reference task ID when applicable: `WEB-042: Implement header navigation`

---

## Git and PR Standards

- One logical change per PR when possible
- PR description: what, why, how to test
- Screenshots for UI changes
- No unrelated formatting changes

---

## ESLint

- Extend `eslint-config-next`
- Fix all lint errors before merge
- No `eslint-disable` without comment and justification

---

## Dependencies

- Do not add packages without justification in PR description
- Prefer built-in Next.js and existing stack
- Record new dependencies in ADR if architectural

---

## Testing Expectations

See [TESTING_STRATEGY.md](./TESTING_STRATEGY.md). Minimum: build passes; manual QA for user-facing flows.

---

## File Creation Checklist

Before adding a file:

- [ ] Correct folder per [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [ ] Correct feature ownership per [FEATURE_ARCHITECTURE.md](./FEATURE_ARCHITECTURE.md)
- [ ] Server vs client boundary correct
- [ ] Named exports preferred over default (except Next.js pages)
