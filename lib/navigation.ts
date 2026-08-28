import { UserRole } from "@/types/enums";
import {
  BanknoteArrowUpIcon,
  Dumbbell,
  NotebookPenIcon,
  Tag,
  Users,
} from "lucide-react";
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Gears", href: "/gear?page=1&limit=12" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const roleNavItems: Record< string, { label: string; href: string; icon: React.ElementType }[] > = {
  [UserRole.CUSTOMER]: [
    { label: "My Rental Orders", href: "/dashboard/customer/orders", icon: NotebookPenIcon },
    {
      label: "My Payments",
      href: "/dashboard/customer/payments",
      icon: BanknoteArrowUpIcon,
    },
  ],
  [UserRole.PROVIDER]: [
    { label: "My Gears", href: "/dashboard/provider/gear", icon: Dumbbell },
    {
      label: "Rental Orders",
      href: "/dashboard/provider/orders",
      icon: NotebookPenIcon,
    },
    {
      label: "My Payments",
      href: "/dashboard/provider/payments",
      icon: BanknoteArrowUpIcon,
    },
  ],
  [UserRole.ADMIN]: [
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Categories", href: "/dashboard/admin/categories", icon: Tag },
    { label: "All Gear", href: "/dashboard/admin/gear", icon: Dumbbell },
    { label: "Rentals", href: "/dashboard/admin/rental-orders", icon: NotebookPenIcon },
    { label: "Payments", href: "/dashboard/admin/payments", icon: BanknoteArrowUpIcon },
  ],
};