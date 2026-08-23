"use client";

import logo from "../../app/favicon.ico";
import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { NavbarProps } from "@/types/types";
import { navItems } from "@/lib/navigation";
import logout from "@/app/auth/_actions/logout";

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  console.log(router);

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.warning("User Logged Out Successfully!");
      router.push("/auth/login");
    }
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Added `relative` to parent container so absolute positioning targets the navbar */}
      <div className="relative flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0 z-10">
          <span className="text-2xl flex items-center gap-1 font-bold text-primary">
            <Image src={logo} width={32} height={32} alt="Logo" />
            GearUp
          </span>
        </Link>

        {/* Center: Nav Links (Perfectly Centered) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: User Dropdown / Login */}
        <div className="flex items-center gap-2 z-10">
          {user.success ? (
            <div className="cursor-pointer text-primary bg-primary/10 flex items-center gap-1 border-2 border-primary rounded-lg w-fit p-1">
              <div className="flex flex-col gap-1 text-right">
                <p className="text-sm font-medium">{user.data?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.data?.email}
                </p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-accent rounded-lg border">
                <LogOut
                  onClick={async () => {
                    await handleUserMenuAction("logout");
                  }}
                  className="w-8 h-8"
                />
              </div>
            </div>
          ) : (
            // login
            <Link href="/auth/login">
              <Button
                size="icon"
                className="cursor-pointer text-primary hover:text-accent bg-transparent flex items-center gap-1 border-2 border-primary hover:shadow shadow-primary rounded-lg hover:bg-primary w-fit p-1">
              <p className="text-sm font-bold">Login</p>
                <CircleUser
                  style={{ width: 32, height: 32 }}
                  strokeWidth={1.5}
                />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
