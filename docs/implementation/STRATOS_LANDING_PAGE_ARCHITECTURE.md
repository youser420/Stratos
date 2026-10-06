# STRATOS LANDING PAGE — Governing Functional Architecture

**Status:** Implemented (web). See [ADR below](#implementation-note-web-scope) for the scope
decision this required.

## Purpose

This document establishes the governing functional behavior of the STRATOS Landing Page and its
six primary experience nodes: Basecamp, Ascension, Recovery, Community, Coach, and Reflection.

The Landing Page is the primary orientation layer for the complete STRATOS experience. It should
help the Individual understand where they are, what is currently relevant, and where they may go
next without turning the landing experience into a dense dashboard.

The center of the STRATOS Sphere represents current STRATOS context and is not a seventh
destination. Recommendations remain guidance. The Individual retains authority over navigation and
participation.

The STRATOS Landing Page is the primary platform entry and orientation experience. Basecamp is the
whole-experience analytics and understanding destination within the STRATOS Sphere.

## 1. Landing Page Functional Layers

### STRATOS Landing Experience

"Where am I, and what is relevant to me now?"

- Displays the six primary STRATOS nodes.
- Displays current greeting/date context where applicable.
- Surfaces Suggested Discipline context for Ascension and Recovery.
- Preserves direct access to all primary experiences.
- Provides access to Profile and Global Navigation.
- Preserves active or recoverable session context when applicable.

### Basecamp

"What is happening across my whole STRATOS experience?"

- Integrates meaningful evidence from Ascension, Recovery, Reflection, Community, and Journey.
- Surfaces patterns, relationships, consistency, and meaningful change.
- Does not duplicate every raw Discipline or System metric.
- Does not reduce the Individual to one composite score.

### Community

"How am I connecting, participating, and moving toward what matters to me?"

- Provides Outreach purpose and local opportunities.
- Preserves Personal Goals set by the Individual.
- Provides My Participation analytics.
- Surfaces Journey Milestones.
- Links directly to Reflection.

### Reflection

"How am I experiencing my journey?"

- Provides Today's Reflection and explains the purpose of Reflection.
- Preserves Reflection History.
- Provides Reflection Analytics / Reflection Patterns.
- Links directly to Community.
- Allows a Reflection or pattern to be explored with Coach.

### Coach

"What does this mean, and what would I like to explore?"

- Provides persistent contextual guidance across STRATOS.
- Expands into a dedicated one-on-one communication experience.
- Uses the approved Coach emblem as a living spherical presence.
- Carries legitimate context from the experience where Coach was opened.

## 2. Governing Landing Interaction Model

The Landing Page should support a consistent high-level interaction pattern:

Orient → Select → Enter Experience → Act / Reflect / Explore → Return with State Preserved

The STRATOS Sphere is a navigation and orientation model. Selecting a node opens that experience.
The Landing Page should not require the Individual to pass through Basecamp before entering
Ascension, Recovery, Community, Reflection, or Coach.

## 3. STRATOS Sphere Architecture

- Top Left — ASCENSION — Suggested Discipline
- Top Center — BASECAMP — Overall Analytics
- Top Right — RECOVERY — Suggested Discipline
- Bottom Left — COMMUNITY — Goals · Journey · Outreach
- Bottom Center — COACH — Ask Coach
- Bottom Right — REFLECTION — Daily Check-In
- Center: STRATOS / current overall context / large faded Brand Mark.

All nodes must have semantic labels. Geometry, placement, animation, or color must not be the only
means by which the Individual understands a node.

## 4. Landing Page State

At entry, STRATOS should load the Individual's current high-level context where available.

- Current date and greeting context.
- Active or recoverable Ascension/Recovery session state.
- Current Ascension Suggested Discipline.
- Current Recovery Suggested Discipline.
- Today's Reflection state.
- Relevant Community availability where applicable.
- Meaningful Basecamp update state where applicable.
- Coach availability and current contextual entry point.

If sufficient evidence does not exist for a recommendation, STRATOS should present a neutral state
rather than inventing one.

### 4.1 Golden Path Landing State

During the Golden Path, the STRATOS Landing Page retains its standard visual and navigational
architecture. The Golden Path does not create a separate onboarding Landing Page.

Following approval of the Individual's initial Journey, the Landing Page is introduced as the
primary orientation layer of STRATOS. During this introductory state, Coach provides the
applicable Golden Path guidance and directs the Individual to Profile as the next guided
destination.

The Golden Path specification governs guided-tour sequencing, Continue, Skip, Stop Tour, and other
Tour Mode behavior. The Landing Page functionality defined in this specification remains the
underlying interface architecture.

After completion of the Golden Path and selection of Begin My Journey, the Individual returns to
the Landing Page in its normal operational state. At that point, available Journey context,
recommendations, activity state, Reflection state, Community context, Basecamp information, and
other supported information may be surfaced according to the functionality defined in this
specification.

Stopping the Golden Path does not disable or replace the Landing Page. The Individual may explore
STRATOS independently, and Coach remains available to resume the guided tour according to the
Golden Path specification.

> **Implementation note:** the Golden Path / Tour Mode onboarding sequence described here is a
> separate spec and is not built as part of this pass — see the ADR below.

## 5. Ascension Node

Ascension is the entry point to the STRATOS activity System. The Landing Page node may surface the
currently Suggested Discipline, while detailed Run, Prime, Pump, and Ascension Analytics remain
inside Ascension.

- Selecting Ascension opens the Ascension landing experience.
- The suggestion may use available history, progression, Recovery context, and current choices.
- The recommendation is not a requirement.
- An active Ascension workout should be clearly recoverable.
- Landing-page content should not duplicate Discipline workout controls or detailed analytics.

## 6. Recovery Node

Recovery is the entry point to Stretch, Breathe, Nourish, and Recovery Analytics. The Landing Page
node may surface the currently Suggested Discipline based on available Ascension and Recovery
context.

- Before Ascension, Stretch may be emphasized where applicable.
- After Ascension, Recovery recommendations may shift based on completed activity and existing
  Recovery activity.
- The Individual may enter any available Recovery Discipline regardless of the recommendation.
- An active Recovery experience should be clearly recoverable.
- Recovery recommendations must remain supportive rather than diagnostic.

## 7. Basecamp — Whole-Experience Analytics

Basecamp is the highest analytical synthesis layer in the STRATOS experience.

The governing hierarchy is:

Discipline Analytics → System Analytics → Basecamp Analytics

Detailed evidence should remain closest to its source. Basecamp receives selected meaningful
synthesis.

### Basecamp Inputs

- Ascension — meaningful activity, consistency, completion, progression, and significant
  Discipline/System patterns.
- Recovery — Preparation, Renewal, Restoration, Recovery consistency, and relevant readiness
  context.
- Reflection — Daily Check-In, post-activity self-report where applicable, recurring experiential
  patterns, and meaningful change.
- Community — optional participation, outreach, and community involvement without a participation
  score.
- Journey — meaningful milestones and longitudinal change across STRATOS.

### Basecamp Governing Analytics Principle

Basecamp Analytics should follow:

Evidence → Context → Pattern → Relationship → Interpretation

not:

Data → Judgment → Composite Score

- Basecamp should not create a single STRATOS, wellness, readiness, Recovery, or performance
  score.
- Cross-experience relationships may be surfaced when supported by sufficient evidence.
- Correlation must not be presented as causation.
- Derived insights should remain explainable and traceable to source evidence.
- Coach may interpret Basecamp context but is not itself a performance category.

## 8. Reflection Functional Architecture

Reflection is the Individual's experiential input layer. It provides subjective context that
activity and Recovery evidence cannot independently provide.

### Reflection Node Architecture

- Top Left — CURRENT CHECK-IN — Today's Reflection
- Top Center — CURRENT EXPERIENCE — Reflection
- Top Right — ANALYTICS — Reflection Patterns
- Bottom Left — HISTORY — Past Reflections
- Bottom Center — COMMUNITY — Connection & Outreach
- Bottom Right — COACH — Explore with Coach

### Current Check-In

Current Check-In should provide both understanding and input. It should not drop the Individual
directly into an unexplained question.

- A concise description of Reflection.
- The purpose of Reflection within STRATOS.
- Why subjective experience matters alongside objective evidence.
- How Reflection may contribute to Reflection Analytics, Basecamp, Journey, and Coach.
- Today's Reflection prompt/input.
- Begin Reflection or Continue Reflection depending on state.

Reflection should remain voluntary, concise, nonjudgmental, and easy to leave or return to.

### Reflection History

- Preserves chronological past Reflection entries.
- Allows the Individual to review what they previously reported.
- Does not reinterpret or rewrite the Individual's original meaning.
- History is the record; Analytics is the pattern layer.

### Reflection Analytics

- Identifies recurring Reflection patterns and meaningful changes over time.
- May compare Reflection context with relevant Ascension, Recovery, or other STRATOS evidence
  where appropriate.
- Should identify insufficient evidence rather than forcing a trend.
- Should not diagnose medical or psychological conditions.
- Should not convert Reflection into a performance or wellness score.
- Meaningful synthesis may transfer to Basecamp.

### Reflection → Coach

Selecting Coach from Reflection should open Coach with Reflection context preserved. Coach may help
the Individual explore a Reflection, question, or pattern without asserting unsupported causes.

## 9. Community Functional Architecture

Community is the STRATOS connection and outreach experience. It should support meaningful
connection without becoming an infinite social feed, popularity system, or compliance mechanism.

### Community Node Architecture

- Top Left — OUTREACH — Purpose & Local Opportunities
- Top Center — CURRENT EXPERIENCE — Community
- Top Right — ANALYTICS — My Participation
- Bottom Left — PERSONAL GOALS — My Goals
- Bottom Center — REFLECTION — Daily Check-In
- Bottom Right — JOURNEY MILESTONES — Meaningful Progress

### Outreach

- Explains the purpose and importance of community connection within STRATOS.
- Surfaces relevant local public wellness activities or STRATOS opportunities where supported.
- Requires appropriate optional location/context permissions where local information is used.
- Participation remains optional.
- Community opportunity presentation should avoid urgency, social pressure, or comparison.

### My Participation Analytics

- Preserves meaningful participation history.
- May show frequency and types of voluntary participation over time.
- May contribute meaningful patterns or milestones to Basecamp/Journey.
- Does not create a Community score, popularity score, or participation requirement.
- An isolated absence or low participation should not be interpreted negatively.

### Personal Goals

Personal Goals represents goals intentionally established by the Individual.

- The Individual creates, edits, completes, pauses, or retires goals.
- Goals represent where the Individual wants to go.
- Goals should remain distinct from system-generated recommendations.
- Goal progress may contribute Journey context when appropriate.
- STRATOS should not treat an unmet goal as failure or noncompliance.

### Journey Milestones

Journey Milestones represents meaningful progress and accomplishments that have occurred along the
way.

- Milestones may originate from Ascension, Recovery, Reflection, Community, Personal Goals, or
  other approved STRATOS experiences.
- Milestones should represent meaningful change rather than arbitrary point accumulation.
- Journey is longitudinal and narrative; it is not another performance score.
- Where a milestone is derived automatically, the supporting evidence should remain identifiable.

## 10. Community ↔ Reflection Relationship

Community and Reflection are intentionally complementary.

- Reflection is primarily inward-facing: "How am I experiencing my journey?"
- Community is primarily outward-facing: "How am I connecting and participating beyond myself?"
- Community bottom-center links directly to Reflection.
- Reflection bottom-center links directly to Community.
- The reciprocal relationship should preserve navigation state where practical.
- The relationship does not imply that either experience must be completed before the other.

## 11. Coach — Dedicated Functional Architecture

Coach is a major persistent contextual experience and should not use the standard six-node sphere
after it is opened.

The approved Coach emblem becomes the living spherical presence of the dedicated Coach
environment.

### Coach Entry

- Coach may be opened directly from the STRATOS Landing Page.
- Coach may be opened contextually from Basecamp, Reflection, a System, a Discipline, or another
  approved experience.
- The source context should be preserved so the Individual does not need to restate information
  already legitimately available.
- A clear Back control returns the Individual to the prior experience.

### Living Coach Emblem

- The emblem remains full-size throughout the dedicated Coach experience.
- Before conversation, it is visibly present and may use restrained living motion/illumination.
- Once conversation begins, the emblem dims into the background but does not decrease in size.
- The conversation remains foreground content over the dimmed Coach presence.
- Coach changes presence, not size.
- Motion should be restrained and must respect reduced-motion/accessibility settings.
- The emblem should not become a face, character, or anthropomorphic avatar.

### Coach Conversation

- A chat composer remains readily available.
- Conversation history should remain readable over the dimmed emblem.
- Coach may use legitimate current STRATOS context.
- The Individual should be able to understand what context Coach is considering.
- Coach suggestions remain suggestions.
- Coach should not invent unavailable data or present unsupported medical, physiological,
  psychological, or nutritional conclusions.

### Coach Responsive Behavior

- Desktop — Coach remains persistently available in the right pane for contextual access and can
  expand into the dedicated Coach experience.
- Tablet — Coach is available through the collapsible contextual pane and can expand into the
  primary workspace.
- Mobile — Coach occupies the full screen for focused one-on-one communication.
- The underlying Coach conversation/context should remain continuous when moving between compact
  and expanded states where technically supported.

## 12. Navigation and State Preservation

- Returning to STRATOS should preserve the most recent relevant landing state.
- Active workouts and Recovery experiences must not be silently discarded by landing-page
  navigation.
- Partially completed Reflection input should be recoverable where appropriate.
- Coach conversation state should be preserved according to the approved conversation-history
  model.
- Personal Goal edits should not be lost when navigating away.
- Community/Reflection reciprocal navigation should preserve appropriate return context.
- Profile and Global Navigation remain accessible according to responsive layout.

## 13. Recommendation Behavior

- Landing-page recommendations should be contextual, explainable, and non-coercive.
- Ascension may suggest a Discipline.
- Recovery may suggest a Discipline.
- Community may surface opportunities.
- Reflection may surface Today's Check-In.
- Coach may surface contextual prompts where appropriate.
- Basecamp may surface meaningful insights.
- The system may suggest. The Individual decides.
- A different choice should not be interpreted as rejection, failure, or noncompliance.

## 14. Empty and Insufficient-Data States

- If no Ascension recommendation can be supported, show a neutral invitation to explore Ascension.
- If no Recovery recommendation can be supported, show a neutral invitation to explore Recovery.
- If Reflection has no history, Analytics should explain that patterns will appear only when
  sufficient evidence exists.
- If Community has no participation history, My Participation should use a neutral empty state.
- If no local opportunities are available or location is disabled, Outreach should still explain
  purpose and allow non-location-dependent Community access.
- If Basecamp lacks sufficient cross-experience evidence, it should show available evidence without
  fabricating relationships.
- Coach should acknowledge when relevant STRATOS context is unavailable.

## 15. Accessibility

- The STRATOS Sphere must not depend on geometry, color, or animation alone.
- Every node requires accessible text labels and meaningful focus states.
- Keyboard and assistive-technology navigation should follow a predictable semantic order
  independent of circular geometry.
- Touch targets must remain appropriately sized in tablet/mobile adaptations.
- Coach emblem motion must respect reduced-motion settings.
- Dimmed Coach imagery must not reduce chat-text contrast or readability.
- Reflection and Community forms must expose clear labels, instructions, errors, and saved-state
  feedback.

## 16. Privacy and Individual Control

- Location-dependent Community functionality remains optional.
- Reflection content is Individual-provided context and should be handled according to STRATOS
  privacy/data-governance requirements.
- Coach should only use context legitimately available to the experience.
- The Individual should be able to understand when context is being used.
- Community participation should not expose unnecessary personal information.
- Basecamp should synthesize meaningful evidence without exposing raw sensitive detail
  unnecessarily.

## 17. Analytics Transfer Rules

- Detailed evidence should remain at the lowest useful analytical layer.
- Discipline Analytics retains detailed Discipline evidence.
- Ascension Analytics synthesizes Run, Prime, and Pump.
- Recovery Analytics synthesizes Stretch, Breathe, and Nourish.
- Reflection Analytics retains detailed Reflection patterns/history separation.
- Community Analytics retains My Participation detail.
- Basecamp receives selected meaningful synthesis across the entire STRATOS experience.
- Journey receives meaningful milestone/change context rather than every analytical observation.
- Coach may interpret evidence from these layers without becoming an additional score or analytics
  category.

## 18. Governing Experience Principles

- **User Authority** — The system may suggest. The Individual decides.
- **Analytics** — Evidence → Context → Pattern → Interpretation, not Data → Judgment.
- **Reflection** — Subjective experience informs understanding; it is not graded.
- **Community** — Connection is invited; participation is not scored.
- **Journey** — Meaningful change is remembered; it is not reduced to points.
- **Coach** — Context is interpreted conversationally; Coach remains transparent about what it
  knows.
- **Basecamp** — Whole-experience synthesis does not become a whole-person score.

### Developer Summary

- Implement one STRATOS Landing Page with six primary nodes: Basecamp, Ascension, Recovery,
  Community, Coach, and Reflection.
- Treat the center as current STRATOS context, not a seventh destination.
- Preserve Ascension and Recovery Suggested Discipline behavior as guidance rather than
  requirements.
- Implement Basecamp as whole-experience synthesis across Ascension, Recovery, Reflection,
  Community, and Journey.
- Keep detailed evidence within its Discipline/System/Experience analytics and transfer only
  meaningful synthesis upward.
- Implement Reflection with Current Check-In, Reflection Analytics, History, Community access, and
  Coach access.
- Make Current Check-In explain Reflection purpose before or alongside Today's Reflection input.
- Implement Community with Outreach, My Participation Analytics, Personal Goals, Reflection
  access, and Journey Milestones.
- Keep Personal Goals distinct from Journey Milestones: goals describe intended direction;
  milestones describe meaningful progress already experienced.
- Implement reciprocal Community ↔ Reflection navigation.
- Implement Coach as a dedicated one-on-one experience using the approved full-size Coach emblem.
- Keep the Coach emblem the same size during conversation; dim it into the background rather than
  shrinking it.
- Support persistent/contextual Coach access on desktop, collapsible access on tablet, and
  full-screen Coach on mobile.
- Preserve legitimate source context when Coach is opened from another STRATOS experience.
- Do not create composite Basecamp, Community, Reflection, or whole-person scores.
- Provide neutral empty states when evidence is insufficient.
- Preserve active/recoverable state across navigation.
- Respect accessibility, reduced motion, privacy, and Individual control throughout.
- Implement the STRATOS Landing Page—not Basecamp—as the primary platform entry and orientation
  experience. Basecamp remains a Sphere destination responsible for whole-experience analytics and
  understanding.

---

## Implementation note (web scope)

This specification describes the core in-app experience and was originally scoped as
mobile-only — see [`VISION.md`](../VISION.md), [`MVP.md`](../MVP.md),
[`GLOSSARY.md`](../GLOSSARY.md) ("Dashboard"), and [`WEBSITE_ROUTES.md`](./WEBSITE_ROUTES.md)
("Routes Explicitly Not Required (v1)"), which all previously excluded `/dashboard`, workout
logging, Koach chat, and a full analytics dashboard from the website.

By explicit product decision, this build implements the STRATOS Landing Page and all six nodes
as a new authenticated web experience in this repository instead, at `/home` (replacing the old
placeholder `/dashboard`, which now redirects there). This is a deliberate override of the
previous web-scope boundary, not an oversight — [`PROJECT_STRUCTURE.md`](../engineering/PROJECT_STRUCTURE.md)
has been updated accordingly. Still out of scope for this pass: the Golden Path / Tour Mode guided
onboarding sequence referenced in section 4.1 (governed by its own, separate specification), and
Profile/Settings/Notifications beyond the minimal account menu needed for "Preserves access to
Profile and Global Navigation."

New Prisma models back this: `AscensionSession`, `RecoverySession`, `Reflection`, `PersonalGoal`,
`JourneyMilestone`, `CommunityParticipation`, `CoachConversation`, `CoachMessage` (see
`prisma/schema.prisma` and migration `0002_sphere_domain`). Coach's conversational replies are
backed by the Anthropic API (`src/server/services/coach`); see `.env.example` for
`ANTHROPIC_API_KEY`.
