export type NavLink = {
  label: string;
  href: string;
};

export const primaryNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Koach", href: "/koach" },
  { label: "Pricing", href: "/pricing" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const guestUtilityNavLinks: NavLink[] = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Download", href: "/download" },
];

export const authenticatedUtilityNavLinks: NavLink[] = [
  { label: "STRATOS", href: "/home" },
  { label: "Download", href: "/download" },
];

export const footerNavLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];
