# Database Boundaries

**Contract status:** Binding for schema ownership and data access patterns.

**Rule:** Do not create or modify Prisma models in this document. Define **ownership** only.

**Sources:** [MVP.md](../MVP.md), [implementation/ENGINEERING_DECISIONS.md](../implementation/ENGINEERING_DECISIONS.md), existing `prisma/schema.prisma`

---

## Access Rule

All database reads and writes go through:

- `src/server/db/prisma.ts` — Prisma client singleton
- Feature `actions/` or `server/services/` — query logic

Never access Prisma from:

- `src/app/` page files
- Client components
- `components/` shared UI

---

## Ownership Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Platform (Shared)                         │
├─────────────────────────────────────────────────────────────┤
│  Authentication    │  Onboarding      │  Fitness (Future)   │
│  (Better Auth)     │  (Website v1)    │  (Mobile / Backend) │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication — Owner: `server/auth` + Better Auth

**Status:** Implemented (Prisma models exist)

### Owned entities

| Entity | Purpose |
|--------|---------|
| `User` | Core user identity (id, email, name, emailVerified, image) |
| `Session` | Active sessions and tokens |
| `Account` | Credential and OAuth provider accounts |
| `Verification` | Email verification and password reset tokens |

### Access patterns

- Better Auth adapter manages CRUD for auth tables
- Website features read user identity via session — not direct User table writes outside auth flows
- Mobile app shares same User record

### Website may

- Create users via Sign Up (through Better Auth)
- Read session-linked user metadata in server components/actions

### Website must not

- Manually mutate Session tokens outside Better Auth APIs
- Store passwords outside Account model

---

## Onboarding — Owner: `features/onboarding` + `server/services/onboarding`

**Status:** Implemented — `OnboardingProfile` model in `prisma/schema.prisma`

### Owned entities

| Entity | Purpose |
|--------|---------|
| `OnboardingProfile` | Per-user onboarding state and step answers (JSON columns per step) |

### Fields

- `userId` (FK → User, unique)
- `completedAt` (nullable)
- `currentStep` (string — last active step id)
- `goals`, `experience`, `schedule`, `equipment`, `constraints`, `preferences` (JSON, nullable)
- `createdAt`, `updatedAt`

### Access patterns

- Only onboarding Server Actions / services write onboarding data
- Auth middleware and layout guards read `completedAt` for redirect logic
- Mobile app reads onboarding profile on first launch

### Shared read access

- Backend plan generation service (product Phase 5)
- Koach context injection (mobile/backend)

---

## Website — Contact — Owner: `features/contact`

**Status:** Implemented (Phase 9) — email delivery stub; no DB persistence

### Decision

Contact inquiries are submitted via **Server Action** (`submitContactForm`). Messages are logged server-side until an email provider is configured via `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM`.

### Website must

- Validate contact form with Zod (`contactFormSchema`)
- Submit through `submitContactForm` server action
- Link to FAQ from contact page for self-service support

### Website must not

- Persist contact submissions to the database in v1 unless product requires audit trail

---

## Website — Blog — Owner: `features/blog`

**Status:** Implemented (Phase 7) — ADR-014 Option A

### Decision

| Option | Owner | Storage | Status |
|--------|-------|---------|--------|
| A — Content in repo | `features/blog` | TypeScript modules in `content/posts/` | **Selected for v1** |
| B — Headless CMS | External CMS | External API | Future |
| C — Database | `features/blog` | `BlogPost`, `BlogAuthor` tables | Future |

### Website must

- Load posts via `getBlogPosts()` / `getBlogPost(slug)` from content modules
- Include article slugs in `sitemap.ts`

### Website must not

- Add Prisma blog tables until a future ADR supersedes ADR-014

---

## Website — Community Highlights — Owner: `features/community`

**Status:** Implemented (Phase 8) — static curated content (ADR-010)

### Decision

Highlights are **TypeScript content modules** in `features/community/content/` — curated for web display, not aggregated from mobile in v1.

### Website must

- Load highlights via `getJourneyBoardHighlights()`
- Explain Journey Board on `/community` with read-only highlight cards
- Use glossary term **Journey Board** in user-facing copy

### Website must not

- Store full Journey Board feed or social graph on web tables
- Expose posting, commenting, or real-time feed UI on web in v1

---

## Platform — Fitness Domain — Owner: Mobile / Backend (Future)

**Status:** Not website scope. Documented for boundary clarity.

### Future owned entities (not website writes in v1)

| Domain | Entities (illustrative) |
|--------|-------------------------|
| Workouts | Workout, Exercise, WorkoutTemplate |
| Sessions | Session (logged workout — see [GLOSSARY.md](../GLOSSARY.md)) |
| Programs | Program, Routine |
| Nutrition | NutritionPlan, MealLog *(future)* |
| Coaching | KoachConversation, KoachMessage |
| Subscriptions | Subscription, PlanTier |
| Analytics | Aggregated metrics *(derived)* |

Website **reads** none of these in v1 except possibly subscription tier for display (**TODO**).

---

## Website — Newsletter / Waitlist

**Status:** Not in product MVP. **Do not implement.**

Newsletter was referenced in user flow examples but is absent from [MVP.md](../MVP.md). If product adds newsletter:

- Owner would be `features/marketing` or dedicated `features/newsletter`
- Entity: `NewsletterSubscriber`

Mark as **future placeholder only**.

---

## Cross-Boundary Rules

1. **One writer per entity** — Only the owning feature/service writes to its tables.
2. **User ID as join key** — All user-scoped data references `User.id`.
3. **No cross-feature direct table access** — Onboarding does not query ContactSubmission; use service boundaries.
4. **Migrations** — Any new model requires Prisma migration and ownership update in this document.
5. **Better Auth tables** — Managed exclusively through Better Auth; do not add custom columns to User without migration plan affecting auth.

---

## Migration Ownership Checklist

When adding a table:

- [ ] Assign owning feature in this document
- [ ] Define read/write access list
- [ ] Confirm mobile app access requirements
- [ ] Update [API_BOUNDARIES.md](./API_BOUNDARIES.md)
- [ ] Update [FEATURE_ARCHITECTURE.md](./FEATURE_ARCHITECTURE.md)

---

## Current Schema Snapshot

Existing models (auth only): `User`, `Session`, `Account`, `Verification`

All other domains in this document are **planned** with TODO markers until product and ADR-014 decisions are finalized.
