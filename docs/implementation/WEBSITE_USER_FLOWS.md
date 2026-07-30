# Website User Flows

**Source:** [USER_FLOW.md](../USER_FLOW.md), [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md)

Engineering definitions of user journeys. Each flow includes **states**, **entry conditions**, **exit conditions**, and **redirect rules**.

Terminology: [GLOSSARY.md](../GLOSSARY.md)

---

## Flow 1 — New Visitor → App Download

Primary conversion path.

```
Visitor (anonymous)
    ↓
Landing (/)
    ↓
Learn — /features, /koach, /pricing, /blog, /community
    ↓
Sign Up (/signup)
    ↓
Verification (/verify-email) — optional, if enabled
    ↓
Onboarding (/onboarding/*)
    ↓
Plan confirmation (/onboarding/complete)
    ↓
Download (/download)
    ↓
Mobile app (out of website scope)
```

### State Table

| Step | Route | Auth | Onboarding | Next on success |
|------|-------|------|------------|-----------------|
| Landing | `/` | — | — | User navigates |
| Learn | Marketing routes | — | — | User navigates |
| Sign Up | `/signup` | Creates session | Incomplete | `/onboarding` |
| Verify email | `/verify-email` | Required | Incomplete | `/onboarding` |
| Onboarding | `/onboarding/*` | Required | In progress | Next step or `/onboarding/complete` |
| Complete | `/onboarding/complete` | Required | Complete | `/download` |
| Download | `/download` | Optional | Complete | External store |

### Engineering Notes

- Onboarding steps must persist server-side per user ([MVP.md](../MVP.md)).
- Plan preview on `/onboarding/complete` is confirmation UI only — full plan interaction is mobile ([USER_FLOW.md](../USER_FLOW.md)).
- **TODO:** Confirm whether email verification gates onboarding entry.

---

## Flow 2 — Returning User (Logged Out)

```
Visitor
    ↓
/login (or Login CTA from any page)
    ↓
Authenticate
    ↓
Redirect by state:
    • onboarding incomplete → /onboarding (resume)
    • onboarding complete   → /download (or logged-in landing — TODO)
```

### Rules

- Do not repeat onboarding unless user explicitly restarts *(product rule — restart UX TODO)*.
- Resume onboarding at **last incomplete step**, not step 1.

### TODO

- [ ] Define logged-in landing route when onboarding is complete
- [ ] Define "restart onboarding" behavior if offered

---

## Flow 3 — Returning User (Logged In, Web)

```
Authenticated session
    ↓
Browse marketing or content pages
    ↓
Primary CTA: Download / Open App
```

### Rules

- Website does not host full training experience ([USER_FLOW.md](../USER_FLOW.md)).
- Header may reflect authenticated state *(TODO: design spec)*.
- No requirement for full web dashboard in v1.

---

## Flow 4 — Forgot Password

```
/login
    ↓
/forgot-password
    ↓
Submit email
    ↓
Confirmation state (same page or /login with message)
    ↓
User resets via email link (Better Auth handled)
    ↓
/login
```

### Priority

Should Have ([MVP.md](../MVP.md), [ROADMAP.md](../ROADMAP.md))

### TODO

- [ ] Confirm reset email link landing route
- [ ] Confirm Better Auth reset token route pattern

---

## Flow 5 — Premium User (Web Touchpoint)

Premium conversion occurs primarily in mobile app ([USER_FLOW.md](../USER_FLOW.md)).

```
Website /pricing — informational only
    ↓
Mobile app — subscription
    ↓
Optional: web account/billing visibility (post-launch assumption)
```

### Website Responsibility (v1)

- Display tier comparison on `/pricing`
- Do not implement primary checkout on web

---

## Flow 6 — Content-Only Visitor (Blog Reader)

```
Organic / referral entry → /blog or /blog/[slug]
    ↓
Read content
    ↓
Optional conversion:
    • Sign Up (inline CTA)
    • Download (secondary CTA)
    ↓
Exit or continue browsing
```

### Rules

- No forced auth gate on blog content
- Every article includes at least one conversion module ([WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md))

---

## Flow 7 — Community Browser

```
Entry → /community
    ↓
View Journey Board highlights (curated, read-only)
    ↓
Sign Up CTA
    ↓
Standard signup → onboarding flow
```

### Rules

- Web community is highlight-only ([MVP.md](../MVP.md))
- Full Journey Board interaction is mobile ([GLOSSARY.md](../GLOSSARY.md))

---

## Flow 8 — Newsletter *(TODO)*

Newsletter signup is listed in the user request but **not defined in product documentation**.

```
TODO: Confirm if newsletter is in v1 scope
    ↓
If yes: define entry points, form, provider, and confirmation flow
```

**Status:** Not in [MVP.md](../MVP.md). Do not implement until product spec added.

---

## Flow 9 — Cookie Consent

```
First visit (EU/UK assumption)
    ↓
Cookie banner displayed
    ↓
Accept or Manage preferences
    ↓
Preference stored (localStorage / cookie)
    ↓
Continue browsing
```

**Reference:** [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) — Cookies page

**TODO:** Confirm jurisdictions and consent management provider.

---

## Global Redirect Matrix

| Condition | Requested route | Redirect to |
|-----------|-----------------|-------------|
| Anonymous | `/onboarding/*` | `/login` |
| Authenticated, onboarding incomplete | `/signup` | `/onboarding` |
| Authenticated, onboarding incomplete | Marketing pages | Allow |
| Authenticated, onboarding complete | `/onboarding/*` | `/download` or `/onboarding/complete` |
| Authenticated | `/login`, `/signup` | State-based landing |
| Onboarding complete | Protected app routes (future) | N/A in v1 |

**TODO:** Implement via middleware or layout-level guards. Confirm approach in [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md).

---

## Handoff Data (Web → Mobile)

Per [USER_FLOW.md](../USER_FLOW.md):

| Data | Set during | Consumed by |
|------|------------|-------------|
| User ID / session | Sign Up, Login | Mobile app auth |
| Onboarding profile | `/onboarding/*` | Plan generation, Koach context |
| Onboarding complete flag | `/onboarding/complete` | Mobile first-run routing |
| Initial plan reference | Backend after onboarding | Mobile app |

Website responsibility: collect and persist onboarding inputs. Plan generation is backend scope.

---

## Error and Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| Session expired during onboarding | Redirect to `/login`; resume after re-auth |
| Onboarding API failure | Show error; retain local form state if possible; retry |
| User hits `/download` before onboarding complete | Redirect to `/onboarding` |
| Invalid blog slug | 404 page |
| Unauthenticated API call | 401; no silent fallback |

404 and error pages: **TODO** — define dedicated routes or default Next.js handling.
