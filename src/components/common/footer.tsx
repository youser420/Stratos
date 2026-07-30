import Link from "next/link";

import { Container } from "@/components/common/container";
import { BrandLogo } from "@/components/common/brand-logo";
import { footerNavLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-section-theme="dark"
      className="gym-grid-pattern border-t border-border"
    >
      <Container>
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <BrandLogo href="/" />
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="text-xs text-muted-foreground">
              © {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
