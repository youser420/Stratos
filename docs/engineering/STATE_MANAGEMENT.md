# State Management

**Contract status:** Binding for data flow and component architecture decisions.

**Sources:** [implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md](../implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md), [implementation/ENGINEERING_DECISIONS.md](../implementation/ENGINEERING_DECISIONS.md)

---

## Principles

1. **Server-first** — Fetch and mutate on the server by default (Server Components, Server Actions).
2. **Minimal client state** — Client state only for UI interactivity and auth client hooks.
3. **No global client store in v1** — No Redux, Zustand, or Jotai unless ADR approved.
4. **Single source of truth** — Server/database for persistent state; URL for navigation state.

---

## Server State

### Definition

Data owned by the server: user session, onboarding profile, blog content, form submission results.

### How to access

| Pattern | Use when |
|---------|----------|
| Server Component `async` fetch | Page load data (blog list, highlights) |
| Server Action | Mutations (save onboarding step, submit contact) |
| `auth.api.getSession()` in server context | Auth checks in layouts/actions |
| Direct service call in `server/services/` | Complex queries shared across actions |

### Caching

| Data type | Strategy |
|-----------|----------|
| Marketing static content | Static generation or ISR |
| Blog posts (MDX) | Build-time static |
| Blog posts (CMS) | `fetch` with revalidation tag — **TODO** |
| User session | No cache — always fresh |
| Onboarding profile | No cache — user-specific |
| Community highlights | ISR with short revalidation *(if API)* |

Use Next.js `fetch` cache and `revalidate` options. Do not cache user-specific data at CDN layer.

---

## Client State

### Definition

Ephemeral UI state that does not belong on the server.

### Examples

| State | Location |
|-------|----------|
| Mobile nav open/closed | `Header` client component |
| Accordion expanded index | Client leaf or native CSS |
| Form dirty/touched (before submit) | React Hook Form internal state |
| Cookie consent preference | `localStorage` or cookie |
| Client-side validation errors | Form component |

### Rules

- Colocate with the component that needs it.
- Do not lift to global context unless multiple distant components need it.
- Reset on route change where appropriate.

---

## Forms

### Stack

- **React Hook Form** — client form state
- **Zod** — schema validation (client + server)
- **@hookform/resolvers** — Zod integration

### Pattern

```
schemas/signup.schema.ts     # Zod schema
components/signup-form.tsx   # "use client" — RHF
actions/signup.actions.ts    # Server Action OR Better Auth client call
```

### Validation rule

Always validate on **server** even if client validates. Client validation is UX only.

### Auth forms

Sign Up / Login use Better Auth client methods (`signIn`, `signUp`) — not custom auth Server Actions for credential handling.

---

## Authentication State

### Server

- Session read via Better Auth server API in Server Components, Server Actions, middleware
- Session is authoritative for redirect decisions

### Client

- `useSession()` from `features/auth/client.ts` for UI that displays auth state (header user menu — **TODO**)
- Do not store session token in React state manually

### Rules

| Concern | Server | Client |
|---------|--------|--------|
| Redirect if unauthenticated | Yes (middleware/layout) | No |
| Display "logged in" in header | Optional server pass | `useSession()` |
| Sign out | Better Auth client | `signOut()` |

---

## Onboarding State

### Persistent (server)

- Current step
- Per-step form data
- Completion timestamp

### Ephemeral (client)

- Current form field values before save
- Step transition loading state

### Flow

1. Server loads onboarding profile on layout mount
2. Client form edits locally
3. Server Action saves step on Next
4. Server updates `currentStep`
5. Navigation to next route

Resume behavior: server returns last incomplete step — client does not infer from localStorage.

---

## React Query (Future)

**Status:** Not in v1 stack.

### When to consider

- Client-heavy polling or refetching
- Optimistic updates across client components
- Mobile app (separate codebase)

### Website v1 decision

Do **not** add React Query/TanStack Query for website. Server Components + Server Actions are sufficient.

Revisit if: real-time dashboard on web (out of v1 scope) or CMS client fetching requirements change.

---

## Server Components

### Use for

- All marketing page content
- Blog listing and articles (static/MDX)
- Legal pages
- Layout shells (if no client interactivity)
- Initial data fetch for onboarding layout (profile from server)

### Data passing

Pass serializable props to client children. Do not pass functions except Server Actions.

---

## Client Components

### Use for

- Forms (auth, onboarding, contact)
- Mobile navigation toggle
- Cookie consent banner
- Interactive accordions (if not CSS-only)
- `useSession()` consumers
- Analytics event handlers

### Boundary rule

Push `"use client"` to the **leaf** of the component tree.

```
page.tsx (Server)
  └── MarketingLayout (Server)
        └── Header (Client — mobile menu only)
        └── Hero (Server)
        └── CTASection (Server)
```

---

## URL as State

| State | URL |
|-------|-----|
| Onboarding step | `/onboarding/<step>` |
| Blog article | `/blog/[slug]` |
| Auth pages | `/login`, `/signup` |

Do not store onboarding step only in client memory — always routable.

---

## Decision Matrix

| Need | Solution |
|------|----------|
| Page content | Server Component + static/ISR |
| User-specific data | Server Component fetch or Server Action |
| Form submission | Server Action or Better Auth client |
| Toggle UI | `useState` in client leaf |
| Auth redirect | Middleware or server layout check |
| Cross-page client cache | Not in v1 — use server refetch |
| Real-time updates | Not in v1 website scope |

---

## Anti-Patterns (Prohibited)

- Fetching user onboarding data in `useEffect` on every page
- Storing session in `localStorage`
- Global Context for all app state
- Prop drilling session through 5+ levels — use server layout or `useSession` at header only
- Client-side redirect as sole auth guard (must have server/middleware guard)

---

## TODO

- [ ] Confirm Server Actions vs REST for onboarding ([API_BOUNDARIES.md](./API_BOUNDARIES.md))
- [ ] Confirm authenticated header behavior (server vs client session read)
