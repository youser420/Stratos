# Stratos — Website Information Architecture

The Stratos website is a **marketing, trust, and onboarding surface**. It is not the full fitness platform. Every page should guide visitors toward understanding Stratos, creating an account, completing onboarding, and downloading the mobile app.

---

## Global Elements

Present across relevant pages:

- Primary navigation: Home, Features, Koach, Pricing, Community, Blog, About
- Utility navigation: Login, Sign Up, Download
- Footer: Privacy, Terms, Cookies, Contact, FAQ, social links *(assumption)*

**Primary site-wide CTAs:** Sign Up · Download App

---

## Page Inventory

### Home

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Introduce Stratos; communicate mobile-first AI coaching value in one screen |
| **Audience** | All visitors; first-touch users |
| **Primary CTA** | Sign Up |
| **Secondary CTA** | Download App · Learn how it works |
| **Required content** | Hero value proposition; how Stratos adapts over time; Koach introduction; social proof or credibility signals; Journey Board teaser; pricing teaser; final conversion block |

---

### Features

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Explain platform capabilities at a high level |
| **Audience** | Evaluating users comparing alternatives |
| **Primary CTA** | Sign Up |
| **Required content** | Personalized workouts; AI coach; recovery; nutrition guidance; workout logging; progressive overload; dashboard & analytics; community; long-term memory — framed as outcomes, not technical specs |

---

### Koach

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Deep-dive on the AI coach — personality, honesty, memory, adaptation |
| **Audience** | Users skeptical of AI coaching; intermediate and advanced personas |
| **Primary CTA** | Sign Up |
| **Required content** | What Koach is; coaching philosophy (constructive, encouraging, honest); memory and personalization; example interaction scenarios *(illustrative, not live product)*; differentiation from generic chatbots |

---

### Pricing

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Set expectations on free vs. premium; reduce purchase friction |
| **Audience** | Users ready to evaluate commitment |
| **Primary CTA** | Sign Up |
| **Secondary CTA** | Download App |
| **Required content** | Tier comparison (free vs. premium — high level); what premium unlocks *(assumption: deeper coaching, analytics, features per MVP)*; FAQ snippet on billing; note that full subscription flow may occur in mobile app |

---

### Community

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Showcase Journey Board highlights and social proof |
| **Audience** | Motivation-driven users; fat-loss and consistency-focused personas |
| **Primary CTA** | Sign Up |
| **Required content** | Explanation of community and Journey Board; curated public highlights *(not full in-app feed)*; how sharing works at a high level; CTA to join via app after signup |

---

### Blog

| Attribute | Detail |
|-----------|--------|
| **Purpose** | SEO, education, trust, and topical authority |
| **Audience** | Organic search visitors; content browsers |
| **Primary CTA** | Sign Up (inline and end-of-article) |
| **Secondary CTA** | Download App |
| **Required content** | Article listing; categories/tags *(assumption)*; individual article template with author, date, related posts; conversion modules within articles |

---

### About

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Build credibility and humanize the brand |
| **Audience** | Trust-sensitive users; press; partners |
| **Primary CTA** | Sign Up |
| **Required content** | Mission and vision summary; why Stratos exists; team or founder story *(assumption)*; link to Careers only if applicable *(future)* |

---

### FAQ

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Reduce support burden; answer pre-purchase objections |
| **Audience** | Users near conversion |
| **Primary CTA** | Sign Up · Contact |
| **Required content** | Product questions; Koach and AI privacy; onboarding and app download; pricing and subscriptions; data and account management |

---

### Contact

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Support, partnerships, and general inquiries |
| **Audience** | Users needing help; business inquiries |
| **Primary CTA** | Submit inquiry |
| **Required content** | Contact form or support email; expected response time *(assumption)*; links to FAQ |

---

### Download

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Central hub for app store links |
| **Audience** | Users post-signup; retargeting campaigns |
| **Primary CTA** | App Store / Google Play badges |
| **Required content** | Store links; QR code *(assumption)*; device requirements; reminder to log in with same account; troubleshooting (wrong account, onboarding incomplete) |

---

### Login

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Authenticate returning users |
| **Audience** | Existing account holders |
| **Primary CTA** | Log in |
| **Secondary CTA** | Sign Up |
| **Required content** | Login form; password recovery link *(assumption)*; redirect logic based on onboarding completion |

---

### Sign Up

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Create a new account |
| **Audience** | New users ready to commit |
| **Primary CTA** | Create account → Onboarding |
| **Required content** | Registration form; terms acceptance; privacy link; brief value reminder |

---

### Onboarding

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Collect personalization inputs; generate initial plan |
| **Audience** | Newly registered users |
| **Primary CTA** | Complete onboarding → Download App |
| **Required content** | Multi-step flow: goals, experience level, schedule, equipment, injuries/constraints, nutrition preferences *(assumption: step list)*; progress indicator; plan-ready confirmation; download prompt |

**Note:** Onboarding may span multiple routes or steps; treated as one logical page/flow in IA.

---

### Privacy Policy

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Legal compliance; transparency on data use |
| **Audience** | All users; regulatory requirement |
| **Primary CTA** | None |
| **Required content** | Data collected; AI and coaching data use; retention; third parties; user rights; contact for privacy requests |

---

### Terms of Service

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Legal agreement for platform use |
| **Audience** | All users |
| **Primary CTA** | None |
| **Required content** | Acceptable use; subscriptions and billing terms; disclaimers (not medical advice); limitation of liability; account termination |

---

### Cookies

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Cookie consent and policy disclosure |
| **Audience** | All visitors (jurisdictions requiring consent) |
| **Primary CTA** | Accept / Manage preferences |
| **Required content** | Cookie categories; purpose; opt-out mechanism; link to Privacy Policy |

---

## Pages Explicitly Out of Scope (Website)

These belong in the **mobile app**, not the marketing website:

- Full workout logging interface
- Live Koach chat session UI
- Complete dashboard and analytics
- Full Journey Board feed and posting
- In-depth nutrition tracking
- Subscription purchase flow *(primary)*

---

## Navigation Model

```
Marketing pages     →  Sign Up  →  Onboarding  →  Download
Content pages       →  Sign Up / Download (soft conversion)
Logged-in web       →  Download / Open App (primary)
Legal pages         →  Footer only
```

---

## Assumptions

- Blog and Community on web show curated/public content; full interactive features require the app.
- Account settings and billing may live on web in a minimal form post-launch.
- Cookie banner required for EU/UK visitors.
