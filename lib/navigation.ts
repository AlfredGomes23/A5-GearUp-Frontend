
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Gears", href: "/gears" },
  { label: "Dashboard", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];