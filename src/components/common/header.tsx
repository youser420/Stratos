import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/common/brand-logo";
import { HeaderUtilityNav } from "@/components/common/header-utility-nav";
import { MobileNav } from "@/components/common/mobile-nav";
import { Navigation } from "@/components/common/navigation";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { primaryNavLinks } from "@/config/navigation";
import { getServerSession } from "@/server/auth/session";

export async function Header() {
  const session = await getServerSession();
  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-8">
            <BrandLogo href={isAuthenticated ? "/home" : "/"} />
            <Navigation
              links={primaryNavLinks}
              className="hidden lg:block"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <HeaderUtilityNav
              isAuthenticated={isAuthenticated}
              className="hidden md:flex"
            />
            <MobileNav
              isAuthenticated={isAuthenticated}
              className="md:hidden"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
