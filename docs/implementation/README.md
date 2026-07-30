# Stratos — Implementation Documentation

## Purpose

This folder contains **implementation-ready engineering documentation** for the Stratos website and shared platform boundaries.

It answers:

- **What** must be built
- **Where** it lives in the codebase
- **How** engineering standards apply

It does **not** answer why Stratos exists or define product strategy.

---

## Relationship to Product Documentation

| Product docs (`docs/`) | Implementation docs (`docs/implementation/`) |
|------------------------|---------------------------------------------|
| Vision, personas, philosophy | Routes, components, technical standards |
| Website IA (page purpose, audience, CTAs) | Route specs, component responsibilities, acceptance criteria |
| User flows (journeys) | Engineering flow states, redirects, auth gates |
| MVP scope (Must / Should / Could) | Phase deliverables, completion criteria |
| Glossary (terminology) | Canonical naming in routes, components, and copy hooks |

**Product docs are the source of truth.** If a conflict exists, product docs win. Implementation docs translate — they do not override.

### Reference Map

| Product document | Implementation counterpart |
|------------------|---------------------------|
| [VISION.md](../VISION.md) | [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md) |
| [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md) | [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md), [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md) |
| [USER_FLOW.md](../USER_FLOW.md) | [WEBSITE_USER_FLOWS.md](./WEBSITE_USER_FLOWS.md) |
| [MVP.md](../MVP.md) | [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) |
| [ROADMAP.md](../ROADMAP.md) | [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) |
| [GLOSSARY.md](../GLOSSARY.md) | Terminology used across all implementation docs |

---

## How Developers Should Use These Docs

1. **Before starting work** — Read the relevant route spec in [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md) and component responsibilities in [WEBSITE_COMPONENT_MAP.md](./WEBSITE_COMPONENT_MAP.md).
2. **During implementation** — Follow [WEBSITE_TECHNICAL_REQUIREMENTS.md](./WEBSITE_TECHNICAL_REQUIREMENTS.md) and [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md).
3. **For scope questions** — Check [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md) acceptance criteria and out-of-scope section.
4. **For sequencing** — Use [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md).
5. **For architectural questions** — Consult [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md) before proposing alternatives.

---

## How AI Coding Assistants Should Use These Docs

- Treat implementation docs as **hard constraints** unless a TODO explicitly marks missing information.
- Do not invent features beyond product documentation.
- Do not redesign IA, flows, or architecture without an ADR update.
- When product docs mark an item as **Assumption**, implement the minimum viable interpretation or leave a TODO.
- Prefer existing codebase conventions documented in [WEBSITE_TECHNICAL_REQUIREMENTS.md](./WEBSITE_TECHNICAL_REQUIREMENTS.md).

---

## Document Index

| File | Scope |
|------|-------|
| [WEBSITE_REQUIREMENTS.md](./WEBSITE_REQUIREMENTS.md) | Functional and non-functional website requirements |
| [WEBSITE_ROUTES.md](./WEBSITE_ROUTES.md) | Route inventory and per-route specs |
| [WEBSITE_COMPONENT_MAP.md](./WEBSITE_COMPONENT_MAP.md) | Shared component responsibilities |
| [WEBSITE_USER_FLOWS.md](./WEBSITE_USER_FLOWS.md) | Engineering user journey definitions |
| [WEBSITE_TECHNICAL_REQUIREMENTS.md](./WEBSITE_TECHNICAL_REQUIREMENTS.md) | Stack, patterns, SEO, security, performance |
| [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md) | Visual and interaction engineering rules |
| [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md) | Architecture Decision Records (ADRs) |
| [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) | Website implementation phases |

---

## Writing Future Implementation Docs

When adding new implementation documents:

1. **Name clearly** — Prefix with domain (`WEBSITE_`, `MOBILE_`, `API_`) when applicable.
2. **Reference product docs** — Link to the source spec; do not duplicate product rationale.
3. **Be implementation-specific** — Routes, states, components, acceptance criteria, dependencies.
4. **Mark unknowns** — Use `TODO:` for missing product or design input.
5. **Stay out of product scope** — No vision statements, persona narratives, or feature invention.
6. **Update the ADR log** — Record significant engineering decisions in [ENGINEERING_DECISIONS.md](./ENGINEERING_DECISIONS.md).

Planned future folders *(not yet created)*:

- `docs/implementation/mobile/` — Mobile app implementation specs
- `docs/implementation/api/` — Backend API implementation specs
