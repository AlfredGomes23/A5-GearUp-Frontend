"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import type { IUser } from "@/types/types";
import { roleNavItems } from "@/lib/navigation";

const DashboardSidebar = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const items = roleNavItems[user.role] || [];
  const dashboardHref = `/dashboard/${user.role.toLowerCase()}`;

  return (
    <Sidebar collapsible="icon" style={{ "--sidebar-border": "transparent" } as React.CSSProperties}
  className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleSidebar} >
                {state === "expanded" ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelLeftOpen className="size-4" />
                )}
                <span>Toggle Sidebar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>

      {/* sidebar options */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {user.role}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === dashboardHref}
                >
                  <Link href={dashboardHref}>
                    <LayoutDashboardIcon className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* role based options */}
              {items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {/* profile */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/dashboard/profile")}
                >
                  <Link href="/dashboard/profile">
                    <User className="size-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
