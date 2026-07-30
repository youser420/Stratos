# Design System — Implementation Rules

**Source:** Existing `src/app/globals.css`, shadcn/ui configuration, [WEBSITE_INFORMATION_ARCHITECTURE.md](../WEBSITE_INFORMATION_ARCHITECTURE.md)

This document translates visual and UX intent into **engineering rules**. It does not replace a Figma spec.

**TODO:** Replace placeholder values with finalized brand guidelines when design assets are delivered.

---

## Design Stack

| Tool | Role |
|------|------|
| Tailwind CSS v4 | Utility styling |
| CSS variables | Theme tokens in `globals.css` |
| shadcn/ui (base-lyra) | Component primitives |
| `cn()` utility | Conditional class merging |

Configuration reference: `components.json`

---

## Typography

### Font Families

Current root layout uses:

- `--font-geist-sans` — body *(verify usage in globals)*
- `--font-geist-mono` — monospace
- `--font-mono` — applied to `html` in base layer

**Rule:** Do not add ad-hoc font imports in page files. Extend root layout only.

### Hierarchy

| Element | Tailwind / token | Usage |
|---------|------------------|-------|
| Page title (h1) | `text-3xl font-semibold` minimum | One h1 per page |
| Section title (h2) | `text-2xl font-semibold` | Major sections |
| Subsection (h3) | `text-xl font-medium` | Cards, feature blocks |
| Body | `text-base` / `text-xs` per ui scale | Default copy |
| Muted | `text-muted-foreground` | Secondary copy |
| Label | `text-xs font-medium` | Form labels |

**Rule:** Use semantic heading order (h1 → h2 → h3). Do not skip levels for styling convenience.

### Product Terminology

Use [GLOSSARY.md](../GLOSSARY.md) terms in all user-facing copy. Capitalize **Koach**, **Journey Board**.

---

## Spacing Scale

Use Tailwind spacing scale consistently.

| Context | Spacing |
|---------|---------|
| Section vertical padding | `py-16` md:`py-24` *(TODO: confirm)* |
| Section gap (internal) | `gap-8` to `gap-12` |
| Card internal padding | `p-4` to `p-6` |
| Form field gap | `gap-4` |
| Button groups | `gap-2` to `gap-4` |

**Rule:** Do not use arbitrary pixel values (`p-[13px]`) unless required by design spec.

---

## Grid Usage

| Pattern | Implementation |
|---------|----------------|
| Feature grid | `Grid` component — 1 col mobile, 2–3 col desktop |
| Blog listing | 1 col mobile, 2–3 col tablet+ |
| Pricing tiers | 1 col mobile, 2 col desktop *(TODO: confirm tier count)* |
| Marketing sections | Full-width sections with inner `Container` |

---

## Container Widths

| Token | Max width |
|-------|-----------|
| Default content | `max-w-5xl` or `max-w-6xl` *(TODO: confirm)* |
| Narrow prose (blog, legal) | `max-w-3xl` |
| Full bleed hero | `w-full` with inner container |

**Rule:** All marketing page content passes through `Container` unless explicitly full-bleed.

---

## Section Spacing

Each marketing page follows:

```
Section (vertical padding)
  └── Container
        └── Content (heading + body + optional grid)
```

Alternate background sections use `bg-muted` or token variant — **TODO:** confirm section alternation pattern.

---

## Color System

Semantic tokens defined in `src/app/globals.css`:

| Token | Usage |
|-------|-------|
| `background` / `foreground` | Page base |
| `primary` / `primary-foreground` | Primary CTAs |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Subtle backgrounds and copy |
| `accent` / `accent-foreground` | Hover and highlight states |
| `destructive` | Errors, destructive actions |
| `border` / `input` / `ring` | Borders and focus rings |
| `card` / `popover` | Elevated surfaces |

**Rules:**

- Use semantic tokens — not raw colors (`bg-zinc-900`) in feature components.
- Existing home page uses some raw zinc classes — migrate to tokens during marketing page implementation.
- Chart and sidebar tokens exist for future dashboard-adjacent UI; not required on marketing pages.

---

## Dark Mode

- Implemented via `.dark` class and `@custom-variant dark` in globals.css.
- **TODO:** Confirm dark mode strategy — class-based toggle vs. system preference only.
- All components must meet contrast requirements in both modes.

**Rule:** Test new components in light and dark before merge.

---

## Motion Principles

- Default: subtle, functional motion only.
- Respect `prefers-reduced-motion: reduce` — disable or reduce animations.
- Acceptable: accordion expand, mobile nav slide, button hover transitions.
- Avoid: decorative animations on marketing pages that delay content visibility.

Existing ui components use `animate-in` / `fade-in` patterns — acceptable for modals and sheets.

---

## Responsive Breakpoints

Tailwind defaults:

| Breakpoint | Min width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Minor layout adjustments |
| `md` | 768px | Navigation desktop layout |
| `lg` | 1024px | Multi-column grids |
| `xl` | 1280px | Container max-width tuning |

**Rule:** Mobile-first — base styles for mobile, add breakpoints for larger screens.

---

## Component Consistency

### Buttons

Use `Button` from `src/components/ui/button`.

| Variant | Usage |
|---------|-------|
| `default` | Primary CTA (Sign Up) |
| `outline` | Secondary actions |
| `ghost` | Tertiary / nav actions |
| `destructive` | Delete, irreversible actions |

Do not create custom button styles outside the ui primitive.

### Cards

Use `Card` for FeatureCard, PricingCard, BlogCard compositions.

### Forms

Use ui `Input`, `Textarea`, `Button`. Consistent error styling via `aria-invalid` classes already in ui primitives.

### Links

- Inline text links: underline on hover, sufficient color contrast.
- Nav links: no underline; active state required.

---

## Layout-Specific Rules

### Marketing Pages

- Always include Header and Footer via `MarketingLayout`.
- At least one `CTA` block per page (except legal).
- Hero on Home only; inner pages use page header pattern.

### Auth Pages

- Centered form, max-width `max-w-sm` to `max-w-md`.
- No marketing navigation clutter.
- Logo links to `/`.

### Onboarding

- Progress indicator always visible.
- One primary action per step (Next / Complete).
- Back navigation preserves saved data.

---

## Imagery

- Use `next/image` exclusively.
- Provide `alt` text for all meaningful images.
- OG images: 1200×630 — **TODO:** provide asset.
- App store badges: official assets only.

---

## Accessibility Requirements

- Minimum touch target: 44×44px for interactive elements on mobile.
- Focus ring: use `ring-ring` token — do not remove focus outlines.
- Color is not the only indicator of state — pair with text or icons.
- Form errors announced to screen readers.

---

## Content Width and Readability

- Blog and legal prose: max line length ~65–75 characters (`max-w-prose` or `max-w-3xl`).
- Marketing headlines may be wider; body copy should remain readable.

---

## TODO — Pending Design Input

- [ ] Final brand color palette confirmation
- [ ] Dark mode default (system vs. toggle)
- [ ] Section background alternation pattern
- [ ] Default OG image and favicon set
- [ ] Illustration / screenshot style for Features and Koach pages
- [ ] App store badge layout on Download page
