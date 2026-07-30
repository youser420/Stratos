# Stratos — MVP Definition

This document defines what belongs in Version 1 (v1) versus post-launch work. v1 establishes the website as a trust and onboarding surface and the mobile app as the primary coaching experience.

Scope is organized using **MoSCoW** prioritization.

---

## Version 1 — Must Have

Minimum viable product to launch publicly and deliver core value.

### Website

- Home, Features, Koach, Pricing, About, FAQ, Download pages
- Login and Sign Up
- Web onboarding flow (goals, experience, constraints, preferences)
- Post-onboarding plan confirmation and download prompt
- Privacy Policy, Terms of Service, Cookies policy
- Responsive, credible marketing design
- Blog *(minimum: listing + article template — even if launch content is limited)*

### Authentication & Account

- Account creation and login (website)
- Shared account identity with mobile app
- Onboarding state tracked per user (complete / incomplete)

### Mobile Application (Core)

- Login with website-created account
- Personalized workout routines (initial plan from onboarding)
- Workout logging
- Koach AI coach (core conversational coaching)
- Basic dashboard (recent activity, upcoming workouts)
- Progressive overload tracking (fundamental)
- App Store / Play Store distribution

### Backend Platform (Foundation)

- User accounts and authentication
- Onboarding data storage
- Workout and session logging
- Initial plan generation based on onboarding
- Koach integration with access to user goals and basic history
- Subscription state awareness *(assumption: at least free tier at launch)*

### AI Coaching (v1 Baseline)

- Constructive, encouraging, honest tone
- Access to user goals and onboarding context
- Basic session-to-session context *(full long-term memory may be limited in v1 — see Should Have)*

---

## Version 1 — Should Have

Important for launch quality and retention; target for v1 if schedule allows, otherwise early post-launch.

### Website

- Community page with Journey Board highlights (curated)
- Contact page
- SEO fundamentals (metadata, sitemap, structured content)
- Email capture or account verification flow *(assumption)*

### Mobile Application

- Recovery recommendations
- Nutrition guidance (high-level, not full meal tracking)
- Improved dashboard analytics (trends over time)
- Push notifications for workouts and check-ins *(assumption)*

### AI Coaching

- Expanded Koach memory across sessions (goals, preferences, recent history)
- Adaptation signals based on logged workouts (adjust volume, deload suggestions)

### Monetization

- Premium tier definition and in-app subscription *(assumption: Stripe or platform billing)*
- Pricing page aligned with in-app tiers

---

## Version 1 — Could Have

Desirable but not required for initial launch.

- Blog with multiple launch articles and categories
- Deep linking from web to mobile app
- Social sign-in options
- Referral or invite mechanics
- In-app Journey Board posting (if Community web page launches first with read-only highlights)
- Wrapped-style periodic summaries *(see Glossary)*
- Web account settings (profile edit, subscription visibility)

---

## Future Ideas

Explicitly post-v1. Not committed scope.

- Full long-term AI memory across months of conversations and training blocks
- Advanced analytics (volume landmarks, muscle group balance, readiness scores)
- Full community feed, comments, and social features in mobile app
- Comprehensive nutrition tracking (meals, macros, barcode scanning)
- Wearable integrations (sleep, HRV, activity)
- App-first onboarding (bypass web)
- Team or coach-facing tools
- Localization and multi-language Koach
- Corporate wellness or B2B offerings

---

## v1 Boundaries

### In scope for v1 website

| Area | v1 |
|------|-----|
| Explain product | Yes |
| Account creation | Yes |
| Onboarding | Yes |
| Full workout platform | No |
| Live Koach chat (primary) | No — app only |
| Full analytics dashboard | No — app only |
| Primary subscription purchase | No — app *(assumption)* |

### In scope for v1 mobile app

| Area | v1 |
|------|-----|
| Workouts & logging | Yes |
| Koach coaching | Yes |
| Adaptation (basic) | Should Have |
| Community (full) | Future |
| Journey Board (full) | Could Have / Future |
| Premium features | Should Have |

---

## Launch Success Criteria *(Assumption)*

v1 is successful if:

1. Users can sign up on web, complete onboarding, and download the app
2. Users can log workouts and interact with Koach in the app
3. Plans reflect onboarding inputs and show basic progression
4. Website clearly communicates value and converts visitors to signups
5. Legal and trust pages are in place

---

## Assumptions

- v1 launches with free tier; premium may follow within weeks of launch.
- Long-term AI memory is a phased capability — basic context in Must Have, deep memory in Should Have / Future.
- Blog launches with at least one article; content volume grows post-launch.
- Community on web is highlight-only until full mobile community ships.
