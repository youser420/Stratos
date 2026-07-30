# Deployment

**Contract status:** Binding for environment and release procedures.

**Sources:** [implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md](../implementation/WEBSITE_TECHNICAL_REQUIREMENTS.md), [ROADMAP.md](../ROADMAP.md)

---

## Environments

| Environment | Purpose | URL pattern |
|-------------|---------|-------------|
| Local | Development | `http://localhost:3000` |
| Preview | PR deployments | `*.vercel.app` *(assumption)* |
| Production | Live site | **TODO:** production domain |

---

## Environment Variables

### Server-only (required)

| Variable | Purpose | Validated in |
|----------|---------|------------|
| `DATABASE_URL` | Neon PostgreSQL connection | `src/config/env.ts` |
| `BETTER_AUTH_SECRET` | Auth encryption (≥32 chars) | `src/config/env.ts` |
| `BETTER_AUTH_URL` | Auth base URL (e.g., `http://localhost:3000`) | `src/config/env.ts` |
| `NODE_ENV` | `development` \| `production` \| `test` | `src/config/env.ts` |

### Client (optional)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Public site URL for auth client; defaults to `BETTER_AUTH_URL` |

### Planned (TODO)

| Variable | Purpose |
|----------|---------|
| `EMAIL_*` | Contact form / auth emails |
| `ANALYTICS_*` | Analytics provider |
| `SENTRY_*` or equivalent | Error monitoring |

### Rules

- Never commit secrets to git
- Local: `.env` (gitignored)
- Production: Vercel environment variables
- Preview: same as production structure; may use staging DB — **TODO:** confirm Neon branch strategy

---

## Vercel

### Configuration

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root directory | `.` |
| Build command | `npm run build` |
| Output | Next.js default |
| Node version | Match local (20+) |

### Deployment triggers

- **Production:** merge to main branch *(assumption)*
- **Preview:** pull request branches

### Domain

- **TODO:** Configure custom domain and SSL
- Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to production URL

---

## Neon (PostgreSQL)

### Usage

- Production and staging databases on Neon
- Connection via `DATABASE_URL`

### Migrations

```bash
npx prisma migrate deploy   # Production
npx prisma migrate dev      # Local development only
```

### Rules

- Never run `migrate dev` against production
- Backup before destructive migrations
- Auth tables owned by Better Auth — coordinate schema changes

### Branching (TODO)

- Confirm Neon branch per preview environment vs. shared staging DB

---

## Better Auth

### Production requirements

- `BETTER_AUTH_URL` must match deployed origin exactly
- `BETTER_AUTH_SECRET` unique per environment; rotate via Vercel env update
- Trusted origins configured if using preview URLs — **TODO**

### Cookie settings

- Production: secure cookies enabled (HTTPS)
- `nextCookies` plugin active for Server Actions

### Email flows (TODO)

- Configure SMTP or email provider for verification and password reset

---

## CI/CD

### Current state

- Build: `npm run build`
- Lint: `npm run lint`
- No automated test pipeline yet ([TESTING_STRATEGY.md](./TESTING_STRATEGY.md))

### Required pipeline (TODO)

```
Push / PR
  → Install dependencies
  → Lint
  → TypeScript (via build)
  → Unit tests (when added)
  → Deploy preview (Vercel)
```

### Production deploy gate

- [ ] All Must Have acceptance criteria met
- [ ] Environment variables set
- [ ] Migrations applied
- [ ] Manual QA checklist complete
- [ ] Legal pages reviewed

---

## Production Checklist

### Pre-deploy

- [ ] `DATABASE_URL` points to production Neon
- [ ] `BETTER_AUTH_SECRET` set (not default)
- [ ] `BETTER_AUTH_URL` matches production domain
- [ ] `NEXT_PUBLIC_APP_URL` matches production domain
- [ ] Prisma migrations deployed
- [ ] Build succeeds locally
- [ ] No TODO critical paths blocking launch

### Post-deploy

- [ ] Home page loads
- [ ] Sign up and login work
- [ ] Onboarding flow completes
- [ ] `/api/auth/get-session` responds
- [ ] `robots.txt` and `sitemap.xml` accessible
- [ ] SSL active
- [ ] Cookie banner functions (if required)

---

## Rollback Strategy

### Application rollback

1. Revert to previous Vercel deployment via Vercel dashboard (instant)
2. Or revert git commit on main and redeploy

### Database rollback

- Prisma migrations are forward-only
- Rollback requires manual down migration or Neon point-in-time restore
- **Before risky migrations:** Neon backup / branch snapshot

### Auth secret rotation

- Update `BETTER_AUTH_SECRET` in Vercel
- Existing sessions may invalidate — plan communication

---

## Monitoring

### Current

- Vercel deployment logs
- `logger` output in serverless functions

### Planned (TODO)

| Tool | Purpose |
|------|---------|
| Error tracking | Sentry or equivalent — unhandled exceptions |
| Uptime | Vercel analytics or external ping |
| Performance | Vercel Speed Insights |
| Auth failures | Log aggregation alert |

### Alerts (TODO)

- 5xx error rate threshold
- Auth endpoint failure spike
- Database connection failures

---

## Security (Production)

- HTTPS enforced
- Security headers in `next.config.ts` — **TODO:** CSP definition
- Rate limiting on auth and contact endpoints — **TODO**
- Dependency audit: `npm audit` before release
- No debug logging of queries in production (Prisma log disabled)

---

## Local Development

```bash
npm install
cp .env.example .env   # TODO: create .env.example
npx prisma migrate dev
npm run dev
```

Requires valid `DATABASE_URL` pointing to local or dev Neon branch.

---

## Related Documents

- [AUTHENTICATION_FLOW.md](./AUTHENTICATION_FLOW.md)
- [DATABASE_BOUNDARIES.md](./DATABASE_BOUNDARIES.md)
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
