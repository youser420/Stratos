import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { homeHero } from "@/features/marketing/content/home";
import { AdaptationSection } from "@/features/marketing/components/adaptation-section";
import { FinalCtaSection } from "@/features/marketing/components/final-cta-section";
import { Hero } from "@/features/marketing/components/hero";
import { JourneyBoardTeaserSection } from "@/features/marketing/components/journey-board-teaser-section";
import { KoachIntroSection } from "@/features/marketing/components/koach-intro-section";
import { PricingTeaserSection } from "@/features/marketing/components/pricing-teaser-section";
import { SocialProofSection } from "@/features/marketing/components/social-proof-section";

export function HomePageContent() {
  return (
    <>
      <Section variant="dark" bleed>
        <Container>
          <Hero
            headline={homeHero.headline}
            subheadline={homeHero.subheadline}
            primaryCta={homeHero.primaryCta}
            secondaryCta={homeHero.secondaryCta}
            stats={homeHero.stats}
          />
        </Container>
      </Section>
      <AdaptationSection />
      <KoachIntroSection />
      <SocialProofSection />
      <JourneyBoardTeaserSection />
      <PricingTeaserSection />
      <FinalCtaSection />
    </>
  );
}
